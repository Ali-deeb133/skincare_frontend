// ============================================================
// RegisterPage.tsx - صفحة التسجيل الكاملة (Standalone Page)
// ============================================================

import RegisterForm from './components/RegisterForm';

const RegisterPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 py-12">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-100 rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-green-100/50 border border-green-100 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400" />
          <div className="p-8">
            <RegisterForm />
          </div>
        </div>

        {/* Brand */}
        <p className="text-center text-xs text-gray-400 mt-4">
          🌿 Skincare — العناية الطبيعية ببشرتك
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;