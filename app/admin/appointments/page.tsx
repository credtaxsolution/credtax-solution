'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Calendar as CalendarIcon, List, Search, Filter, Phone, Mail, Clock, FileText, Check, X, CalendarCheck } from 'lucide-react';
import { format } from 'date-fns';

interface Appointment {
  id: string;
  client_name: string;
  firm_name: string | null;
  email: string;
  phone: string | null;
  service_type: string;
  services_interested: string[] | null;
  workload: string | null;
  message: string | null;
  appointment_date: string;
  start_time: string;
  end_time: string;
  timezone: string;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);
  const [notesDraft, setNotesDraft] = useState<string>('');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const supabase = createClient();
    await supabase.from('appointments').update({ status: newStatus }).eq('id', id);
    if (selectedApt && selectedApt.id === id) {
      setSelectedApt({ ...selectedApt, status: newStatus });
    }
    loadAppointments();
  };

  const saveAdminNotes = async () => {
    if (!selectedApt) return;
    const supabase = createClient();
    await supabase.from('appointments').update({ admin_notes: notesDraft }).eq('id', selectedApt.id);
    setSelectedApt({ ...selectedApt, admin_notes: notesDraft });
    loadAppointments();
  };

  // Filter & Search
  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      apt.client_name.toLowerCase().includes(q) ||
      (apt.firm_name && apt.firm_name.toLowerCase().includes(q)) ||
      apt.email.toLowerCase().includes(q) ||
      apt.service_type.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--navy-900)', marginBottom: '4px' }}>
            Appointment Bookings
          </h1>
          <p className="muted" style={{ margin: 0 }}>
            Track client discovery sessions, manage consultation statuses, and view client details.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/admin/availability"
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', padding: '8px 16px' }}
          >
            <CalendarCheck size={16} />
            <span>Manage Available Dates &amp; Times &rarr;</span>
          </Link>

          {/* View mode toggle */}
          <div style={{ display: 'flex', border: '1px solid var(--line)', borderRadius: '6px', overflow: 'hidden', background: '#fff' }}>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              border: 'none',
              background: viewMode === 'table' ? 'var(--navy-900)' : 'transparent',
              color: viewMode === 'table' ? '#fff' : 'var(--navy-900)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <List size={16} /> Table View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('calendar')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              border: 'none',
              background: viewMode === 'calendar' ? 'var(--navy-900)' : 'transparent',
              color: viewMode === 'calendar' ? '#fff' : 'var(--navy-900)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <CalendarIcon size={16} /> Calendar View
          </button>
        </div>
      </div>
    </div>

      {/* Filter and Search Toolbar */}
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
            placeholder="Search by client, firm, email or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '0.95rem',
              color: 'var(--ink)',
            }}
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
              fontWeight: 500,
            }}
          >
            <option value="all">All ({appointments.length})</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div
          style={{
            background: '#fff',
            border: '1px solid var(--line)',
            borderRadius: '8px',
            overflowX: 'auto',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ background: 'var(--mist)', borderBottom: '1px solid var(--line)', color: 'var(--navy-900)', fontSize: '0.85rem' }}>
                <th style={{ padding: '14px 18px' }}>CLIENT / FIRM</th>
                <th style={{ padding: '14px 18px' }}>DATE &amp; TIME</th>
                <th style={{ padding: '14px 18px' }}>SERVICE FOCUS</th>
                <th style={{ padding: '14px 18px' }}>STATUS</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: 'var(--muted)' }}>
                    Loading appointments...
                  </td>
                </tr>
              ) : filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: 'var(--muted)' }}>
                    No matching appointments found.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => (
                  <tr
                    key={apt.id}
                    style={{ borderBottom: '1px solid var(--line)', fontSize: '0.92rem' }}
                  >
                    <td style={{ padding: '14px 18px' }}>
                      <strong style={{ color: 'var(--navy-900)', display: 'block' }}>{apt.client_name}</strong>
                      <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                        {apt.firm_name || 'Individual Firm'} • {apt.email}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ fontWeight: 600 }}>{apt.appointment_date}</span>
                      <span style={{ display: 'block', fontSize: '0.82rem', color: 'var(--muted)' }}>
                        {apt.start_time} ({apt.timezone.split('/')[1] || 'UTC'})
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span
                        style={{
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '99px',
                          background: 'var(--mist-2)',
                          color: 'var(--navy-900)',
                        }}
                      >
                        {apt.service_type}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <select
                        aria-label="Appointment status"
                        value={apt.status}
                        onChange={(e) => updateStatus(apt.id, e.target.value)}
                        style={{
                          fontSize: '0.82rem',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: '1px solid var(--line)',
                          fontWeight: 600,
                          background:
                            apt.status === 'confirmed'
                              ? '#ECFDF5'
                              : apt.status === 'completed'
                              ? '#EFF6FF'
                              : apt.status === 'cancelled'
                              ? '#FEF2F2'
                              : '#FFFBEB',
                          color:
                            apt.status === 'confirmed'
                              ? '#065F46'
                              : apt.status === 'completed'
                              ? '#1E40AF'
                              : apt.status === 'cancelled'
                              ? '#991B1B'
                              : '#92400E',
                        }}
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 10px', fontSize: '0.82rem' }}
                        onClick={() => {
                          setSelectedApt(apt);
                          setNotesDraft(apt.admin_notes || '');
                        }}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Calendar Grid View */}
      {viewMode === 'calendar' && (
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', padding: '24px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Upcoming Scheduled Days</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                onClick={() => {
                  setSelectedApt(apt);
                  setNotesDraft(apt.admin_notes || '');
                }}
                style={{
                  padding: '16px',
                  borderRadius: '6px',
                  border: '1px solid var(--line)',
                  borderLeft: '4px solid var(--navy-900)',
                  cursor: 'pointer',
                  background: '#fff',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '4px' }}>
                  {apt.appointment_date} @ {apt.start_time}
                </div>
                <strong style={{ fontSize: '0.98rem', display: 'block' }}>{apt.client_name}</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted)', display: 'block' }}>
                  {apt.firm_name || 'Individual CPA'}
                </span>
                <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600 }}>{apt.service_type}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 650, color: apt.status === 'confirmed' ? '#059669' : '#D97706' }}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Slideover / Modal */}
      {selectedApt && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'flex-end',
            zIndex: 50,
          }}
          onClick={() => setSelectedApt(null)}
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
              <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-900)', margin: 0 }}>Booking Details</h2>
              <button
                type="button"
                onClick={() => setSelectedApt(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <span className="pill" style={{ textTransform: 'capitalize' }}>
                Status: {selectedApt.status}
              </span>
              <h3 style={{ fontSize: '1.4rem', marginTop: '12px', marginBottom: '4px' }}>{selectedApt.client_name}</h3>
              <p className="muted" style={{ margin: 0 }}>
                {selectedApt.firm_name || 'Independent Firm'}
              </p>
            </div>

            <div style={{ display: 'grid', gap: '14px', marginBottom: '24px', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="var(--accent)" />
                <strong>
                  {selectedApt.appointment_date} at {selectedApt.start_time} ({selectedApt.timezone})
                </strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="var(--accent)" />
                <a href={`mailto:${selectedApt.email}`} className="link">
                  {selectedApt.email}
                </a>
              </div>
              {selectedApt.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} color="var(--accent)" />
                  <a href={`tel:${selectedApt.phone}`} className="link">
                    {selectedApt.phone}
                  </a>
                </div>
              )}
              <div>
                <span className="muted">Primary Consultation: </span>
                <strong>{selectedApt.service_type}</strong>
              </div>
              {selectedApt.services_interested && selectedApt.services_interested.length > 0 && (
                <div>
                  <span className="muted">Interested Services: </span>
                  <span>{selectedApt.services_interested.join(', ')}</span>
                </div>
              )}
              {selectedApt.workload && (
                <div>
                  <span className="muted">Approximate Workload: </span>
                  <span>{selectedApt.workload}</span>
                </div>
              )}
            </div>

            {selectedApt.message && (
              <div style={{ marginBottom: '24px', background: 'var(--mist)', padding: '14px', borderRadius: '6px' }}>
                <strong style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Client Message:</strong>
                <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: '1.5' }}>{selectedApt.message}</p>
              </div>
            )}

            {/* Admin Notes Section */}
            <div style={{ marginBottom: '28px' }}>
              <label htmlFor="adminNotesText" style={{ display: 'block', fontWeight: 650, fontSize: '0.88rem', marginBottom: '6px', color: 'var(--navy-900)' }}>
                Internal Admin Notes (Private)
              </label>
              <textarea
                id="adminNotesText"
                rows={3}
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder="Add meeting notes, agreed scope, or client background..."
                style={{ width: '100%', padding: '8px', fontSize: '0.9rem', border: '1px solid var(--line)', borderRadius: '4px' }}
              />
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={saveAdminNotes}
                style={{ marginTop: '8px' }}
              >
                Save Notes
              </button>
            </div>

            {/* Quick Status Action Buttons */}
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => updateStatus(selectedApt.id, 'confirmed')}
                style={{ flex: 1, background: '#059669' }}
              >
                <Check size={16} /> Confirm
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => updateStatus(selectedApt.id, 'completed')}
                style={{ flex: 1 }}
              >
                Mark Completed
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => updateStatus(selectedApt.id, 'cancelled')}
                style={{ color: '#DC2626', borderColor: '#FCA5A5' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
