import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ComboboxSelect from '../components/ComboboxSelect';
import SimpleSelect from '../components/SimpleSelect';
import Toast from '../components/Toast';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { users, updateUser } from '../data/users';
import { GROUP_OPTIONS, ROLE_OPTIONS, ADMIN_OPTIONS, ZOHO_TYPE_OPTIONS, TIMEZONE_OPTIONS, LOGIN_OPTIONS } from '../data/options';

/* ─── Shared styles (module scope) ─── */
const inputBase = 'h-10 w-full rounded px-4 text-sm bg-[var(--semantic-bg-primary)] text-[var(--semantic-text-primary)] border transition-all duration-200 focus:outline-none';
const inputNormal = `${inputBase} border-[var(--semantic-border-input)] placeholder:text-[var(--semantic-text-placeholder)] focus:border-[var(--semantic-border-input-focus)] focus:shadow-[0_0_0_1px_rgba(43,188,202,0.15)]`;
const inputError = `${inputBase} border-[var(--semantic-error-border)] focus:border-[var(--semantic-error-primary)] focus:shadow-[0_0_0_1px_rgba(240,68,56,0.1)]`;

/* ─── Shared sub-components (module scope — NEVER remount) ─── */
function Field({ label, required, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold leading-5 text-[var(--semantic-text-secondary)] flex items-center gap-1">
        {label}
        {required && <span className="text-[var(--semantic-error-primary)]">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-[var(--semantic-error-primary)] flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function TextField({ label, required, error, value, onChange, placeholder, type = 'text' }) {
  return (
    <Field label={label} required={required} error={error}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={error ? inputError : inputNormal}
      />
    </Field>
  );
}

function SelectField({ label, required, error, value, onChange, options, placeholder }) {
  return (
    <Field label={label} required={required} error={error}>
      <SimpleSelect
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
      />
    </Field>
  );
}

function Card({ title, children, className = '' }) {
  return (
    <div className={`rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-sm ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-[var(--semantic-border-layout)]">
          <h2 className="text-base font-semibold text-[var(--semantic-text-secondary)]">{title}</h2>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

export default function EditProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const user = users.find((u) => u.id === parseInt(id));

  useEffect(() => {
    if (!user) setNotFound(true);
  }, [user]);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
    role: user?.role || '',
    isAdmin: user?.isAdmin || 'Not Admin',
    googleProfile: user?.googleProfile || '',
    fbProfile: user?.fbProfile || '',
    linkedinProfile: user?.linkedinProfile || '',
    pipedriveUid: user?.pipedriveUid || '0',
    zohoId: user?.zohoId || '',
    zohoIdType: user?.zohoIdType || '',
    timezone: user?.timezone || 'Asia/Kolkata (UTC+05:30)',
    location: user?.location || '',
    address: user?.address || '',
    apiToken: user?.apiToken || '',
    bio: user?.bio || '',
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.department) newErrors.department = 'Group is required';
    if (!formData.role) newErrors.role = 'Role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    updateUser(parseInt(id), formData);
    setIsSubmitting(false);
    setToast({ type: 'success', message: 'Profile updated successfully' });
  };

  const handleDelete = () => {
    setToast({ type: 'success', message: 'Profile deleted successfully' });
    setTimeout(() => navigate('/users'), 1500);
  };

  if (notFound) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[var(--semantic-error-surface)] flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-[var(--semantic-error-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[var(--semantic-text-primary)]">User Not Found</h2>
            <p className="text-sm text-[var(--semantic-text-muted)] mt-1">The user profile you're looking for doesn't exist or has been removed.</p>
          </div>
          <button onClick={() => navigate('/users')} className="inline-flex items-center gap-2 h-10 px-5 rounded text-sm font-medium bg-[var(--semantic-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-primary-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2">
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/users')}
            className="p-2 rounded text-[var(--semantic-text-muted)] hover:text-[var(--semantic-text-primary)] hover:bg-[var(--semantic-bg-ui)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="text-2xl font-semibold text-[var(--semantic-text-primary)]">Edit User Profile</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDelete(true)}
            className="inline-flex items-center gap-2 whitespace-nowrap h-10 px-6 rounded text-sm font-medium bg-[var(--semantic-error-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-error-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-error-primary)] focus-visible:ring-offset-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            Delete
          </button>
          <button
            onClick={() => navigate('/users')}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-10 px-6 rounded text-sm font-medium border border-[var(--semantic-border-primary)] bg-transparent text-[var(--semantic-text-secondary)] hover:bg-[var(--semantic-primary-surface)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-10 px-6 rounded text-sm font-medium bg-[var(--semantic-primary)] text-[var(--semantic-text-inverted)] hover:bg-[var(--semantic-primary-hover)] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none min-w-[100px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </div>

      {/* User info card */}
      <div className="rounded-lg border border-[var(--semantic-border-layout)] bg-[var(--semantic-bg-primary)] shadow-sm p-6 flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-[var(--semantic-primary)] flex items-center justify-center shrink-0">
          <span className="text-lg font-bold text-[var(--semantic-text-inverted)]">{user?.avatar}</span>
        </div>
        <div>
          <h2 className="text-base font-semibold text-[var(--semantic-text-primary)]">{user?.name}</h2>
          <p className="text-sm text-[var(--semantic-text-muted)]">{user?.email}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${user?.status === 'Active' ? 'bg-[var(--semantic-success-surface)] text-[var(--semantic-success-primary)]' : 'bg-[var(--semantic-error-surface)] text-[var(--semantic-error-primary)]'}`}>
              {user?.status}
            </span>
            <span className="text-xs text-[var(--semantic-text-muted)]">{user?.department}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <Card title="Basic Information">
            <div className="space-y-5">
              <TextField label="Name" required error={errors.name} value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="e.g. Rohan Mehta" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <TextField label="Email" required error={errors.email} value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="user@myoperator.co" type="email" />
                <TextField label="Phone" required error={errors.phone} value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+91 98765 43210" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ComboboxSelect
                  label="Group"
                  required
                  error={errors.department}
                  value={formData.department}
                  onChange={(val) => handleChange('department', val)}
                  options={GROUP_OPTIONS}
                  placeholder="Select or type group"
                  creatable
                />
                <ComboboxSelect
                  label="Role"
                  required
                  error={errors.role}
                  value={formData.role}
                  onChange={(val) => handleChange('role', val)}
                  options={ROLE_OPTIONS}
                  placeholder="Select or type role"
                  creatable
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SelectField
                  label="Is Admin"
                  value={formData.isAdmin}
                  onChange={(val) => handleChange('isAdmin', val)}
                  options={ADMIN_OPTIONS}
                  placeholder="Select..."
                />
                <SelectField
                  label="Status"
                  value={formData.status}
                  onChange={(val) => handleChange('status', val)}
                  options={[{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }]}
                  placeholder="Select..."
                />
              </div>
              <SelectField
                label="Login Enabled"
                value={formData.loginEnabled}
                onChange={(val) => handleChange('loginEnabled', val)}
                options={LOGIN_OPTIONS}
                placeholder="Select..."
              />
            </div>
          </Card>

          <Card title="Integrations & Settings">
            <div className="space-y-5">
              <TextField label="Google Profile" value={formData.googleProfile} onChange={(e) => handleChange('googleProfile', e.target.value)} placeholder="https://..." />
              <TextField label="Facebook Profile" value={formData.fbProfile} onChange={(e) => handleChange('fbProfile', e.target.value)} placeholder="https://..." />
              <TextField label="LinkedIn Profile" value={formData.linkedinProfile} onChange={(e) => handleChange('linkedinProfile', e.target.value)} placeholder="https://..." />
              <SelectField
                label="Timezone"
                value={formData.timezone}
                onChange={(val) => handleChange('timezone', val)}
                options={TIMEZONE_OPTIONS}
                placeholder="Select timezone..."
              />
            </div>
          </Card>
        </div>

        {/* Row 2 */}
        <Card title="CRM Details">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <TextField label="Pipedrive UID" value={formData.pipedriveUid} onChange={(e) => handleChange('pipedriveUid', e.target.value)} placeholder="0" />
            <TextField label="Zoho ID" value={formData.zohoId} onChange={(e) => handleChange('zohoId', e.target.value)} placeholder="" />
            <SelectField
              label="Zoho ID Type"
              value={formData.zohoIdType}
              onChange={(val) => handleChange('zohoIdType', val)}
              options={ZOHO_TYPE_OPTIONS}
              placeholder="Select..."
            />
          </div>
        </Card>

        {/* Row 3 */}
        <Card title="Other Details">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <TextField label="Location" value={formData.location} onChange={(e) => handleChange('location', e.target.value)} placeholder="City, Country" />
            <TextField label="Address" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} placeholder="Enter address" />
            <TextField label="API Token" value={formData.apiToken} onChange={(e) => handleChange('apiToken', e.target.value)} placeholder="API token" />
          </div>
        </Card>

        {/* Row 4 */}
        <Card title="About">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[var(--semantic-text-secondary)]">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="Short bio..."
              rows={3}
              className="w-full rounded px-4 py-2 text-sm bg-[var(--semantic-bg-primary)] text-[var(--semantic-text-primary)] border border-[var(--semantic-border-input)] placeholder:text-[var(--semantic-text-placeholder)] focus:outline-none focus:border-[var(--semantic-border-input-focus)] focus:shadow-[0_0_0_1px_rgba(43,188,202,0.15)] transition-all resize-none"
            />
          </div>
        </Card>
      </form>

      {showDelete && <DeleteConfirmModal user={user} onConfirm={handleDelete} onCancel={() => setShowDelete(false)} />}
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
