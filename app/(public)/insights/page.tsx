import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { createPublicClient } from '@/lib/supabase/public';

export const metadata: Metadata = {
  title: 'Insights for CPA Firm Operations | CredTax',
  description:
    'Practical thinking on tax operations, workflow and capacity for CPA firm owners and practice managers.',
};

export const revalidate = 3600; // Cache on edge CDN for 1 hour (ISR)

export default async function InsightsPage() {
  let blogs: Array<{
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    read_time: string;
    published_at: string;
  }> = [];

  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from('blogs')
      .select('id, title, slug, category, excerpt, read_time, published_at')
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
            {blogs.map((b) => (
              <Link key={b.slug} className="post-card" href={`/insights/${b.slug}`}>
                <span className="pill" style={{ marginBottom: '12px' }}>
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
            ))}
          </div>

          <div className="sec-head" style={{ marginTop: 'clamp(40px, 6vw, 72px)' }}>
            <span className="pill">Upcoming Insights</span>
            <h2 id="h-soon" style={{ fontSize: '1.5rem' }}>
              In Preparation
            </h2>
          </div>
          <div className="posts" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div className="post-card" style={{ background: 'var(--mist)', borderStyle: 'dashed' }}>
              <span className="pill">Workflow</span>
              <h3>The Hidden Work Behind a CPA Firm&apos;s Tax Pipeline</h3>
              <p style={{ color: 'var(--muted)' }}>Exploring how document intake bottlenecks silently erode partner margins.</p>
            </div>
            <div className="post-card" style={{ background: 'var(--mist)', borderStyle: 'dashed' }}>
              <span className="pill">Bookkeeping</span>
              <h3>What a Tax-Ready Bookkeeping Workflow Should Look Like</h3>
              <p style={{ color: 'var(--muted)' }}>Why year-end adjustments double preparation time without standardized monthly closes.</p>
            </div>
            <div className="post-card" style={{ background: 'var(--mist)', borderStyle: 'dashed' }}>
              <span className="pill">Workflow Management</span>
              <h3>What Should a Tax Coordinator Actually Own?</h3>
              <p style={{ color: 'var(--muted)' }}>The boundary between administrative chasing and technical tax preparation.</p>
            </div>
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
                Schedule a Conversation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
