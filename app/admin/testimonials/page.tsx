'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Edit2, Trash2, Check, X, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  client_name: string;
  client_title: string;
  firm_name: string;
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
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  const [formName, setFormName] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formFirm, setFormFirm] = useState('');
  const [formQuote, setFormQuote] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formOrder, setFormOrder] = useState(0);
  const [formActive, setFormActive] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
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
    setShowModal(true);
  };

  const openEditModal = (item: Testimonial) => {
    setEditingItem(item);
    setFormName(item.client_name);
    setFormTitle(item.client_title);
    setFormFirm(item.firm_name);
    setFormQuote(item.quote);
    setFormRating(item.rating);
    setFormOrder(item.display_order);
    setFormActive(item.is_active);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();

    const payload = {
      client_name: formName,
      client_title: formTitle,
      firm_name: formFirm,
      quote: formQuote,
      rating: formRating,
      display_order: formOrder,
      is_active: formActive,
    };

    if (editingItem) {
      await supabase.from('testimonials').update(payload).eq('id', editingItem.id);
    } else {
      await supabase.from('testimonials').insert([payload]);
    }

    setShowModal(false);
    loadTestimonials();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    const supabase = createClient();
    await supabase.from('testimonials').delete().eq('id', id);
    loadTestimonials();
  };

  const toggleActive = async (id: string, current: boolean) => {
    const supabase = createClient();
    await supabase.from('testimonials').update({ is_active: !current }).eq('id', id);
    loadTestimonials();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--navy-900)', marginBottom: '4px' }}>
            Client Testimonials
          </h1>
          <p className="muted" style={{ margin: 0 }}>
            Manage client quotes displayed on the public homepage.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={openCreateModal}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <p className="muted">Loading testimonials...</p>
      ) : testimonials.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', padding: '40px', textAlign: 'center' }}>
          <p className="muted">No testimonials found. Add your first client review!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
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
                opacity: t.is_active ? 1 : 0.6,
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <span
                    onClick={() => toggleActive(t.id, t.is_active)}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 650,
                      padding: '3px 8px',
                      borderRadius: '99px',
                      cursor: 'pointer',
                      background: t.is_active ? '#ECFDF5' : '#F3F4F6',
                      color: t.is_active ? '#065F46' : '#6B7280',
                    }}
                  >
                    {t.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <blockquote style={{ fontSize: '1rem', fontStyle: 'italic', margin: '0 0 16px 0', color: 'var(--ink)' }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              <div>
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--navy-900)' }}>{t.client_name}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                      {t.client_title}, {t.firm_name}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      aria-label="Edit testimonial"
                      onClick={() => openEditModal(t)}
                      style={{ padding: '6px', background: 'none', border: '1px solid var(--line)', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <Edit2 size={14} color="var(--accent)" />
                    </button>
                    <button
                      type="button"
                      aria-label="Delete testimonial"
                      onClick={() => handleDelete(t.id)}
                      style={{ padding: '6px', background: 'none', border: '1px solid #FECACA', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} color="#DC2626" />
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
            background: 'rgba(0,0,0,0.5)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 50,
            padding: '20px',
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '540px',
              background: '#fff',
              borderRadius: '8px',
              padding: '28px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem', margin: 0 }}>
                {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="field" style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.88rem' }}>Client Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. David M., CPA"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div className="field">
                  <label style={{ fontSize: '0.88rem' }}>Title / Role *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Managing Partner"
                  />
                </div>
                <div className="field">
                  <label style={{ fontSize: '0.88rem' }}>Firm / Location *</label>
                  <input
                    type="text"
                    required
                    value={formFirm}
                    onChange={(e) => setFormFirm(e.target.value)}
                    placeholder="e.g. US CPA Firm (California)"
                  />
                </div>
              </div>

              <div className="field" style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.88rem' }}>Quote Content *</label>
                <textarea
                  rows={4}
                  required
                  value={formQuote}
                  onChange={(e) => setFormQuote(e.target.value)}
                  placeholder="What was the client's experience with CredTax?"
                />
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <label style={{ fontSize: '0.88rem' }}>Order:</label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    style={{ width: '60px', padding: '4px 6px', border: '1px solid var(--line)', borderRadius: '4px' }}
                  />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={formActive}
                    onChange={(e) => setFormActive(e.target.checked)}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span>Visible on Homepage</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
