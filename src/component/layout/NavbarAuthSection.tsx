// ============================================================
// NavbarAuthSection.tsx - CLEAN VERSION
// ============================================================

import { User, LogOut, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import AuthDropdown from '../../pages/AuthPage/AuthDropdown';

const NavbarAuthSection = () => {
  const {
    user,
    isAuthenticated,
    openLogin,
    openRegister,
    logout,
    isDropdownOpen,
  } = useAuth();

  // ============================================================
  // Logged In
  // ============================================================

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.first_name}
              className="w-8 h-8 rounded-full object-cover border-2 border-green-200"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-sm font-semibold">
              {user.first_name[0]}
            </div>
          )}

          <span className="text-sm text-gray-700 font-medium hidden sm:block">
            {user.first_name}
          </span>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:block">logout</span>
        </button>
      </div>
    );
  }

  // ============================================================
  // Not Logged In
  // ============================================================

  return (
    <div className="relative flex items-center gap-2">
      <button
        onClick={openLogin}
        aria-expanded={isDropdownOpen}
        aria-haspopup="dialog"
        className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-600 font-medium px-4 py-2 rounded-xl border border-gray-200 hover:border-green-300 transition-all duration-200"
      >
        <User className="w-4 h-4" />
      login
      </button>

      <button
        onClick={openRegister}
        className="flex items-center gap-1.5 text-sm text-white font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-sm shadow-green-200"
      >
        <ShoppingBag className="w-4 h-4" />
       join us
      </button>

      {/* يمكن وضعه هنا أو في App.tsx مرة واحدة */}
      <AuthDropdown />
    </div>
  );
};

export default NavbarAuthSection;