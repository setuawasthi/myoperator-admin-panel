import React from 'react';

export default function LoginStatusBadge({ enabled, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full text-xs font-semibold border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 ${
        enabled
          ? 'bg-[var(--semantic-success-surface)] text-[var(--semantic-success-primary)] border-[var(--semantic-success-border)] hover:bg-[var(--semantic-success-border)]'
          : 'bg-[var(--semantic-bg-ui)] text-[var(--semantic-text-muted)] border-[var(--semantic-border-layout)] hover:bg-[var(--semantic-bg-hover)]'
      }`}
      title={enabled ? 'Click to disable login' : 'Click to enable login'}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${enabled ? 'bg-[var(--semantic-success-primary)]' : 'bg-[var(--semantic-text-placeholder)]'}`} />
      {enabled ? 'Enabled' : 'Disabled'}
    </button>
  );
}
