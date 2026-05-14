import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { users, updateUser } from '../data/users';
import Toast from '../components/Toast';
import { SkeletonCard, SkeletonLine, SkeletonInput } from '../components/ui/Skeleton';

const inputBase = 'h-10 w-full rounded px-4 text-sm bg-[var(--semantic-bg-primary)] text-[var(--semantic-text-primary)] border transition-all duration-200 focus:outline-none';
const inputNormal = `${inputBase} border-[var(--semantic-border-input)] placeholder:text-[var(--semantic-text-placeholder)] focus:border-[var(--semantic-border-input-focus)] focus:shadow-[0_0_0_3px_rgba(43,188,202,0.1)]`;
const selectNormal = `${inputBase} border-[var(--semantic-border-input)] text-[var(--semantic-text-secondary)] focus:border-[var(--semantic-border-input-focus)] focus:shadow-[0_0_0_3px_rgba(43,188,202,0.1)] appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23717680'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")] bg-no-repeat bg-[length:16px_16px] bg-[right_12px_center] pr-10`;

function Field({ label, required, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-[var(--semantic-text-secondary)]">
        {label}
        {required && <span className="text-[var(--semantic-error-primary)] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const DEPARTMENTS = ['Engineering', 'Product', 'Design', 'Operations', 'Sales', 'HR', 'Marketing'];
const ROLES = ['Admin', 'Manager', 'Developer', 'Designer'];
const ADMIN_OPTIONS = ['Group Admin', 'Not Admin'];
const TIMEZONES = [
  'Asia/Kolkata (UTC+05:30)',
  'America/New_York (UTC-05:00)',
  'Europe/London (UTC+00:00)',
  'Asia/Dubai (UTC+04:00)',
  'Asia/Singapore (UTC+08:00)',
];
const ZOHO_ID_TYPES = ['Admin', 'User', 'Manager'];

export default function EditProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const user = users.find((u) => u.id === parseInt(id));

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', department: '', role: '', isAdmin: '',
    googleProfile: '', fbProfile: '', linkedinProfile: '', timezone: '',
    pipedriveUid: '', zohoId: '', zohoIdType: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        department: user.department || '',
        role: user.role || '',
        isAdmin: user.isAdmin || 'Not Admin',
        googleProfile: user.googleProfile || '',
        fbProfile: user.fbProfile || '',
        linkedinProfile: user.linkedinProfile || '',
        timezone: user.timezone || 'Asia/Kolkata (UTC+05:30)',
        pipedriveUid: user.pipedriveUid || '',
        zohoId: user.zohoId || '',
        zohoIdType: user.zohoIdType || '',
      });
    }
  }, [user, id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.department) newErrors.department = 'Group is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    updateUser(parseInt(id), formData);
    setIsSubmitting(false);
    setToast({ type: 'success', message: 'Profile updated successfully' });
    setTimeout(() => navigate('/users'), 1200);
  };

  if (loading) {
    return (
      <div className="p-6 animate-fade-in space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SkeletonLine className="h-8 w-8 rounded" />
            <SkeletonLine className="h-6 w-48" />
          </div>
          <div className="flex items-center gap-3">
            <SkeletonLine className="h-9 w-24 rounded" />
            <SkeletonLine className="h-9 w-24 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SkeletonCard lines={6} />
          <SkeletonCard lines={5} />
        </div>
        <SkeletonCard lines={2} />
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
          <button onClick={() => navigate('/users')} className="inline-flex items-center gap-2 h-10 px-5 rounded text-sm font-medium bg-[var(--semantic-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-primary-hover)] transition-all duration-200">
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 animate-fade-in space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/users')}
            className="p-2 rounded text-[var(--semantic-text-muted)] hover:text-[var(--semantic-text-primary)] hover:bg-[var(--semantic-bg-ui)] transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-[var(--semantic-text-primary)]">Edit User Profile</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/users')}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-9 px-4 rounded text-sm font-medium border border-[var(--semantic-border-layout)] bg-transparent text-[var(--semantic-text-secondary)] hover:bg-[var(--semantic-bg-ui)] transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-profile-form"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-9 px-5 rounded text-sm font-medium bg-[var(--semantic-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-primary-hover)] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-5">
        {/* Two Column Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Basic Information */}
          <div className="rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-[var(--semantic-border-layout)]">
              <h3 className="text-sm font-semibold text-[var(--semantic-text-secondary)]">Basic Information</h3>
            </div>
            <div className="p-5 space-y-5">
              <Field label="Name" required>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Rohan Mehta"
                  className={inputNormal}
                />
                {errors.name && <p className="text-xs text-[var(--semantic-error-primary)] mt-1">{errors.name}</p>}
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Email" required>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="user@myoperator.co"
                    className={inputNormal}
                  />
                  {errors.email && <p className="text-xs text-[var(--semantic-error-primary)] mt-1">{errors.email}</p>}
                </Field>
                <Field label="Phone" required>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className={inputNormal}
                  />
                  {errors.phone && <p className="text-xs text-[var(--semantic-error-primary)] mt-1">{errors.phone}</p>}
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Group" required>
                  <select
                    value={formData.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                    className={selectNormal}
                  >
                    <option value="">Select or type group</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  {errors.department && <p className="text-xs text-[var(--semantic-error-primary)] mt-1">{errors.department}</p>}
                </Field>
                <Field label="Role" required>
                  <select
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    className={selectNormal}
                  >
                    <option value="">Select or type role</option>
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  {errors.role && <p className="text-xs text-[var(--semantic-error-primary)] mt-1">{errors.role}</p>}
                </Field>
              </div>

              <Field label="Is Admin">
                <select
                  value={formData.isAdmin}
                  onChange={(e) => handleChange('isAdmin', e.target.value)}
                  className={selectNormal}
                >
                  {ADMIN_OPTIONS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          {/* Integrations & Settings */}
          <div className="rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-[var(--semantic-border-layout)]">
              <h3 className="text-sm font-semibold text-[var(--semantic-text-secondary)]">Integrations & Settings</h3>
            </div>
            <div className="p-5 space-y-5">
              <Field label="Google Profile">
                <input
                  type="text"
                  value={formData.googleProfile}
                  onChange={(e) => handleChange('googleProfile', e.target.value)}
                  placeholder="https://..."
                  className={inputNormal}
                />
              </Field>
              <Field label="Facebook Profile">
                <input
                  type="text"
                  value={formData.fbProfile}
                  onChange={(e) => handleChange('fbProfile', e.target.value)}
                  placeholder="https://..."
                  className={inputNormal}
                />
              </Field>
              <Field label="LinkedIn Profile">
                <input
                  type="text"
                  value={formData.linkedinProfile}
                  onChange={(e) => handleChange('linkedinProfile', e.target.value)}
                  placeholder="https://..."
                  className={inputNormal}
                />
              </Field>
              <Field label="Timezone">
                <select
                  value={formData.timezone}
                  onChange={(e) => handleChange('timezone', e.target.value)}
                  className={selectNormal}
                >
                  {TIMEZONES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>
        </div>

        {/* CRM Details */}
        <div className="rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--semantic-border-layout)]">
            <h3 className="text-sm font-semibold text-[var(--semantic-text-secondary)]">CRM Details</h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Field label="Pipedrive UID">
                <input
                  type="text"
                  value={formData.pipedriveUid}
                  onChange={(e) => handleChange('pipedriveUid', e.target.value)}
                  placeholder="0"
                  className={inputNormal}
                />
              </Field>
              <Field label="Zoho ID">
                <input
                  type="text"
                  value={formData.zohoId}
                  onChange={(e) => handleChange('zohoId', e.target.value)}
                  placeholder=""
                  className={inputNormal}
                />
              </Field>
              <Field label="Zoho ID Type">
                <select
                  value={formData.zohoIdType}
                  onChange={(e) => handleChange('zohoIdType', e.target.value)}
                  className={selectNormal}
                >
                  <option value="">Select...</option>
                  {ZOHO_ID_TYPES.map((z) => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>
        </div>
      </form>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
