// ============================================================
// authStore.ts - Clean & Backend-Aligned Version
// ============================================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthError, AuthMode, User } from '../types/auth.types';
import { tokenService, setSessionExpiredHandler } from '../services/api';

// ============================================================
// State Interface
// ============================================================

interface AuthStore {
  // ---- Auth State ----
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;

  // ---- UI State ----
  isDropdownOpen: boolean;
  dropdownMode: AuthMode;

  // ---- Actions (Auth) ----
  setAuth: (user: User, access: string, refresh: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: AuthError | null) => void;

  // ---- UI Actions ----
  openDropdown: (mode?: AuthMode) => void;
  closeDropdown: () => void;
  toggleDropdown: () => void;
  switchMode: (mode: AuthMode) => void;
}

// ============================================================
// Store
// ============================================================

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // ---- Initial State ----
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isDropdownOpen: false,
      dropdownMode: 'login',

      // ========================================================
      // Auth Actions
      // ========================================================

      setAuth: (user, access, refresh) => {
        // خزّن التوكن في المصدر الصحيح
        tokenService.setTokens(access, refresh);

        set({
          user,
          isAuthenticated: true,
          error: null,
          isLoading: false,
        });
      },

      clearAuth: () => {
        tokenService.clear();

        set({
          user: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
          isDropdownOpen: false,
        });
      },

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      // ========================================================
      // Dropdown UI
      // ========================================================

      openDropdown: (mode = 'login') =>
        set({ isDropdownOpen: true, dropdownMode: mode, error: null }),

      closeDropdown: () => set({ isDropdownOpen: false }),

      toggleDropdown: () => {
        const { isDropdownOpen } = get();
        set({ isDropdownOpen: !isDropdownOpen, error: null });
      },

      switchMode: (mode) => set({ dropdownMode: mode, error: null }),
    }),
    {
      name: 'skincare-auth-storage',
      storage: createJSONStorage(() => localStorage),

      // نحفظ فقط user + auth state
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// ============================================================
// Keep the saved user and the tokens in step
// ============================================================

// When the API layer decides the session is dead, forget the user too.
setSessionExpiredHandler(() => useAuthStore.getState().clearAuth());

// A saved user without a token (e.g. storage was partly cleared) cannot make
// authenticated requests, so do not show them as logged in.
if (useAuthStore.getState().isAuthenticated && !tokenService.getAccess()) {
  useAuthStore.getState().clearAuth();
}
