import React, { useState, useRef, useEffect, useMemo, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ComboboxSelect({
  label,
  required,
  error,
  value,
  onChange,
  options = [],
  placeholder = 'Select...',
  creatable = false,
  helperText,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [coords, setCoords] = useState(null);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const selectedOption = options.find((o) => o.value === value);
  const displayValue = selectedOption ? selectedOption.label : value || '';

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    const term = search.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(term));
  }, [options, search]);

  const canCreate = creatable && search.trim() && !filteredOptions.some((o) => o.label.toLowerCase() === search.toLowerCase());
  const totalItems = filteredOptions.length + (canCreate ? 1 : 0);

  useLayoutEffect(() => {
    if (isOpen && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen, search]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [search, isOpen]);

  useEffect(() => {
    function handleClickOutside(e) {
      const clickedContainer = containerRef.current?.contains(e.target);
      const clickedDropdown = dropdownRef.current?.contains(e.target);
      if (!clickedContainer && !clickedDropdown) {
        setIsOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) setSearch('');
  }, [isOpen]);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
    setSearch('');
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => Math.min(prev + 1, totalItems - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (canCreate && highlightedIndex === filteredOptions.length) {
          handleSelect(search.trim());
        } else if (filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex].value);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearch('');
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  const inputBase = 'h-10 w-full rounded px-4 pr-10 text-sm bg-[var(--semantic-bg-primary)] text-[var(--semantic-text-primary)] border border-[var(--semantic-border-input)] transition-colors duration-200 focus:border-[var(--semantic-border-input-focus)]';
  const inputNormal = `${inputBase} placeholder:text-[var(--semantic-text-placeholder)] focus:border-[var(--semantic-border-input-focus)] focus:shadow-[0_0_0_1px_rgba(43,188,202,0.15)]`;
  const inputError = `${inputBase} border-[var(--semantic-error-border)] focus:border-[var(--semantic-error-primary)] focus:shadow-[0_0_0_1px_rgba(240,68,56,0.1)]`;
  const inputDisabled = 'disabled:cursor-not-allowed disabled:bg-[var(--semantic-disabled-secondary)] disabled:text-[var(--semantic-disabled-text)] disabled:border-[var(--semantic-disabled-border)]';

  const dropdown = (
    <div
      ref={dropdownRef}
      className="fixed z-[9999] rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-lg max-h-64 overflow-auto py-1"
      style={{ top: coords?.top ?? 0, left: coords?.left ?? 0, width: coords?.width ?? 'auto', minWidth: 180 }}
    >
      {filteredOptions.length === 0 && !canCreate && (
        <div className="px-4 py-3 text-sm text-[var(--semantic-text-muted)]">No options found</div>
      )}
      {filteredOptions.map((opt, idx) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => handleSelect(opt.value)}
          onMouseEnter={() => setHighlightedIndex(idx)}
          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
            idx === highlightedIndex
              ? 'bg-[var(--semantic-primary-surface)] text-[var(--semantic-text-primary)]'
              : 'text-[var(--semantic-text-secondary)] hover:bg-[var(--semantic-bg-ui)]'
          }`}
        >
          {opt.label}
        </button>
      ))}
      {canCreate && (
        <button
          type="button"
          onClick={() => handleSelect(search.trim())}
          onMouseEnter={() => setHighlightedIndex(filteredOptions.length)}
          className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-t border-[var(--semantic-border-layout)] ${
            highlightedIndex === filteredOptions.length
              ? 'bg-[var(--semantic-primary-surface)] text-[var(--semantic-text-primary)]'
              : 'text-[var(--semantic-brand)] hover:bg-[var(--semantic-brand-surface)]'
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Press Enter to add "{search.trim()}"
          </span>
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-1.5" ref={containerRef}>
      {label && (
        <label className="text-sm font-semibold leading-5 text-[var(--semantic-text-secondary)] flex items-center gap-1">
          {label}
          {required && <span className="text-[var(--semantic-error-primary)]">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          disabled={disabled}
          value={isOpen ? search : displayValue}
          placeholder={!value ? placeholder : ''}
          onChange={(e) => { setSearch(e.target.value); if (!isOpen) setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className={`${error ? inputError : inputNormal} ${inputDisabled}`}
          autoComplete="off"
        />
        {value && !isOpen && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onChange(''); inputRef.current?.focus(); }}
            className="absolute right-8 top-1/2 -translate-y-1/2 p-0.5 rounded text-[var(--semantic-text-placeholder)] hover:text-[var(--semantic-text-muted)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <button
          type="button"
          onClick={() => { if (!disabled) setIsOpen((v) => !v); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--semantic-text-muted)] pointer-events-none"
        >
          <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>

      {helperText && !error && (
        <p className="text-xs text-[var(--semantic-text-muted)]">{helperText}</p>
      )}
      {error && (
        <p className="text-xs text-[var(--semantic-error-primary)] flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
          </svg>
          {error}
        </p>
      )}

      {isOpen && coords && createPortal(dropdown, document.body)}
    </div>
  );
}
