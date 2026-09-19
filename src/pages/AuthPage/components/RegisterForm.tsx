// ============================================================
// RegisterForm.tsx - Backend Aligned & Structured Version
// ============================================================

import { useState, useCallback } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { validateRegisterForm } from '../../../utils/validation';
import type { RegisterRequest } from '../../../types/backendauth.types';

const RegisterForm = () => {
  const { register, isLoading, error, switchToLogin } = useAuth();

  const [formData, setFormData] = useState<RegisterRequest & { confirmPassword: string }>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof typeof formData, boolean>>>({});

  // ============================================================
  // Handle Input Change
  // ============================================================
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleBlur = useCallback(
    (field: keyof typeof formData) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const errors = validateRegisterForm(formData);
      setFieldErrors(errors);
    },
    [formData]
  );

  // ============================================================
  // Submit
  // ============================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {}
    );
    setTouched(allTouched);

    // Validate
    const errors = validateRegisterForm(formData);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    // Call register from useAuth
    await register(formData);
  };

  const inputClass = (field: keyof typeof formData) =>
    `w-full py-2.5 text-sm bg-white border rounded-xl outline-none transition-all duration-200
     focus:ring-2 focus:ring-green-300 focus:border-green-400
     ${touched[field] && fieldErrors[field]
       ? 'border-red-300 bg-red-50'
       : 'border-gray-200 hover:border-green-300'}`;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-5 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-2xl mb-3">
          <span className="text-2xl">🌱</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 font-['Playfair_Display']">
         Create a New Account
        </h2>
        <p className="text-sm text-gray-500 mt-1">Your skincare journey starts here</p>
      </div>

      {/* API Error */}
      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {error.message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        {/* First Name */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
           First Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              onBlur={() => handleBlur('first_name')}
              placeholder="First Name"
              className={`${inputClass('first_name')} pl-10 pr-3`}
            />
          </div>
          {touched.first_name && fieldErrors.first_name && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.first_name}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Last Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              onBlur={() => handleBlur('last_name')}
              placeholder="Last Name"
              className={`${inputClass('last_name')} pl-10 pr-3`}
            />
          </div>
          {touched.last_name && fieldErrors.last_name && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.last_name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
           Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              placeholder="example@email.com"
              dir="ltr"
              className={`${inputClass('email')} pl-10 pr-3`}
            />
          </div>
          {touched.email && fieldErrors.email && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
           Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => handleBlur('password')}
              placeholder="••••••••"
              dir="ltr"
              className={`${inputClass('password')} pl-10 pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {touched.password && fieldErrors.password && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
           Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={() => handleBlur('confirmPassword')}
              placeholder="••••••••"
              dir="ltr"
              className={`${inputClass('confirmPassword')} pl-10 pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            {formData.confirmPassword &&
              formData.password === formData.confirmPassword && (
                <CheckCircle className="absolute left-10 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
              )}
          </div>
          {touched.confirmPassword && fieldErrors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-emerald-500 text-white text-sm font-semibold rounded-xl
            hover:from-pink-600 hover:to-emerald-600 active:scale-[0.98] transition-all duration-200
            disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md shadow-pink-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating account...
            </>
          ) : (
            '🌿 Create My Account'
          )}
        </button>

        {/* Switch to Login */}
        <p className="text-center text-xs text-gray-500">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={switchToLogin}
            className="text-green-600 hover:text-green-700 font-semibold transition-colors"
          >
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;