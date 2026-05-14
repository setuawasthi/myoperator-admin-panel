import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'User Profiles', path: '/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { label: 'Roles', path: '/roles', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { label: 'Departments', path: '/departments', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { label: 'Settings', path: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
];

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-[var(--semantic-bg-ui)]">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-16'} shrink-0 bg-[var(--semantic-primary)] flex flex-col transition-all duration-300`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[var(--semantic-brand)] flex items-center justify-center shrink-0">
            <span className="text-[var(--semantic-text-inverted)] font-bold text-sm">mo</span>
          </div>
          {sidebarOpen && (
            <span className="text-lg font-semibold text-[var(--semantic-text-inverted)] whitespace-nowrap">
              myOperator
            </span>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-white/10 text-[var(--semantic-text-inverted)]'
                  : 'text-white/70 hover:bg-white/10 hover:text-[var(--semantic-text-inverted)]'
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {sidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Collapse Toggle */}
        <div className="px-3 py-3 border-t border-white/10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded text-sm text-white/70 hover:bg-white/10 hover:text-[var(--semantic-text-inverted)] transition-all duration-200"
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${sidebarOpen ? '' : 'rotate-180'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-[var(--semantic-bg-primary)] border-b border-[var(--semantic-border-layout)] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-[var(--semantic-text-primary)]">
              Admin Panel
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-[var(--semantic-brand-surface)] text-[var(--semantic-brand)]">
              v2.0
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-[var(--semantic-text-muted)] hover:bg-[var(--semantic-bg-ui)] hover:text-[var(--semantic-text-secondary)] transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--semantic-error-primary)]"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-[var(--semantic-bg-ui)] transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--semantic-primary)] flex items-center justify-center">
                  <span className="text-xs font-semibold text-[var(--semantic-text-inverted)]">AS</span>
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium text-[var(--semantic-text-primary)]">Rohan Mehta</p>
                  <p className="text-xs text-[var(--semantic-text-muted)]">Super Admin</p>
                </div>
                <svg className={`w-4 h-4 text-[var(--semantic-text-muted)] transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-[9998]" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-lg z-[9999] animate-fade-in">
                    <div className="px-4 py-3 border-b border-[var(--semantic-border-layout)]">
                      <p className="text-sm font-medium text-[var(--semantic-text-primary)]">Rohan Mehta</p>
                      <p className="text-xs text-[var(--semantic-text-muted)]">rohan@myoperator.co</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => { setProfileOpen(false); navigate('/users/1'); }}
                        className="w-full text-left px-4 py-2 text-sm text-[var(--semantic-text-secondary)] hover:bg-[var(--semantic-bg-ui)] transition-colors"
                      >
                        My Profile
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-[var(--semantic-text-secondary)] hover:bg-[var(--semantic-bg-ui)] transition-colors">
                        Account Settings
                      </button>
                      <div className="border-t border-[var(--semantic-border-layout)] my-1" />
                      <button
                        onClick={() => navigate('/login')}
                        className="w-full text-left px-4 py-2 text-sm text-[var(--semantic-error-primary)] hover:bg-[var(--semantic-error-surface)] transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
