'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    firm: '',
    email: '',
    country: 'United States',
    role: 'Firm owner / partner',
    website: '',
    need: 'Tax',
    workload: '',
    support: 'In-house team only',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Validate a single field
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Please enter your full name.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      case 'firm':
        if (!value.trim()) return 'Please enter your firm or practice name.';
        if (value.trim().length < 2) return 'Firm name must be at least 2 characters.';
        return '';
      case 'email':
        if (!value.trim()) return 'Work email address is required.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Please enter a valid work email (e.g. name@firm.com).';
        return '';
      case 'website':
        if (value.trim()) {
          const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
          if (!urlPattern.test(value.trim())) return 'Please enter a valid URL (e.g. yourfirm.com).';
        }
        return '';
      default:
        return '';
    }
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};
    const nameErr = validateField('name', formData.name);
    if (nameErr) newErrors.name = nameErr;

    const firmErr = validateField('firm', formData.firm);
    if (firmErr) newErrors.firm = firmErr;

    const emailErr = validateField('email', formData.email);
    if (emailErr) newErrors.email = emailErr;

    const webErr = validateField('website', formData.website);
    if (webErr) newErrors.website = webErr;

    setErrors(newErrors);
    setTouched({
      name: true,
      firm: true,
      email: true,
      website: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const isValid = validateAll();
    if (!isValid) {
      setErrorMsg('Please review the highlighted fields below and provide valid details.');
      // Scroll to first invalid field
      const firstErrorKey = Object.keys(errors)[0] || 'name';
      const el = document.getElementById(`f-${firstErrorKey}`);
      if (el) el.focus();
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          firm: formData.firm.trim(),
          email: formData.email.trim(),
          country: formData.country,
          role: formData.role,
          website: formData.website?.trim() || null,
          need: formData.need,
          workload: formData.workload?.trim() || null,
          support_structure: formData.support,
          message: formData.message?.trim() || null,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit inquiry. Please try again.');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      console.error('Contact submission error:', err);
      setErrorMsg((err as Error).message || 'Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="form-status"
        style={{
          padding: 'clamp(28px, 4vw, 44px)',
          border: '1.5px solid var(--gold)',
          borderRadius: 'var(--radius)',
          background: 'rgba(47, 97, 111, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <CheckCircle2 size={28} color="#0D9488" />
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', color: 'var(--navy-900)', margin: 0 }}>
            Thank you, {formData.name}.
          </h3>
        </div>
        <p className="muted" style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
          Your inquiry has been received. Our leadership team will review your firm&apos;s requirements and reach out within 1 business day to discuss workflow options.
        </p>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            setSubmitted(false);
            setErrors({});
            setTouched({});
            setFormData({
              name: '',
              firm: '',
              email: '',
              country: 'United States',
              role: 'Firm owner / partner',
              website: '',
              need: 'Tax',
              workload: '',
              support: 'In-house team only',
              message: '',
            });
          }}
          style={{ marginTop: '20px' }}
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="form-card">
      <h2>Tell Us About Your Firm</h2>
      <p className="muted" style={{ margin: 0 }}>
        A few details are enough. We&apos;ll follow up to understand your workflow.
      </p>

      {errorMsg && (
        <div
          role="alert"
          style={{
            padding: '12px 16px',
            background: '#FEF2F2',
            border: '1.5px solid #FCA5A5',
            borderRadius: '6px',
            color: '#991B1B',
            marginTop: '18px',
            fontSize: '0.9rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <AlertCircle size={18} color="#EF4444" style={{ flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form className="form" onSubmit={handleSubmit} noValidate>
        {/* Name Field */}
        <div className="field">
          <label htmlFor="f-name">
            Name <span className="req">*</span>
          </label>
          <input
            id="f-name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your full name"
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby={touched.name && errors.name ? 'f-name-err' : undefined}
            style={{
              borderColor: touched.name && errors.name ? '#EF4444' : undefined,
              backgroundColor: touched.name && errors.name ? '#FEF2F2' : undefined,
            }}
          />
          {touched.name && errors.name && (
            <div id="f-name-err" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#DC2626', fontSize: '0.82rem', marginTop: '4px', fontWeight: 500 }}>
              <AlertCircle size={13} /> {errors.name}
            </div>
          )}
        </div>

        {/* Firm Field */}
        <div className="field">
          <label htmlFor="f-firm">
            Firm name <span className="req">*</span>
          </label>
          <input
            id="f-firm"
            name="firm"
            type="text"
            required
            value={formData.firm}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="CPA or Accounting Firm"
            aria-invalid={Boolean(touched.firm && errors.firm)}
            aria-describedby={touched.firm && errors.firm ? 'f-firm-err' : undefined}
            style={{
              borderColor: touched.firm && errors.firm ? '#EF4444' : undefined,
              backgroundColor: touched.firm && errors.firm ? '#FEF2F2' : undefined,
            }}
          />
          {touched.firm && errors.firm && (
            <div id="f-firm-err" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#DC2626', fontSize: '0.82rem', marginTop: '4px', fontWeight: 500 }}>
              <AlertCircle size={13} /> {errors.firm}
            </div>
          )}
        </div>

        {/* Email Field */}
        <div className="field">
          <label htmlFor="f-email">
            Work email <span className="req">*</span>
          </label>
          <input
            id="f-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="name@firmcpa.com"
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={touched.email && errors.email ? 'f-email-err' : undefined}
            style={{
              borderColor: touched.email && errors.email ? '#EF4444' : undefined,
              backgroundColor: touched.email && errors.email ? '#FEF2F2' : undefined,
            }}
          />
          {touched.email && errors.email && (
            <div id="f-email-err" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#DC2626', fontSize: '0.82rem', marginTop: '4px', fontWeight: 500 }}>
              <AlertCircle size={13} /> {errors.email}
            </div>
          )}
        </div>

        {/* Country */}
        <div className="field">
          <label htmlFor="f-country">
            Country <span className="req">*</span>
          </label>
          <select id="f-country" name="country" required value={formData.country} onChange={handleChange}>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Role */}
        <div className="field">
          <label htmlFor="f-role">
            Role <span className="req">*</span>
          </label>
          <select id="f-role" name="role" required value={formData.role} onChange={handleChange}>
            <option value="Firm owner / partner">Firm owner / partner</option>
            <option value="Managing partner">Managing partner</option>
            <option value="Operations / practice manager">Operations / practice manager</option>
            <option value="Tax or accounting lead">Tax or accounting lead</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Website */}
        <div className="field">
          <label htmlFor="f-site">Website</label>
          <input
            id="f-site"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://yourfirm.com"
            aria-invalid={Boolean(touched.website && errors.website)}
            aria-describedby={touched.website && errors.website ? 'f-site-err' : undefined}
            style={{
              borderColor: touched.website && errors.website ? '#EF4444' : undefined,
              backgroundColor: touched.website && errors.website ? '#FEF2F2' : undefined,
            }}
          />
          {touched.website && errors.website && (
            <div id="f-site-err" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#DC2626', fontSize: '0.82rem', marginTop: '4px', fontWeight: 500 }}>
              <AlertCircle size={13} /> {errors.website}
            </div>
          )}
        </div>

        {/* Primary Need */}
        <div className="field">
          <label htmlFor="f-need">
            Primary need <span className="req">*</span>
          </label>
          <select id="f-need" name="need" required value={formData.need} onChange={handleChange}>
            <option value="Tax">Tax Preparation</option>
            <option value="Tax Review">Tax Review &amp; QC</option>
            <option value="Bookkeeping">Bookkeeping</option>
            <option value="Accounting">Accounting / Month-end</option>
            <option value="Workflow / Admin">Workflow / Admin Coordination</option>
            <option value="CredTax Pod">CredTax Pod (Full Function)</option>
            <option value="Succession">Succession Partnership</option>
            <option value="Multiple">Multiple Areas</option>
          </select>
        </div>

        {/* Workload */}
        <div className="field">
          <label htmlFor="f-work">Approximate workload</label>
          <input
            id="f-work"
            name="workload"
            type="text"
            value={formData.workload}
            onChange={handleChange}
            placeholder="e.g. 50 returns/mo, 10 bookkeeping clients"
          />
        </div>

        {/* Support Structure */}
        <div className="field full">
          <label htmlFor="f-support">Current support structure</label>
          <select id="f-support" name="support" value={formData.support} onChange={handleChange}>
            <option value="In-house team only">In-house team only</option>
            <option value="In-house team plus offshore support">In-house team plus offshore support</option>
            <option value="Contract or outsourced support">Contract or outsourced support</option>
            <option value="No dedicated support yet">No dedicated support yet</option>
          </select>
        </div>

        {/* Message */}
        <div className="field full">
          <label htmlFor="f-msg">Message</label>
          <textarea
            id="f-msg"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="What is consuming your team's capacity right now?"
          />
        </div>

        <div className="form-foot">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Discuss Your Workflow'}
          </button>
          <small>
            <span className="req">*</span> Required fields. We treat firm information with strict confidentiality.
          </small>
        </div>
      </form>
    </div>
  );
}
