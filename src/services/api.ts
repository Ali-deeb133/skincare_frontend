// // ============================================================
// // api.ts - Axios Core (The Heart of the App)
// // ============================================================

import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

// ============================================================
// Base Configuration
// ============================================================

 const BASE_URL  = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';
 const TIMEOUT   = 15_000; // 15 s — يحمي من hanging requests


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
// Request Interceptor (Attach Access Token)
// ============================================================

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const access = tokenService.getAccess();

    if (access && config.headers) {
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================
// Response Interceptor (Auto Refresh Logic)
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
    };
    const refreshToken= tokenService.getRefresh();

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
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
        const { data } = await axios.post(
          `${BASE_URL}/api/token/refresh/`,
          {
            refresh: tokenService.getRefresh(),
          }
        );

        const newAccess = data.access;

        tokenService.setTokens(newAccess,  refreshToken!);

        processQueue(null, newAccess);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
  
        // ممكن تضيف redirect للـ login هون
        tokenService.clear()
        window.location.href = '/login'; // أو استخدم أي طريقة تانية للتنقل
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;











// // ============================================================
// //  api.ts  —  Production-Grade Axios Core
// //  Author  : Senior-level rewrite
// //  Version : 2.0.0
// // ============================================================

// import axios from 'axios';
// import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// // ============================================================
// //  § 1 · Environment & Constants
// // ============================================================

// const BASE_URL  = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000';
// const TIMEOUT   = 15_000; // 15 s — يحمي من hanging requests
// const MAX_RETRY = 1;      // حد آمن لإعادة المحاولة

// // ============================================================
// //  § 2 · Types
// // ============================================================

// interface RefreshTokenResponse {
//   access : string;
//   refresh?: string; // بعض السيرفرات ترجع refresh جديد (Token Rotation)
// }

// interface QueueEntry {
//   resolve : (token: string) => void;
//   reject  : (err: unknown)  => void;
// }

// type RetryableRequest = InternalAxiosRequestConfig & {
//   _retryCount?: number;
// };

// // ============================================================
// //  § 3 · Token Service  (abstracted — سهل التبديل لـ httpOnly cookie)
// // ============================================================

// const KEYS = { access: 'access_token', refresh: 'refresh_token' } as const;

// export const tokenService = {
//   getAccess  : ()                          => localStorage.getItem(KEYS.access),
//   getRefresh : ()                          => localStorage.getItem(KEYS.refresh),

//   setTokens  : (access: string, refresh?: string) => {
//     localStorage.setItem(KEYS.access, access);
//     if (refresh) localStorage.setItem(KEYS.refresh, refresh);
//   },

//   clear      : () => {
//     localStorage.removeItem(KEYS.access);
//     localStorage.removeItem(KEYS.refresh);
//   },

//   /** هل الـ access token موجود ومش منتهي؟ (فحص سريع بدون request) */
//   isAccessExpired: (): boolean => {
//     const token = localStorage.getItem(KEYS.access);
//     if (!token) return true;
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       // نتحقق 10 ثواني قبل الانتهاء الفعلي (clock skew buffer)
//       return payload.exp * 1000 < Date.now() + 10_000;
//     } catch {
//       return true;
//     }
//   },
// } as const;

// // ============================================================
// //  § 4 · Axios Instance
// // ============================================================

// const api = axios.create({
//   baseURL        : BASE_URL,
//   timeout        : TIMEOUT,
//   headers        : { 'Content-Type': 'application/json' },
//   withCredentials: false, // عدّل لـ true عند استخدام httpOnly cookies
// });

// // ============================================================
// //  § 5 · Request Interceptor — Attach Bearer Token
// // ============================================================

// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const access = tokenService.getAccess();
//     if (access && config.headers) {
//       config.headers.Authorization = `Bearer ${access}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // ============================================================
// //  § 6 · Refresh Logic — Queue Pattern (Thread-safe)
// // ============================================================

// let isRefreshing = false;
// let failedQueue  : QueueEntry[] = [];

// /** توزّع نتيجة الـ refresh على جميع الطلبات المنتظرة */
// const processQueue = (error: unknown, token: string | null = null): void => {
//   failedQueue.forEach(({ resolve, reject }) =>
//     error ? reject(error) : resolve(token!),
//   );
//   failedQueue = [];
// };

// /** ينفّذ الـ refresh ويُعيد الـ access token الجديد */
// const refreshAccessToken = async (): Promise<string> => {
//   const refresh = tokenService.getRefresh();
//   if (!refresh) throw new Error('No refresh token available');

//   const { data } = await axios.post<RefreshTokenResponse>(
//     `${BASE_URL}/api/token/refresh/`,
//     { refresh },
//     { timeout: TIMEOUT },
//   );

//   // ندعم Token Rotation — إذا السيرفر أرجع refresh جديد نحفظه
//   tokenService.setTokens(data.access, data.refresh);
//   return data.access;
// };

// // ============================================================
// //  § 7 · Response Interceptor — Auto-Refresh on 401
// // ============================================================

// api.interceptors.response.use(
//   (response: AxiosResponse) => response,

//   async (error: AxiosError) => {
//     const originalRequest = error.config as RetryableRequest | undefined;

//     // ── حالات لا نحاول فيها الـ refresh ──────────────────────
//     const shouldSkipRefresh =
//       !originalRequest                                    ||  // لا يوجد request أصلاً
//       (originalRequest._retryCount ?? 0) >= MAX_RETRY    ||  // تجاوزنا الحد
//       error.response?.status !== 401                     ||  // مش 401
//       !tokenService.getRefresh();                            // لا يوجد refresh token

//     if (shouldSkipRefresh) {
//       return Promise.reject(error);
//     }

//     // ── طلب آخر يجري refresh الآن → ننتظر في القائمة ────────
//     if (isRefreshing) {
//       return new Promise<AxiosResponse>((resolve, reject) => {
//         failedQueue.push({
//           resolve: (token) => {
//             originalRequest.headers!.Authorization = `Bearer ${token}`;
//             resolve(api(originalRequest));
//           },
//           reject,
//         });
//       });
//     }

//     // ── نبدأ refresh ──────────────────────────────────────────
//     isRefreshing = true;
//     originalRequest._retryCount = (originalRequest._retryCount ?? 0) + 1;

//     try {
//       const newAccess = await refreshAccessToken();

//       processQueue(null, newAccess);

//       originalRequest.headers!.Authorization = `Bearer ${newAccess}`;
//       return await api(originalRequest);

//     } catch (refreshError) {
//       processQueue(refreshError, null);
//       tokenService.clear();

//       // أطلق event عشان أي مكان في الـ app يقدر يستمع ويعمل redirect
//       window.dispatchEvent(new CustomEvent('auth:logout'));

//       return Promise.reject(refreshError);

//     } finally {
//       isRefreshing = false;
//     }
//   },
// );

// // ============================================================
// //  § 8 · Utility — Typed Error Helper
// // ============================================================

// /** استخرج رسالة الخطأ من أي نوع بشكل آمن */
// export const getApiError = (error: unknown): string => {
//   if (axios.isAxiosError(error)) {
//     const serverMessage = (error.response?.data as Record<string, string>)?.detail
//       ?? (error.response?.data as Record<string, string>)?.message;
//     return serverMessage ?? error.message;
//   }
//   if (error instanceof Error) return error.message;
//   return 'An unexpected error occurred';
// };

// // ============================================================
// //  § 9 · Export
// // ============================================================

// export default api;