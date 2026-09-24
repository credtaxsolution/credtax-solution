import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Icon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Succession & Continuity for CPA Firm Owners',
  description:
    'A long-term operating partnership for CPA firm owners who want to reduce day-to-day production without automatically giving up the firm. Individually structured with professional and legal advice.',
};

export default function SuccessionPage() {
  return (
    <div className="page" data-page="succession">
      <section className="page-hero dark" aria-labelledby="h-succ">
        <div className="wrap">
          <p className="hero-tag">Firm continuity &amp; succession</p>
          <h1 id="h-succ" style={{ maxWidth: '16em' }}>
            You built the firm. You don&apos;t necessarily have to walk away from it.
          </h1>
          <p className="lead">
            CredTax helps CPA firm owners transition away from day-to-day production without automatically giving up the practice they&apos;ve spent years building.
          </p>
          <p className="lead" style={{ marginTop: '14px' }}>
            Through a long-term operating partnership, CredTax can take over agreed production and workflow responsibilities while the owner retains an agreed role, relationship and economic participation.
          </p>
          <div className="btn-row" style={{ marginTop: '34px' }}>
            <Link className="btn btn-primary" href="/book-appointment">
              Discuss Your Practice
            </Link>
            <Link className="btn btn-secondary" href="/succession-continuity#succ-model">
              Explore the Model
            </Link>
          </div>
        </div>
      </section>

      {/* CORE PROBLEM */}
      <section className="section" id="succ-problem">
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: 'center', marginInline: 'auto' }}>
            <span className="pill">The Core Dilemma</span>
            <h2>The problem isn&apos;t always selling the firm.</h2>
            <p>
              Sometimes the real problem is that the practice still depends on the owner for almost everything: client questions, technical review, and daily workflow management.
            </p>
          </div>

          <div className="grid-2" style={{ marginTop: '36px' }}>
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '32px' }}>
              <span className="pill" style={{ color: 'var(--muted)' }}>Traditional Succession</span>
              <h3 style={{ marginTop: '12px' }}>All-or-Nothing Exit</h3>
              <p className="desc" style={{ marginTop: '8px' }}>
                Selling outright to a consolidator or larger firm often means client churn, cultural disruption, and walking away from a client base you spent decades nurturing.
              </p>
            </div>
            <div className="dark" style={{ background: 'var(--navy-900)', color: '#fff', borderRadius: 'var(--radius)', padding: '32px' }}>
              <span className="pill" style={{ color: 'var(--accent-bright)', borderColor: 'var(--accent-bright)' }}>The CredTax Continuity Model</span>
              <h3 style={{ marginTop: '12px', color: '#fff' }}>Operating Partnership</h3>
              <p style={{ marginTop: '8px', color: 'var(--on-dark-muted)' }}>
                Keep client relationships, strategic guidance, and equity value. CredTax operates the production engine (Tax &amp; Accounting Pods) behind your firm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSIBILITY MAP */}
      <section className="section section--mist" id="succ-model">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">Division of Responsibilities</span>
            <h2>What Stays With the CPA Owner. What CredTax Operates.</h2>
          </div>
          <div className="boundary">
            <div className="b-col">
              <h3>CPA Owner</h3>
              <ul className="ticks">
                <li>Client relationships</li>
                <li>Professional judgment</li>
                <li>Final sign-off decisions</li>
                <li>Strategic firm direction</li>
                <li>Agreed ownership &amp; profit participation</li>
              </ul>
            </div>
            <div className="b-mid" aria-hidden="true">
              <span><Icon name="handoff" className="icon" /></span>
            </div>
            <div className="b-col b-us dark">
              <h3>CredTax Operating Layer</h3>
              <ul className="ticks">
                <li>Tax preparation &amp; workpapers</li>
                <li>Bookkeeping &amp; reconciliations</li>
                <li>Workflow coordination &amp; document tracking</li>
                <li>Internal quality control &amp; senior review</li>
                <li>Capacity scaling &amp; backup coverage</li>
              </ul>
            </div>
          </div>
          <div className="legal-note" style={{ marginTop: '28px', padding: '16px 20px', background: '#fff', borderLeft: '4px solid var(--navy-900)', borderRadius: '4px', fontSize: '0.92rem', color: 'var(--muted)' }}>
            This is an operational support model, not an automated financial or legal reorganization. Commercial terms, governance, and equity participation are individually negotiated and subject to professional legal and tax counsel.
          </div>
        </div>
      </section>

      {/* 6 PHASES */}
      <section className="section" id="succ-phases">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">Phased Transition</span>
            <h2>Six Phases of a Smooth Operating Transition</h2>
          </div>
          <ol className="stages">
            <li className="stage">
              <span className="stage-n">01</span>
              <div>
                <h3>Understand &amp; Map</h3>
                <p className="lede">We analyze your client mix, software stack (TaxDome, CCH, UltraTax, QBO), review preferences, and recurring deadlines.</p>
              </div>
            </li>
            <li className="stage">
              <span className="stage-n">02</span>
              <div>
                <h3>Build the Operating Pod</h3>
                <p className="lede">CredTax structures specialized Tax and Accounting Pods with designated coordinators, preparers, and senior reviewers.</p>
              </div>
            </li>
            <li className="stage">
              <span className="stage-n">03</span>
              <div>
                <h3>Phased Shadowing &amp; Pilot</h3>
                <p className="lede">The Pod begins processing a controlled cohort of returns alongside your team to calibrate documentation and QC standards.</p>
              </div>
            </li>
            <li className="stage">
              <span className="stage-n">04</span>
              <div>
                <h3>Workflow Handover</h3>
                <p className="lede">Production responsibilities transition to the Pod. The owner shifts from daily preparer/reviewer to executive reviewer.</p>
              </div>
            </li>
            <li className="stage">
              <span className="stage-n">05</span>
              <div>
                <h3>Stabilized Operations</h3>
                <p className="lede">The firm operates with predictable turnaround and built-in backup. The owner enjoys reclaimed time.</p>
              </div>
            </li>
            <li className="stage is-final">
              <span className="stage-n">06</span>
              <div>
                <h3>Long-Term Succession Flexibility</h3>
                <p className="lede">The firm is no longer owner-dependent, preserving high equity value for future generation handoff or continued advisory participation.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band dark">
        <div className="wrap">
          <div className="inner">
            <h2>You&apos;ve spent years building your firm. Let&apos;s talk about what comes next.</h2>
            <p>
              Whether you want to step back from production, prepare a continuity safety net, or reduce operational burnout, we can explore what a CredTax operating partnership looks like.
            </p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/book-appointment">
                Schedule a Confidential Discussion
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
