import React, { useState, useEffect } from 'react';
import SimpleSelect from './SimpleSelect';
import { ROLE_OPTIONS, GROUP_OPTIONS } from '../data/options';

export default function FilterModal({ isOpen, filters, onApply, onClear, onClose }) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
    }
  }, [isOpen, filters]);

  const handleChange = (field, value) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleClear = () => {
    const cleared = { search: '', role: '', department: '', status: '' };
    setLocalFilters(cleared);
    onClear();
  };

  const inputBase = "h-10 w-full rounded px-4 text-sm bg-[var(--semantic-bg-primary)] text-[var(--semantic-text-primary)] border border-[var(--semantic-border-input)] placeholder:text-[var(--semantic-text-placeholder)] focus:outline-none focus:border-[var(--semantic-border-input-focus)] focus:shadow-[0_0_0_1px_rgba(43,188,202,0.15)] transition-all";

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[9999] bg-black/50 animate-fade-in" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 animate-slide-in">
        <div className="relative w-full max-w-md rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-lg overflow-hidden">

          {/* Header */}
          <div className="flex items-start justify-between px-6 pt-6 pb-2">
            <div>
              <h2 className="text-lg font-semibold text-[var(--semantic-text-primary)]">Filter Users</h2>
              <p className="text-sm text-[var(--semantic-text-muted)] mt-0.5">Refine the user list by applying filters below.</p>
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
          <div className="px-6 py-5 space-y-5">
            {/* Search */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[var(--semantic-text-secondary)]">Search</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--semantic-text-placeholder)] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={localFilters.search}
                  onChange={(e) => handleChange('search', e.target.value)}
                  className={`${inputBase} pl-10`}
                />
                {localFilters.search && (
                  <button
                    onClick={() => handleChange('search', '')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-[var(--semantic-text-placeholder)] hover:text-[var(--semantic-text-muted)] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[var(--semantic-text-secondary)]">Role</label>
              <SimpleSelect
                value={localFilters.role}
                onChange={(val) => handleChange('role', val)}
                options={ROLE_OPTIONS}
                placeholder="All Roles"
              />
            </div>

            {/* Group */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[var(--semantic-text-secondary)]">Group</label>
              <SimpleSelect
                value={localFilters.department}
                onChange={(val) => handleChange('department', val)}
                options={GROUP_OPTIONS}
                placeholder="All Groups"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-[var(--semantic-border-layout)] flex justify-end gap-3">
            <button
              onClick={handleClear}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-10 px-5 rounded text-sm font-medium border border-[var(--semantic-border-primary)] bg-transparent text-[var(--semantic-text-secondary)] hover:bg-[var(--semantic-primary-surface)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2"
            >
              Clear Filters
            </button>
            <button
              onClick={handleApply}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-10 px-5 rounded text-sm font-medium bg-[var(--semantic-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-primary-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
