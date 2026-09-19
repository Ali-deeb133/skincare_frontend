
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: 'right' | 'left';
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon,
  iconPosition = 'right',
  error,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className="w-full">

      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-[#9e6e8a] mb-1.5 tracking-wide"
        >
          {label}
        </label>
      )}

      <div className="relative">

        {icon && (
          <span
            className={`absolute top-1/2 -translate-y-1/2 text-[#e07aab] pointer-events-none ${
              iconPosition === 'right' ? 'right-3.5' : 'left-3.5'
            }`}
          >
            {icon}
          </span>
        )}

        <input
          dir="rtl"
          id={id}
          className={`
            w-full bg-white border rounded-xl py-2.5 text-sm text-[#2d1a28]
            placeholder:text-[#9e6e8a] outline-none transition-all duration-200
            border-[rgba(240,174,207,0.45)]
            focus:border-[#e07aab] focus:ring-2 focus:ring-[rgba(224,122,171,0.12)]
            ${icon && iconPosition === 'right' ? 'pr-10 pl-4' : ''}
            ${icon && iconPosition === 'left' ? 'pl-10 pr-4' : ''}
            ${!icon ? 'px-4' : ''}
            ${error ? 'border-red-400 focus:ring-red-100' : ''}
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  );
};
