import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Icon } from '@/components/Icons';
import { WalkthroughTrack } from '@/components/WalkthroughTrack';
import { PodConfigurator } from '@/components/PodConfigurator';

export const metadata: Metadata = {
  title: 'CredTax Pod | A Managed Function for CPA Firms',
  description:
    'A CredTax Pod is a coordinated team built around a CPA firm’s tax or accounting workflow, with coordination, internal quality control, backup and capacity. Don’t just add staff. Build a function.',
};

export default function CredTaxPodPage() {
  return (
    <div className="page" data-page="credtax-pod">
      {/* HERO */}
      <section className="hero dark" aria-labelledby="h-pod">
        <div className="wrap hero-grid">
          <div>
            <p className="hero-tag">CredTax Pod</p>
            <h1 id="h-pod">Don&apos;t just add staff.<br />Build a function.</h1>
            <p className="lead">
              CredTax Pods give your CPA firm a specialized team built around a workflow — with the people, coordination, quality controls and capacity required to keep that function moving.
            </p>
            <div className="btn-row" style={{ marginTop: '34px' }}>
              <Link className="btn btn-primary" href="/book-appointment">
                Schedule Pod Discovery
              </Link>
              <Link className="btn btn-secondary" href="/credtax-pod#pod-configurations">
                View Configurations
              </Link>
            </div>
            <p className="muted" style={{ margin: '28px 0 0', fontSize: '0.98rem', maxWidth: '52ch' }}>
              Tax Pods, Accounting Pods and Combined Pods, custom-built around your firm&apos;s volume and complexity.
            </p>
          </div>
          <figure className="chain" aria-label="CPA firm to CredTax Pod to coordinated workflow to completed work">
            <ol>
              <li style={{ ['--i' as string]: 0 }}>
                <span className="node-k">Your Firm <span className="pill" style={{ color: 'var(--accent-bright)', borderColor: 'var(--accent-bright)', fontSize: '0.72rem', padding: '0.2em 0.6em', verticalAlign: 'middle' }}>SCOPE</span></span>
                <span className="node-d">Defines scope, keeps client relationships and professional decisions.</span>
              </li>
              <li className="is-us" style={{ ['--i' as string]: 1 }}>
                <span className="node-k">CredTax Pod <span className="pill" style={{ color: 'var(--accent-bright)', borderColor: 'var(--accent-bright)', fontSize: '0.72rem', padding: '0.2em 0.6em', verticalAlign: 'middle' }}>STRUCTURE</span></span>
                <span className="node-d">Coordinator, production team, senior review, specialists and backup.</span>
              </li>
              <li style={{ ['--i' as string]: 2 }}>
                <span className="node-k">Coordinated Workflow <span className="pill" style={{ color: 'var(--accent-bright)', borderColor: 'var(--accent-bright)', fontSize: '0.72rem', padding: '0.2em 0.6em', verticalAlign: 'middle' }}>PROCESS</span></span>
                <span className="node-d">Agreed production workflow with internal quality control.</span>
              </li>
              <li style={{ ['--i' as string]: 3 }}>
                <span className="node-k">Completed Work <span className="pill" style={{ color: 'var(--accent-bright)', borderColor: 'var(--accent-bright)', fontSize: '0.72rem', padding: '0.2em 0.6em', verticalAlign: 'middle' }}>OUTPUT</span></span>
                <span className="node-d">Review-ready work, handed back for your final sign-off.</span>
              </li>
            </ol>
            <figcaption>Your firm defines scope and keeps professional responsibility. The Pod runs the production engine behind it.</figcaption>
          </figure>
        </div>
      </section>

      {/* WHAT IS A POD */}
      <section className="section" id="pod-what" aria-labelledby="h-what-pod">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">What is a CredTax Pod?</span>
            <h2 id="h-what-pod">A specialized team, organized around your function.</h2>
            <p>
              Instead of assigning isolated tasks to individual people, CredTax structures the people, workflow, quality controls and backup capacity required to operate the function you define. The function is the product — not the headcount behind it.
            </p>
          </div>

          <div className="grid-3" style={{ marginTop: '36px' }}>
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '28px' }}>
              <span className="step-n">LAYER 1</span>
              <h3>Dedicated Coordination</h3>
              <p className="desc" style={{ marginTop: '8px' }}>
                A Pod Coordinator tracks every intake, chases missing client documents, manages internal handoffs, and ensures deadlines are met without partner intervention.
              </p>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '28px' }}>
              <span className="step-n">LAYER 2</span>
              <h3>Production &amp; Senior QC</h3>
              <p className="desc" style={{ marginTop: '8px' }}>
                Returns or books are prepared by specialized staff, then reviewed by an independent Senior Reviewer before delivery, catching errors before you ever see them.
              </p>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '28px' }}>
              <span className="step-n">LAYER 3</span>
              <h3>Built-in Continuity &amp; Backup</h3>
              <p className="desc" style={{ marginTop: '8px' }}>
                Workflows are documented so that if a team member is absent, standing backup capacity steps in seamlessly with zero loss of momentum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSIBILITY BOUNDARY */}
      <section className="section section--mist" id="pod-ownership" aria-labelledby="h-own">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">Clear Ownership</span>
            <h2 id="h-own">What CredTax owns — and what stays with you.</h2>
            <p>CredTax owns the agreed production workflow and quality within the defined scope. The CPA retains professional responsibility, the client relationship and final decisions.</p>
          </div>
          <div className="boundary">
            <div className="b-col">
              <h3>Your Firm</h3>
              <ul className="ticks">
                <li>Client relationship</li>
                <li>Professional judgment</li>
                <li>Final decisions</li>
                <li>Final review / approval</li>
                <li>Firm standards</li>
              </ul>
            </div>
            <div className="b-mid" aria-hidden="true">
              <span><Icon name="handoff" className="icon" /></span>
            </div>
            <div className="b-col b-us dark">
              <h3>CredTax Pod</h3>
              <ul className="ticks">
                <li>Workflow coordination</li>
                <li>Production</li>
                <li>Internal quality controls</li>
                <li>Staff allocation</li>
                <li>Documentation</li>
                <li>Follow-up within agreed scope</li>
                <li>Backup coverage</li>
                <li>Capacity management</li>
                <li>Process continuity</li>
              </ul>
            </div>
          </div>
          <p className="note">
            CredTax provides preparation, review-support and workflow services. The CPA firm retains professional responsibility, client relationships and final professional decisions.
          </p>
        </div>
      </section>

      {/* 1040 WALKTHROUGH */}
      <section className="section" id="pod-workflow" aria-labelledby="h-walk">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">Inside the workflow</span>
            <h2 id="h-walk">Follow one job through the Pod: Form 1040.</h2>
            <p>Click any stage to see who handles it, what happens, and what stays with your firm.</p>
          </div>
          <WalkthroughTrack />
        </div>
      </section>

      {/* CONFIGURATOR */}
      <section className="section section--mist" id="pod-configurations" aria-labelledby="h-cfg">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">Interactive Sizing</span>
            <h2 id="h-cfg">Estimate your Pod structure.</h2>
            <p>Select your scope and volume to see how CredTax tailors a Pod for your firm.</p>
          </div>
          <PodConfigurator />
        </div>
      </section>

      {/* PRICING FORMULA */}
      <section className="section dark" id="pod-pricing" aria-labelledby="h-podprice">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill" style={{ color: 'var(--accent-bright)', borderColor: 'var(--accent-bright)' }}>Custom Scoping</span>
            <h2 id="h-podprice" style={{ color: '#fff' }}>Your Pod is built around the work — not a fixed package.</h2>
          </div>
          <div className="formula" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 12px', alignItems: 'center', marginBottom: '22px' }}>
            <span className="term" style={{ padding: '0.6em 1em', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', color: '#fff', fontWeight: 600 }}>Volume</span>
            <span className="op" style={{ color: 'var(--accent-bright)', fontSize: '1.2rem', fontWeight: 600 }}>+</span>
            <span className="term" style={{ padding: '0.6em 1em', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', color: '#fff', fontWeight: 600 }}>Complexity</span>
            <span className="op" style={{ color: 'var(--accent-bright)', fontSize: '1.2rem', fontWeight: 600 }}>+</span>
            <span className="term" style={{ padding: '0.6em 1em', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', color: '#fff', fontWeight: 600 }}>Functions</span>
            <span className="op" style={{ color: 'var(--accent-bright)', fontSize: '1.2rem', fontWeight: 600 }}>+</span>
            <span className="term" style={{ padding: '0.6em 1em', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', color: '#fff', fontWeight: 600 }}>QC Checkpoints</span>
            <span className="op" style={{ color: 'var(--accent-bright)', fontSize: '1.2rem', fontWeight: 600 }}>=</span>
            <span className="res" style={{ padding: '0.65em 1.1em', background: 'var(--gold)', color: 'var(--navy-950)', borderRadius: '4px', fontWeight: 700 }}>Custom Pod Structure</span>
          </div>
          <p style={{ maxWidth: '66ch', color: 'var(--on-dark-muted)' }}>
            Pod engagements are custom-quoted based on workload, complexity and required capacity — not an arbitrary headcount markup.
          </p>
          <div style={{ marginTop: '24px' }}>
            <Link className="btn btn-primary" href="/book-appointment">
              Build My Pod
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-band" style={{ background: 'var(--mist)' }} aria-labelledby="h-podfinal">
        <div className="wrap">
          <div className="inner">
            <span className="pill">Your firm already has the workflow</span>
            <h2 id="h-podfinal">Let CredTax build the team behind it.</h2>
            <p className="muted">
              Tell us which function is putting pressure on your firm — tax, accounting, administration, or a combination. We&apos;ll map the workflow and propose the appropriate CredTax Pod.
            </p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/book-appointment">
                Schedule a Consultation
              </Link>
              <Link className="btn btn-secondary" href="/services">
                Compare All Models
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
