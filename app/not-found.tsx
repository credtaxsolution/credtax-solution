import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ArrowRight, Home, Calendar, Phone, HelpCircle } from 'lucide-react';

export const metadata = {
  title: '404 - Page Not Found | CredTax Solution',
  description: 'The page you are looking for does not exist. Browse CredTax tax, accounting, and workflow support services.',
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} style={{ minHeight: '75vh', display: 'flex', flexDirection: 'column' }}>
        {/* Hero Section */}
        <section
          style={{
            background: 'var(--mist)',
            padding: 'clamp(48px, 8vw, 96px) 0',
            borderBottom: '1px solid var(--line)',
            textAlign: 'center',
          }}
        >
          <div className="wrap" style={{ maxWidth: '800px', marginInline: 'auto' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 14px',
                borderRadius: '99px',
                background: '#EDE9FE',
                color: '#6D28D9',
                fontSize: '0.88rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: '20px',
                border: '1px solid #DDD6FE',
              }}
            >
              404 • PAGE NOT FOUND
            </span>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 1.5rem + 2.5vw, 3.5rem)',
                color: 'var(--navy-900)',
                marginBottom: '16px',
                lineHeight: 1.15,
              }}
            >
              We Couldn&apos;t Find That Page
            </h1>

            <p
              className="muted"
              style={{
                fontSize: '1.15rem',
                lineHeight: 1.6,
                marginBottom: '32px',
                maxWidth: '620px',
                marginInline: 'auto',
              }}
            >
              The link you clicked may be outdated, moved, or misspelled. Use the buttons below to return home or explore our firm support services.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                href="/"
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  fontSize: '1rem',
                  textDecoration: 'none',
                }}
              >
                <Home size={18} />
                <span>Return to Homepage</span>
              </Link>

              <Link
                href="/book-appointment"
                className="btn btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  fontSize: '1rem',
                  textDecoration: 'none',
                }}
              >
                <Calendar size={18} />
                <span>Book a Consultation</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="section" style={{ padding: 'clamp(40px, 6vw, 72px) 0', flex: 1 }}>
          <div className="wrap" style={{ maxWidth: '1080px', marginInline: 'auto' }}>
            <h2 style={{ fontSize: '1.45rem', color: 'var(--navy-900)', textAlign: 'center', marginBottom: '32px' }}>
              Explore CredTax Support Functions
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
              }}
            >
              <Link
                href="/services"
                style={{
                  display: 'block',
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '8px',
                  padding: '24px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                }}
              >
                <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-900)', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>US Tax &amp; QC Services</span>
                  <ArrowRight size={16} color="var(--gold)" />
                </h3>
                <p className="muted" style={{ fontSize: '0.9rem', margin: 0 }}>
                  Individual and business preparation, quality control, and workpaper review.
                </p>
              </Link>

              <Link
                href="/credtax-pod"
                style={{
                  display: 'block',
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '8px',
                  padding: '24px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                }}
              >
                <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-900)', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>CredTax Pod</span>
                  <ArrowRight size={16} color="var(--gold)" />
                </h3>
                <p className="muted" style={{ fontSize: '0.9rem', margin: 0 }}>
                  Dedicated multi-disciplinary team integrated directly into your firm&apos;s workflow.
                </p>
              </Link>

              <Link
                href="/how-we-work"
                style={{
                  display: 'block',
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '8px',
                  padding: '24px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                }}
              >
                <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-900)', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>How We Work</span>
                  <ArrowRight size={16} color="var(--gold)" />
                </h3>
                <p className="muted" style={{ fontSize: '0.9rem', margin: 0 }}>
                  Security boundaries, workflow integration, review notes, and pilot steps.
                </p>
              </Link>

              <Link
                href="/contact"
                style={{
                  display: 'block',
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '8px',
                  padding: '24px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                }}
              >
                <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-900)', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Contact Team</span>
                  <ArrowRight size={16} color="var(--gold)" />
                </h3>
                <p className="muted" style={{ fontSize: '0.9rem', margin: 0 }}>
                  Share your firm size and capacity needs with our leadership team.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
