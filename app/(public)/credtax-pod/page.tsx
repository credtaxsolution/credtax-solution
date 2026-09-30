import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Icon } from '@/components/Icons';
import { PodBeforeAfter } from '@/components/PodBeforeAfter';
import { PodConfigurations } from '@/components/PodConfigurations';
import { WalkthroughTrack } from '@/components/WalkthroughTrack';
import { PodConfigurator } from '@/components/PodConfigurator';

export const metadata: Metadata = {
  title: 'CredTax Pod | A Managed Function for CPA Firms',
  description:
    'CredTax Pods give your CPA firm a specialized team built around a workflow — with the people, coordination, quality controls and capacity required to keep that function moving. Don’t just add staff. Build a function.',
};

export default function CredTaxPodPage() {
  return (
    <div className="page" data-page="credtax-pod">
      {/* HERO */}
      <section className="hero dark" aria-labelledby="h-pod">
        <div className="wrap hero-grid">
          <div>
            <p className="hero-tag">CredTax Pod</p>
            <h1 id="h-pod">
              Don&apos;t just add staff.
              <br />
              Build a function.
            </h1>
            <p className="lead">
              CredTax Pods give your CPA firm a specialized team built around a workflow &mdash; with the people,
              coordination, quality controls and capacity required to keep that function moving.
            </p>
            <div className="btn-row" style={{ marginTop: '34px' }}>
              <Link className="btn btn-primary" href="/book-appointment">
                Build my Pod
              </Link>
              <a className="btn btn-secondary" href="#pod-before-after">
                See how a Pod works
              </a>
            </div>
            <p className="muted" style={{ margin: '28px 0 0', fontSize: '0.98rem', maxWidth: '52ch' }}>
              Tax Pods, Accounting Pods and Combined Pods, custom-built around your firm&apos;s volume and complexity.
            </p>
          </div>
          <figure className="chain" aria-label="CPA firm to CredTax Pod to coordinated workflow to completed work">
            <ol>
              <li style={{ ['--i' as string]: 0 }}>
                <span className="node-k">
                  Your Firm<span className="tg">SCOPE</span>
                </span>
                <span className="node-d">
                  Defines the scope of the function, and keeps client relationships and professional decisions.
                </span>
              </li>
              <li className="is-us" style={{ ['--i' as string]: 1 }}>
                <span className="node-k">
                  CredTax Pod<span className="tg">STRUCTURE</span>
                </span>
                <span className="node-d">
                  The team structure: coordinator, production, senior review, specialists and backup.
                </span>
              </li>
              <li style={{ ['--i' as string]: 2 }}>
                <span className="node-k">
                  Coordinated Workflow<span className="tg">PROCESS</span>
                </span>
                <span className="node-d">Agreed production workflow with internal quality control.</span>
              </li>
              <li style={{ ['--i' as string]: 3 }}>
                <span className="node-k">
                  Completed Work<span className="tg">OUTPUT</span>
                </span>
                <span className="node-d">Review-ready work, handed back for your final approval.</span>
              </li>
            </ol>
            <figcaption>
              Your firm defines scope and keeps professional responsibility. The Pod runs the production function
              behind it.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <PodBeforeAfter />

      {/* WHAT IS A POD */}
      <section className="section section--mist" id="pod-what" aria-labelledby="h-what-pod">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow-s">What is a CredTax Pod?</p>
            <h2 id="h-what-pod">A specialized team, organized around your function.</h2>
            <p>
              Instead of assigning isolated tasks to individual people, CredTax structures the people, workflow,
              quality controls and backup capacity required to operate the function you define. The function is the
              product &mdash; not the headcount behind it.
            </p>
          </div>
          <div className="pf">
            <div>
              <span className="pf-label">Function</span>
              <div className="pf-box">
                Tax
                <br />
                or Accounting
                <br />
                or Tax + Accounting
              </div>
            </div>
            <div className="pf-arrow">
              <svg viewBox="0 0 34 14" aria-hidden="true">
                <path d="M0 7H26M20 1l8 6-8 6" stroke="currentColor" strokeWidth="1.6" fill="none" />
              </svg>
            </div>
            <div>
              <span className="pf-label">Pod structure</span>
              <div className="role-stack">
                <div className="role-chip coord">Coordinator</div>
                <div className="role-chip">Production</div>
                <div className="role-chip review">Senior / Review</div>
                <div className="role-chip">Specialist</div>
                <div className="role-chip">Backup</div>
              </div>
            </div>
            <div className="pf-arrow">
              <svg viewBox="0 0 34 14" aria-hidden="true">
                <path d="M0 7H26M20 1l8 6-8 6" stroke="currentColor" strokeWidth="1.6" fill="none" />
              </svg>
            </div>
            <div>
              <span className="pf-label">Output</span>
              <div className="pf-box">
                Completed
                <br />
                workflow
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YOU DON'T BUY THE PEOPLE (.vs diagram) */}
      <section className="section" aria-labelledby="h-buy">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow-s">You don&apos;t buy the people</p>
            <h2 id="h-buy">You don&apos;t manage the team behind the work.</h2>
            <p>
              Traditional outsourcing hands you a person and a to-do list of your own. A Pod hands you a function
              that&apos;s already been structured to run.
            </p>
          </div>
          <div className="vs">
            <div>
              <h3>Traditional outsourcing / staff-based model</h3>
              <div className="vs-item">
                <span className="who">CPA</span>
                <span>Hire person</span>
              </div>
              <div className="vs-item">
                <span className="who">CPA</span>
                <span>Train person</span>
              </div>
              <div className="vs-item">
                <span className="who">CPA</span>
                <span>Assign work</span>
              </div>
              <div className="vs-item">
                <span className="who">CPA</span>
                <span>Follow up</span>
              </div>
              <div className="vs-item">
                <span className="who">CPA</span>
                <span>Review</span>
              </div>
              <div className="vs-item">
                <span className="who">CPA</span>
                <span>Cover absence</span>
              </div>
              <div className="vs-item">
                <span className="who">CPA</span>
                <span>Hire again</span>
              </div>
              <div className="vs-item">
                <span className="who">CPA</span>
                <span>Scale again</span>
              </div>
            </div>
            <div className="emph">
              <h3>CredTax Pod</h3>
              <div className="vs-item">
                <span className="who">CPA</span>
                <span>Define scope</span>
              </div>
              <div className="vs-item">
                <span className="who cred">CredTax</span>
                <span>Structures team</span>
              </div>
              <div className="vs-item">
                <span className="who cred">CredTax</span>
                <span>Coordinates workflow</span>
              </div>
              <div className="vs-item">
                <span className="who cred">CredTax</span>
                <span>Handles production</span>
              </div>
              <div className="vs-item">
                <span className="who cred">CredTax</span>
                <span>Runs quality controls</span>
              </div>
              <div className="vs-item">
                <span className="who cred">CredTax</span>
                <span>Provides backup</span>
              </div>
              <div className="vs-item">
                <span className="who cred">CredTax</span>
                <span>Adjusts capacity</span>
              </div>
              <div className="vs-item">
                <span className="who">CPA</span>
                <span>Professional decisions + final approval</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OWNERSHIP BOUNDARY */}
      <section className="section section--mist" id="pod-ownership" aria-labelledby="h-own">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow-s">Ownership, defined carefully</p>
            <h2 id="h-own">What CredTax owns — and what it doesn&apos;t.</h2>
            <p>
              CredTax owns the agreed production workflow and quality within the defined scope. The CPA retains
              professional responsibility, the client relationship and final decisions.
            </p>
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
              <span>
                <Icon name="handoff" className="icon" style={{ width: '1.2rem', height: '1.2rem' }} />
              </span>
            </div>
            <div className="b-col b-us dark">
              <h3>CredTax</h3>
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
            CredTax provides preparation, review-support and workflow services. The CPA firm retains professional
            responsibility, client relationships and final professional decisions.
          </p>
        </div>
      </section>

      {/* THREE CONFIGURATIONS */}
      <PodConfigurations />

      {/* FIVE LAYERS */}
      <section className="section section--mist" aria-labelledby="h-layers">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow-s">Behind every Pod</p>
            <h2 id="h-layers">Five layers, one function.</h2>
          </div>
          <div className="layers">
            <div className="layers-hub">CredTax Pod</div>
            <div className="layer">
              <h3>People</h3>
              <p>Specialists matched to the work.</p>
            </div>
            <div className="layer">
              <h3>Process</h3>
              <p>Your firm&apos;s workflow, documented and followed.</p>
            </div>
            <div className="layer">
              <h3>Quality</h3>
              <p>Defined review and QC checkpoints.</p>
            </div>
            <div className="layer">
              <h3>Continuity</h3>
              <p>Backup coverage and knowledge continuity.</p>
            </div>
            <div className="layer">
              <h3>Capacity</h3>
              <p>Resources adjusted as workload changes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATOR */}
      <section className="section" aria-labelledby="h-diff">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow-s">The differentiator</p>
            <h2 id="h-diff">A person can complete work. A Pod can own a workflow.</h2>
          </div>
          <div className="diff">
            <div className="diff-card">
              <q>Help me with this.</q>
              <p>CredTax completes assigned work; the CPA manages the workflow around it.</p>
              <span className="m">Flexible Support</span>
            </div>
            <div className="diff-card">
              <q>Give me someone who knows my firm.</q>
              <p>A professional owns assigned responsibilities; the CPA manages the broader workflow.</p>
              <span className="m">Dedicated Professional</span>
            </div>
            <div className="diff-card hero-card">
              <q>Build this function around my firm.</q>
              <p>CredTax manages the agreed production workflow within defined scope.</p>
              <span className="m">CredTax Pod</span>
            </div>
          </div>
        </div>
      </section>

      {/* WALKTHROUGH */}
      <section className="section section--mist" id="pod-workflow" aria-labelledby="h-walk">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow-s">Follow one job through the Pod</p>
            <h2 id="h-walk">Example: a 1040 tax return.</h2>
            <p>Click any stage to see who handles it, what happens, and what stays with your firm.</p>
          </div>
          <WalkthroughTrack />
        </div>
      </section>

      {/* WHAT COMES OFF YOUR PLATE */}
      <section className="section" aria-labelledby="h-platepod">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow-s">What comes off your plate</p>
            <h2 id="h-platepod">The production engine, handled.</h2>
          </div>
          <div className="plate-grid">
            <div className="mini-card">
              <h3>Workflow Coordination</h3>
              <p>Assignment, status tracking, follow-up and handoffs.</p>
            </div>
            <div className="mini-card">
              <h3>Production</h3>
              <p>Preparation and recurring operational work.</p>
            </div>
            <div className="mini-card">
              <h3>Internal Review</h3>
              <p>Defined QC and review checkpoints.</p>
            </div>
            <div className="mini-card">
              <h3>Capacity</h3>
              <p>Resources adjusted around workload.</p>
            </div>
            <div className="mini-card">
              <h3>Continuity</h3>
              <p>Backup coverage and accumulated process knowledge.</p>
            </div>
            <div className="mini-card">
              <h3>Process Development</h3>
              <p>Learning your firm&apos;s recurring workflow and improving consistency.</p>
            </div>
          </div>
          <p
            className="statement pull"
            style={{
              marginTop: '36px',
              maxWidth: '44ch',
              fontSize: 'clamp(1.2rem, 1rem + 0.9vw, 1.6rem)',
            }}
          >
            You remain in control of the client and professional decisions. CredTax takes ownership of the production
            engine behind the agreed function.
          </p>
        </div>
      </section>

      {/* WHAT REMAINS */}
      <section className="section section--mist" aria-labelledby="h-remains">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow-s">Responsibility</p>
            <h2 id="h-remains">What remains with your firm.</h2>
          </div>
          <div className="remains">
            <p style={{ margin: 0, color: 'var(--muted)' }}>A Pod doesn&apos;t take these on — they stay with you, by design.</p>
            <ul>
              <li>Client relationship</li>
              <li>Professional judgment</li>
              <li>Final tax / accounting decisions</li>
              <li>Final approval</li>
              <li>Engagement responsibility</li>
              <li>Firm-level standards</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONFIGURATOR */}
      <section className="section" aria-labelledby="h-cfg">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow-s">Built around your firm</p>
            <h2 id="h-cfg">Scope plus volume plus complexity shapes the Pod.</h2>
            <p>This is illustrative, not an automated quote — it shows how the model works.</p>
          </div>
          <PodConfigurator />
        </div>
      </section>

      {/* NICHE PODS */}
      <section className="section section--mist" aria-labelledby="h-niche">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow-s">Niche Pods</p>
            <h2 id="h-niche">A Pod can be built around more than a service.</h2>
            <p>
              It can be built around a workflow or a niche. As a firm&apos;s volume grows within a particular client
              type, the Pod can develop deeper process knowledge around it &mdash; the relationship&apos;s value can grow
              over time.
            </p>
          </div>
          <div className="niche-card">
            <h3>Fitness &amp; Wellness Tax Pod</h3>
            <ul className="tags">
              <li>Tax preparation</li>
              <li>Bookkeeping</li>
              <li>Entity-specific workflows</li>
              <li>Recurring accounting</li>
              <li>Industry documentation</li>
              <li>Tax planning support</li>
            </ul>
          </div>
          <p className="small-note">
            This is one illustration of the model, not a portfolio of existing niche Pods &mdash; CredTax does not claim a
            large library of pre-built industry Pods today.
          </p>
        </div>
      </section>

      {/* HOW THE POD SCALES */}
      <section className="section" id="pod-scale" aria-labelledby="h-scale">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow-s">How the Pod scales</p>
            <h2 id="h-scale">You don&apos;t redesign your model every time your workload changes.</h2>
          </div>
          <ol className="stepper" style={{ ['--n' as string]: 4 }} aria-label="How a Pod scales">
            <li style={{ ['--i' as string]: 0 }}>
              <span className="step-n">01</span>
              <h3>Growing CPA firm</h3>
              <p>Small workload &rarr; a focused Pod with a small specialized team.</p>
            </li>
            <li style={{ ['--i' as string]: 1 }}>
              <span className="step-n">02</span>
              <h3>Increasing volume</h3>
              <p>More returns and clients &rarr; the Pod expands capacity.</p>
            </li>
            <li style={{ ['--i' as string]: 2 }}>
              <span className="step-n">03</span>
              <h3>Multiple functions</h3>
              <p>Tax and accounting together &rarr; a Combined Pod.</p>
            </li>
            <li style={{ ['--i' as string]: 3 }}>
              <span className="step-n">04</span>
              <h3>Specialized operations</h3>
              <p>Niche workflows and additional specialists &rarr; an expanded Pod structure.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* POD PRICING */}
      <section className="section dark" id="pod-pricing" aria-labelledby="h-podprice">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow-s">Pricing</p>
            <h2 id="h-podprice">Your Pod is built around the work — not a fixed package.</h2>
          </div>
          <div className="formula">
            <span className="term">Volume</span>
            <span className="op" aria-hidden="true">+</span>
            <span className="term">Complexity</span>
            <span className="op" aria-hidden="true">+</span>
            <span className="term">Functions</span>
            <span className="op" aria-hidden="true">+</span>
            <span className="term">Review Requirements</span>
            <span className="op" aria-hidden="true">+</span>
            <span className="term">Capacity</span>
            <span className="op" aria-hidden="true">+</span>
            <span className="term">Workflow Scope</span>
            <span className="op" aria-hidden="true">=</span>
            <span className="res">Custom Pod Structure</span>
          </div>
          <p style={{ maxWidth: '66ch' }}>
            Pod engagements are custom-quoted based on workload, complexity and required capacity &mdash; not a published
            rate card or a fixed headcount price.
          </p>
          <div style={{ marginTop: '24px' }}>
            <Link className="btn btn-primary" href="/book-appointment">
              Build My Pod
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA BAND */}
      <section className="cta-band" style={{ background: 'var(--mist)' }} aria-labelledby="h-podfinal">
        <div className="wrap">
          <div className="inner">
            <p className="eyebrow-s" style={{ margin: 0 }}>
              Your firm already has the workflow
            </p>
            <h2 id="h-podfinal">Let CredTax build the team behind it.</h2>
            <p className="muted">
              Tell us which function is putting pressure on your firm — tax, accounting, administration, or a combination.
              We&apos;ll map the workflow, determine the required support structure and propose the appropriate CredTax Pod.
            </p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/book-appointment">
                Book Appointment
              </Link>
              <Link className="btn btn-secondary" href="/services#svc-comparison">
                Compare the three models
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
