import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Icon } from '@/components/Icons';
import { RadialDiagram } from '@/components/RadialDiagram';
import { SuccessionTransitionTabs } from '@/components/SuccessionTransitionTabs';
import { FaqAccordion } from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'Firm Continuity & Succession for CPA Practice Owners | CredTax',
  description:
    'CredTax helps CPA firm owners transition away from day-to-day production without automatically giving up the firm they’ve spent years building. Through a long-term operating partnership, CredTax takes over agreed production while the owner retains an agreed role and economic participation.',
};

const SUCCESSION_RADIAL_ITEMS = [
  'Client relationships',
  'Tax preparation',
  'Review',
  'Bookkeeping',
  'Staff management',
  'Workflow',
  'Questions',
  'Deadlines',
  'Quality control',
  'Administrative decisions',
  'Escalations',
];

const SUCCESSION_FAQS = [
  {
    title: 'Questions owners ask first',
    items: [
      {
        q: 'Is CredTax buying my firm?',
        a: 'Not necessarily. This model is designed as an operating/continuity partnership. The commercial structure is individually negotiated.',
      },
      {
        q: 'Do I have to retire completely?',
        a: 'No. The model can be designed around the level of involvement you want to retain.',
      },
      {
        q: 'Who remains responsible for professional decisions?',
        a: 'The CPA firm and its licensed professionals retain professional responsibility and final decisions.',
      },
      {
        q: 'Does CredTax become my staff?',
        a: 'The model is designed around a managed operating function rather than simply supplying individual staff.',
      },
      {
        q: 'Can tax and bookkeeping be separate?',
        a: 'Yes. CredTax can structure specialized Tax Pods and Accounting Pods rather than combining unrelated functions into one team.',
      },
      {
        q: 'Can the transition happen gradually?',
        a: 'Yes. The transition concept is designed around phased knowledge transfer, workflow stabilization and gradual movement of agreed responsibilities.',
      },
      {
        q: 'Is there a standard revenue-sharing arrangement?',
        a: 'No standard commercial structure should be implied. Terms would be discussed and structured based on the specific firm and appropriate professional/legal advice.',
      },
    ],
  },
];

