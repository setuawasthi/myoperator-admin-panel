import React from 'react';

/**
 * myOperator Design System Table
 *
 * A reusable table component with myOperator design tokens.
 *
 * @param {Array} columns - Array of { key, label, sortable, width, render }
 * @param {Array} data - Array of row data objects
 * @param {string} keyExtractor - Function to extract unique key from row
 * @param {string} emptyText - Text shown when no data
 * @param {string} emptySubtext - Subtext shown when no data
 * @param {boolean} hoverable - Enable row hover effect
 * @param {boolean} striped - Enable striped rows
 * @param {function} onRowClick - Callback when row is clicked
 * @param {string} className - Additional classes
 */
export default function Table({
  columns = [],
  data = [],
  keyExtractor = (row, i) => i,
  emptyText = 'No data found',
  emptySubtext = 'Try adjusting your filters',
  hoverable = true,
  striped = false,
  onRowClick,
  className = '',
}) {
  return (
    <div className={`rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-sm overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[var(--semantic-bg-ui)]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left font-semibold text-[var(--semantic-text-secondary)] whitespace-nowrap ${col.width || ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--semantic-bg-ui)] flex items-center justify-center">
                      <svg className="w-6 h-6 text-[var(--semantic-text-placeholder)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--semantic-text-secondary)]">{emptyText}</p>
                      <p className="text-xs text-[var(--semantic-text-muted)] mt-0.5">{emptySubtext}</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={keyExtractor(row, index)}
                  onClick={() => onRowClick?.(row)}
                  className={`border-t border-[var(--semantic-border-layout)] transition-colors ${
                    hoverable ? 'hover:bg-[var(--semantic-bg-ui)]' : ''
                  } ${striped && index % 2 === 1 ? 'bg-[var(--semantic-bg-ui)]/50' : ''} ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 align-middle">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
