import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ComboboxSelect from '../components/ComboboxSelect';
import SimpleSelect from '../components/SimpleSelect';
import Toast from '../components/Toast';
import { addUser } from '../data/users';
import { GROUP_OPTIONS, ROLE_OPTIONS, ADMIN_OPTIONS, ZOHO_TYPE_OPTIONS, TIMEZONE_OPTIONS } from '../data/options';

/* ─── Shared styles (module scope) ─── */
const inputBase = 'h-10 w-full rounded px-4 text-sm bg-[var(--semantic-bg-primary)] text-[var(--semantic-text-primary)] border transition-colors duration-200';
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

export default function AddProfile() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    department: '', role: '', isAdmin: 'Not Admin',
    googleProfile: '', fbProfile: '', linkedinProfile: '',
    pipedriveUid: '0', zohoId: '', zohoIdType: '', timezone: 'Asia/Kolkata (UTC+05:30)',
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
    addUser(formData);
    setIsSubmitting(false);
    setToast({ type: 'success', message: `${formData.name} has been added successfully` });
    setTimeout(() => navigate('/users'), 1500);
  };

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
          <h1 className="text-2xl font-semibold text-[var(--semantic-text-primary)]">Add User Profile</h1>
        </div>
        <div className="flex items-center gap-3">
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
              <SelectField
                label="Is Admin"
                value={formData.isAdmin}
                onChange={(val) => handleChange('isAdmin', val)}
                options={ADMIN_OPTIONS}
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
      </form>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
