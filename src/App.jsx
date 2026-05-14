import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import UserProfiles from './pages/UserProfiles';
import AddProfile from './pages/AddProfile';
import EditProfile from './pages/EditProfile';
import ViewProfile from './pages/ViewProfile';
import Login from './pages/Login';

function Dashboard() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--semantic-text-primary)]">Dashboard</h1>
        <p className="text-sm text-[var(--semantic-text-muted)] mt-1">Welcome to the admin panel</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'User Profiles', desc: 'Manage team members', count: '12 users', path: '/users', color: 'bg-[var(--semantic-primary)]' },
          { title: 'Roles', desc: 'Manage access roles', count: '4 roles', path: '/roles', color: 'bg-[var(--semantic-info-primary)]' },
          { title: 'Departments', desc: 'Organize by department', count: '7 departments', path: '/departments', color: 'bg-[var(--semantic-info-primary)]' },
        ].map((card) => (
          <button
            key={card.title}
            onClick={() => window.location.href = card.path}
            className="text-left rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] p-6 shadow-sm hover:shadow-md hover:border-[var(--semantic-border-accent)] transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2"
          >
            <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
              <svg className="w-5 h-5 text-[var(--semantic-text-inverted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--semantic-text-primary)] group-hover:text-[var(--semantic-brand)] transition-colors">{card.title}</h3>
            <p className="text-sm text-[var(--semantic-text-muted)] mt-1">{card.desc}</p>
            <p className="text-xs font-medium text-[var(--semantic-text-secondary)] mt-3">{card.count}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-[var(--semantic-bg-ui)] flex items-center justify-center mx-auto">
          <svg className="w-6 h-6 text-[var(--semantic-text-placeholder)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[var(--semantic-text-primary)]">{title}</h2>
          <p className="text-sm text-[var(--semantic-text-muted)]">This page is under development</p>
        </div>
      </div>
    </div>
  );
}

function EditRedirect() {
  const { id } = useParams();
  return <Navigate to={`/users/${id}`} replace />;
}

function AppRoutes() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserProfiles />} />
        <Route path="/users/add" element={<AddProfile />} />
        <Route path="/users/edit/:id" element={<EditProfile />} />
        <Route path="/users/:id" element={<ViewProfile />} />
        <Route path="/roles" element={<PlaceholderPage title="Roles" />} />
        <Route path="/departments" element={<PlaceholderPage title="Departments" />} />
        <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
