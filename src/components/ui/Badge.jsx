import React from 'react';

const variants = {
  default: 'bg-[var(--semantic-primary-surface)] text-[var(--semantic-text-secondary)]',
  success: 'bg-[var(--semantic-success-surface)] text-[var(--semantic-success-text)]',
  error: 'bg-[var(--semantic-error-surface)] text-[var(--semantic-error-text)]',
  warning: 'bg-[var(--semantic-warning-surface)] text-[var(--semantic-warning-primary)]',
  info: 'bg-[var(--semantic-info-surface)] text-[var(--semantic-info-primary)]',
  brand: 'bg-[var(--semantic-brand-surface)] text-[var(--semantic-brand-hover)]',
};

/**
 * myOperator Design System Badge
 *
 * @param {string} variant - 'default' | 'success' | 'error' | 'warning' | 'info' | 'brand'
 * @param {React.ReactNode} children
 */
export default function Badge({ variant = 'default', className = '', children, ...props }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
