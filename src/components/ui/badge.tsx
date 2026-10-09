import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'neutral' | 'tactile' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-primary-fixed text-on-primary-fixed',
    secondary: 'bg-secondary-container text-on-secondary-container',
    neutral: 'bg-surface-container text-on-surface',
    tactile: 'bg-secondary-container text-on-secondary-container shadow-[2px_2px_0px_#1a1c1a] border border-[#1a1c1a]',
    outline: 'border border-outline-variant text-on-surface-variant',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-display font-semibold tracking-wide ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