export default function SuccessionPage() {
  return (
    <div className="page" data-page="succession">
      {/* HERO */}
      <section className="page-hero dark" aria-labelledby="h-succ">
        <div className="wrap">
          <p className="hero-tag">Firm continuity &amp; succession</p>
          <h1 id="h-succ" style={{ maxWidth: '16em' }}>
            You built the firm. You don&apos;t necessarily have to walk away from it.
          </h1>
          <p className="lead">
            CredTax helps CPA firm owners transition away from day-to-day production without automatically giving up the
            firm they&apos;ve spent years building.
          </p>
          <p className="lead" style={{ marginTop: '14px' }}>
            Through a long-term operating partnership, CredTax can take over agreed production and workflow
            responsibilities while the owner retains an agreed role, relationship and economic participation.
          </p>
          <div className="btn-row" style={{ marginTop: '34px' }}>
            <Link className="btn btn-primary" href="/book-appointment">
              Book Appointment
            </Link>
            <a className="btn btn-secondary" href="#succ-model">
              Explore the Model
            </a>
          </div>
        </div>
      </section>

      {/* CORE PROBLEM */}
      <section className="section" id="succ-problem" aria-labelledby="h-prob">
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow-s">The core problem</p>
            <h2 id="h-prob">The problem isn&apos;t always selling the firm.</h2>
            <p>Sometimes the real problem is that the firm still depends on the owner for almost everything.</p>
          </div>
          <RadialDiagram
            items={SUCCESSION_RADIAL_ITEMS}
            centerText={
              <>
                The
                <br />
                Owner
              </>
            }
          />
          <p className="caption-strong">The firm has employees.</p>
          <p className="caption-strong">The firm still depends on the owner.</p>
        </div>
      </section>

      {/* REFRAME */}
      <section className="section section--mist" id="succ-reframe" aria-labelledby="h-reframe">
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow-s">The reframe</p>
            <h2 id="h-reframe">A successful firm can still depend entirely on the person who built it.</h2>
          </div>
          <div className="ba2">
            <div className="box">
              <span className="tag">Before</span>
              <p className="stmt">Owner does the work.</p>
            </div>
            <div className="arr" aria-hidden="true">
              <svg viewBox="0 0 34 14" width="30" height="14" aria-hidden="true">
                <path d="M0 7H26M20 1l8 6-8 6" stroke="currentColor" strokeWidth="1.6" fill="none" />
              </svg>
            </div>
            <div className="box after">
              <span className="tag">After</span>
              <p className="stmt">
                Owner owns the relationship &amp; business. CredTax operates the agreed production function.
              </p>
            </div>
          </div>
          <div className="boundary">
            <div className="b-col">
              <h3>CPA Owner</h3>
              <ul className="ticks">
                <li>Client relationships</li>
                <li>Professional judgment</li>
                <li>Final decisions</li>
                <li>Strategic direction</li>
                <li>Agreed ownership / economic participation</li>
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
                <li>Tax production</li>
                <li>Accounting / bookkeeping</li>
                <li>Workflow management</li>
                <li>Staff coordination</li>
                <li>Internal quality control</li>
                <li>Capacity management</li>
                <li>Administrative production support</li>
                <li>Process continuity</li>
              </ul>
            </div>
          </div>
          <p className="note">The exact scope is negotiated for each firm.</p>
        </div>
      </section>

      {/* SPECTRUM */}
      <section className="section" aria-labelledby="h-spec">
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow-s">What if succession didn&apos;t have to mean walking away?</p>
            <h2 id="h-spec">Traditional succession often means one event: sell, transfer, leave.</h2>
            <p>Some owners may want something different.</p>
          </div>
          <ol className="stepper" style={{ ['--n' as string]: 6 }} aria-label="A spectrum of involvement">
            <li style={{ ['--i' as string]: 0 }}>
              <h3 style={{ fontSize: '1rem' }}>Run Everything Yourself</h3>
            </li>
            <li style={{ ['--i' as string]: 1 }}>
              <h3 style={{ fontSize: '1rem' }}>Reduce Production</h3>
            </li>
            <li style={{ ['--i' as string]: 2 }}>
              <h3 style={{ fontSize: '1rem' }}>Delegate Operations</h3>
            </li>
            <li style={{ ['--i' as string]: 3 }}>
              <h3 style={{ fontSize: '1rem' }}>CredTax Operates Agreed Functions</h3>
            </li>
            <li style={{ ['--i' as string]: 4 }}>
              <h3 style={{ fontSize: '1rem' }}>Owner Remains Involved</h3>
            </li>
            <li style={{ ['--i' as string]: 5 }}>
              <h3 style={{ fontSize: '1rem' }}>Gradual Transition</h3>
            </li>
          </ol>
          <div className="legal-note center-note">
            This is not a guaranteed legal or financial succession structure. The structure, ownership, economics and
            transition terms are individually negotiated and subject to appropriate legal, tax and professional advice.
          </div>
        </div>
      </section>

      {/* MODEL */}
      <section className="section section--mist" id="succ-model" aria-labelledby="h-smodel">
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow-s">The CredTax model</p>
            <h2 id="h-smodel">An operating partnership, not a staffing arrangement.</h2>
            <p>
              CredTax is not simply supplying employees to your firm. The objective is to create an operating structure
              in which CredTax takes responsibility for agreed production functions and helps keep those functions
              moving.
            </p>
          </div>
          <div className="model-flow">
            <div className="model-node">
              <h3>CPA Firm</h3>
              <p>
                Client relationships / Professional responsibility / Final decisions / Firm ownership / agreed economics
              </p>
            </div>
            <div className="model-arrow" aria-hidden="true">
              <svg viewBox="0 0 16 24" aria-hidden="true">
                <path d="M8 0V18M2 13l6 7 6-7" stroke="currentColor" strokeWidth="1.6" fill="none" />
              </svg>
            </div>
            <div className="model-node op">
              <h3>CredTax Operating Layer</h3>
              <p>
                Workflow / Production / Quality control / Staffing / Backup / Documentation / Capacity / Process
                management
              </p>
            </div>
            <div className="model-arrow" aria-hidden="true">
              <svg viewBox="0 0 16 24" aria-hidden="true">
                <path d="M8 0V18M2 13l6 7 6-7" stroke="currentColor" strokeWidth="1.6" fill="none" />
              </svg>
            </div>
            <div className="model-node">
              <h3>Client Service</h3>
              <p>Tax / Accounting / Bookkeeping / Administrative support</p>
            </div>
          </div>
        </div>
      </section>

      {/* POWERED BY PODS */}
      <section className="section" aria-labelledby="h-spods">
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow-s">Powered by CredTax Pods</p>
            <h2 id="h-spods">The firm doesn&apos;t depend on one person. The work runs through functions.</h2>
            <p>Instead of replacing the owner with another individual, CredTax builds the operating capacity around the firm.</p>
          </div>
          <div className="owner-above">
            <div className="owner-chip">The Owner</div>
            <div className="owner-line" />
          </div>
          <div className="pod-triplet">
            <div className="pod-tcard">
              <h3>Tax Pod</h3>
              <ul>
                <li>Tax preparers</li>
                <li>Senior review</li>
                <li>Tax workflow coordination</li>
                <li>Technical support</li>
                <li>Backup</li>
              </ul>
            </div>
            <div className="pod-tcard">
              <h3>Accounting Pod</h3>
              <ul>
                <li>Bookkeepers</li>
                <li>Accountants</li>
                <li>Accounting review</li>
                <li>Month-end workflow</li>
                <li>Backup</li>
              </ul>
            </div>
            <div className="pod-tcard">
              <h3>Operations</h3>
              <ul>
                <li>Workflow coordination</li>
                <li>Administrative support</li>
                <li>Client communication support</li>
                <li>Process management</li>
              </ul>
            </div>
          </div>
          <p className="small-note center" style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link className="link" href="/credtax-pod">
              Learn how a CredTax Pod works
            </Link>
          </p>
        </div>
      </section>

      {/* TODAY / TRANSITION / FUTURE */}
      <SuccessionTransitionTabs />

      {/* PHASES */}
      <section className="section" id="succ-transition" aria-labelledby="h-phases">
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow-s">The transition isn&apos;t instant</p>
            <h2 id="h-phases">Six phases, moving at the pace the firm requires.</h2>
          </div>
          <ol className="stages phases" style={{ marginInline: 'auto' }}>
            <li className="stage">
              <span className="stage-n" aria-hidden="true">
                1
              </span>
              <div>
                <p style={{ margin: 0, fontWeight: 650, fontSize: '0.9rem', color: 'var(--accent)' }}>Phase 1</p>
                <h3>Understand</h3>
                <p className="lede" style={{ margin: 0 }}>
                  Learn the firm &mdash; clients, services, software, workflow, documentation, review standards, staff
                  structure.
                </p>
              </div>
            </li>
            <li className="stage">
              <span className="stage-n" aria-hidden="true">
                2
              </span>
              <div>
                <p style={{ margin: 0, fontWeight: 650, fontSize: '0.9rem', color: 'var(--accent)' }}>Phase 2</p>
                <h3>Build</h3>
                <p className="lede" style={{ margin: 0 }}>
                  Create the operating structure &mdash; Pod design, roles, responsibilities, workflow, QC, backup.
                </p>
              </div>
            </li>
            <li className="stage">
              <span className="stage-n" aria-hidden="true">
                3
              </span>
              <div>
                <p style={{ margin: 0, fontWeight: 650, fontSize: '0.9rem', color: 'var(--accent)' }}>Phase 3</p>
                <h3>Transfer</h3>
                <p className="lede" style={{ margin: 0 }}>
                  Gradually move agreed production responsibilities.
                </p>
              </div>
            </li>
            <li className="stage">
              <span className="stage-n" aria-hidden="true">
                4
              </span>
              <div>
                <p style={{ margin: 0, fontWeight: 650, fontSize: '0.9rem', color: 'var(--accent)' }}>Phase 4</p>
                <h3>Stabilize</h3>
                <p className="lede" style={{ margin: 0 }}>
                  Monitor quality and workflow.
                </p>
              </div>
            </li>
            <li className="stage">
              <span className="stage-n" aria-hidden="true">
                5
              </span>
              <div>
                <p style={{ margin: 0, fontWeight: 650, fontSize: '0.9rem', color: 'var(--accent)' }}>Phase 5</p>
                <h3>Operate</h3>
                <p className="lede" style={{ margin: 0 }}>
                  CredTax operates the agreed functions.
                </p>
              </div>
            </li>
            <li className="stage is-final">
              <span className="stage-n" aria-hidden="true">
                6
              </span>
              <div>
                <p style={{ margin: 0, fontWeight: 650, fontSize: '0.9rem', color: 'var(--accent)' }}>Phase 6</p>
                <h3>Transition</h3>
                <p className="lede" style={{ margin: 0 }}>
                  The owner&apos;s involvement can reduce or evolve according to the agreed arrangement.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* OWNER TYPES */}
      <section className="section section--mist" aria-labelledby="h-types">
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow-s">Different types of owners</p>
            <h2 id="h-types">There is no single right starting point.</h2>
          </div>
          <div className="owner-types">
            <div className="type-card">
              <h3>&ldquo;I Want to Step Back&rdquo;</h3>
              <ul className="ticks">
                <li>Reduce production workload</li>
                <li>Maintain client continuity</li>
                <li>Reduce staff-management burden</li>
                <li>Continue agreed involvement</li>
                <li>Create a gradual transition</li>
              </ul>
            </div>
            <div className="type-card">
              <h3>&ldquo;I Want to Keep My Firm&rdquo;</h3>
              <ul className="ticks">
                <li>Continue ownership</li>
                <li>Reduce operational burden</li>
                <li>Delegate production</li>
                <li>Build operational continuity</li>
                <li>Maintain agreed economic participation</li>
              </ul>
            </div>
            <div className="type-card">
              <h3>&ldquo;I Want to Prepare for the Future&rdquo;</h3>
              <ul className="ticks">
                <li>Build processes</li>
                <li>Reduce owner dependency</li>
                <li>Document workflows</li>
                <li>Develop a stable operating structure</li>
                <li>Create future succession flexibility</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSIBILITY MAP */}
      <section className="section" aria-labelledby="h-map">
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow-s">What CredTax can take over</p>
            <h2 id="h-map">A responsibility map &mdash; customized per firm.</h2>
          </div>
          <div className="resp-map">
            <div className="resp-card">
              <h3>Tax</h3>
              <ul>
                <li>Preparation</li>
                <li>Workflow</li>
                <li>Internal review</li>
                <li>Document follow-up within scope</li>
                <li>Production coordination</li>
              </ul>
            </div>
            <div className="resp-card">
              <h3>Accounting</h3>
              <ul>
                <li>Bookkeeping</li>
                <li>Reconciliations</li>
                <li>Month-end</li>
                <li>Financial reporting</li>
                <li>Cleanup</li>
              </ul>
            </div>
            <div className="resp-card">
              <h3>Operations</h3>
              <ul>
                <li>Workflow coordination</li>
                <li>Administrative support</li>
                <li>Staff coordination</li>
                <li>Process tracking</li>
                <li>Recurring operational tasks</li>
              </ul>
            </div>
            <div className="resp-card">
              <h3>Support</h3>
              <ul>
                <li>Backup capacity</li>
                <li>Specialist resources</li>
                <li>Documentation</li>
                <li>Process continuity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OWNER RETAINS */}
      <section className="section section--mist" aria-labelledby="h-retain">
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow-s">What the owner retains</p>
            <h2 id="h-retain">You don&apos;t have to give up everything to step back.</h2>
          </div>
          <div className="retain">
            <ul>
              <li>Client relationships</li>
              <li>Professional judgment</li>
              <li>Final professional decisions</li>
              <li>Strategic direction</li>
              <li>Ownership / economic participation as agreed</li>
              <li>Level of client involvement as agreed</li>
            </ul>
            <p className="retain-note">The owner&apos;s role is defined as part of the individual transition arrangement.</p>
          </div>
        </div>
      </section>

      {/* ECONOMIC MODEL */}
      <section className="section" aria-labelledby="h-econ">
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow-s">The economic model</p>
            <h2 id="h-econ">A different way to think about firm continuity.</h2>
          </div>
          <div className="econ" style={{ marginInline: 'auto' }}>
            <div className="econ-row">
              <span className="econ-label">Traditional model</span>
              <span className="econ-chip">Owner works</span>
              <span className="econ-arrow" aria-hidden="true">
                &rarr;
              </span>
              <span className="econ-chip">Firm produces</span>
              <span className="econ-arrow" aria-hidden="true">
                &rarr;
              </span>
              <span className="econ-chip">Owner earns</span>
            </div>
            <div className="econ-row">
              <span className="econ-label">Potential continuity model</span>
              <span className="econ-chip hi">CredTax operates agreed functions</span>
              <span className="econ-arrow" aria-hidden="true">
                &rarr;
              </span>
              <span className="econ-chip hi">Firm continues serving clients</span>
              <span className="econ-arrow" aria-hidden="true">
                &rarr;
              </span>
              <span className="econ-chip hi">Owner retains agreed economic participation</span>
            </div>
          </div>
          <p style={{ maxWidth: '64ch', color: 'var(--muted)', margin: '0 auto 18px', textAlign: 'center' }}>
            The commercial arrangement could potentially draw on operating support fees, revenue-sharing arrangements,
            profit participation, transition arrangements, or other mutually agreed structures &mdash; none of which should
            be read as a standard CredTax term.
          </p>
          <div className="legal-note center-note" style={{ marginInline: 'auto' }}>
            Commercial terms are individually structured based on the firm&apos;s circumstances, scope and economics. Any
            ownership, revenue-sharing, profit-sharing, succession, tax or legal structure would be subject to separate
            professional and legal advice.
          </div>
        </div>
      </section>

      {/* FIVE PILLARS */}
      <section className="section section--mist" aria-labelledby="h-pillars">
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow-s">Why this can work</p>
            <h2 id="h-pillars">Five pillars the model is designed to support.</h2>
          </div>
          <div className="resp-map five-up">
            <div className="resp-card">
              <h3>Continuity</h3>
              <ul>
                <li>Designed to reduce the firm&apos;s dependence on any one individual.</li>
              </ul>
            </div>
            <div className="resp-card">
              <h3>Capacity</h3>
              <ul>
                <li>Designed to build production capacity around actual workload.</li>
              </ul>
            </div>
            <div className="resp-card">
              <h3>Specialization</h3>
              <ul>
                <li>Designed so tax and accounting can operate as separate specialized functions.</li>
              </ul>
            </div>
            <div className="resp-card">
              <h3>Quality</h3>
              <ul>
                <li>Designed around defined workflow and internal quality controls.</li>
              </ul>
            </div>
            <div className="resp-card">
              <h3>Flexibility</h3>
              <ul>
                <li>Designed so the owner&apos;s involvement can evolve rather than change overnight.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT CONTINUITY */}
      <section className="section" aria-labelledby="h-client">
        <div className="wrap narrow">
          <div className="sec-head center">
            <p className="eyebrow-s">Client continuity</p>
            <h2 id="h-client">Your clients built the firm with you.</h2>
          </div>
          <ol className="flow-list" style={{ marginInline: 'auto', maxWidth: '520px' }} aria-label="How client continuity is protected">
            <li>
              <b>CPA builds relationships</b>
            </li>
            <li>
              <b>Clients return year after year</b>
            </li>
            <li>
              <b>Firm develops processes and reputation</b>
            </li>
            <li>
              <b>Owner wants to reduce involvement</b>
            </li>
            <li>
              <b>Operating structure evolves</b>
            </li>
            <li className="us">
              <b>Client service continues</b>
            </li>
          </ol>
          <p className="small-note" style={{ marginInline: 'auto', textAlign: 'center' }}>
            A transition should protect the continuity of the service relationship wherever possible. Not every client
            relationship is guaranteed to continue unchanged.
          </p>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="section section--mist" id="succ-who" aria-labelledby="h-who">
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow-s">Who this is for</p>
            <h2 id="h-who">A fit for some firms — not every firm.</h2>
          </div>
          <div className="who-grid">
            <div className="who-col">
              <h3>This model may be relevant if:</h3>
              <ul className="ticks">
                <li>You have built an established CPA practice.</li>
                <li>You want to reduce your day-to-day production workload.</li>
                <li>Your firm depends heavily on you.</li>
                <li>You want to continue benefiting economically from the firm.</li>
                <li>You are considering retirement but don&apos;t want an abrupt exit.</li>
                <li>You want to reduce operational involvement without immediately selling.</li>
                <li>You want to build a succession path before you need one.</li>
              </ul>
            </div>
            <div className="who-col no">
              <h3>It may not be the right structure if:</h3>
              <ul className="dashes">
                <li>You want an immediate outright sale.</li>
                <li>You want to transfer all professional responsibility to another party.</li>
                <li>You are looking for a simple staffing arrangement.</li>
                <li>The firm doesn&apos;t have sufficient recurring workflow to support an operating model.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ILLUSTRATIVE EXAMPLE */}
      <section className="section" aria-labelledby="h-illus">
        <div className="wrap">
          <span className="badge">Illustrative Example &mdash; Hypothetical</span>
          <div className="sec-head" style={{ marginBottom: '32px' }}>
            <h2 id="h-illus">A mature practice, before and after.</h2>
          </div>
          <div className="illus">
            <div>
              <h3>Before</h3>
              <ul>
                <li>Owner reviews returns</li>
                <li>Owner manages staff</li>
                <li>Owner answers workflow questions</li>
                <li>Owner handles bookkeeping escalations</li>
                <li>Owner manages deadlines</li>
              </ul>
            </div>
            <div className="after-col">
              <h3>After Transition</h3>
              <ul>
                <li>Owner: client relationships</li>
                <li>Owner: final professional decisions</li>
                <li>Owner: strategic involvement</li>
                <li>CredTax: Tax Pod + Accounting Pod</li>
                <li>CredTax: workflow coordination, internal QC, backup capacity</li>
              </ul>
            </div>
          </div>
          <p className="small-note">
            The owner remains economically involved according to the agreed arrangement. This is a hypothetical
            illustration, not an actual CredTax client.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--mist" id="succ-faq" aria-labelledby="h-sfaq">
        <div className="wrap faq-wrap">
          <div className="sec-head">
            <p className="eyebrow-s">Questions</p>
            <h2 id="h-sfaq">Questions owners ask first.</h2>
          </div>
          <FaqAccordion categories={SUCCESSION_FAQS} />
        </div>
      </section>

      {/* FINAL CTA BAND */}
      <section className="cta-band dark" aria-labelledby="h-succfinal">
        <div className="wrap">
          <div className="inner">
            <h2 id="h-succfinal">You&apos;ve spent years building the firm. Let&apos;s talk about what comes next.</h2>
            <p>
              Whether you&apos;re thinking about retirement, reducing your workload, or simply building a firm that no
              longer depends on you for every operational decision, we can explore what a CredTax operating partnership
              could look like.
            </p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/book-appointment">
                Book Appointment
              </Link>
              <Link className="btn btn-secondary" href="/credtax-pod">
                Explore the CredTax Pod
              </Link>
            </div>
            <p style={{ fontSize: '0.92rem', marginTop: '8px', color: 'var(--on-dark-muted)' }}>
              Continuity arrangements are individually structured and subject to professional and legal advice.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
