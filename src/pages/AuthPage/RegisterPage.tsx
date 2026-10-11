// ============================================================
// RegisterPage.tsx - صفحة التسجيل الكاملة (Standalone Page)
// ============================================================

import { useNavigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center px-4 py-12">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-rose-100 rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-pink-100/50 border border-pink-100 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500" />
          <div className="p-8">
            <RegisterForm onSwitchToLogin={() => navigate('/login')} />
          </div>
        </div>

        {/* Brand */}
        <p className="text-center text-xs text-gray-400 mt-4">
          🌸 Lumière Skincare — natural care for your skin
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
