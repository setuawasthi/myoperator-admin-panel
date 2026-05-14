import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

export default function SimpleSelect({ value, onChange, options = [], placeholder = 'Select...', disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const selectedOption = options.find((o) => o.value === value);

  useLayoutEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(e) {
      const clickedContainer = containerRef.current?.contains(e.target);
      const clickedDropdown = dropdownRef.current?.contains(e.target);
      if (!clickedContainer && !clickedDropdown) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  const dropdown = (
    <div
      ref={dropdownRef}
      className="fixed z-[9999] rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-lg py-1"
      style={{ top: coords?.top ?? 0, left: coords?.left ?? 0, width: coords?.width ?? 'auto', minWidth: 140 }}
    >
      {options.map((opt) => (
        <button
          key={String(opt.value)}
          type="button"
          onClick={() => handleSelect(opt.value)}
          className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${
            opt.value === value
              ? 'bg-[var(--semantic-primary-surface)] text-[var(--semantic-text-primary)] font-medium'
              : 'text-[var(--semantic-text-secondary)] hover:bg-[var(--semantic-bg-ui)]'
          }`}
        >
          {opt.icon && <span className="shrink-0">{opt.icon}</span>}
          <span className="flex-1">{opt.label}</span>
          {opt.value === value && (
            <svg className="w-4 h-4 text-[var(--semantic-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between w-full h-10 px-4 rounded text-sm bg-[var(--semantic-bg-primary)] text-[var(--semantic-text-primary)] border border-[var(--semantic-border-input)] transition-all duration-200 focus:outline-none focus:border-[var(--semantic-border-input-focus)] focus:shadow-[0_0_0_1px_rgba(43,188,202,0.15)] disabled:cursor-not-allowed disabled:bg-[var(--semantic-disabled-secondary)] disabled:text-[var(--semantic-disabled-text)] disabled:border-[var(--semantic-disabled-border)]"
      >
        <span className={selectedOption ? 'text-[var(--semantic-text-primary)]' : 'text-[var(--semantic-text-placeholder)]'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg className={`w-4 h-4 text-[var(--semantic-text-muted)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && coords && createPortal(dropdown, document.body)}
    </div>
  );
}
