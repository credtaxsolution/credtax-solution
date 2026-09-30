import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { createPublicClient } from '@/lib/supabase/public';

export const metadata: Metadata = {
  title: 'Insights for CPA Firm Operations | CredTax',
  description:
    'Practical thinking on tax operations, workflow and capacity for CPA firm owners and practice managers.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function InsightsPage() {
  let blogs: Array<{
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    read_time: string;
    published_at: string;
    cover_image?: string | null;
  }> = [];

  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from('blogs')
      .select('id, title, slug, category, excerpt, read_time, published_at, cover_image')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (data && data.length > 0) {
      blogs = data;
    }
  } catch (err) {
    console.error('Failed to fetch blogs:', err);
  }

  return (
    <div className="page" data-page="insights">
      <section className="page-hero dark" aria-labelledby="h-insights">
        <div className="wrap">
          <h1 id="h-insights">Insights on How CPA Firms Actually Operate.</h1>
          <p className="lead">
            Practical thinking on tax operations, workflow and capacity, written for CPA firm owners and the people who run their pipelines.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="h-index">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">Articles &amp; Analysis</span>
            <h2 id="h-index">Published Operational Guides</h2>
          </div>

          <div className="posts" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {blogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)', gridColumn: '1 / -1' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No articles published yet.</p>
                <p style={{ fontSize: '0.95rem' }}>Check back soon for upcoming operational guides.</p>
              </div>
            ) : (
              blogs.map((b) => (
                <Link key={b.slug} className="post-card" href={`/insights/${b.slug}`}>
                  {b.cover_image && (
                    <div
                      style={{
                        width: '100%',
                        height: '190px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        marginBottom: '16px',
                        background: 'var(--mist)',
                      }}
                    >
                      <img
                        src={b.cover_image}
                        alt={b.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  )}
                  <span className="pill" style={{ marginBottom: '12px', alignSelf: 'flex-start' }}>
                    {b.category}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', lineHeight: '1.25', marginBottom: '10px' }}>{b.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.97rem', marginBottom: '16px' }}>{b.excerpt}</p>
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="link" style={{ fontWeight: 650, fontSize: '0.9rem' }}>
                      Read article &rarr;
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{b.read_time}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="cta-band dark">
        <div className="wrap">
          <div className="inner">
            <h2>Want to Talk Through Your Own Workflow?</h2>
            <p>Tell us where work waits in your firm today.</p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/book-appointment">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
