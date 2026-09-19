export type AuthMode = 'login' | 'register';

export interface AuthError {
  message: string;
  field?: string; // optional field name (email, password, etc.)
}