import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'glass';
  className?: string;
}

const variants = {
  primary: 'bg-primary-100 text-primary-900',
  secondary: 'bg-secondary-100 text-secondary-900',
  accent: 'bg-accent-100 text-accent-900',
  success: 'bg-green-500/10 text-green-700 border border-green-500/30 backdrop-blur-md',
  warning: 'bg-yellow-100 text-yellow-900',
  danger: 'bg-red-500/10 text-red-700 border border-red-500/30 backdrop-blur-md',
  glass: 'bg-white/60 text-secondary-700 border border-white/40 backdrop-blur-md',
};

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
