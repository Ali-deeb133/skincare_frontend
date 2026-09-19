// ============================================================
// validators.ts - Backend Aligned Version (Updated)
// ============================================================

export type ValidationResult = { valid: boolean; message?: string };

// ---- Email ----
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { valid: false, message: 'البريد الإلكتروني مطلوب' };
  }

  if (!emailRegex.test(email)) {
    return { valid: false, message: 'البريد الإلكتروني غير صحيح' };
  }

  return { valid: true };
};

// ---- Password (Basic only) ----
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { valid: false, message: 'كلمة المرور مطلوبة' };
  }

  if (password.length < 6) {
    return { valid: false, message: 'كلمة المرور قصيرة جداً' };
  }

  return { valid: true };
};

// ---- Confirm Password (Frontend only) ----
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (!confirmPassword) {
    return { valid: false, message: 'تأكيد كلمة المرور مطلوب' };
  }

  if (password !== confirmPassword) {
    return { valid: false, message: 'كلمتا المرور غير متطابقتان' };
  }

  return { valid: true };
};

// ---- Name ----
export const validateName = (
  name: string,
  label = 'الاسم'
): ValidationResult => {
  if (!name.trim()) {
    return { valid: false, message: `${label} مطلوب` };
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
    errors.first_name = "الاسم الأول مطلوب";
  }

  // التحقق من الاسم الأخير
  if (!values.last_name) {
    errors.last_name = "الاسم الأخير مطلوب";
  }

  // التحقق من البريد الإلكتروني
  if (!values.email) {
    errors.email = "البريد الإلكتروني مطلوب";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "البريد الإلكتروني غير صحيح";
  }

  // التحقق من كلمة المرور
  if (!values.password) {
    errors.password = "كلمة المرور مطلوبة";
  } else if (values.password.length < 6) {
    errors.password = "يجب أن تكون كلمة المرور 6 محارف على الأقل";
  }

  // التحقق من تأكيد كلمة المرور وتطابقها
  if (!values.confirmPassword) {
    errors.confirmPassword = "يرجى تأكيد كلمة المرور";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "كلمات المرور غير متطابقة";
  }

  return errors;
};

export default validateRegisterForm;