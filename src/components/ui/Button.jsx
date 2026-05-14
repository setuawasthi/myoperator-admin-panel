import React from 'react';

const variants = {
  primary: 'bg-[var(--semantic-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-primary-hover)] focus-visible:ring-[var(--semantic-primary)]',
  secondary: 'bg-[var(--semantic-bg-ui)] text-[var(--semantic-text-secondary)] hover:bg-[var(--semantic-bg-hover)] border border-[var(--semantic-border-layout)] focus-visible:ring-[var(--semantic-primary)]',
  success: 'bg-[var(--semantic-success-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-success-hover)] focus-visible:ring-[var(--semantic-success-primary)]',
  error: 'bg-[var(--semantic-error-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-error-hover)] focus-visible:ring-[var(--semantic-error-primary)]',
  outline: 'bg-transparent text-[var(--semantic-text-secondary)] hover:bg-[var(--semantic-bg-ui)] border border-[var(--semantic-border-layout)] focus-visible:ring-[var(--semantic-primary)]',
  ghost: 'bg-transparent text-[var(--semantic-text-secondary)] hover:bg-[var(--semantic-bg-ui)] focus-visible:ring-[var(--semantic-primary)]',
};

const sizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
  lg: 'h-10 px-6 text-sm',
};

/**
 * myOperator Design System Button
 *
 * @param {string} variant - 'primary' | 'secondary' | 'success' | 'error' | 'outline' | 'ghost'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} disabled
 * @param {boolean} loading
 * @param {React.ReactNode} children
 * @param {string} className - Additional classes
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  children,
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
}
