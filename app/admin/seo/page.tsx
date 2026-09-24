'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Save, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';

interface GeneralSettings {
  site_name: string;
  legal_name: string;
  site_title: string;
  site_description: string;
  site_url: string;
  contact_email: string;
  phone: string;
  ga_id?: string;
  gsc_tag?: string;
}

export default function AdminSeoPage() {
  const [settings, setSettings] = useState<GeneralSettings>({
    site_name: 'CredTax',
    legal_name: 'CredTax Solution LLP',
    site_title: 'CredTax | Offshore Tax & Accounting Support for CPA Firms',
    site_description:
      'CredTax provides offshore tax, accounting and workflow support for US and Canadian CPA firms, with flexible, dedicated and workflow-based support models.',
    site_url: 'https://credtaxsolution.com',
    contact_email: 'prnithin6@gmail.com',
    phone: '+91 94959 15993',
    ga_id: '',
    gsc_tag: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'general')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      if (data && data.value) {
        setSettings((prev) => ({ ...prev, ...data.value }));
      }
    } catch (err) {
      console.error('Error loading site settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const supabase = createClient();
      const { error } = await supabase.from('site_settings').upsert({
        key: 'general',
        value: settings,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '840px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.85rem', color: 'var(--navy-900)', marginBottom: '4px' }}>
          SEO &amp; Site Configuration
        </h1>
        <p className="muted" style={{ margin: 0 }}>
          Manage global search engine metadata, analytics verification, and indexing configurations.
        </p>
      </div>

      {savedSuccess && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: '6px',
            color: '#065F46',
            marginBottom: '24px',
            fontWeight: 500,
          }}
        >
          <CheckCircle size={18} />
          <span>SEO settings successfully updated!</span>
        </div>
      )}

      {/* Google Search Result Preview */}
      <div
        style={{
          background: '#fff',
          border: '1px solid var(--line)',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '28px',
        }}
      >
        <span
          style={{
            display: 'block',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '12px',
            letterSpacing: '0.05em',
          }}
        >
          Google Search SERP Preview
        </span>
        <div style={{ maxWidth: '600px', fontFamily: 'Arial, sans-serif' }}>
          <div style={{ fontSize: '0.85rem', color: '#202124', marginBottom: '2px' }}>
            https://credtaxsolution.com
          </div>
          <h3 style={{ fontSize: '1.2rem', color: '#1a0dab', margin: '0 0 4px 0', fontWeight: 400, cursor: 'pointer' }}>
            {settings.site_title || 'CredTax | Offshore Tax & Accounting Support for CPA Firms'}
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#4d5156', margin: 0, lineHeight: '1.4' }}>
            {settings.site_description ||
              'CredTax provides offshore tax, accounting and workflow support for US and Canadian CPA firms, with flexible, dedicated and workflow-based support models.'}
          </p>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', padding: '28px' }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--navy-900)', marginBottom: '20px' }}>
          Search Metadata Settings
        </h2>

        <div className="field" style={{ marginBottom: '18px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Default Title Tag</label>
          <input
            type="text"
            required
            value={settings.site_title}
            onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
            placeholder="Site title tag"
          />
          <span className="hint">Recommended length: 50-60 characters.</span>
        </div>

        <div className="field" style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Default Meta Description</label>
          <textarea
            rows={3}
            required
            value={settings.site_description}
            onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
            placeholder="Meta description for search engine listings..."
          />
          <span className="hint">Recommended length: 140-160 characters.</span>
        </div>

        <h2 style={{ fontSize: '1.25rem', color: 'var(--navy-900)', marginTop: '28px', marginBottom: '20px', paddingTop: '20px', borderTop: '1px solid var(--line)' }}>
          Tracking &amp; Verification
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          <div className="field">
            <label style={{ fontSize: '0.88rem', fontWeight: 600 }}>Google Analytics (GA4) ID</label>
            <input
              type="text"
              value={settings.ga_id || ''}
              onChange={(e) => setSettings({ ...settings, ga_id: e.target.value })}
              placeholder="e.g. G-XXXXXXXXXX"
            />
          </div>

          <div className="field">
            <label style={{ fontSize: '0.88rem', fontWeight: 600 }}>Google Search Console Tag</label>
            <input
              type="text"
              value={settings.gsc_tag || ''}
              onChange={(e) => setSettings({ ...settings, gsc_tag: e.target.value })}
              placeholder="e.g. google-site-verification token"
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem' }}>
            <Link href="/sitemap.xml" target="_blank" className="link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ExternalLink size={14} /> View sitemap.xml
            </Link>
            <Link href="/robots.txt" target="_blank" className="link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ExternalLink size={14} /> View robots.txt
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving || loading}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
            <span>Save SEO Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
