import React from 'react';
type BadgeVariant = 'pink' | 'green' | 'red' | 'blue' | 'purple';

interface BadgeProps {
  children: React.ReactNode;
  variant: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
  return (
    <span className={`absolute top-4 right-4 bg-gradient-to-r from-[#ec4899] to-[#db2777] text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full shadow-[0_4px_14px_rgba(236,72,153,0.4)] ${className}`}>
      {children}
    </span>
  );
};