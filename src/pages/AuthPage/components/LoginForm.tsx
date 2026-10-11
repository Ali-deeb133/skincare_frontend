// ============================================================
// LoginForm.tsx - Backend Aligned Version
// ============================================================

import { useState, useCallback, useId } from 'react';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { validateLoginForm } from '../../../utils/validation';

interface LoginFormProps {
  // Set by the standalone /login page, where there is no drop-down to switch.
  onSwitchToRegister?: () => void;
}

const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  // The form can be on screen twice (drop-down and page), so ids must be unique.
  const formId = useId();
  const { login, isLoading, error, switchToRegister } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});

  // ============================================================
  // Handle Input Change
  // ============================================================

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // ============================================================
  // Handle Blur (Field Validation)
  // ============================================================

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { name } = e.target;

      setTouched((prev) => ({ ...prev, [name]: true }));

      const errors = validateLoginForm(formData.email, formData.password);

      setFieldErrors(errors);
    },
    [formData]
  );

  // ============================================================
  // Submit
  // ============================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ email: true, password: true });

    const errors = validateLoginForm(formData.email, formData.password);

    setFieldErrors(errors);

    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    await login({
      email: formData.email,
      password: formData.password,
    });
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-100 rounded-2xl mb-3">
          <span className="text-2xl">🌿</span>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 font-display">Welcome back! 👋</h2>

        <p className="text-sm text-gray-500 mt-1">Sign in to continue to your skincare journey.</p>
      </div>

      {/* API Error */}
      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {error.message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor={`${formId}-email`}
            className="block text-xs font-medium text-gray-600 mb-1.5"
          >
            Email
          </label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              type="email"
              id={`${formId}-email`}
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="example@email.com"
              dir="ltr"
              className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white border rounded-xl outline-none transition-all duration-200
                focus:ring-2 focus:ring-pink-300 focus:border-pink-400
                ${
                  touched.email && fieldErrors.email
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
            />
          </div>

          {touched.email && fieldErrors.email && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor={`${formId}-password`}
            className="block text-xs font-medium text-gray-600 mb-1.5"
          >
            Password
          </label>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              type={showPassword ? 'text' : 'password'}
              id={`${formId}-password`}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              dir="ltr"
              className={`w-full pl-10 pr-10 py-2.5 text-sm bg-white border rounded-xl outline-none transition-all duration-200
                focus:ring-2 focus:ring-pink-300 focus:border-pink-400
                ${
                  touched.password && fieldErrors.password
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {touched.password && fieldErrors.password && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold rounded-xl
            hover:from-primary-dark hover:to-secondary active:scale-[0.98] transition-all duration-200
            disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md shadow-pink-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing in .........
            </>
          ) : (
            'Login'
          )}
        </button>

        {/* Switch */}
        <p className="text-center text-xs text-gray-500">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister ?? switchToRegister}
            className="text-pink-600 hover:text-pink-700 font-semibold transition-colors"
          >
            Create a new account
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
