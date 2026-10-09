import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'flat' | 'tactile' | 'bento' | 'ambient';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'flat',
  className = '',
  ...props
}) => {
  const variantStyles = {
    flat: 'bg-surface-container-lowest border border-outline-variant/40 rounded-2xl shadow-sm',
    tactile:
      'bg-surface-container-lowest border-2 border-[#1a1c1a] rounded-2xl shadow-[4px_4px_0px_#1a1c1a]',
    bento:
      'bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-[0_16px_36px_-12px_rgba(107,56,212,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(107,56,212,0.15)] transition-shadow',
    ambient:
      'bg-surface-container-lowest rounded-3xl p-6 shadow-ambient border border-primary-fixed/30',
  }[variant];

  return (
    <div className={`${variantStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
