import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
  className?: string;
}

const variants = {
  primary: 'bg-primary-100 text-primary-900',
  secondary: 'bg-secondary-100 text-secondary-900',
  accent: 'bg-accent-100 text-accent-900',
  success: 'bg-green-100 text-green-900',
  warning: 'bg-yellow-100 text-yellow-900',
};

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
