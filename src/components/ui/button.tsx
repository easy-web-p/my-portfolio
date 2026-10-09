import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tactile' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-9 px-4 text-xs font-semibold',
    md: 'h-11 px-5 text-sm font-semibold',
    lg: 'h-13 px-7 text-base font-bold',
  }[size];

  const variantClasses = {
    primary:
      'bg-primary text-on-primary hover:bg-primary-container shadow-sm active:scale-95 transition-all',
    secondary:
      'bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed shadow-sm active:scale-95 transition-all',
    tactile:
      'bg-secondary-container text-on-secondary-container shadow-[3px_3px_0px_#1a1c1a] border border-[#1a1c1a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a1c1a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1a1c1a] transition-all',
    outline:
      'border-2 border-outline-variant text-on-surface hover:border-primary hover:text-primary bg-transparent transition-all',
    ghost:
      'text-on-surface hover:bg-surface-container-high transition-colors',
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full cursor-pointer select-none font-display tracking-wide ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
