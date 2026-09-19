// ===============================
//  Auth Types
// ===============================

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  tokens: {
    refresh: string;
    access: string;
  };
}

export interface RegisterResponse {
  user: User;
}



// ============================================================
// auth.types.ts
// ============================================================

