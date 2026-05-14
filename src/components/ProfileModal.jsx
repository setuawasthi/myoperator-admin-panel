import React from 'react';

export default function ProfileModal({ user, onClose, onEdit, onDelete }) {
  if (!user) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9999] bg-black/30 animate-fade-in" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4 animate-slide-in">
        <div className="relative rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-lg overflow-hidden">

          {/* Header */}
          <div className="flex items-start justify-between px-6 pt-6 pb-2">
            <div>
              <h2 className="text-lg font-semibold text-[var(--semantic-text-primary)]">User Profile</h2>
              <p className="text-sm text-[var(--semantic-text-muted)] mt-0.5">View and manage user details.</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-sm opacity-70 hover:opacity-100 text-[var(--semantic-text-muted)] hover:text-[var(--semantic-text-primary)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--semantic-primary)] focus:ring-offset-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            {/* Profile Hero */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-[var(--semantic-primary)] flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-[var(--semantic-text-inverted)]">{user.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-[var(--semantic-text-primary)]">{user.name}</h3>
                <p className="text-sm text-[var(--semantic-text-muted)]">{user.email}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${user.status === 'Active' ? 'bg-[var(--semantic-success-surface)] text-[var(--semantic-success-primary)]' : 'bg-[var(--semantic-error-surface)] text-[var(--semantic-error-primary)]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-[var(--semantic-success-primary)]' : 'bg-[var(--semantic-error-primary)]'}`} />
                    {user.status}
                  </span>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[var(--semantic-primary-surface)] text-[var(--semantic-primary)]">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-xs font-semibold text-[var(--semantic-text-muted)] uppercase tracking-wide">Group</p>
                <p className="text-sm text-[var(--semantic-text-primary)] mt-1">{user.department}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--semantic-text-muted)] uppercase tracking-wide">Phone</p>
                <p className="text-sm text-[var(--semantic-text-primary)] mt-1">{user.phone}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--semantic-text-muted)] uppercase tracking-wide">Admin</p>
                <p className={`text-sm font-medium mt-1 ${user.isAdmin === 'Group Admin' ? 'text-[var(--semantic-success-primary)]' : 'text-[var(--semantic-text-muted)]'}`}>
                  {user.isAdmin === 'Group Admin' ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--semantic-text-muted)] uppercase tracking-wide">Login</p>
                <p className={`text-sm font-medium mt-1 ${user.loginEnabled ? 'text-[var(--semantic-success-primary)]' : 'text-[var(--semantic-error-primary)]'}`}>
                  {user.loginEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--semantic-text-muted)] uppercase tracking-wide">Timezone</p>
                <p className="text-sm text-[var(--semantic-text-primary)] mt-1">{user.timezone.split(' ')[0]}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--semantic-text-muted)] uppercase tracking-wide">ID</p>
                <p className="text-sm text-[var(--semantic-text-primary)] mt-1">#{user.id}</p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-[var(--semantic-border-layout)] flex justify-end gap-3">
            <button
              onClick={() => { onClose(); onDelete(); }}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-10 px-5 rounded text-sm font-medium bg-[var(--semantic-error-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-error-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-error-primary)] focus-visible:ring-offset-2"
            >
              Delete
            </button>
            <button
              onClick={() => { onClose(); onEdit(); }}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-10 px-5 rounded text-sm font-medium bg-[var(--semantic-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-primary-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
