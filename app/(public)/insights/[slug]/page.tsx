import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createPublicClient } from '@/lib/supabase/public';

interface Props {
  params: Promise<{ slug: string }>;
}

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
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!blog) {
    notFound();
  }

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

  // Convert markdown-style sections into clean HTML/JSX
  const paragraphs = blog.content.split('\n\n');

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

      <div className="wrap" style={{ maxWidth: '760px', marginInline: 'auto', paddingBlock: 'clamp(48px, 6vw, 80px)' }}>
        <article style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--ink)' }}>
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
        </article>

        <div style={{ marginTop: '48px', paddingTop: '28px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link className="link" href="/insights">
            &larr; Back to all Insights
          </Link>
          <Link className="btn btn-primary btn-sm" href="/book-appointment">
            Schedule a Workflow Discussion
          </Link>
        </div>
      </div>
    </div>
  );
}
