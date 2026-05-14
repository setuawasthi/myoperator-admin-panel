import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ActionsMenu({ items }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 4,
        right: window.innerWidth - rect.right - window.scrollX,
        minWidth: 176,
      });
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e) {
      const clickedContainer = containerRef.current?.contains(e.target);
      const clickedDropdown = dropdownRef.current?.contains(e.target);
      if (!clickedContainer && !clickedDropdown) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdown = (
    <div
      ref={dropdownRef}
      className="fixed z-[9999] w-44 rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-lg animate-fade-in py-1"
      style={{
        top: coords?.top ?? 0,
        right: coords?.right ?? 0,
        minWidth: coords?.minWidth ?? 176,
      }}
    >
      {items.map((item, idx) => (
          <button
          key={idx}
          onClick={() => { item.onClick(); setOpen(false); }}
          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
            item.danger
              ? 'text-[var(--semantic-error-primary)] hover:bg-[var(--semantic-error-surface)]'
              : 'text-[var(--semantic-text-secondary)] hover:bg-[var(--semantic-bg-ui)]'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center w-8 h-8 rounded text-[var(--semantic-text-muted)] hover:text-[var(--semantic-text-primary)] hover:bg-[var(--semantic-bg-ui)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2"
        title="Actions"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg>
      </button>

      {open && coords && createPortal(dropdown, document.body)}
    </div>
  );
}
