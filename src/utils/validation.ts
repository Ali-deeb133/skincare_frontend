// ============================================================
// validators.ts - Backend Aligned Version (Updated)
// ============================================================

export type ValidationResult = { valid: boolean; message?: string };

// ---- Email ----
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { valid: false, message: 'Email is required' };
  }

  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Please enter a valid email address' };
  }

  return { valid: true };
};

// ---- Password (Basic only) ----
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { valid: false, message: 'Password is required' };
  }

  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }

  return { valid: true };
};

// ---- Login Form (Email + Password) ----
export const validateLoginForm = (
  email: string,
  password: string
): { email?: string; password?: string } => {
  const emailResult = validateEmail(email);
  const passwordResult = validatePassword(password);

  return {
    email: emailResult.valid ? undefined : emailResult.message,
    password: passwordResult.valid ? undefined : passwordResult.message,
  };
};

// 1. تعريف شكل البيانات (Interface) لحل مشكلة اللون الأحمر
// 1. تعريف واجهة البيانات
interface RegisterCredentials {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

// 2. الدالة مع معالجة خطأ الـ Record
export const validateRegisterForm = (values: RegisterCredentials) => {
  // بدلاً من Record، نستخدم Partial لبيان أن المفاتيح اختيارية من نفس نوع RegisterCredentials
  const errors: Partial<Record<keyof RegisterCredentials, string>> = {};

  // التحقق من الاسم الأول
  if (!values.first_name) {
    errors.first_name = 'First name is required';
  }

  // التحقق من الاسم الأخير
  if (!values.last_name) {
    errors.last_name = 'Last name is required';
  }

  // التحقق من البريد الإلكتروني
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // التحقق من كلمة المرور
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  // التحقق من تأكيد كلمة المرور وتطابقها
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};
