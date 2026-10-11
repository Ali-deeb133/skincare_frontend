import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'icon' | 'cart';
  children: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string | number;
  // When set, the button is rendered as a link to this route.
  to?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  badge,
  to,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-bold cursor-pointer transition-all duration-300';

  const variants = {
    primary:
      'bg-gradient-to-r from-primary to-primary-dark text-white rounded-full px-9 py-4 text-sm shadow-[0_10px_32px_rgba(236,72,153,0.4)] hover:translate-y-[-3px] hover:shadow-[0_16px_44px_rgba(236,72,153,0.5)] flex items-center gap-2.5',
    ghost:
      'bg-white/80 text-primary rounded-full px-9 py-4 text-sm border border-[rgba(236,72,153,0.25)] backdrop-blur hover:bg-[rgba(236,72,153,0.07)] hover:translate-y-[-3px] flex items-center gap-2.5',
    icon: 'flex flex-col items-center gap-1 bg-transparent border-none text-secondary text-[10px] font-semibold tracking-wider px-3 py-2 rounded-xl hover:bg-[rgba(236,72,153,0.06)] hover:text-primary',
    cart: 'bg-gradient-to-r from-primary to-primary-dark text-white border-none rounded-full px-5.5 py-2.75 font-bold text-sm shadow-[0_6px_20px_rgba(236,72,153,0.35)] hover:translate-y-[-2px] hover:shadow-[0_10px_30px_rgba(236,72,153,0.45)] flex items-center gap-2',
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  const content = (
    <>
      {icon && <span>{icon}</span>}
      {children}
      {badge && (
        <span className="bg-white/25 rounded-full px-1.5 py-0.5 text-[11px] font-bold">
          {badge}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={props['aria-label']}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
};
