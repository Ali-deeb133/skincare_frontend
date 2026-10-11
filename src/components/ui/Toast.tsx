import React from 'react';

interface ToastProps {
  message: string | null;
  variant?: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, variant = 'success' }) => {
  if (!message) return null;

  const isError = variant === 'error';

  return (
    <div
      role={isError ? 'alert' : 'status'}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150]"
    >
      {/* The animation moves the inner box; the outer one keeps the centring. */}
      <div
        className={`animate-slideUp bg-white border shadow-xl rounded-2xl px-5 py-3 flex items-center gap-2 text-sm font-medium ${
          isError
            ? 'border-red-200 shadow-red-100/50 text-red-600'
            : 'border-rose-200 shadow-rose-100/50 text-gray-700'
        }`}
      >
        <span className="text-base">{isError ? '⚠️' : '🌸'}</span>
        {message}
      </div>
    </div>
  );
};

export default Toast;
