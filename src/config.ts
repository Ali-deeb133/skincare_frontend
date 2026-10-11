// Base URL of the backend, without a trailing slash and without `/api`
// (the services add `/api/...` themselves).
export const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000').replace(
  /\/+$/,
  ''
);
