import React from 'react';

export default function DeleteConfirmModal({ user, onConfirm, onCancel }) {
  if (!user) return null;

  const isBulk = Array.isArray(user);
  const name = isBulk ? `${user.length} users` : user.name;

  return (
    <>
      <div className="fixed inset-0 z-[9999] bg-black/50 animate-fade-in" onClick={onCancel} />
      <div className="fixed left-1/2 top-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2 w-full max-w-sm mx-4 animate-slide-in">
        <div className="relative rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-lg p-6">
          {/* Close button */}
          <button
            onClick={onCancel}
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 text-[var(--semantic-text-muted)] hover:text-[var(--semantic-text-primary)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--semantic-primary)] focus:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Title */}
          <h2 className="text-lg font-semibold text-[var(--semantic-text-primary)] text-center">
            Delete Profile
          </h2>

          {/* Description */}
          <p className="mt-3 text-sm text-[var(--semantic-text-secondary)] text-center leading-relaxed">
            Are you sure you want to delete {name}?
          </p>

          {/* Actions */}
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={onConfirm}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap min-w-[100px] h-10 px-5 rounded text-sm font-medium bg-[var(--semantic-error-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-error-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-error-primary)] focus-visible:ring-offset-2"
            >
              Yes
            </button>
            <button
              onClick={onCancel}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap min-w-[100px] h-10 px-5 rounded text-sm font-medium border border-[var(--semantic-border-primary)] bg-transparent text-[var(--semantic-text-secondary)] hover:bg-[var(--semantic-primary-surface)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
