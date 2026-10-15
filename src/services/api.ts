import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../config';

// ============================================================
// Base Configuration
// ============================================================

const BASE_URL = API_BASE_URL;
const TIMEOUT = 15_000; // 15 s — يحمي من hanging requests

// ============================================================
// 🔁 Cold Start Retry Config
// ------------------------------------------------------------
// المشكلة: الباك اند مستضاف على Render (Free Tier)، وهاد النوع
// من الاستضافة "بينوّم" السيرفر لو ما في طلبات عليه لفترة.
// أول طلب بعد النوم بيترفض فوراً بدون أي response (مش بطء برد،
// هو رفض مباشر لأنه التطبيق لسا مش شغال/مستمع على البورت).
//
// الحل: كل ما يجي خطأ "بدون response" (network error)، نعتبره
// على الأغلب "السيرفر عم يصحى"، فنعيد نفس الطلب تلقائياً كذا
// مرة بفاصل زمني، بدل ما نرجع خطأ فوري للمستخدم.
//
// - لو نجحت أي محاولة بالنص → المستخدم ما بيحس بشي، ولا بتظهر
//   رسالة خطأ إطلاقاً.
// - لو فشلت كل المحاولات (MAX_RETRIES) → عندها بس بيوصل الخطأ
//   لفوق (لـ productService ثم useProducts)، وتظهر رسالة
//   الخطأ العادية متل ما هي مبرمجة بالـ hooks.
//
// ملاحظة: هاد منفصل تماماً عن منطق الـ 401 / refresh token تحت،
// ما بيتعارضوا مع بعض — كل واحد بيعالج نوع خطأ مختلف.
//
// Retry rules:
// - Connection refused or dropped (server asleep): the request never reached
//   the app, so any method is safe to repeat, up to MAX_RETRIES times.
// - Timeout: the server may still process the request later, so only
//   read-only requests (GET/HEAD) are repeated. Repeating a POST here could
//   add the same item to the cart twice. Instead, write requests get a longer
//   timeout (WRITE_TIMEOUT) so a single attempt can outlast a cold start.
// - Browser offline: no retry, the error is shown straight away.
// ============================================================
const MAX_RETRIES = 5;
const RETRY_DELAY = 4_000; // 4 ثواني بين كل محاولة
const WRITE_TIMEOUT = 75_000; // a Render cold start takes about a minute

const isReadOnly = (config: InternalAxiosRequestConfig) =>
  ['get', 'head'].includes((config.method ?? 'get').toLowerCase());

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Login and register must not depend on a saved token: an old or invalid one
// would get a 401, and a 401 there means a wrong password, not an expired session.
const PUBLIC_ENDPOINTS = ['/api/accounts/login/', '/api/accounts/register/'];

const isPublicEndpoint = (config: InternalAxiosRequestConfig) =>
  PUBLIC_ENDPOINTS.includes((config.url ?? '').split('?')[0]);

const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================================
// Token Storage Helpers
// ============================================================

const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

export const tokenService = {
  getAccess: () => localStorage.getItem(ACCESS_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),

  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  },

  clear: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

// ============================================================
// Session Expired Handler
// ------------------------------------------------------------
// api.ts cannot import the auth store (the store imports this file), so the
// store registers a callback here. It runs when the session can no longer be
// used, so the saved user is cleared together with the tokens.
// ============================================================

let onSessionExpired: (() => void) | null = null;

export const setSessionExpiredHandler = (handler: () => void) => {
  onSessionExpired = handler;
};

const endSession = () => {
  tokenService.clear();
  onSessionExpired?.();
};

// ============================================================
// Request Interceptor (Attach Access Token)
// ============================================================

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const access = tokenService.getAccess();

    if (access && config.headers && !isPublicEndpoint(config)) {
      config.headers.Authorization = `Bearer ${access}`;
    }

    if (!isReadOnly(config) && config.timeout === TIMEOUT) {
      config.timeout = WRITE_TIMEOUT;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================
// Response Interceptor (Cold Start Retry + Auto Refresh Logic)
// ============================================================

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      _retryCount?: number;
    };

    // ------------------------------------------------------------
    // 🔁 Cold Start Retry
    // بيصير هالخطأ (!error.response) لما ما في رد أصلاً من السيرفر
    // (نايم / CORS preflight مرفوض / انقطع الاتصال) — بعكس 401 أو
    // 400 يلي فيهن السيرفر رد فعلياً بس برفض.
    // ------------------------------------------------------------
    const isNetworkError = !error.response;
    const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false;

    if (isNetworkError && originalRequest && !isOffline && !axios.isCancel(error)) {
      const isTimeout = error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT';
      const maxRetries = isTimeout && !isReadOnly(originalRequest) ? 0 : MAX_RETRIES;

      originalRequest._retryCount = (originalRequest._retryCount ?? 0) + 1;

      if (originalRequest._retryCount <= maxRetries) {
        await wait(RETRY_DELAY);
        return api(originalRequest);
      }
    }

    // ============================================================
    // Auto Refresh Logic (401)
    // ============================================================
    const refreshToken = tokenService.getRefresh();

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken &&
      !isPublicEndpoint(originalRequest)
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(`${BASE_URL}/api/token/refresh/`, {
          refresh: tokenService.getRefresh(),
        });

        const newAccess = data.access;

        tokenService.setTokens(newAccess, refreshToken!);

        processQueue(null, newAccess);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // ممكن تضيف redirect للـ login هون
        endSession();
        window.location.href = '/login'; // أو استخدم أي طريقة تانية للتنقل
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // A 401 that could not be fixed by refreshing (no refresh token, or the
    // refreshed token was rejected too) means the saved session is dead.
    // Only when a token was stored: a wrong password at login is also a 401.
    if (
      error.response?.status === 401 &&
      tokenService.getAccess() &&
      !isPublicEndpoint(originalRequest)
    ) {
      endSession();
    }

    return Promise.reject(error);
  }
);

export default api;
