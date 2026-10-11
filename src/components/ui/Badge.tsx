import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

// Only the look of the pill; the parent decides where it sits.
export const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`inline-block bg-gradient-to-r from-primary to-primary-dark text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full shadow-[0_4px_14px_rgba(236,72,153,0.4)] ${className}`}
    >
      {children}
    </span>
  );
};
