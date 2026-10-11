// ============================================================
// authService.ts - Backend Matched Version
// ============================================================

import api from './api';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RegisterResponse,
} from '../types/auth.types';

// ============================================================
// Login
// POST /api/accounts/login/
// ============================================================
export const loginUser = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/api/accounts/login/', credentials);

  return data;
};

// ============================================================
// Register
// POST /api/accounts/register/
// (لا يعيد tokens حسب التوثيق)
// ============================================================
export const registerUser = async (credentials: RegisterRequest): Promise<RegisterResponse> => {
  const { data } = await api.post<RegisterResponse>('/api/accounts/register/', credentials);

  return data;
};
