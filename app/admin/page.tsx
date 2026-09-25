'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Calendar, Inbox, FileText, CheckCircle, Clock } from 'lucide-react';

interface AppointmentItem {
  id: string;
  client_name: string;
  firm_name: string | null;
  email: string;
  phone: string | null;
  service_type: string;
  appointment_date: string;
  start_time: string;
  status: string;
  timezone: string;
}

interface SubmissionItem {
  id: string;
  name: string;
  firm: string;
  email: string;
  need: string;
  created_at: string;
  status: string;
}

export default function AdminDashboardPage() {
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    confirmedAppointments: 0,
    totalSubmissions: 0,
    totalBlogs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const supabase = createClient();

      // 1. Fetch appointments
      const { data: apts, count: aptCount } = await supabase
        .from('appointments')
        .select('*', { count: 'exact' })
        .order('appointment_date', { ascending: true })
        .limit(6);

      // 2. Fetch contact submissions
      const { data: subs, count: subCount } = await supabase
        .from('contact_submissions')
        .select('id, name, firm, email, need, created_at, status', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(5);

      // 3. Fetch blogs count
      const { count: blogCount } = await supabase
        .from('blogs')
        .select('*', { count: 'exact', head: true });

      setAppointments(apts || []);
      setSubmissions(subs || []);
      setStats({
        totalAppointments: aptCount || 0,
        confirmedAppointments: apts?.filter((a: { status?: string }) => a.status === 'confirmed').length || 0,
        totalSubmissions: subCount || 0,
        totalBlogs: blogCount || 0,
      });
    } catch (err) {
      console.error('Error loading dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const supabase = createClient();
    await supabase.from('appointments').update({ status: newStatus }).eq('id', id);
    loadDashboardData();
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.85rem', color: 'var(--navy-900)', marginBottom: '4px' }}>
          Overview Dashboard
        </h1>
        <p className="muted" style={{ margin: 0 }}>
          Manage your appointment pipeline, client inquiries, blog articles, and SEO performance.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '36px',
        }}
      >
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>ALL APPOINTMENTS</span>
            <Calendar size={20} color="var(--accent)" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--navy-900)', marginTop: '8px' }}>
            {loading ? '...' : stats.totalAppointments}
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Scheduled consultations</span>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>CONFIRMED SESSIONS</span>
            <CheckCircle size={20} color="#059669" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#059669', marginTop: '8px' }}>
            {loading ? '...' : stats.confirmedAppointments}
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Active client bookings</span>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>FORM INQUIRIES</span>
            <Inbox size={20} color="var(--navy-900)" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--navy-900)', marginTop: '8px' }}>
            {loading ? '...' : stats.totalSubmissions}
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Leads from Contact page</span>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>BLOG ARTICLES</span>
            <FileText size={20} color="var(--accent)" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--navy-900)', marginTop: '8px' }}>
            {loading ? '...' : stats.totalBlogs}
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Published guides</span>
        </div>
      </div>

      {/* Two Columns: Recent Appointments & Recent Inquiries */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '28px',
        }}
      >
        {/* Left: Upcoming Appointments */}
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--navy-900)', margin: 0 }}>Upcoming Appointments</h2>
            <Link href="/admin/appointments" className="link" style={{ fontSize: '0.88rem' }}>
              View all &rarr;
            </Link>
          </div>

          {loading ? (
            <p className="muted">Loading bookings...</p>
          ) : appointments.length === 0 ? (
            <div style={{ padding: '30px 0', textAlign: 'center', color: 'var(--muted)' }}>
              <Clock size={32} style={{ margin: '0 auto 10px', opacity: 0.4 }} />
              <p>No appointments booked yet.</p>
              <Link href="/book-appointment" target="_blank" className="link" style={{ fontSize: '0.9rem' }}>
                Test your booking page &rarr;
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  style={{
                    padding: '14px',
                    border: '1px solid var(--line)',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}
                >
                  <div>
                    <strong style={{ display: 'block', color: 'var(--navy-900)' }}>
                      {apt.client_name} {apt.firm_name ? `(${apt.firm_name})` : ''}
                    </strong>
                    <span style={{ fontSize: '0.86rem', color: 'var(--muted)' }}>
                      {apt.appointment_date} at {apt.start_time} • {apt.service_type}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <select
                      aria-label="Appointment status"
                      value={apt.status}
                      onChange={(e) => handleUpdateStatus(apt.id, e.target.value)}
                      style={{
                        fontSize: '0.8rem',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid var(--line)',
                        background: apt.status === 'confirmed' ? '#ECFDF5' : '#FFFBEB',
                        color: apt.status === 'confirmed' ? '#065F46' : '#92400E',
                        fontWeight: 600,
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Recent Inbound Form Submissions */}
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--navy-900)', margin: 0 }}>Recent Inquiries</h2>
            <Link href="/admin/submissions" className="link" style={{ fontSize: '0.88rem' }}>
              View all &rarr;
            </Link>
          </div>

          {loading ? (
            <p className="muted">Loading inquiries...</p>
          ) : submissions.length === 0 ? (
            <div style={{ padding: '30px 0', textAlign: 'center', color: 'var(--muted)' }}>
              <Inbox size={32} style={{ margin: '0 auto 10px', opacity: 0.4 }} />
              <p>No form inquiries received yet.</p>
              <Link href="/contact" target="_blank" className="link" style={{ fontSize: '0.9rem' }}>
                View public contact form &rarr;
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  style={{
                    padding: '14px',
                    border: '1px solid var(--line)',
                    borderRadius: '6px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <strong style={{ color: 'var(--navy-900)' }}>{sub.name}</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--muted)', display: 'block' }}>
                        {sub.firm} ({sub.email})
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '99px',
                        background: 'var(--mist-2)',
                        color: 'var(--navy-900)',
                      }}
                    >
                      {sub.need}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
