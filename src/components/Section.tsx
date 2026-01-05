import { ReactNode } from 'react';

type SectionVariant = 'default' | 'hero' | 'form';

interface SectionProps {
  children: ReactNode;
  variant?: SectionVariant;
  className?: string;
}

const variantClasses: Record<SectionVariant, string> = {
  default: 'py-8 md:py-12',
  hero: 'pt-20 pb-12 md:pt-24 md:pb-16',
  form: 'py-6 md:py-12 md:pt-4'
};

export function Section({ children, variant = 'default', className = '' }: SectionProps) {
  return <section className={`${variantClasses[variant]} ${className}`}>{children}</section>;
}
