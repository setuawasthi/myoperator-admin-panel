import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function RowContextMenu({ children, items }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const rowRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', () => setOpen(false), true);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', () => setOpen(false), true);
    };
  }, [open]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setCoords({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };

  const menu = (
    <div
      ref={menuRef}
      className="fixed z-[9999] w-44 rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-md animate-fade-in py-1"
      style={{ top: coords.y, left: coords.x }}
    >
      {items.map((item, idx) => (
        <button
          key={idx}
          onClick={() => { item.onClick(); setOpen(false); }}
          className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
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
    <>
      <tr
        ref={rowRef}
        onContextMenu={handleContextMenu}
        className="border-t border-[var(--semantic-border-layout)] hover:bg-[var(--semantic-bg-ui)] transition-colors duration-200"
      >
        {children}
      </tr>
      {open && createPortal(menu, document.body)}
    </>
  );
}
