// ============================================================
// LoginPage.tsx - صفحة تسجيل الدخول الكاملة (Standalone Page)
// يُستخدم عند /login مثلاً كـ fallback أو صفحة مستقلة
// ============================================================

import LoginForm from './components/LoginForm';

const LoginPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-green-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-50 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-green-100/50 border border-green-100 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400" />
          <div className="p-8">
            <LoginForm />
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

export default LoginPage;