import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { users, updateUser, deleteUser } from '../data/users';

import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Toast from '../components/Toast';
import Tabs from '../components/ui/Tabs';
import { SkeletonCard, SkeletonLine, SkeletonAvatar, SkeletonInput } from '../components/ui/Skeleton';

const inputBase = 'h-10 w-full rounded px-4 text-sm bg-[var(--semantic-bg-primary)] text-[var(--semantic-text-primary)] border-[var(--semantic-border-input)] transition-colors duration-200 focus:border-[var(--semantic-border-input-focus)] focus:shadow-[0_0_0_3px_rgba(43,188,202,0.1)]';
const inputNormal = `${inputBase} placeholder:text-[var(--semantic-text-placeholder)]`;

function InfoItem({ icon, label, value }) {
  return (
    <div className="py-3 border-b border-[var(--semantic-border-layout)] last:border-0">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-sm font-semibold text-[var(--semantic-text-secondary)]">{label}</span>
      </div>
      <p className="text-sm text-[var(--semantic-text-muted)] pl-6 break-all">{value || 'NA'}</p>
    </div>
  );
}

function PasswordInput({ label, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-[var(--semantic-text-secondary)]">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputNormal + ' pr-10'}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--semantic-text-muted)] hover:text-[var(--semantic-text-secondary)] transition-colors"
        >
          {show ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default function ViewProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('profile');
  const [toast, setToast] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = users.find((u) => u.id === parseInt(id));

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', department: '', role: '',
    googleProfile: '', fbProfile: '', linkedinProfile: '',
  });

  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [pwdErrors, setPwdErrors] = useState({});

  const [resetPassword, setResetPassword] = useState('');
  const [resetResult, setResetResult] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '', email: user.email || '', phone: user.phone || '',
        department: user.department || '', role: user.role || '',
        googleProfile: user.googleProfile || '', fbProfile: user.fbProfile || '',
        linkedinProfile: user.linkedinProfile || '',
      });
    }
  }, [user, id]);

  if (loading) {
    return (
      <div className="p-6 animate-fade-in space-y-5">
        <div className="flex items-center gap-3">
          <SkeletonAvatar size="sm" />
          <div className="space-y-1.5">
            <SkeletonLine className="h-5 w-40" />
            <SkeletonLine className="h-3 w-24" />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-80 shrink-0 space-y-5">
            <SkeletonCard lines={2} avatar />
            <SkeletonCard lines={3} />
            <SkeletonCard lines={6} />
          </div>
          <div className="flex-1 min-w-0 space-y-5">
            <SkeletonLine className="h-10 w-full" />
            <div className="space-y-4">
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
            </div>
            <SkeletonLine className="h-10 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[var(--semantic-error-surface)] flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-[var(--semantic-error-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[var(--semantic-text-primary)]">User Not Found</h2>
            <p className="text-sm text-[var(--semantic-text-muted)] mt-1">The user profile you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          </div>
          <button onClick={() => navigate('/users')} className="inline-flex items-center gap-2 h-10 px-5 rounded text-sm font-medium bg-[var(--semantic-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-primary-hover)] transition-all">
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setToast({ type: 'error', message: 'Name, Email and Phone are required' });
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    updateUser(parseInt(id), formData);
    setIsSubmitting(false);
    setToast({ type: 'success', message: 'Profile updated successfully' });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!passwordData.oldPassword) errs.oldPassword = 'Old password is required';
    if (!passwordData.newPassword) errs.newPassword = 'New password is required';
    else if (passwordData.newPassword.length < 6) errs.newPassword = 'Password must be at least 6 characters';
    if (!passwordData.confirmPassword) errs.confirmPassword = 'Please confirm the new password';
    else if (passwordData.newPassword !== passwordData.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (passwordData.oldPassword && passwordData.newPassword === passwordData.oldPassword) errs.newPassword = 'New password must be different from old password';

    if (Object.keys(errs).length > 0) {
      setPwdErrors(errs);
      return;
    }
    setPwdErrors({});
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setToast({ type: 'success', message: 'Password changed successfully' });
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetPassword) {
      setToast({ type: 'error', message: 'Please enter a new password' });
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setResetResult(resetPassword);
    setToast({ type: 'success', message: 'Password reset successfully' });
    setResetPassword('');
  };

  const handleDelete = () => {
    deleteUser(user.id);
    setToast({ type: 'success', message: 'Profile deleted successfully' });
    setTimeout(() => navigate('/users'), 1500);
  };

  const tabs = [
    { key: 'profile', label: 'Profile' },
    { key: 'changePassword', label: 'Change Password' },
    { key: 'passwordReset', label: 'Password Reset' },
  ];

  return (
    <div className="p-6 animate-fade-in space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/users')} className="p-2 rounded text-[var(--semantic-text-muted)] hover:text-[var(--semantic-text-primary)] hover:bg-[var(--semantic-bg-ui)] transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-semibold text-[var(--semantic-text-primary)]">User Profile</h1>
            <p className="text-xs text-[var(--semantic-text-muted)]">View user details</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/users/edit/${id}`)}
            className="inline-flex items-center gap-2 whitespace-nowrap h-9 px-4 rounded text-sm font-medium bg-[var(--semantic-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-primary-hover)] transition-all duration-200"
          >
            Edit
          </button>
          <button
            onClick={() => setShowDelete(true)}
            className="inline-flex items-center gap-2 whitespace-nowrap h-9 px-4 rounded text-sm font-medium border border-[var(--semantic-error-primary)] bg-transparent text-[var(--semantic-error-primary)] hover:bg-[var(--semantic-error-surface)] transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left Sidebar */}
        <div className="w-full lg:w-80 shrink-0 space-y-5">
          {/* Profile Card */}
          <div className="rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-sm p-5 text-center">
            <div className="w-24 h-24 rounded-full bg-[var(--semantic-primary)] flex items-center justify-center mx-auto mb-3 ring-4 ring-white shadow-md">
              <svg className="w-12 h-12 text-[var(--semantic-text-inverted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-[var(--semantic-text-primary)]">{user.name}</h2>
            <p className="text-sm text-[var(--semantic-text-muted)]">{user.role}</p>
          </div>

          {/* Social Links */}
          <div className="rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-sm">
            <div className="px-5 py-3 border-b border-[var(--semantic-border-layout)]">
              <h3 className="text-sm font-semibold text-[var(--semantic-text-secondary)]">Social Profiles</h3>
            </div>
            <div className="px-5 py-2 space-y-1">
              {[
                { name: 'Google+', url: user.googleProfile },
                { name: 'Facebook', url: user.fbProfile },
                { name: 'LinkedIn', url: user.linkedinProfile },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2 text-sm text-[var(--semantic-text-link)] hover:text-[var(--semantic-primary)] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* About Me */}
          <div className="rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-sm">
            <div className="px-5 py-3 border-b border-[var(--semantic-border-layout)]">
              <h3 className="text-sm font-semibold text-[var(--semantic-text-secondary)]">About Me</h3>
            </div>
            <div className="px-5">
              <InfoItem
                icon={<svg className="w-4 h-4 text-[var(--semantic-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>}
                label="Login ID" value={user.email}
              />
              <InfoItem
                icon={<svg className="w-4 h-4 text-[var(--semantic-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>}
                label="Role" value={user.role}
              />
              <InfoItem
                icon={<svg className="w-4 h-4 text-[var(--semantic-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>}
                label="Address" value={user.address}
              />
              <InfoItem
                icon={<svg className="w-4 h-4 text-[var(--semantic-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>}
                label="Group" value={user.department}
              />
              <InfoItem
                icon={<svg className="w-4 h-4 text-[var(--semantic-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                label="Time-Zone" value={user.timezone}
              />
              <InfoItem
                icon={<svg className="w-4 h-4 text-[var(--semantic-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>}
                label="API Token" value={user.apiToken}
              />
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 min-w-0">
          <div className="rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-sm overflow-hidden">
            {/* Tabs */}
            <Tabs value={activeTab} onChange={setActiveTab} items={tabs} />

            <div className="p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <form key="profile-tab" onSubmit={handleUpdateProfile} className="max-w-2xl space-y-5 animate-fade-in">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-[var(--semantic-text-secondary)]">Name</label>
                      <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="e.g. Rohan Mehta" className={inputNormal} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-[var(--semantic-text-secondary)]">Email</label>
                      <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="user@myoperator.co" className={inputNormal} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-[var(--semantic-text-secondary)]">Phone</label>
                      <input type="text" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+91 98765 43210" className={inputNormal} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-[var(--semantic-text-secondary)]">Google Profile</label>
                      <input type="text" value={formData.googleProfile} onChange={(e) => handleChange('googleProfile', e.target.value)} placeholder="Google plus profile url" className={inputNormal} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-[var(--semantic-text-secondary)]">Fb Profile</label>
                      <input type="text" value={formData.fbProfile} onChange={(e) => handleChange('fbProfile', e.target.value)} placeholder="Facebook profile url" className={inputNormal} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-[var(--semantic-text-secondary)]">LinkedIn Profile</label>
                      <input type="text" value={formData.linkedinProfile} onChange={(e) => handleChange('linkedinProfile', e.target.value)} placeholder="LinkedIn profile url" className={inputNormal} />
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-10 px-6 rounded text-sm font-medium bg-[var(--semantic-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-primary-hover)] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2"
                    >
                      {isSubmitting ? 'Updating...' : 'Update Profile'}
                    </button>
                  </div>
                </form>
              )}

              {/* Change Password Tab */}
              {activeTab === 'changePassword' && (
                <div key="changePassword-tab" className="max-w-xl space-y-6 animate-fade-in">
                  <form onSubmit={handleChangePassword} className="space-y-5">
                    <PasswordInput
                      label="Old Password"
                      value={passwordData.oldPassword}
                      onChange={(e) => { setPasswordData((p) => ({ ...p, oldPassword: e.target.value })); setPwdErrors((err) => { const n = { ...err }; delete n.oldPassword; return n; }); }}
                      placeholder="Old Password"
                    />
                    {pwdErrors.oldPassword && <p className="text-xs text-[var(--semantic-error-primary)] -mt-3">{pwdErrors.oldPassword}</p>}

                    <PasswordInput
                      label="New Password"
                      value={passwordData.newPassword}
                      onChange={(e) => { setPasswordData((p) => ({ ...p, newPassword: e.target.value })); setPwdErrors((err) => { const n = { ...err }; delete n.newPassword; return n; }); }}
                      placeholder="New Password"
                    />
                    {pwdErrors.newPassword && <p className="text-xs text-[var(--semantic-error-primary)] -mt-3">{pwdErrors.newPassword}</p>}

                    <PasswordInput
                      label="Confirm New Password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => { setPasswordData((p) => ({ ...p, confirmPassword: e.target.value })); setPwdErrors((err) => { const n = { ...err }; delete n.confirmPassword; return n; }); }}
                      placeholder="Confirm New Password"
                    />
                    {pwdErrors.confirmPassword && <p className="text-xs text-[var(--semantic-error-primary)] -mt-3">{pwdErrors.confirmPassword}</p>}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-10 px-6 rounded text-sm font-medium bg-[var(--semantic-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-primary-hover)] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2"
                      >
                        {isSubmitting ? 'Changing...' : 'Change Password'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Password Reset Tab */}
              {activeTab === 'passwordReset' && (
                <div key="passwordReset-tab" className="max-w-xl space-y-6 animate-fade-in">
                  {resetResult ? (
                    <div className="rounded-lg border border-[var(--semantic-success-border)] bg-[var(--semantic-success-surface)] p-5 space-y-3">
                      <div className="flex items-center gap-2 text-[var(--semantic-success-text)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-sm font-semibold">Password reset successful</p>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--semantic-success-text)] uppercase tracking-wide">New Password</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            readOnly
                            value={resetResult}
                            className="flex-1 h-10 rounded px-4 text-sm bg-[var(--semantic-bg-primary)] text-[var(--semantic-text-primary)] border border-[var(--semantic-success-border)] font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => { navigator.clipboard.writeText(resetResult); setToast({ type: 'success', message: 'Password copied to clipboard' }); }}
                            className="h-10 px-4 rounded text-sm font-medium bg-[var(--semantic-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-primary-hover)] transition-all"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setResetResult(null)}
                        className="text-sm text-[var(--semantic-text-link)] hover:text-[var(--semantic-primary)] transition-colors"
                      >
                        Reset another password
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleResetPassword} className="space-y-5">
                      <PasswordInput
                        label="New Password"
                        value={resetPassword}
                        onChange={(e) => setResetPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-10 px-6 rounded text-sm font-medium bg-[var(--semantic-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-primary-hover)] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2"
                        >
                          {isSubmitting ? 'Resetting...' : 'Reset Password'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showDelete && <DeleteConfirmModal user={user} onConfirm={handleDelete} onCancel={() => setShowDelete(false)} />}
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
