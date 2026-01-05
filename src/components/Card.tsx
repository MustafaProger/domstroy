import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-secondary-100 ${hover ? 'hover:shadow-xl hover:border-secondary-200 transition-all duration-300' : 'shadow-sm'} ${className}`}
    >
      {children}
    </div>
  );
}
