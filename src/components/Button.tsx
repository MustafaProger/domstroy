import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  glass: 'btn-glass',
};

const sizes = {
  sm: 'px-4 py-2 text-bodySm',
  md: 'px-6 py-3 text-bodySm md:text-body',
  lg: 'px-8 py-4 text-body md:text-h3',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  as = 'button',
  href,
  target,
  rel,
}: ButtonProps) {
  const baseClasses = `font-semibold rounded-xl transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (as === 'a' && href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`inline-block ${baseClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}
