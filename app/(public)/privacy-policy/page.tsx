import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | CredTax Solution LLP',
  description:
    'Privacy policy for CredTax Solution LLP explaining how personal information received through the website and direct business inquiries is handled.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="page" data-page="privacy">
      <section className="page-hero dark" aria-labelledby="h-privacy">
        <div className="wrap">
          <h1 id="h-privacy">Privacy Policy</h1>
          <p className="lead">
            This policy explains how CredTax Solution LLP handles personal information received through this website and direct business inquiries.
          </p>
          <p className="privacy-meta" style={{ marginTop: '14px', color: 'var(--on-dark-muted)' }}>
            Last updated: 24 September 2026
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="privacy-overview">
        <div className="wrap privacy-body" style={{ maxWidth: '860px', marginInline: 'auto' }}>
          <section>
            <h2 id="privacy-overview" style={{ fontSize: '1.6rem', marginBottom: '12px' }}>
              Information We May Receive
            </h2>
            <p className="muted">
              When you contact CredTax or schedule an appointment, we may receive information you choose to provide, such as your full name, work email address, phone number, firm name, country, professional role, service interests, and any details or notes included in your inquiry.
            </p>
          </section>

          <section style={{ marginTop: '36px' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>How We Use Information</h2>
            <p className="muted">
              We use enquiry and booking information solely to respond to your requests, understand your firm&apos;s workflow requirements, prepare or discuss engagement proposals, schedule and conduct consultation sessions, manage professional business communications, and maintain appropriate administrative records.
            </p>
          </section>

          <section style={{ marginTop: '36px' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Sharing and Service Providers</h2>
            <p className="muted">
              We do not sell, rent, or trade your personal information. We may utilize trusted third-party service providers (such as Supabase for database hosting, Vercel for web hosting, and Resend for transactional notification emails) solely to support our secure business operations. Information may also be disclosed where required by applicable law or to protect legal rights.
            </p>
          </section>

          <section style={{ marginTop: '36px' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Data Retention and Security</h2>
            <p className="muted">
              We retain personal information only for as long as reasonably needed for the operational purposes described above, business record-keeping, and legal compliance. We employ reasonable administrative, technical, and database security safeguards (including Row Level Security and SSL/TLS encryption) to protect your data.
            </p>
          </section>

          <section style={{ marginTop: '36px' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>International Communications</h2>
            <p className="muted">
              CredTax is based in India and serves firms internationally (primarily in the United States and Canada). If you communicate with us from outside India, your information will be processed with appropriate commercial confidentiality and safeguards in accordance with this policy.
            </p>
          </section>

          <section style={{ marginTop: '36px' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Your Choices &amp; Contact</h2>
            <p className="muted">
              You may ask us to review, update, or remove personal information we hold about you by contacting us directly at{' '}
              <a className="link" href="mailto:prnithin6@gmail.com">
                prnithin6@gmail.com
              </a>{' '}
              or by writing to:
            </p>
            <p style={{ marginTop: '12px', fontWeight: 500 }}>
              CREDTAX SOLUTION LLP, Menacheriveedu, Ward 6 Door No.459, Thattampady, Karumalloor, Paravoor, Kochi, Kerala, IN 683511.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
