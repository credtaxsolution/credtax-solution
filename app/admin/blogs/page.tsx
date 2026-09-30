'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Plus, Edit2, Trash2, ExternalLink, X, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import { RichTextEditor } from '@/components/RichTextEditor';

interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  read_time: string;
  is_published: boolean;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Blog | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState('Tax operations');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCoverImage, setFormCoverImage] = useState('');
  const [formReadTime, setFormReadTime] = useState('5 min read');
  const [formPublished, setFormPublished] = useState(true);
  const [formMetaTitle, setFormMetaTitle] = useState('');
  const [formMetaDesc, setFormMetaDesc] = useState('');
  const [uploadingCover, setUploadingCover] = useState(false);

  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const autoSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const uploadImageToSupabase = async (file: File): Promise<string> => {
    const supabase = createClient();
    const fileExt = file.name.split('.').pop() || 'png';
    const cleanName = file.name
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    const fileName = `${Date.now()}-${cleanName}.${fileExt}`;
    const filePath = `articles/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingCover(true);
      const url = await uploadImageToSupabase(file);
      setFormCoverImage(url);
    } catch (err: any) {
      console.error('Failed to upload cover image:', err);
      alert('Failed to upload image: ' + (err?.message || 'Unknown error'));
    } finally {
      setUploadingCover(false);
      if (coverInputRef.current) coverInputRef.current.value = '';
    }
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setFormTitle('');
    setFormSlug('');
    setFormCategory('Tax operations');
    setFormExcerpt('');
    setFormContent('');
    setFormCoverImage('');
    setFormReadTime('5 min read');
    setFormPublished(true);
    setFormMetaTitle('');
    setFormMetaDesc('');
    setShowModal(true);
  };

  const openEditModal = (item: Blog) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormSlug(item.slug);
    setFormCategory(item.category);
    setFormExcerpt(item.excerpt);
    setFormContent(item.content);
    setFormCoverImage(item.cover_image || '');
    setFormReadTime(item.read_time);
    setFormPublished(item.is_published);
    setFormMetaTitle(item.meta_title || '');
    setFormMetaDesc(item.meta_description || '');
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();

    const payload = {
      title: formTitle,
      slug: formSlug || autoSlug(formTitle),
      category: formCategory,
      excerpt: formExcerpt,
      content: formContent,
      cover_image: formCoverImage || null,
      read_time: formReadTime,
      is_published: formPublished,
      published_at: formPublished ? new Date().toISOString() : null,
      meta_title: formMetaTitle || formTitle,
      meta_description: formMetaDesc || formExcerpt,
      updated_at: new Date().toISOString(),
    };

    if (editingItem) {
      await supabase.from('blogs').update(payload).eq('id', editingItem.id);
    } else {
      await supabase.from('blogs').insert([payload]);
    }

    setShowModal(false);
    loadBlogs();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    const supabase = createClient();
    await supabase.from('blogs').delete().eq('id', id);
    loadBlogs();
  };

  const togglePublish = async (id: string, current: boolean) => {
    const supabase = createClient();
    await supabase
      .from('blogs')
      .update({
        is_published: !current,
        published_at: !current ? new Date().toISOString() : null,
      })
      .eq('id', id);
    loadBlogs();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--navy-900)', marginBottom: '4px' }}>
            Blogs &amp; Operational Insights
          </h1>
          <p className="muted" style={{ margin: 0 }}>
            Create and edit thought-leadership articles to boost CPA-firm SEO and client authority.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={openCreateModal}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> New Article
        </button>
      </div>

      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '750px' }}>
          <thead>
            <tr style={{ background: 'var(--mist)', borderBottom: '1px solid var(--line)', color: 'var(--navy-900)', fontSize: '0.85rem' }}>
              <th style={{ padding: '14px 18px' }}>TITLE &amp; SLUG</th>
              <th style={{ padding: '14px 18px' }}>CATEGORY</th>
              <th style={{ padding: '14px 18px' }}>COVER</th>
              <th style={{ padding: '14px 18px' }}>READ TIME</th>
              <th style={{ padding: '14px 18px' }}>STATUS</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: 'var(--muted)' }}>
                  Loading articles...
                </td>
              </tr>
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: 'var(--muted)' }}>
                  No articles yet. Click &quot;New Article&quot; to publish your first post!
                </td>
              </tr>
            ) : (
              blogs.map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid var(--line)', fontSize: '0.92rem' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <strong style={{ color: 'var(--navy-900)', display: 'block' }}>{b.title}</strong>
                    <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>/insights/{b.slug}</span>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, padding: '3px 8px', borderRadius: '99px', background: 'var(--mist-2)', color: 'var(--navy-900)' }}>
                      {b.category}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    {b.cover_image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={b.cover_image}
                        alt="Cover"
                        style={{ width: '48px', height: '32px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--line)' }}
                      />
                    ) : (
                      <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>None</span>
                    )}
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--muted)', fontSize: '0.86rem' }}>
                    {b.read_time}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span
                      onClick={() => togglePublish(b.id, b.is_published)}
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 650,
                        padding: '3px 8px',
                        borderRadius: '99px',
                        cursor: 'pointer',
                        background: b.is_published ? '#ECFDF5' : '#F3F4F6',
                        color: b.is_published ? '#065F46' : '#6B7280',
                      }}
                    >
                      {b.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <Link
                        href={`/insights/${b.slug}`}
                        target="_blank"
                        aria-label="View public article"
                        style={{ padding: '6px', border: '1px solid var(--line)', borderRadius: '4px', color: 'var(--accent)' }}
                      >
                        <ExternalLink size={14} />
                      </Link>
                      <button
                        type="button"
                        aria-label="Edit article"
                        onClick={() => openEditModal(b)}
                        style={{ padding: '6px', background: 'none', border: '1px solid var(--line)', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        <Edit2 size={14} color="var(--accent)" />
                      </button>
                      <button
                        type="button"
                        aria-label="Delete article"
                        onClick={() => handleDelete(b.id)}
                        style={{ padding: '6px', background: 'none', border: '1px solid #FECACA', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        <Trash2 size={14} color="#DC2626" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Editor Modal */}
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
              maxWidth: '820px',
              maxHeight: '92vh',
              overflowY: 'auto',
              background: '#fff',
              borderRadius: '10px',
              padding: '32px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.4rem', margin: 0, color: 'var(--navy-900)' }}>
                {editingItem ? 'Edit Article' : 'Create Article'}
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
                <label style={{ fontSize: '0.88rem' }}>Article Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => {
                    setFormTitle(e.target.value);
                    if (!editingItem) setFormSlug(autoSlug(e.target.value));
                  }}
                  placeholder="e.g. 5 Common Tax Preparation Bottlenecks"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div className="field">
                  <label style={{ fontSize: '0.88rem' }}>URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="e.g. 5-tax-preparation-bottlenecks"
                  />
                </div>
                <div className="field">
                  <label style={{ fontSize: '0.88rem' }}>Category *</label>
                  <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)}>
                    <option value="Tax operations">Tax operations</option>
                    <option value="Outsourcing">Outsourcing</option>
                    <option value="Capacity">Capacity</option>
                    <option value="Workflow">Workflow</option>
                    <option value="Bookkeeping">Bookkeeping</option>
                  </select>
                </div>
              </div>

              {/* Cover / Featured Image Upload */}
              <div className="field" style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 600 }}>Featured Cover Image</label>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleCoverUpload}
                />
                
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '6px' }}>
                  {formCoverImage ? (
                    <div style={{ position: 'relative', width: '140px', height: '80px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--line)', flexShrink: 0 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formCoverImage}
                        alt="Cover Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        title="Remove cover image"
                        onClick={() => setFormCoverImage('')}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: 'rgba(0,0,0,0.6)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'grid',
                          placeItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : null}

                  <div style={{ flex: 1 }}>
                    <button
                      type="button"
                      disabled={uploadingCover}
                      onClick={() => coverInputRef.current?.click()}
                      className="btn btn-secondary"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '7px 14px',
                        fontSize: '0.86rem',
                        marginBottom: '8px',
                      }}
                    >
                      {uploadingCover ? <Loader2 size={15} className="spin" /> : <Upload size={15} />}
                      <span>{formCoverImage ? 'Change Image' : 'Upload Cover Image'}</span>
                    </button>
                    <input
                      type="text"
                      value={formCoverImage}
                      onChange={(e) => setFormCoverImage(e.target.value)}
                      placeholder="Or paste image URL (https://...)"
                      style={{ fontSize: '0.82rem', padding: '6px 10px' }}
                    />
                  </div>
                </div>
              </div>

              <div className="field" style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.88rem' }}>Excerpt (Summary) *</label>
                <textarea
                  rows={2}
                  required
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="One or two sentences summarizing the key takeaway..."
                />
              </div>

              {/* Rich Text Editor for Article Content */}
              <div className="field" style={{ marginBottom: '18px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                  <span>Article Content (Rich Text) *</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 400 }}>
                    Formatting toolbar &amp; inline image uploads supported
                  </span>
                </label>
                <RichTextEditor
                  value={formContent}
                  onChange={setFormContent}
                  onImageUpload={uploadImageToSupabase}
                  placeholder="Compose your article with headings, lists, quotes, and inline images..."
                />
              </div>

              {/* SEO Overrides */}
              <div style={{ background: 'var(--mist)', padding: '16px', borderRadius: '6px', marginBottom: '20px' }}>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--navy-900)', marginBottom: '8px' }}>
                  SEO Meta Settings (Optional)
                </strong>
                <div className="field" style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '0.8rem' }}>Custom Meta Title</label>
                  <input
                    type="text"
                    value={formMetaTitle}
                    onChange={(e) => setFormMetaTitle(e.target.value)}
                    placeholder="Defaults to article title"
                    style={{ fontSize: '0.88rem', padding: '6px' }}
                  />
                </div>
                <div className="field">
                  <label style={{ fontSize: '0.8rem' }}>Custom Meta Description</label>
                  <input
                    type="text"
                    value={formMetaDesc}
                    onChange={(e) => setFormMetaDesc(e.target.value)}
                    placeholder="Defaults to excerpt"
                    style={{ fontSize: '0.88rem', padding: '6px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={formPublished}
                    onChange={(e) => setFormPublished(e.target.checked)}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span>Publish Immediately (Visible to Public)</span>
                </label>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Read time:</span>
                  <input
                    type="text"
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(e.target.value)}
                    style={{ width: '100px', padding: '4px 6px', border: '1px solid var(--line)', borderRadius: '4px', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
