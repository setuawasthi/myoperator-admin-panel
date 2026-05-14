import React, { useEffect } from 'react';

export default function Toast({ type, message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: {
      bg: 'bg-[var(--semantic-success-surface)]',
      border: 'border-[var(--semantic-success-border)]',
      text: 'text-[var(--semantic-success-text)]',
      icon: (
        <svg className="w-5 h-5 text-[var(--semantic-success-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    error: {
      bg: 'bg-[var(--semantic-error-surface)]',
      border: 'border-[var(--semantic-error-border)]',
      text: 'text-[var(--semantic-error-text)]',
      icon: (
        <svg className="w-5 h-5 text-[var(--semantic-error-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    warning: {
      bg: 'bg-[var(--semantic-warning-surface)]',
      border: 'border-[var(--semantic-warning-border)]',
      text: 'text-[var(--semantic-warning-text)]',
      icon: (
        <svg className="w-5 h-5 text-[var(--semantic-warning-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
    },
  };

  const style = styles[type] || styles.success;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] animate-slide-in">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-lg border ${style.bg} ${style.border} shadow-lg min-w-[320px]`}>
        {style.icon}
        <p className={`text-sm font-medium ${style.text}`}>{message}</p>
        <button
          onClick={onClose}
          className={`ml-auto p-1 rounded hover:bg-black/5 transition-colors ${style.text}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
