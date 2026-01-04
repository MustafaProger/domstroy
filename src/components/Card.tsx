import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg border border-secondary-200 ${hover ? 'hover:shadow-lg hover:border-secondary-300 transition-all duration-300' : 'shadow-sm'} ${className}`}
    >
      {children}
    </div>
  );
}
