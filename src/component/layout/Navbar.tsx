
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { AuthDropdown } from '../../pages/AuthPage';
import { LogoutModal } from '../ui/LogoutModel';
import CartStore from '../../store/CartStore'

// ============ الثوابت والتكوين ============
const NAVBAR_CONFIG = {
  scrollThreshold: 20,
  animationDelay: 700,
  logo: {
    icon: '🌸',
    name: 'Lumière',
    subtitle: 'Skincare',
  },
} as const;

// ============ أيقونات SVG ============
const Icons = {
  Search: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),

  Login: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),

  Logout: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),

  Cart: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),

  Home: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  ),
} as const;

// ============ أنواع الأزرار ============
type NavButtonProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  variant?: 'icon' | 'cart';
  badge?: string;
};

// ============ المكونات الفرعية ============

const Logo: React.FC = () => (
  <Link to="/" className="flex items-center gap-3 no-underline group">
    <div
      className="w-12 h-12 rounded-full
                 bg-gradient-to-br from-[#ec4899] to-[#f9a8d4]
                 flex items-center justify-center text-2xl
                 shadow-[0_6px_20px_rgba(236,72,153,0.35)]
                 transition-transform duration-300
                 group-hover:rotate-[15deg] group-hover:scale-105"
    >
      {NAVBAR_CONFIG.logo.icon}
    </div>
    <div>
      <div className="font-['Cormorant_Garamond',serif] font-bold text-2xl text-[#be185d] leading-none">
        {NAVBAR_CONFIG.logo.name}
      </div>
      <div className="text-[9px] tracking-widest text-[#f472b6] font-semibold uppercase">
        {NAVBAR_CONFIG.logo.subtitle}
      </div>
    </div>
  </Link>
);

const NavButton: React.FC<NavButtonProps> = ({ to, icon, label, variant = 'icon', badge }) => (
  <Link to={to}>
    <Button variant={variant} icon={icon} badge={badge} aria-label={label}>
      {label}
    </Button>
  </Link>
);

// ============ NavActions ============

const NavActions: React.FC = () => {
  const { isAuthenticated, user, openLogin, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const cart = CartStore(state => state.cart);
  const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <div className="flex items-center gap-2">

      {/* Search */}
      <NavButton to="/search" icon={<Icons.Search />} label="Search" />

      {/* Home */}
      <NavButton to="/" icon={<Icons.Home />} label="Home" />

      {/* Login / User */}
      {isAuthenticated && user ? (
        <div className="flex items-center gap-2">

          {/* Avatar */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 border border-pink-100">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.first_name}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-pink-300 flex items-center justify-center text-white text-xs font-bold">
                {user.first_name?.[0] ?? '?'}
              </div>
            )}
            <span className="text-xs font-medium text-pink-700 hidden sm:block">
              {user.first_name}
            </span>
          </div>

          {/* Logout — يفتح الـ Modal */}
          <Button
            variant="icon"
            icon={<Icons.Logout />}
            aria-label="Logout"
            onClick={() => setShowLogoutModal(true)}
          >
            Logout
          </Button>

        </div>
      ) : (
        <Button variant="icon" icon={<Icons.Login />} aria-label="Login" onClick={openLogin}>
          Login
        </Button>
      )}

      {/* Cart */}
     <NavButton 
  to="/cart" 
  icon={<Icons.Cart />} 
  label="Cart" 
  variant="cart" 
  badge={cartCount > 0 ? String(cartCount) : undefined} 
/>

      {/* Auth Dropdown */}
      <AuthDropdown />

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutModal(false)}
      />

    </div>
  );
};

// ============ المكون الرئيسي ============

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > NAVBAR_CONFIG.scrollThreshold);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClasses = `
    fixed top-0 left-0 right-0 z-[100]
    px-4 md:px-14 py-5
    flex items-center justify-between
    transition-all duration-300
    animate-[slideDown_0.7s_ease_both]
    ${scrolled
      ? 'bg-white/95 shadow-[0_4px_32px_rgba(236,72,153,0.08)] py-3 backdrop-blur-md'
      : 'bg-white/75 backdrop-blur-2xl border-b border-[rgba(236,72,153,0.08)]'
    }
  `;

  return (
    <header className={navbarClasses}>
      <Logo />
      <NavActions />
    </header>
  );
};

