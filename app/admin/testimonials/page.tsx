'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Edit2, Trash2, Check, X, Star, CheckCircle2, AlertCircle } from 'lucide-react';

interface Testimonial {
  id: string;
  client_name: string;
  client_title: string;
  firm_name: string | null;
  quote: string;
  avatar_url: string | null;
  rating: number;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formFirm, setFormFirm] = useState('');
  const [formQuote, setFormQuote] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formOrder, setFormOrder] = useState(0);
  const [formActive, setFormActive] = useState(true);

  // Notifications
  const [modalError, setModalError] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastError, setToastError] = useState('');

  const showToast = (msg: string, isErr = false) => {
    if (isErr) {
      setToastError(msg);
      setTimeout(() => setToastError(''), 4000);
    } else {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      // Fetch via API route
      const res = await fetch('/api/testimonials');
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.testimonials || []);
      } else {
        // Fallback to client Supabase
        const supabase = createClient();
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setTestimonials(data || []);
      }
    } catch (err: unknown) {
      console.error('Error fetching testimonials:', err);
      showToast('Failed to load testimonials. Please refresh.', true);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setFormName('');
    setFormTitle('Partner / CPA');
    setFormFirm('US CPA Practice');
    setFormQuote('');
    setFormRating(5);
    setFormOrder(testimonials.length + 1);
    setFormActive(true);
    setModalError('');
    setShowModal(true);
  };

  const openEditModal = (item: Testimonial) => {
    setEditingItem(item);
    setFormName(item.client_name || '');
    setFormTitle(item.client_title || '');
    setFormFirm(item.firm_name || '');
    setFormQuote(item.quote || '');
    setFormRating(item.rating || 5);
    setFormOrder(item.display_order ?? 0);
    setFormActive(Boolean(item.is_active));
    setModalError('');
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setModalError('');

    const payload = {
      client_name: formName.trim(),
      client_title: formTitle.trim(),
      firm_name: formFirm.trim() || null,
      quote: formQuote.trim(),
      rating: Number(formRating) || 5,
      display_order: Number(formOrder) || 0,
      is_active: Boolean(formActive),
    };

    if (!payload.client_name || !payload.client_title || !payload.quote) {
      setModalError('Client name, title, and quote are required.');
      setSaving(false);
      return;
    }

    try {
      if (editingItem) {
        // 1. Try server API PUT
        const res = await fetch('/api/testimonials', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingItem.id, ...payload }),
        });

        const result = await res.json();
        if (!res.ok) {
          // If API returns error, attempt direct supabase update with active session
          const supabase = createClient();
          const { error: directErr } = await supabase
            .from('testimonials')
            .update(payload)
            .eq('id', editingItem.id);

          if (directErr) {
            throw new Error(result.error || directErr.message || 'Failed to update testimonial.');
          }
        }
        showToast('Testimonial updated successfully!');
      } else {
        // 2. Try server API POST
        const res = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const result = await res.json();
        if (!res.ok) {
          const supabase = createClient();
          const { error: directErr } = await supabase.from('testimonials').insert([payload]);
          if (directErr) {
            throw new Error(result.error || directErr.message || 'Failed to add testimonial.');
          }
        }
        showToast('Testimonial added successfully!');
      }

      setShowModal(false);
      loadTestimonials();
    } catch (err: unknown) {
      console.error('Failed to save testimonial:', err);
      setModalError((err as Error).message || 'Failed to save testimonial.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/testimonials?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const supabase = createClient();
        const { error } = await supabase.from('testimonials').delete().eq('id', id);
        if (error) throw error;
      }

      showToast('Testimonial deleted successfully.');
      loadTestimonials();
    } catch (err: unknown) {
      console.error('Error deleting testimonial:', err);
      showToast((err as Error).message || 'Failed to delete testimonial.', true);
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch('/api/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_active: !current }),
      });

      if (!res.ok) {
        const supabase = createClient();
        const { error } = await supabase.from('testimonials').update({ is_active: !current }).eq('id', id);
        if (error) throw error;
      }

      showToast(`Testimonial is now ${!current ? 'active' : 'inactive'}.`);
      loadTestimonials();
    } catch (err: unknown) {
      console.error('Error toggling active state:', err);
      showToast((err as Error).message || 'Failed to toggle visibility.', true);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', marginInline: 'auto' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--navy-900)', marginBottom: '4px' }}>
            Client Testimonials
          </h1>
          <p className="muted" style={{ margin: 0, fontSize: '0.95rem' }}>
            Manage client quotes and reviews displayed on the public website homepage.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={openCreateModal}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 18px', fontSize: '0.9rem' }}
        >
          <Plus size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Toast Notifications */}
      {toastMessage && (
        <div
          style={{
            padding: '12px 18px',
            background: '#ECFDF5',
            border: '1.5px solid #10B981',
            borderRadius: '6px',
            color: '#065F46',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 500,
          }}
        >
          <CheckCircle2 size={18} style={{ color: '#10B981' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {toastError && (
        <div
          style={{
            padding: '12px 18px',
            background: '#FEF2F2',
            border: '1.5px solid #EF4444',
            borderRadius: '6px',
            color: '#991B1B',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 500,
          }}
        >
          <AlertCircle size={18} style={{ color: '#EF4444' }} />
          <span>{toastError}</span>
        </div>
      )}

      {loading ? (
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          <p className="muted" style={{ fontWeight: 600 }}>Loading testimonials...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', padding: '48px 24px', textAlign: 'center' }}>
          <p className="muted" style={{ fontSize: '1.05rem', marginBottom: '16px' }}>
            No testimonials found. Add your first client review!
          </p>
          <button type="button" className="btn btn-primary btn-sm" onClick={openCreateModal}>
            Add Testimonial
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
          {testimonials.map((t) => (
            <div
              key={t.id}
              style={{
                background: '#fff',
                border: '1px solid var(--line)',
                borderRadius: '8px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: t.is_active ? 1 : 0.65,
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                transition: 'all 0.2s',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>
                      Order: {t.display_order ?? 0}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleActive(t.id, t.is_active)}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 650,
                        padding: '3px 10px',
                        borderRadius: '99px',
                        border: 'none',
                        cursor: 'pointer',
                        background: t.is_active ? '#ECFDF5' : '#F3F4F6',
                        color: t.is_active ? '#065F46' : '#6B7280',
                      }}
                      title="Click to toggle visibility"
                    >
                      {t.is_active ? '✓ Active' : '✕ Inactive'}
                    </button>
                  </div>
                </div>

                <blockquote style={{ fontSize: '0.98rem', fontStyle: 'italic', margin: '0 0 18px 0', color: 'var(--ink)', lineHeight: 1.55 }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              <div>
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.94rem', color: 'var(--navy-900)' }}>
                      {t.client_name}
                    </strong>
                    <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                      {t.client_title}{t.firm_name ? ` • ${t.firm_name}` : ''}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      aria-label="Edit testimonial"
                      onClick={() => openEditModal(t)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 10px',
                        background: '#F0F9FF',
                        border: '1px solid #BAE6FD',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#0284C7',
                      }}
                    >
                      <Edit2 size={13} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      aria-label="Delete testimonial"
                      onClick={() => handleDelete(t.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '6px 8px',
                        background: '#FEF2F2',
                        border: '1px solid #FECACA',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={13} color="#DC2626" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(24, 57, 65, 0.6)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 60,
            padding: '20px',
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '560px',
              background: '#fff',
              borderRadius: '8px',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              maxHeight: '92vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--navy-900)', margin: 0 }}>
                {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            {modalError && (
              <div
                style={{
                  padding: '10px 14px',
                  background: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  borderRadius: '6px',
                  color: '#991B1B',
                  fontSize: '0.88rem',
                  marginBottom: '16px',
                  fontWeight: 500,
                }}
              >
                {modalError}
              </div>
            )}

            <form onSubmit={handleSave}>
              <div className="field" style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 650 }}>Client Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. David M., CPA"
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--line)', borderRadius: '6px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div className="field">
                  <label style={{ fontSize: '0.88rem', fontWeight: 650 }}>Title / Role *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Managing Partner"
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--line)', borderRadius: '6px' }}
                  />
                </div>
                <div className="field">
                  <label style={{ fontSize: '0.88rem', fontWeight: 650 }}>Firm / Practice</label>
                  <input
                    type="text"
                    value={formFirm}
                    onChange={(e) => setFormFirm(e.target.value)}
                    placeholder="e.g. US CPA Firm (California)"
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--line)', borderRadius: '6px' }}
                  />
                </div>
              </div>

              {/* Star Rating Picker */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 650, color: 'var(--navy-900)', marginBottom: '6px' }}>
                  Rating (Stars):
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormRating(star)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      title={`${star} Star${star > 1 ? 's' : ''}`}
                    >
                      <Star
                        size={22}
                        fill={star <= formRating ? '#F59E0B' : '#E5E7EB'}
                        color={star <= formRating ? '#F59E0B' : '#D1D5DB'}
                      />
                    </button>
                  ))}
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)', marginLeft: '6px' }}>
                    {formRating} of 5 Stars
                  </span>
                </div>
              </div>

              <div className="field" style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 650 }}>Quote Content *</label>
                <textarea
                  rows={4}
                  required
                  value={formQuote}
                  onChange={(e) => setFormQuote(e.target.value)}
                  placeholder="What was the client's experience with CredTax?"
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line)', borderRadius: '6px', fontSize: '0.92rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: 650 }}>Display Order:</label>
                  <input
                    type="number"
                    min="0"
                    value={formOrder}
                    onChange={(e) => setFormOrder(parseInt(e.target.value, 10) || 0)}
                    style={{ width: '70px', padding: '6px 10px', border: '1px solid var(--line)', borderRadius: '4px' }}
                  />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={formActive}
                    onChange={(e) => setFormActive(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--navy-900)' }}
                  />
                  <span>Visible on Homepage</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={saving}
                  style={{ minWidth: '120px' }}
                >
                  {saving ? 'Saving...' : editingItem ? 'Save Changes' : 'Add Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
