// // // ============================================================
// // // api.ts - Axios Core (The Heart of the App)
// // // ============================================================

// import axios, { AxiosError } from 'axios';
// import type { InternalAxiosRequestConfig } from 'axios';

// // ============================================================
// // Base Configuration
// // ============================================================

//  const BASE_URL  = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';
//  const TIMEOUT   = 15_000; // 15 s — يحمي من hanging requests


// const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: TIMEOUT,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // ============================================================
// // Token Storage Helpers
// // ============================================================

// const ACCESS_KEY = 'access_token';
// const REFRESH_KEY = 'refresh_token';

// export const tokenService = {
//   getAccess: () => localStorage.getItem(ACCESS_KEY),
//   getRefresh: () => localStorage.getItem(REFRESH_KEY),

//   setTokens: (access: string, refresh: string) => {
//     localStorage.setItem(ACCESS_KEY, access);
//     localStorage.setItem(REFRESH_KEY, refresh);
//   },

//   clear: () => {
//     localStorage.removeItem(ACCESS_KEY);
//     localStorage.removeItem(REFRESH_KEY);
//   },
// };

// // ============================================================
// // Request Interceptor (Attach Access Token)
// // ============================================================

// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const access = tokenService.getAccess();

//     if (access && config.headers) {
//       config.headers.Authorization = `Bearer ${access}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ============================================================
// // Response Interceptor (Auto Refresh Logic)
// // ============================================================

// let isRefreshing = false;
// let failedQueue: {
//   resolve: (token: string) => void;
//   reject: (err: unknown) => void;
// }[] = [];

// const processQueue = (error: unknown, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else if (token) {
//       prom.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as InternalAxiosRequestConfig & {
//       _retry?: boolean;
//     };
//     const refreshToken= tokenService.getRefresh();

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       refreshToken
//     ) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({
//             resolve: (token: string) => {
//               if (originalRequest.headers) {
//                 originalRequest.headers.Authorization = `Bearer ${token}`;
//               }
//               resolve(api(originalRequest));
//             },
//             reject,
//           });
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const { data } = await axios.post(
//           `${BASE_URL}/api/token/refresh/`,
//           {
//             refresh: tokenService.getRefresh(),
//           }
//         );

//         const newAccess = data.access;

//         tokenService.setTokens(newAccess,  refreshToken!);

//         processQueue(null, newAccess);

//         if (originalRequest.headers) {
//           originalRequest.headers.Authorization = `Bearer ${newAccess}`;
//         }

//         return api(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
  
//         // ممكن تضيف redirect للـ login هون
//         tokenService.clear()
//         window.location.href = '/login'; // أو استخدم أي طريقة تانية للتنقل
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;







import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

// ============================================================
// Base Configuration
// ============================================================

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';
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
// ============================================================
const MAX_RETRIES = 5;
const RETRY_DELAY = 4_000; // 4 ثواني بين كل محاولة

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

    if (isNetworkError && originalRequest) {
      originalRequest._retryCount = (originalRequest._retryCount ?? 0) + 1;

      if (originalRequest._retryCount <= MAX_RETRIES) {
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

        tokenService.setTokens(newAccess, refreshToken!);

        processQueue(null, newAccess);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // ممكن تضيف redirect للـ login هون
        tokenService.clear();
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









