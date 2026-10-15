import React from 'react';

interface ToastProps {
  message: string | null;
  variant?: 'success' | 'error' | 'info';
  // 'top' sits under the navbar, so it does not cover the bottom toasts.
  position?: 'bottom' | 'top';
}

const variantStyles = {
  success: { box: 'border-rose-200 shadow-rose-100/50 text-gray-700', icon: '🌸' },
  error: { box: 'border-red-200 shadow-red-100/50 text-red-600', icon: '⚠️' },
  info: { box: 'border-gray-200 shadow-gray-100/50 text-gray-700', icon: '⏳' },
};

const Toast: React.FC<ToastProps> = ({ message, variant = 'success', position = 'bottom' }) => {
  if (!message) return null;

  const { box, icon } = variantStyles[variant];

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={`fixed ${position === 'top' ? 'top-24' : 'bottom-6'} left-1/2 -translate-x-1/2 z-[150] w-max max-w-[calc(100vw-2rem)]`}
    >
      {/* The animation moves the inner box; the outer one keeps the centring. */}
      <div
        className={`animate-slideUp bg-white border shadow-xl rounded-2xl px-5 py-3 flex items-center gap-2 text-sm font-medium ${box}`}
      >
        <span className="text-base">{icon}</span>
        {message}
      </div>
    </div>
  );
};

export default Toast;
