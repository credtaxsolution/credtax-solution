'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

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

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          firm: formData.firm,
          email: formData.email,
          country: formData.country,
          role: formData.role,
          website: formData.website || null,
          need: formData.need,
          workload: formData.workload || null,
          support_structure: formData.support,
          message: formData.message || null,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form.');
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
          padding: 'clamp(24px, 3vw, 36px)',
          border: '1.5px solid var(--gold)',
          borderRadius: 'var(--radius)',
          background: 'rgba(47, 97, 111, 0.10)',
        }}
      >
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', color: 'var(--navy-900)', marginBottom: '8px' }}>
          Thank you, {formData.name}.
        </h3>
        <p className="muted">
          Your inquiry has been received. Our leadership team will review your firm&apos;s requirements and reach out within 1 business day to discuss workflow options.
        </p>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            setSubmitted(false);
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
          style={{ marginTop: '16px' }}
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
        <div style={{ padding: '12px', background: '#FDF2F2', border: '1px solid #F8B4B4', borderRadius: '4px', color: '#9B1C1C', marginTop: '16px', fontSize: '0.9rem' }}>
          {errorMsg}
        </div>
      )}

      <form className="form" onSubmit={handleSubmit}>
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
            placeholder="Your full name"
          />
        </div>

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
            placeholder="CPA or Accounting Firm"
          />
        </div>

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
            placeholder="name@firmcpa.com"
          />
        </div>

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

        <div className="field">
          <label htmlFor="f-site">Website</label>
          <input
            id="f-site"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://yourfirm.com"
          />
        </div>

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

        <div className="field full">
          <label htmlFor="f-support">Current support structure</label>
          <select id="f-support" name="support" value={formData.support} onChange={handleChange}>
            <option value="In-house team only">In-house team only</option>
            <option value="In-house team plus offshore support">In-house team plus offshore support</option>
            <option value="Contract or outsourced support">Contract or outsourced support</option>
            <option value="No dedicated support yet">No dedicated support yet</option>
          </select>
        </div>

        <div className="field full">
          <label htmlFor="f-msg">Message</label>
          <textarea
            id="f-msg"
            name="message"
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
