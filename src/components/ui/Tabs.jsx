import React from 'react';

/**
 * myOperator Design System Tabs
 *
 * Tabs component with myOperator design tokens.
 * Active tab uses turquoise underline (semantic-brand) per design system
 * rules for active/selected states. Tab text is NEVER turquoise.
 *
 * @param {string} value - Currently active tab key
 * @param {function} onChange - Callback when tab changes
 * @param {Array<{key: string, label: string}>} items - Tab items
 * @param {string} className - Additional classes for the container
 */
export default function Tabs({ value, onChange, items, className = '' }) {
  return (
    <div className={`flex border-b border-[var(--semantic-border-layout)] ${className}`}>
      {items.map((item) => {
        const isActive = value === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={`px-5 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-brand)] focus-visible:ring-offset-2 ${
              isActive
                ? 'border-[var(--semantic-brand)] text-[var(--semantic-text-primary)]'
                : 'border-transparent text-[var(--semantic-text-muted)] hover:text-[var(--semantic-text-secondary)]'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
