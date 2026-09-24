import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About CredTax | India-Based, Built for CPA Firms',
  description:
    'CredTax is an India-based offshore support partner for CPA firms, operated by CredTax Solution LLP and led by partners Raijo Jose and Nithin PR.',
};

export default function AboutPage() {
  return (
    <div className="page" data-page="about">
      <section className="page-hero dark" aria-labelledby="h-about">
        <div className="wrap">
          <h1 id="h-about">Built for One Purpose: Extending CPA Firms.</h1>
          <p className="lead">
            CredTax was created to support CPA firms with the capacity they need to operate and grow without having to build every function internally.
          </p>
          <p className="lead" style={{ marginTop: '12px' }}>
            We are an India-based offshore support partner focused on tax, accounting and CPA-firm workflow operations. CredTax is the brand; the legal entity behind it is CredTax Solution LLP.
          </p>
        </div>
      </section>

      {/* WHY WE BUILT CREDTAX */}
      <section className="section" id="why">
        <div className="wrap split">
          <div>
            <span className="pill">Origin &amp; Mission</span>
            <h2>Why We Built CredTax</h2>
            <p className="muted" style={{ marginTop: '20px', maxWidth: '46ch' }}>
              CPA firms often don&apos;t need another vendor that simply completes isolated tasks. They need support that stays with the firm and understands how it works.
            </p>
          </div>
          <div>
            <p className="ledger-title" style={{ color: 'var(--navy-900)' }}>
              What CPA firms actually need:
            </p>
            <ul className="ticks" style={{ fontSize: '1.15rem' }}>
              <li>Predictable busy-season capacity</li>
              <li>Operational continuity across turnover</li>
              <li>Deep familiarity with firm documentation &amp; workpapers</li>
              <li>Structured senior review before partner review</li>
              <li>Direct, reliable communication channels</li>
              <li>Scalable workflows that grow without overhead</li>
            </ul>
            <p className="statement pull" style={{ marginTop: '32px', fontSize: 'clamp(1.3rem, 1rem + 1.2vw, 1.8rem)' }}>
              CredTax was engineered specifically around that need.
            </p>
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM */}
      <section className="section section--mist" id="about-team">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">Partner-Led</span>
            <h2>The People Behind CredTax</h2>
            <p>CredTax is partner-led. You work directly with the leaders who run the firm and oversee client service and delivery.</p>
          </div>
          <div className="people">
            <article className="person">
              <Image
                src="/images/raijo-jose.png"
                alt="Raijo Jose, Partner at CredTax"
                width={132}
                height={175}
                className="avatar founder-photo"
              />
              <div>
                <h3>Raijo Jose</h3>
                <p className="role">Partner — Client Services, Sales &amp; Administration</p>
                <h4>Focus areas</h4>
                <ul className="ticks">
                  <li>Client relationships &amp; onboarding</li>
                  <li>Service coordination &amp; SLA compliance</li>
                  <li>Business development</li>
                  <li>Client communication channels</li>
                  <li>Practice continuity</li>
                </ul>
              </div>
            </article>
            <article className="person">
              <Image
                src="/images/nithin-pr.png"
                alt="Nithin PR, Partner at CredTax"
                width={132}
                height={175}
                className="avatar founder-photo"
              />
              <div>
                <h3>Nithin PR</h3>
                <p className="role">Partner — Tax &amp; Accounting Operations</p>
                <h4>Focus areas</h4>
                <ul className="ticks">
                  <li>US &amp; Canadian tax workflows</li>
                  <li>Accounting and bookkeeping delivery</li>
                  <li>Preparation, review, and QC checkpoints</li>
                  <li>Workflow design and automation</li>
                  <li>Operational delivery</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* LOCATION & LEGAL DETAILS */}
      <section className="section dark" id="location">
        <div className="wrap split">
          <div>
            <span className="pill" style={{ color: 'var(--accent-bright)', borderColor: 'var(--accent-bright)' }}>Headquarters</span>
            <h2 style={{ color: '#fff' }}>India-Based. Built for International CPA Firms.</h2>
          </div>
          <div>
            <p className="lead" style={{ color: 'var(--on-dark-muted)' }}>
              CredTax, operated by CredTax Solution LLP, is based in Kochi, Kerala, India and provides offshore tax, accounting and workflow support to international CPA and accounting firms.
            </p>
            <div className="location-card" style={{ marginTop: '28px' }}>
              <h3 style={{ color: '#fff' }}>CredTax Solution LLP</h3>
              <p style={{ color: 'var(--on-dark-muted)', marginTop: '8px' }}>
                Menacheriveedu, Ward 6 Door No.459, Thattampady, Karumalloor, Paravoor, Kochi, Kerala, IN 683511
              </p>
              <p style={{ color: 'var(--on-dark-muted)', marginTop: '8px' }}>
                Email: <a href="mailto:prnithin6@gmail.com" style={{ color: '#fff', textDecoration: 'underline' }}>prnithin6@gmail.com</a> | Phone: <a href="tel:+919495915993" style={{ color: '#fff', textDecoration: 'underline' }}>+91 94959 15993</a>
              </p>
              <p style={{ color: 'var(--accent-bright)', marginTop: '12px', fontSize: '0.9rem' }}>
                Serving CPA and accounting practices primarily across the United States and Canada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="wrap">
          <div className="inner">
            <h2>Let&apos;s Talk About Your Firm.</h2>
            <p className="muted">Tell us where your team needs additional capacity.</p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/book-appointment">
                Schedule a Consultation
              </Link>
              <Link className="btn btn-secondary" href="/faq">
                Read the FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
