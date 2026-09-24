'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Inbox, Search, Filter, Download, Mail, Globe, MapPin, Briefcase, X } from 'lucide-react';
import { format } from 'date-fns';

interface Submission {
  id: string;
  name: string;
  firm: string;
  email: string;
  country: string;
  role: string;
  website: string | null;
  need: string;
  workload: string | null;
  support_structure: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const supabase = createClient();
    await supabase.from('contact_submissions').update({ status: newStatus }).eq('id', id);
    if (selectedSub && selectedSub.id === id) {
      setSelectedSub({ ...selectedSub, status: newStatus });
    }
    loadSubmissions();
  };

  const exportToCSV = () => {
    if (submissions.length === 0) return;
    const headers = ['Date', 'Name', 'Firm', 'Email', 'Country', 'Role', 'Need', 'Workload', 'Status'];
    const rows = submissions.map((s) => [
      format(new Date(s.created_at), 'yyyy-MM-dd HH:mm'),
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.firm.replace(/"/g, '""')}"`,
      s.email,
      s.country,
      `"${s.role.replace(/"/g, '""')}"`,
      `"${s.need.replace(/"/g, '""')}"`,
      `"${(s.workload || '').replace(/"/g, '""')}"`,
      s.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CredTax-Inquiries-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = submissions.filter((s) => {
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(q) ||
      s.firm.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.need.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--navy-900)', marginBottom: '4px' }}>
            Form Inquiries &amp; Leads
          </h1>
          <p className="muted" style={{ margin: 0 }}>
            Inbound prospective client inquiries received through the public Contact page.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={exportToCSV}
          disabled={submissions.length === 0}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Download size={16} /> Export to CSV
        </button>
      </div>

      {/* Toolbar */}
      <div
        style={{
          background: '#fff',
          border: '1px solid var(--line)',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '240px' }}>
          <Search size={18} color="var(--muted)" />
          <input
            type="text"
            placeholder="Search by name, firm, email or need..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.95rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} color="var(--muted)" />
          <span style={{ fontSize: '0.86rem', color: 'var(--muted)' }}>Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: '4px',
              border: '1px solid var(--line)',
              fontSize: '0.88rem',
              background: '#fff',
              color: 'var(--navy-900)',
            }}
          >
            <option value="all">All ({submissions.length})</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
          <thead>
            <tr style={{ background: 'var(--mist)', borderBottom: '1px solid var(--line)', color: 'var(--navy-900)', fontSize: '0.85rem' }}>
              <th style={{ padding: '14px 18px' }}>RECEIVED</th>
              <th style={{ padding: '14px 18px' }}>CONTACT &amp; FIRM</th>
              <th style={{ padding: '14px 18px' }}>ROLE / LOCATION</th>
              <th style={{ padding: '14px 18px' }}>PRIMARY NEED</th>
              <th style={{ padding: '14px 18px' }}>STATUS</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: 'var(--muted)' }}>
                  Loading leads...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: 'var(--muted)' }}>
                  No matching inquiries found.
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--line)', fontSize: '0.92rem' }}>
                  <td style={{ padding: '14px 18px', color: 'var(--muted)', fontSize: '0.84rem' }}>
                    {format(new Date(s.created_at), 'MMM d, yyyy')}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <strong style={{ color: 'var(--navy-900)', display: 'block' }}>{s.name}</strong>
                    <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                      {s.firm} • {s.email}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span>{s.role}</span>
                    <span style={{ display: 'block', fontSize: '0.82rem', color: 'var(--muted)' }}>{s.country}</span>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '99px',
                        background: 'var(--mist-2)',
                        color: 'var(--navy-900)',
                      }}
                    >
                      {s.need}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <select
                      aria-label="Submission status"
                      value={s.status}
                      onChange={(e) => updateStatus(s.id, e.target.value)}
                      style={{
                        fontSize: '0.8rem',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid var(--line)',
                        fontWeight: 600,
                        background: s.status === 'new' ? '#EFF6FF' : s.status === 'contacted' ? '#ECFDF5' : '#F3F4F6',
                        color: s.status === 'new' ? '#1E40AF' : s.status === 'contacted' ? '#065F46' : '#4B5563',
                      }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 10px', fontSize: '0.82rem' }}
                      onClick={() => setSelectedSub(s)}
                    >
                      View Lead
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Slideover Modal */}
      {selectedSub && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'flex-end',
            zIndex: 50,
          }}
          onClick={() => setSelectedSub(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              background: '#fff',
              height: '100%',
              padding: '32px',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-900)', margin: 0 }}>Lead Inquiry Details</h2>
              <button
                type="button"
                onClick={() => setSelectedSub(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <span className="pill" style={{ textTransform: 'capitalize' }}>
                Status: {selectedSub.status}
              </span>
              <h3 style={{ fontSize: '1.4rem', marginTop: '12px', marginBottom: '4px' }}>{selectedSub.name}</h3>
              <p className="muted" style={{ margin: 0 }}>
                {selectedSub.firm} • {selectedSub.role}
              </p>
            </div>

            <div style={{ display: 'grid', gap: '14px', marginBottom: '24px', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="var(--accent)" />
                <a href={`mailto:${selectedSub.email}`} className="link">
                  {selectedSub.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="var(--accent)" />
                <span>{selectedSub.country}</span>
              </div>
              {selectedSub.website && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe size={16} color="var(--accent)" />
                  <a href={selectedSub.website} target="_blank" rel="noopener noreferrer" className="link">
                    {selectedSub.website}
                  </a>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase size={16} color="var(--accent)" />
                <span>Primary Need: <strong>{selectedSub.need}</strong></span>
              </div>
              {selectedSub.workload && (
                <div>
                  <span className="muted">Estimated Workload: </span>
                  <span>{selectedSub.workload}</span>
                </div>
              )}
              {selectedSub.support_structure && (
                <div>
                  <span className="muted">Current Structure: </span>
                  <span>{selectedSub.support_structure}</span>
                </div>
              )}
            </div>

            {selectedSub.message && (
              <div style={{ background: 'var(--mist)', padding: '16px', borderRadius: '6px', marginBottom: '24px' }}>
                <strong style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Message from Firm:</strong>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>{selectedSub.message}</p>
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', display: 'flex', gap: '12px' }}>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => updateStatus(selectedSub.id, 'contacted')}
                style={{ flex: 1, background: '#059669' }}
              >
                Mark Contacted
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => updateStatus(selectedSub.id, 'archived')}
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
