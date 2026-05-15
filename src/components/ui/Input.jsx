import React from 'react';

/**
 * myOperator Design System Input
 *
 * @param {string} label - Input label text
 * @param {string} error - Error message
 * @param {string} hint - Helper text below input
 * @param {boolean} required - Shows red asterisk
 * @param {React.ReactNode} icon - Right-side icon element
 * @param {string} size - 'sm' | 'md' | 'lg'
 */
export default function Input({
  label,
  error,
  hint,
  required = false,
  icon,
  size = 'md',
  className = '',
  id,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const sizes = {
    sm: 'h-9 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-4 text-base',
  };

  const base = 'w-full rounded border border-[var(--semantic-border-input)] bg-[var(--semantic-bg-primary)] text-[var(--semantic-text-primary)] placeholder:text-[var(--semantic-text-placeholder)] transition-colors duration-200 focus:border-[var(--semantic-border-input-focus)]';

  const stateClasses = error
    ? 'border-[var(--semantic-error-border)] focus:border-[var(--semantic-error-primary)] focus:shadow-[0_0_0_1px_rgba(240,68,56,0.15)]'
    : 'border-[var(--semantic-border-input)] focus:border-[var(--semantic-border-input-focus)] focus:shadow-[0_0_0_1px_rgba(43,188,202,0.15)]';

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-[var(--semantic-text-secondary)]">
          {label}
          {required && <span className="text-[var(--semantic-error-primary)] ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          className={`${base} ${sizes[size]} ${stateClasses} ${icon ? 'pr-10' : ''}`}
          {...props}
        />
        {icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--semantic-text-muted)]">
            {icon}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-[var(--semantic-error-primary)]">{error}</p>}
      {hint && !error && <p className="text-xs text-[var(--semantic-text-muted)]">{hint}</p>}
    </div>
  );
}
