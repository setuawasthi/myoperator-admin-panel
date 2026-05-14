import React from 'react';

export default function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange, onItemsPerPageChange }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const btnBase = 'inline-flex items-center justify-center h-10 min-w-[40px] px-3 rounded text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2';
  const btnActive = 'bg-[var(--semantic-primary)] text-[var(--semantic-text-inverted)]';
  const btnInactive = 'bg-[var(--semantic-bg-primary)] text-[var(--semantic-text-secondary)] border border-[var(--semantic-border-layout)] hover:bg-[var(--semantic-bg-ui)]';
  const btnDisabled = 'opacity-40 cursor-not-allowed pointer-events-none';

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 border-t border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-ui)]">
      <div className="flex items-center gap-3">
        <p className="text-xs text-[var(--semantic-text-muted)]">
          Showing <span className="font-semibold text-[var(--semantic-text-secondary)]">{startItem}</span>–
          <span className="font-semibold text-[var(--semantic-text-secondary)]">{endItem}</span> of{' '}
          <span className="font-semibold text-[var(--semantic-text-secondary)]">{totalItems}</span>
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--semantic-text-muted)]">Rows:</span>
          <div className="relative">
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="h-9 pl-3 pr-7 rounded text-sm font-medium bg-[var(--semantic-bg-primary)] text-[var(--semantic-text-secondary)] border border-[var(--semantic-border-layout)] focus:border-[var(--semantic-border-input-focus)] cursor-pointer appearance-none transition-colors duration-200"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--semantic-text-muted)] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${btnBase} ${currentPage === 1 ? btnDisabled : btnInactive}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {getPageNumbers().map((page, idx) => (
          <React.Fragment key={idx}>
            {page === '...' ? (
              <span className="px-1 text-sm text-[var(--semantic-text-muted)]">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`${btnBase} ${currentPage === page ? btnActive : btnInactive}`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${btnBase} ${currentPage === totalPages ? btnDisabled : btnInactive}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
