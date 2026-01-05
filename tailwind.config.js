/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef9f0',
          100: '#fef3e0',
          200: '#fce7c2',
          300: '#fada9c',
          400: '#f7c855',
          500: '#f4b800',
          600: '#d89c00',
          700: '#b87f00',
          800: '#8e6200',
          900: '#6b4700',
        },
        secondary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#2d3748',
          800: '#1a202c',
          900: '#0f0f0f',
        },
        accent: {
          50: '#fffbf0',
          100: '#fff8e6',
          200: '#ffe6cc',
          300: '#ffd9b3',
          400: '#ffb380',
          500: '#ff9640',
          600: '#e67e2f',
          700: '#cc661f',
          800: '#9d4d17',
          900: '#6b340d',
        },
      },
      fontFamily: {
        sans: ['var(--font-main)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['3.25rem', { lineHeight: '1.08' }],
        h1: ['2.375rem', { lineHeight: '1.2' }],
        h2: ['1.875rem', { lineHeight: '1.25' }],
        h3: ['1.5rem', { lineHeight: '1.3' }],
        body: ['1rem', { lineHeight: '1.65' }],
        bodySm: ['0.9375rem', { lineHeight: '1.6' }],
        caption: ['0.8125rem', { lineHeight: '1.5' }],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      spacing: {
        'container': '1200px',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
};
