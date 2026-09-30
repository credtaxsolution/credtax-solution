import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createPublicClient } from '@/lib/supabase/public';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  try {
    const supabase = createPublicClient();
    const { data: blogs } = await supabase
      .from('blogs')
      .select('slug')
      .eq('is_published', true);

    return (blogs || []).map((b) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createPublicClient();
  const { data: blog } = await supabase
    .from('blogs')
    .select('title, excerpt, meta_title, meta_description, cover_image')
    .eq('slug', slug)
    .single();

  if (!blog) {
    return {
      title: 'Article Not Found | CredTax',
    };
  }

  return {
    title: blog.meta_title || `${blog.title} | CredTax Insights`,
    description: blog.meta_description || blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      url: `https://credtaxsolution.com/insights/${slug}`,
      images: blog.cover_image ? [{ url: blog.cover_image }] : [{ url: '/images/logo.png' }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = createPublicClient();

  // 1. Fetch current article
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!blog) {
    notFound();
  }

  // 2. Fetch pinned featured article
  const { data: pinnedBlog } = await supabase
    .from('blogs')
    .select('id, title, slug, category, excerpt, read_time, cover_image')
    .eq('is_published', true)
    .eq('is_pinned', true)
    .limit(1)
    .maybeSingle();

  // Self-exclusion rule: Don't show pinned card if currently viewing the pinned article itself
  const showPinned = Boolean(pinnedBlog && pinnedBlog.slug !== slug);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.published_at || blog.created_at,
    author: {
      '@type': 'Organization',
      name: 'CredTax Solution LLP',
      url: 'https://credtaxsolution.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CredTax Solution LLP',
      logo: {
        '@type': 'ImageObject',
        url: 'https://credtaxsolution.com/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://credtaxsolution.com/insights/${slug}`,
    },
  };

  const isHtml = /<[a-z][\s\S]*>/i.test(blog.content || '');
  const paragraphs = isHtml ? [] : (blog.content || '').split('\n\n');

  return (
    <div className="page" data-page="article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <section className="page-hero dark">
        <div className="wrap" style={{ maxWidth: '800px', marginInline: 'auto' }}>
          <span className="pill" style={{ color: 'var(--accent-bright)', borderColor: 'var(--accent-bright)', marginBottom: '16px' }}>
            {blog.category}
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 1.4rem + 2.5vw, 3rem)', lineHeight: '1.15', marginBottom: '16px' }}>
            {blog.title}
          </h1>
          <p className="lead" style={{ color: 'var(--on-dark-muted)', fontSize: '1.15rem' }}>
            {blog.excerpt}
          </p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '16px', fontSize: '0.9rem', color: 'var(--accent-bright)' }}>
            <span>{blog.read_time || '5 min read'}</span>
            <span>•</span>
            <span>Published by CredTax Practice Operations</span>
          </div>
        </div>
      </section>

      <div
        className="wrap"
        style={{
          maxWidth: showPinned ? '1180px' : '760px',
          marginInline: 'auto',
          paddingBlock: 'clamp(48px, 6vw, 80px)',
          transition: 'max-width 0.25s ease',
        }}
      >
        <div
          className="article-layout-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: showPinned ? 'minmax(0, 1fr) 340px' : '1fr',
            gap: '56px',
            alignItems: 'start',
          }}
        >
          {/* Main Article Column */}
          <div style={{ maxWidth: '760px', width: '100%', minWidth: 0, marginInline: showPinned ? '0' : 'auto' }}>
            {blog.cover_image && (
              <div
                style={{
                  marginBottom: '40px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  background: 'var(--mist)',
                }}
              >
                <img
                  src={blog.cover_image}
                  alt={blog.title}
                  style={{ width: '100%', maxHeight: '460px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}

            <article style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--ink)' }}>
              {isHtml ? (
                <div
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              ) : (
                <div className="article-body">
                  {paragraphs.map((para: string, idx: number) => {
                    if (para.startsWith('### ')) {
                      return (
                        <h3
                          key={idx}
                          style={{
                            fontFamily: 'var(--serif)',
                            fontSize: '1.6rem',
                            fontWeight: 600,
                            margin: '40px 0 16px 0',
                            color: 'var(--navy-900)',
                          }}
                        >
                          {para.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (para.startsWith('## ')) {
                      return (
                        <h2
                          key={idx}
                          style={{
                            fontFamily: 'var(--serif)',
                            fontSize: '1.9rem',
                            fontWeight: 600,
                            margin: '48px 0 20px 0',
                            color: 'var(--navy-900)',
                          }}
                        >
                          {para.replace('## ', '')}
                        </h2>
                      );
                    }
                    return (
                      <p key={idx} style={{ marginBottom: '1.5em' }}>
                        {para}
                      </p>
                    );
                  })}
                </div>
              )}
            </article>

            <div style={{ marginTop: '48px', paddingTop: '28px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link className="link" href="/insights">
                &larr; Back to all Insights
              </Link>
              <Link className="btn btn-primary btn-sm" href="/book-appointment">
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Sticky Pinned Article Sidebar (Excluded on the pinned article itself) */}
          {showPinned && pinnedBlog && (
            <aside className="pinned-sidebar" aria-label="Featured Guide">
              <div className="pinned-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '99px',
                      background: '#FEF3C7',
                      color: '#92400E',
                      border: '1px solid #FCD34D',
                      letterSpacing: '0.03em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>📌</span> Featured Insight
                  </span>
                </div>

                {pinnedBlog.cover_image && (
                  <div
                    style={{
                      width: '100%',
                      height: '160px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      marginBottom: '14px',
                      background: 'var(--mist)',
                    }}
                  >
                    <img
                      src={pinnedBlog.cover_image}
                      alt={pinnedBlog.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                )}

                <span className="pill" style={{ marginBottom: '10px', fontSize: '0.78rem' }}>
                  {pinnedBlog.category}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '1.25rem',
                    lineHeight: '1.3',
                    marginBottom: '10px',
                    color: 'var(--navy-900)',
                  }}
                >
                  <Link
                    href={`/insights/${pinnedBlog.slug}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {pinnedBlog.title}
                  </Link>
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    lineHeight: '1.55',
                    color: 'var(--muted)',
                    marginBottom: '16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {pinnedBlog.excerpt}
                </p>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--line)',
                  }}
                >
                  <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                    {pinnedBlog.read_time || '5 min read'}
                  </span>
                  <Link
                    href={`/insights/${pinnedBlog.slug}`}
                    className="link"
                    style={{ fontWeight: 650, fontSize: '0.88rem' }}
                  >
                    Read Guide &rarr;
                  </Link>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
