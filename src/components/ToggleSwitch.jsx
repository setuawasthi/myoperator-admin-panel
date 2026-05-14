import React from 'react';

export default function ToggleSwitch({ checked, onChange, label, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-[18px] w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-brand)] focus-visible:ring-offset-2 ${
        checked
          ? 'bg-[var(--semantic-brand)]'
          : 'bg-[var(--semantic-bg-hover)]'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span
        className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-[14px]' : 'translate-x-0'
        }`}
      />
      {label && (
        <span className={`ml-3 text-sm font-medium ${checked ? 'text-[var(--semantic-brand)]' : 'text-[var(--semantic-text-muted)]'}`}>
          {label}
        </span>
      )}
    </button>
  );
}
