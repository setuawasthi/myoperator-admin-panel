import React, { useState, useEffect } from 'react';

export default function FilterBar({ filters, onFilterChange, onOpenModal, onClear }) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const activeCount = [localFilters.role, localFilters.department, localFilters.search].filter(Boolean).length;
  const hasActiveFilters = activeCount > 0;

  return (
    <div className="inline-flex items-center gap-2">
      {hasActiveFilters && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClear?.();
          }}
          className="text-sm font-medium text-[var(--semantic-text-link)] hover:text-[var(--semantic-primary)] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 rounded"
        >
          Clear all
        </button>
      )}
      <button
        onClick={onOpenModal}
        className={`inline-flex items-center gap-2 whitespace-nowrap h-10 px-4 rounded text-sm font-medium border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 bg-transparent ${
          hasActiveFilters
            ? 'border-[var(--semantic-primary)] text-[var(--semantic-primary)] hover:bg-[var(--semantic-primary-surface)]'
            : 'border-[var(--semantic-border-primary)] text-[var(--semantic-text-secondary)] hover:bg-[var(--semantic-bg-ui)]'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
        </svg>
        Filter
        {hasActiveFilters > 0 && (
          <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-[var(--semantic-primary)] text-[var(--semantic-text-inverted)]">
            {activeCount}
          </span>
        )}
      </button>
    </div>
  );
}
