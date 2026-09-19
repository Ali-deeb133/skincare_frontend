import { useCallback } from 'react';
import axios from 'axios';  // استيراد axios للتحقق من نوع الخطأ
import { useAuthStore } from '../store/authStore';
import { loginUser, registerUser } from '../services/authService';
import type { LoginRequest, RegisterRequest } from '../types/backendauth.types';
import type { AuthError } from '../types/auth.types';

// واجهة لتعريف شكل الخطأ القادم من السيرفر (Backend)
interface BackendError {
  detail?: string;
}

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    isDropdownOpen,
    dropdownMode,
    setAuth,
    clearAuth,
    setLoading,
    setError,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    switchMode,
  } = useAuthStore();

  // --- دالة مساعدة لمعالجة الأخطاء (DRY Principle) ---
  const handleAuthError = useCallback((err: unknown, defaultMsg: string) => {
    let message = defaultMsg;

    // التحقق بأمان إذا كان الخطأ قادم من Axios
    if (axios.isAxiosError<BackendError>(err)) {
      message = err.response?.data?.detail || defaultMsg;
    }

    const authError: AuthError = { message };
    setError(authError);
    return { success: false, error: authError };
  }, [setError]);

  // ============================================================
  // Login
  // ============================================================
  const login = useCallback(
    async (credentials: LoginRequest) => {
      try {
        setLoading(true);
        setError(null);

        const response = await loginUser(credentials);

        setAuth(
          response.user,
          response.tokens.access,
          response.tokens.refresh
        );

        closeDropdown();
        return { success: true };
      } catch (err) {
        return handleAuthError(err, 'فشل تسجيل الدخول');
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setAuth, closeDropdown, handleAuthError]
  );

  // ============================================================
  // Register
  // ============================================================
  const register = useCallback(
    async (credentials: RegisterRequest) => {
      try {
        setLoading(true);
        setError(null);

        await registerUser(credentials);

        // تسجيل دخول تلقائي
        const loginResponse = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });

        setAuth(
          loginResponse.user,
          loginResponse.tokens.access,
          loginResponse.tokens.refresh
        );

        closeDropdown();
        return { success: true };
      } catch (err) {
        return handleAuthError(err, 'فشل إنشاء الحساب');
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setAuth, closeDropdown, handleAuthError]
  );

  // ============================================================
  // Actions & Helpers
  // ============================================================
  const logout = useCallback(() => clearAuth(), [clearAuth]);
  const openLogin = useCallback(() => openDropdown('login'), [openDropdown]);
  const openRegister = useCallback(() => openDropdown('register'), [openDropdown]);
  const switchToLogin = useCallback(() => switchMode('login'), [switchMode]);
  const switchToRegister = useCallback(() => switchMode('register'), [switchMode]);

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    isDropdownOpen,
    dropdownMode,
    // Actions
    login,
    register,
    logout,
    openLogin,
    openRegister,
    closeDropdown,
    toggleDropdown,
    switchToLogin,
    switchToRegister,
  };
};