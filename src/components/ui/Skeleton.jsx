import React from 'react';

export function SkeletonLine({ className = '' }) {
  return (
    <div className={`animate-pulse rounded bg-[var(--semantic-bg-hover)] ${className}`} />
  );
}

export function SkeletonAvatar({ size = 'md' }) {
  const sizes = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14', xl: 'w-24 h-24' };
  return (
    <div className={`${sizes[size]} rounded-full animate-pulse bg-[var(--semantic-bg-hover)]`} />
  );
}

export function SkeletonCard({ lines = 3, avatar = false }) {
  return (
    <div className="rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-sm p-5 space-y-4">
      {avatar && <div className="flex justify-center"><SkeletonAvatar size="xl" /></div>}
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="space-y-2">
          <SkeletonLine className="h-4 w-1/3" />
          <SkeletonLine className="h-3 w-3/4" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 6 }) {
  return (
    <div className="rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[var(--semantic-bg-ui)]">
            <tr>
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i} className="px-4 py-3">
                  <SkeletonLine className="h-4 w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx} className="border-t border-[var(--semantic-border-layout)]">
                {Array.from({ length: cols }).map((_, colIdx) => (
                  <td key={colIdx} className="px-4 py-3">
                    <SkeletonLine className={`h-4 ${colIdx === 0 ? 'w-8' : colIdx === 1 ? 'w-32' : 'w-20'}`} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SkeletonInput() {
  return (
    <div className="space-y-1.5">
      <SkeletonLine className="h-4 w-20" />
      <SkeletonLine className="h-10 w-full" />
    </div>
  );
}
