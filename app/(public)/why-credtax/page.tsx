import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Icon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Why CredTax | An Offshore Partner Built for CPA Firms',
  description:
    'How CredTax differs from an individual offshore hire or a task vendor: CPA-firm specialization, workflow familiarity, continuity and structured quality.',
};

export default function WhyCredTaxPage() {
  return (
    <div className="page" data-page="why-credtax">
      <section className="page-hero dark" aria-labelledby="h-why-page">
        <div className="wrap">
          <h1 id="h-why-page">An Extension of Your Firm, Not Another Vendor.</h1>
          <p className="lead">
            CredTax is an offshore operating partner built for one kind of client: US and Canadian CPA and accounting firms. That focus changes how the work is set up, how it is reviewed and how the relationship develops.
          </p>
        </div>
      </section>

      {/* 6 COMMITMENTS */}
      <section className="section" id="different">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">Key Differentiators</span>
            <h2>What Makes CredTax Different</h2>
            <p>Six commitments that shape every engagement, whatever the model.</p>
          </div>
          <div className="grid-3">
            <div className="rule-top">
              <span className="step-n">01</span>
              <h3>CPA-firm specialization</h3>
              <p>CredTax is built specifically around supporting CPA and accounting firms, not general consumers or retail bookkeeping.</p>
            </div>
            <div className="rule-top">
              <span className="step-n">02</span>
              <h3>Workflow familiarity</h3>
              <p>We learn your systems, software, documentation standards, review preferences, and recurring client types.</p>
            </div>
            <div className="rule-top">
              <span className="step-n">03</span>
              <h3>Process continuity</h3>
              <p>The goal is recurring familiarity rather than constantly retraining new freelancers from zero each season.</p>
            </div>
            <div className="rule-top">
              <span className="step-n">04</span>
              <h3>Structured quality</h3>
              <p>Work moves through defined preparation and internal senior review checkpoints before reaching your final review.</p>
            </div>
            <div className="rule-top">
              <span className="step-n">05</span>
              <h3>Flexible capacity</h3>
              <p>Start with defined assignments and scale into dedicated professionals or complete Pods as your client base expands.</p>
            </div>
            <div className="rule-top">
              <span className="step-n">06</span>
              <h3>Operational ownership</h3>
              <p>With a CredTax Pod, we coordinate the production engine rather than simply throwing raw staff at your inbox.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-WAY COMPARISON */}
      <section className="section section--mist" id="compare-alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">Alternative Comparison</span>
            <h2>A Different Question From &ldquo;Who Can Do This Work?&rdquo;</h2>
            <p>Most offshore arrangements answer who will complete the task. CredTax also asks who owns the workflow around it.</p>
          </div>
          <div className="grid-3">
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '28px' }}>
              <h3>Individual Offshore Hire</h3>
              <p className="desc" style={{ marginTop: '8px' }}>Typically:</p>
              <ul className="dashes">
                <li>You recruit, train, and manage</li>
                <li>Continuity depends on one person</li>
                <li>Absences cause severe bottlenecks</li>
                <li>Scaling requires repeating the hire cycle</li>
              </ul>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '28px' }}>
              <h3>Task-Based BPO Vendor</h3>
              <p className="desc" style={{ marginTop: '8px' }}>Typically:</p>
              <ul className="dashes">
                <li>Work is completed blindly per task</li>
                <li>Firm familiarity resets project by project</li>
                <li>All coordination and QC burden stays on you</li>
                <li>Zero accumulated process knowledge</li>
              </ul>
            </div>
            <div className="dark" style={{ background: 'var(--navy-900)', color: '#fff', borderRadius: 'var(--radius)', padding: '28px' }}>
              <span className="pill" style={{ color: 'var(--accent-bright)', borderColor: 'var(--accent-bright)' }}>The CredTax Engagement</span>
              <h3 style={{ color: '#fff', marginTop: '12px' }}>Operating Extension</h3>
              <ul className="ticks" style={{ marginTop: '12px' }}>
                <li style={{ color: '#fff' }}>Flexible, Dedicated or Pod, matched to workload</li>
                <li style={{ color: '#fff' }}>Familiarity accumulates around your firm</li>
                <li style={{ color: '#fff' }}>Internal QC, coordination and backup structured in</li>
                <li style={{ color: '#fff' }}>You retain client relationships and final decisions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* INDIA-BASED SECTION */}
      <section className="section" id="india">
        <div className="wrap split">
          <div>
            <span className="pill">Global Delivery</span>
            <h2>India-Based. Built for International CPA Firms.</h2>
          </div>
          <div>
            <p className="lead muted">
              CredTax is based in India, and we say so plainly. Where the team sits is not the point. What matters to a CPA firm is whether the work fits its systems, meets its standards and keeps moving when someone is out.
            </p>
            <p className="muted">
              That is why CredTax is organized around capability, specialization, workflow integration, quality and continuity, and why the conversation starts with your workflow rather than an arbitrary rate card.
            </p>
            <p style={{ marginTop: '24px' }}>
              <Link className="btn btn-primary" href="/book-appointment">
                Schedule a Conversation
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
