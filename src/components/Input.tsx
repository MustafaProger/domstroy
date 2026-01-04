import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-secondary-900 mb-2">
          {label}
          {props.required && <span className="text-accent-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${error ? 'border-accent-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-accent-500 mt-1">{error}</p>}
      {helperText && !error && <p className="text-sm text-secondary-600 mt-1">{helperText}</p>}
    </div>
  );
}

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  rows?: number;
}

export function Textarea({ label, error, helperText, rows = 4, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-secondary-900 mb-2">
          {label}
          {props.required && <span className="text-accent-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none ${error ? 'border-accent-500' : ''} ${className}`}
        {...(props as any)}
      />
      {error && <p className="text-sm text-accent-500 mt-1">{error}</p>}
      {helperText && !error && <p className="text-sm text-secondary-600 mt-1">{helperText}</p>}
    </div>
  );
}
