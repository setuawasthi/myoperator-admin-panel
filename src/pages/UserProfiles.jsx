import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { users, deleteUser } from '../data/users';
import FilterBar from '../components/FilterBar';
import FilterModal from '../components/FilterModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import LoginToggleModal from '../components/LoginToggleModal';
import LoginStatusBadge from '../components/LoginStatusBadge';
import Toast from '../components/Toast';
import Pagination from '../components/Pagination';
import ActionsMenu from '../components/ActionsMenu';
import RowContextMenu from '../components/RowContextMenu';
import { SkeletonTable, SkeletonLine, SkeletonAvatar } from '../components/ui/Skeleton';

export default function UserProfiles() {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters, setFilters] = useState({ search: '', role: '', department: '', status: '' });
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToToggleLogin, setUserToToggleLogin] = useState(null);
  const [toast, setToast] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const forceRefresh = () => setRefreshKey((k) => k + 1);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ search: '', role: '', department: '', status: '' });
    setCurrentPage(1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    if (tab === 'all') {
      setFilters((prev) => ({ ...prev, status: '' }));
    } else {
      setFilters((prev) => ({ ...prev, status: tab === 'active' ? 'Active' : 'Inactive' }));
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        !filters.search ||
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.phone.includes(filters.search);
      const matchesRole = !filters.role || user.role === filters.role;
      const matchesDepartment = !filters.department || user.department === filters.department;
      const matchesStatus = !filters.status || user.status === filters.status;
      return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
    });
  }, [users, filters, refreshKey]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return sortConfig.direction === 'asc' ? 1 : -1;
      if (bVal == null) return sortConfig.direction === 'asc' ? -1 : 1;

      if (sortConfig.key === 'id') {
        const aNum = Number(aVal);
        const bNum = Number(bVal);
        if (aNum < bNum) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aNum > bNum) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      }

      const comparison = String(aVal).localeCompare(String(bVal), undefined, { sensitivity: 'base', numeric: true });
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [filteredUsers, sortConfig, refreshKey]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedUsers.slice(start, start + itemsPerPage);
  }, [sortedUsers, currentPage, itemsPerPage]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleDelete = () => {
    deleteUser(userToDelete.id);
    setToast({ type: 'success', message: 'Profile deleted successfully' });
    setUserToDelete(null);
    forceRefresh();
  };

  const handleToggleLogin = () => {
    const user = users.find((u) => u.id === userToToggleLogin.id);
    if (user) {
      user.loginEnabled = !user.loginEnabled;
    }
    const wasEnabled = userToToggleLogin.loginEnabled;
    setToast({
      type: wasEnabled ? 'warning' : 'success',
      message: wasEnabled
        ? `Login access disabled for ${userToToggleLogin.name}`
        : `Login access enabled for ${userToToggleLogin.name}`,
    });
    setUserToToggleLogin(null);
    forceRefresh();
  };

  const handleExportCSV = () => {
    const headers = ['Id', 'Name', 'Email', 'Phone', 'Group', 'Role', 'Is Admin', 'Status', 'Login Enabled', 'Timezone'];
    const rows = sortedUsers.map((u) => [
      u.id, u.name, u.email, u.phone, u.department, u.role, u.isAdmin, u.status,
      u.loginEnabled ? 'Yes' : 'No', u.timezone,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', `users_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setToast({ type: 'success', message: 'CSV exported successfully' });
  };

  const SortIcon = ({ column }) => {
    const isActive = sortConfig.key === column;
    return (
      <span className={`inline-block transition-all duration-200 ${isActive ? 'text-[var(--semantic-brand)]' : 'text-[var(--semantic-text-placeholder)]'}`}>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isActive && sortConfig.direction === 'desc' ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </span>
    );
  };

  const tabs = [
    { key: 'all', label: 'All Users', count: users.length },
    { key: 'active', label: 'Active', count: users.filter((u) => u.status === 'Active').length },
    { key: 'inactive', label: 'Inactive', count: users.filter((u) => u.status === 'Inactive').length },
  ];

  const tableColumns = [
    { key: 'id', label: 'Id', sortable: true, width: 'w-[56px]' },
    { key: 'name', label: 'Name', sortable: true, width: 'w-[200px]' },
    { key: 'email', label: 'Email', sortable: true, width: 'w-[240px]' },
    { key: 'phone', label: 'Phone', sortable: true, width: 'w-[160px]' },
    { key: 'department', label: 'Group', sortable: true, width: 'w-[140px]' },
    { key: 'role', label: 'Role', sortable: true, width: 'w-[120px]' },
    { key: 'isAdmin', label: 'Admin', sortable: false, width: 'w-[64px]' },
    { key: 'loginEnabled', label: 'Login', sortable: false, width: 'w-[112px]' },
    { key: 'actions', label: '', sortable: false, width: 'w-[56px]' },
  ];

  const activeCount = [filters.role, filters.department, filters.search].filter(Boolean).length;

  return (
    <div className="p-6 space-y-5">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-xl font-semibold text-[var(--semantic-text-primary)]">User Profiles</h1>
          <p className="text-xs text-[var(--semantic-text-muted)] mt-0.5">Manage team members and their access permissions</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-10 px-4 rounded text-sm font-medium border border-[var(--semantic-border-primary)] bg-transparent text-[var(--semantic-text-secondary)] hover:bg-[var(--semantic-primary-surface)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Export
          </button>
          <button
            onClick={() => navigate('/users/add')}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-10 px-4 rounded text-sm font-medium bg-[var(--semantic-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-primary-hover)] transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-in stagger-1">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] px-3 py-2.5 shadow-sm">
              <div className="flex items-center gap-2.5">
                <SkeletonAvatar size="sm" />
                <div className="space-y-1.5">
                  <SkeletonLine className="h-3 w-16" />
                  <SkeletonLine className="h-4 w-8" />
                </div>
              </div>
            </div>
          ))
        ) : (
          [
            { label: 'Total Users', value: users.length, icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z', color: 'bg-[var(--semantic-primary-surface)] text-[var(--semantic-primary)]' },
            { label: 'Active', value: users.filter((u) => u.status === 'Active').length, icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-[var(--semantic-success-surface)] text-[var(--semantic-success-primary)]' },
            { label: 'Inactive', value: users.filter((u) => u.status === 'Inactive').length, icon: 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z', color: 'bg-[var(--semantic-error-surface)] text-[var(--semantic-error-primary)]' },
            { label: 'Admins', value: users.filter((u) => u.isAdmin === 'Group Admin').length, icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z', color: 'bg-[var(--semantic-info-surface)] text-[var(--semantic-info-primary)]' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] px-3 py-2.5 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-md ${stat.color} flex items-center justify-center`}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-[var(--semantic-text-muted)] leading-tight">{stat.label}</p>
                  <p className="text-sm font-semibold text-[var(--semantic-text-primary)] leading-tight">{stat.value}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tabs + Filters Row */}
      <div className="animate-fade-in stagger-2">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="inline-flex items-center p-1 rounded-lg bg-[var(--semantic-bg-grey)]">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 ${
                  activeTab === tab.key
                    ? 'bg-[var(--semantic-bg-primary)] text-[var(--semantic-text-primary)] shadow-sm'
                    : 'text-[var(--semantic-text-muted)] hover:text-[var(--semantic-text-secondary)]'
                }`}
              >
                {tab.label}
                <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full text-xs font-semibold transition-colors duration-200 ${activeTab === tab.key ? 'bg-[var(--semantic-primary-surface)] text-[var(--semantic-primary)]' : 'bg-[var(--semantic-bg-hover)] text-[var(--semantic-text-muted)]'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onOpenModal={() => setShowFilterModal(true)}
              onClear={handleClearFilters}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-sm overflow-hidden">
        {loading ? (
          <SkeletonTable rows={itemsPerPage} cols={tableColumns.length} />
        ) : (
          <div className="overflow-x-auto min-h-[520px]">
            <table className="w-full text-sm table-fixed">
              <thead className="bg-[var(--semantic-bg-ui)]">
                <tr>
                  {tableColumns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => col.sortable && handleSort(col.key)}
                      className={`px-4 py-3 text-left font-semibold text-[var(--semantic-text-secondary)] whitespace-nowrap ${col.width || ''} ${
                        col.sortable ? 'cursor-pointer hover:bg-[var(--semantic-bg-hover)] transition-colors duration-150' : ''
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {col.label}
                        {col.sortable && <SortIcon column={col.key} />}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[var(--semantic-bg-ui)] flex items-center justify-center">
                          <svg className="w-6 h-6 text-[var(--semantic-text-placeholder)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--semantic-text-secondary)]">No users found</p>
                          <p className="text-xs text-[var(--semantic-text-muted)] mt-0.5">Try adjusting your filters or search query</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => (
                    <RowContextMenu
                      key={user.id}
                      items={[
                        { label: 'View profile', onClick: () => navigate(`/users/${user.id}`) },
                        { label: 'Edit', onClick: () => navigate(`/users/edit/${user.id}`) },
                      ]}
                    >
                      <td className="px-4 py-3 align-middle text-[var(--semantic-text-primary)] font-medium">{user.id}</td>
                      <td className="px-4 py-3 align-middle">
                        <div className="flex items-center gap-3 text-left min-w-0">
                          <div className="w-8 h-8 rounded-full bg-[var(--semantic-primary)] flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-[var(--semantic-text-inverted)]">{user.avatar}</span>
                          </div>
                          <p className="text-sm font-medium text-[var(--semantic-text-primary)] truncate">
                            {user.name}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 align-middle text-[var(--semantic-text-secondary)] truncate">{user.email}</td>
                      <td className="px-4 py-3 align-middle text-[var(--semantic-text-secondary)] truncate">{user.phone}</td>
                      <td className="px-4 py-3 align-middle text-[var(--semantic-text-secondary)] truncate">{user.department}</td>
                      <td className="px-4 py-3 align-middle text-[var(--semantic-text-secondary)] truncate">{user.role}</td>
                      <td className="px-4 py-3 align-middle">
                        <span className={`text-sm font-medium ${user.isAdmin === 'Group Admin' ? 'text-[var(--semantic-success-primary)]' : 'text-[var(--semantic-text-muted)]'}`}>
                          {user.isAdmin === 'Group Admin' ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <LoginStatusBadge
                          enabled={user.loginEnabled}
                          onClick={() => setUserToToggleLogin(user)}
                        />
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <ActionsMenu
                          items={[
                            {
                              label: 'View profile',
                              onClick: () => navigate(`/users/${user.id}`),
                            },
                            {
                              label: 'Edit',
                              onClick: () => navigate(`/users/edit/${user.id}`),
                            },
                          ]}
                        />
                      </td>
                    </RowContextMenu>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalItems={sortedUsers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
        />
      </div>

      {userToDelete && <DeleteConfirmModal user={userToDelete} onConfirm={handleDelete} onCancel={() => setUserToDelete(null)} />}
      {userToToggleLogin && <LoginToggleModal user={userToToggleLogin} onConfirm={handleToggleLogin} onCancel={() => setUserToToggleLogin(null)} />}
      <FilterModal
        isOpen={showFilterModal}
        filters={filters}
        onApply={handleFilterChange}
        onClear={handleClearFilters}
        onClose={() => setShowFilterModal(false)}
      />
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
