import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'surface';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'surface',
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-primary-fixed text-on-primary-fixed',
    secondary: 'bg-secondary-container text-on-secondary-container',
    outline: 'border border-outline-variant text-on-surface-variant',
    surface: 'bg-surface-container text-on-surface',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-badge text-label-badge ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
