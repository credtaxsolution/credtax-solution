import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Icon } from '@/components/Icons';
import { ServicesComparison } from '@/components/ServicesComparison';
import { FaqAccordion } from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'Services for CPA Firms | CredTax',
  description:
    'Offshore US tax, tax review and quality control, bookkeeping and accounting, and CPA-firm workflow support, delivered through Flexible, Dedicated or Pod engagement models.',
};

const SERVICES_FAQS = [
  {
    title: 'A few things worth clarifying up front',
    items: [
      {
        q: 'Who makes the final call on a return or an entry?',
        a: 'Your firm always retains professional responsibility and final sign-off, regardless of which model you use. CredTax completes and reviews work within the scope agreed — the filing decision stays with you.',
      },
      {
        q: 'Can CredTax handle judgment calls, or only data entry?',
        a: 'Senior-level review and technical work are part of what we do. Where a genuine professional judgment call is required — an unusual position, an ambiguous fact pattern — that decision stays with your firm, with our review notes there to support it.',
      },
      {
        q: 'What happens if my dedicated professional is unavailable?',
        a: "With a Dedicated Professional, backup for absences is something we plan for together in advance — it's one of the honest limits of a one-person model. If ongoing backup coverage matters more than having a single point of contact, a CredTax Pod is built with that coverage in mind from the start.",
      },
      {
        q: 'How does onboarding actually work?',
        a: 'We start by understanding how your firm currently works — documentation, software, review preferences — before any work begins. Review tends to be closest at the start of an engagement and eases as familiarity builds, at a pace that depends on the complexity of the work.',
      },
      {
        q: "I'm not sure which model fits. Where do I start?",
        a: 'Most firms start with Flexible Support, since it asks for the least commitment, and move to Dedicated or Pod once the workload and its shape become clearer. A short conversation about how your firm actually works today will help identify the right starting point.',
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="page" data-page="services">
      {/* HERO */}
      <section className="page-hero dark" aria-labelledby="h-svc-page">
        <div className="wrap hero-split">
          <div>
            <h1 id="h-svc-page">Support that scales with your firm.</h1>
            <p className="lead">
              From individual returns and one-off projects to dedicated professionals and coordinated teams, CredTax gives CPA firms additional capacity &mdash; without forcing every firm into the same engagement model.
            </p>
            <div className="btn-row" style={{ marginTop: '32px' }}>
              <Link className="btn btn-primary" href="/book-appointment">
                Discuss Your Firm
              </Link>
              <Link className="btn btn-secondary" href="/services#svc-how">
                Explore how we work
              </Link>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <span className="pill" style={{ color: 'var(--accent-bright)', borderColor: 'var(--accent-bright)' }}>
              Flexible &bull; Dedicated &bull; Pod
            </span>
            <p style={{ marginTop: '16px', color: 'var(--on-dark-muted)' }}>
              Tailored capacity matching your workflow volume and complexity.
            </p>
          </div>
        </div>
      </section>

      {/* 12. SUBNAV */}
      <nav className="subnav" aria-label="Services navigation">
        <div className="wrap">
          <a href="#svc-tax">US Tax</a>
          <a href="#svc-review">Tax Review &amp; QC</a>
          <a href="#svc-accounting">Bookkeeping &amp; Accounting</a>
          <a href="#svc-workflow">Workflow Support</a>
          <a href="#svc-how">Engagement Models</a>
          <a href="#svc-comparison">Comparison</a>
        </div>
      </nav>

      {/* WHAT WE DO */}
      <section className="section" style={{ paddingBottom: 'clamp(24px, 3vw, 40px)' }} aria-labelledby="h-what">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">What we do</span>
            <h2 id="h-what">Four areas where CredTax supports CPA firms.</h2>
            <p>These are the capabilities we bring to an engagement. How they&apos;re delivered depends on the model your firm chooses.</p>
          </div>

          {/* US TAX */}
          <section className="svc-block" id="svc-tax" aria-labelledby="h-svc-tax">
            <div>
              <Icon name="tax" className="ico-lg" />
              <h2 id="h-svc-tax">US Tax</h2>
              <p className="intro">Individual and business tax return preparation support, tax research, planning support, and organized supporting workpapers.</p>
              <ul className="delivered" aria-label="Available through">
                <li>Flexible Support</li>
                <li>Dedicated Professional</li>
                <li>Tax Pod</li>
              </ul>
            </div>
            <div>
              <div className="lists">
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>Examples may include</h3>
                  <ul className="ticks">
                    <li>Form 1040 individual returns</li>
                    <li>Form 1065 partnership returns</li>
                    <li>Form 1120-S S-corporation returns</li>
                    <li>Form 1120 C-corporation returns</li>
                    <li>Tax research</li>
                    <li>Supporting schedules and workpapers</li>
                    <li>Organizer and document review</li>
                    <li>Planning support</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>Where firms use it</h3>
                  <ul className="ticks">
                    <li>Seasonal overflow</li>
                    <li>Recurring preparation volume</li>
                    <li>Additional capacity ahead of deadlines</li>
                    <li>Work that needs a consistent preparer over time</li>
                  </ul>
                </div>
              </div>
              <p className="svc-note">Work is prepared within your agreed systems and documentation standards, then handed back for your review.</p>
            </div>
          </section>

          {/* TAX REVIEW & QC */}
          <section className="svc-block" id="svc-review" aria-labelledby="h-svc-review">
            <div>
              <Icon name="review" className="ico-lg" />
              <h2 id="h-svc-review">Tax Review &amp; Quality Control</h2>
              <p className="intro">Senior-level review of returns, identification of technical issues, and review notes that support your firm&apos;s own workflow before filing.</p>
              <ul className="delivered" aria-label="Available through">
                <li>Flexible Support</li>
                <li>Dedicated Professional</li>
                <li>Pod</li>
              </ul>
            </div>
            <div>
              <div className="lists">
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>Examples may include</h3>
                  <ul className="ticks">
                    <li>Return review</li>
                    <li>Workpaper review</li>
                    <li>Technical issue identification</li>
                    <li>Missing information</li>
                    <li>Review notes</li>
                    <li>Corrections</li>
                    <li>Pre-final-review quality control</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>Where firms use it</h3>
                  <ul className="ticks">
                    <li>A second check before partner or CPA review</li>
                    <li>Consistent review notes across preparers</li>
                    <li>Catching gaps before they reach the client</li>
                  </ul>
                </div>
              </div>
              <p className="svc-note">Final professional responsibility and filing decisions remain with your firm.</p>
            </div>
          </section>

          {/* BOOKKEEPING & ACCOUNTING */}
          <section className="svc-block" id="svc-accounting" aria-labelledby="h-svc-accounting">
            <div>
              <Icon name="ledger" className="ico-lg" />
              <h2 id="h-svc-accounting">Bookkeeping &amp; Accounting</h2>
              <p className="intro">Bookkeeping, account reconciliations, financial reporting support, and cleanup or catch-up work for accounts that have fallen behind.</p>
              <ul className="delivered" aria-label="Available through">
                <li>Flexible Support</li>
                <li>Dedicated Professional</li>
                <li>Accounting Pod</li>
              </ul>
            </div>
            <div>
              <div className="lists">
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>Examples may include</h3>
                  <ul className="ticks">
                    <li>QuickBooks Online</li>
                    <li>Reconciliations</li>
                    <li>General ledger</li>
                    <li>AP / AR</li>
                    <li>Month-end close</li>
                    <li>Financial statements</li>
                    <li>Cleanup and catch-up</li>
                    <li>Accounting review support</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>Where firms use it</h3>
                  <ul className="ticks">
                    <li>Recurring monthly client work</li>
                    <li>Catch-up projects</li>
                    <li>Preparing books for tax work</li>
                    <li>Adding accounting capacity without a new hire</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CPA FIRM WORKFLOW SUPPORT */}
          <section className="svc-block" id="svc-workflow" aria-labelledby="h-svc-workflow">
            <div>
              <Icon name="flow" className="ico-lg" />
              <h2 id="h-svc-workflow">CPA Firm Workflow Support</h2>
              <p className="intro">Client communication support, inbox and workflow management, document follow-up, scheduling, and day-to-day coordination inside your existing tools.</p>
              <ul className="delivered" aria-label="Available through">
                <li>Flexible Support</li>
                <li>Dedicated Professional</li>
                <li>Pod</li>
              </ul>
            </div>
            <div>
              <div className="lists">
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>Examples may include</h3>
                  <ul className="ticks">
                    <li>Client follow-up</li>
                    <li>Document collection</li>
                    <li>TaxDome support</li>
                    <li>Inbox management</li>
                    <li>Task and deadline tracking</li>
                    <li>Scheduling</li>
                    <li>Workflow coordination</li>
                    <li>Administrative support</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>Where firms use it</h3>
                  <ul className="ticks">
                    <li>Missing-document chasing during busy periods</li>
                    <li>A single point of coordination for the tax pipeline</li>
                    <li>Freeing preparers and reviewers from admin</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <p className="fineprint">Named systems (for example QuickBooks Online and TaxDome) are examples of tools we can work within, subject to access, compatibility and engagement scope. CredTax provides preparation, review-support and workflow services. The CPA firm retains professional responsibility, client relationships and final professional decisions.</p>
        </div>
      </section>

      {/* HOW YOU CAN WORK WITH US */}
      <section className="section section--mist" id="svc-how" aria-labelledby="h-how-models">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">How you can work with us</span>
            <h2 id="h-how-models">Three ways to work with CredTax.</h2>
            <p>
              Not every firm needs the same thing. Some need help finishing a batch of returns. Others want one person who knows their systems well. Some need a coordinated team built around a workflow. CredTax offers three engagement models, matched to how predictable and complex your workload is &mdash; not how big your firm is.
            </p>
          </div>

          <div className="axes" style={{ marginBottom: 'clamp(32px, 4vw, 56px)' }}>
            <div>
              <h3>What we do</h3>
              <p>The service.</p>
              <ul className="chips">
                <li>Tax</li>
                <li>Tax Review &amp; QC</li>
                <li>Bookkeeping &amp; Accounting</li>
                <li>Workflow Support</li>
              </ul>
            </div>
            <div className="x" aria-hidden="true">&times;</div>
            <div>
              <h3>How you work with us</h3>
              <p>The engagement model.</p>
              <ul className="chips">
                <li>Flexible</li>
                <li>Dedicated</li>
                <li>Pod</li>
              </ul>
            </div>
          </div>

          {/* MODEL 1 */}
          <article className="md" id="model-flexible" aria-labelledby="h-model-flexible">
            <div>
              <span className="pill">Model 1</span>
              <h3 id="h-model-flexible">Flexible Support</h3>
              <p className="desc">Additional capacity when you need it.</p>
            </div>
            <div className="md-body">
              <div>
                <p>
                  <b>How it works.</b> Your firm defines a specific piece of work &mdash; a batch of returns, a cleanup project, a busy-season overflow &mdash; and hands it to CredTax with clear boundaries. CredTax completes exactly what was assigned and returns it. Your firm keeps managing the overall workflow: assigning the work, sequencing it, and deciding what happens next. CredTax isn&apos;t holding open capacity between assignments; each engagement is booked as it comes up.
                </p>
                <p>
                  This is the model most firms start with, because it asks for the least commitment. There&apos;s no dedicated person to onboard and no ongoing workflow to hand over &mdash; just a defined piece of work, completed and returned.
                </p>
                <div className="md-scenario">
                  <b>A quick illustration:</b> Consider a firm facing a backlog of individual returns before an extension deadline. There&apos;s no ongoing need for the extra capacity once the backlog clears. Flexible Support adds capacity for exactly that window, then steps back &mdash; without the firm carrying a new hire, or an idle resource, forward into the next quarter.
                </div>
                <div className="md-notfit">
                  <b>Where this doesn&apos;t fit:</b> if you need someone available every day without advance notice, if the work touches several clients or systems at once and needs constant real-time coordination, or if you want someone to proactively flag issues beyond what was assigned &mdash; those needs point toward Dedicated or Pod instead.
                </div>
              </div>
              <div className="facts-col">
                <div className="fact-block">
                  <h4 style={{ margin: '0 0 10px', fontSize: '0.95rem' }}>Best suited for</h4>
                  <ul className="ticks">
                    <li>Seasonal overflow</li>
                    <li>Individual returns</li>
                    <li>Bulk return projects</li>
                    <li>Testing the relationship before committing further</li>
                  </ul>
                </div>
                <div className="fact-block">
                  <h4 style={{ margin: '0 0 10px', fontSize: '0.95rem' }}>Engagement formats</h4>
                  <ul className="ticks">
                    <li>Hourly</li>
                    <li>Project-based</li>
                    <li>Per return</li>
                  </ul>
                </div>
                <div className="fact-block">
                  <h4 style={{ margin: '0 0 10px', fontSize: '0.95rem' }}>The natural limits of this model</h4>
                  <ul className="ticks">
                    <li>Availability is booked as needed, not held open</li>
                    <li>No dedicated resource assigned to your firm</li>
                    <li>Continuity is project by project</li>
                    <li>Your firm manages the workflow throughout</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* MODEL 2 */}
          <article className="md" id="model-dedicated" aria-labelledby="h-model-dedicated" style={{ marginTop: '36px', paddingTop: '36px', borderTop: '1px solid var(--line)' }}>
            <div>
              <span className="pill">Model 2</span>
              <h3 id="h-model-dedicated">Dedicated Professional</h3>
              <p className="desc">A professional who learns your firm.</p>
            </div>
            <div className="md-body">
              <div>
                <p>
                  <b>How it works.</b> Instead of assigning individual pieces of work, your firm gets one CredTax professional whose time is committed to you on a recurring basis. Over successive weeks and months, that person becomes familiar with your documentation standards, the software you use, your review preferences, and the shape of your recurring workload. The professional owns the assigned workload day to day; your firm still manages the overall workflow around it &mdash; deciding priorities, reviewing output, and setting the pace.
                </p>
                <p>
                  The value here builds gradually. The first month looks like closer instruction and more back-and-forth. By the third or fourth month, the same person is catching things they would have had to ask about earlier, simply because they&apos;ve seen your files before.
                </p>
                <div className="md-scenario">
                  <b>A quick illustration:</b> Consider a firm with a steady monthly bookkeeping caseload. Early on, the dedicated professional is learning the chart of accounts and asking clarifying questions. A few months in, they recognize the recurring adjusting entries, the client-specific quirks, and the format your firm prefers for handoff &mdash; without being told each time.
                </div>
                <div className="md-notfit">
                  <b>Where this doesn&apos;t fit:</b> if your recurring workload doesn&apos;t yet fill one person&apos;s time consistently, a dedicated arrangement can leave capacity going unused in slower months &mdash; Flexible Support is usually the better starting point until volume stabilizes. It also isn&apos;t the right fit if the work genuinely spans more specialties than one person can reasonably cover.
                </div>
              </div>
              <div className="facts-col">
                <div className="fact-block">
                  <h4 style={{ margin: '0 0 10px', fontSize: '0.95rem' }}>Best suited for</h4>
                  <ul className="ticks">
                    <li>Recurring workload</li>
                    <li>Stable, predictable volume</li>
                    <li>Firms that want the same person over time</li>
                  </ul>
                </div>
                <div className="fact-block">
                  <h4 style={{ margin: '0 0 10px', fontSize: '0.95rem' }}>Engagement formats</h4>
                  <ul className="ticks">
                    <li>Structured around a dedicated professional</li>
                    <li>Scoped to a recurring workload</li>
                  </ul>
                </div>
                <div className="fact-block">
                  <h4 style={{ margin: '0 0 10px', fontSize: '0.95rem' }}>The natural limits of this model</h4>
                  <ul className="ticks">
                    <li>Capacity is that of one person</li>
                    <li>Skill coverage reflects that individual&apos;s background</li>
                    <li>Backup requires advance planning</li>
                    <li>Scaling further means adding another resource</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* MODEL 3 (High-contrast, fully light-styled matching Model 1 & 2) */}
          <article className="md md--pod" id="model-pod" aria-labelledby="h-model-pod" style={{ marginTop: '36px', paddingTop: '36px', borderTop: '1px solid var(--line)' }}>
            <div>
              <span className="pill">Model 3</span>
              <h3 id="h-model-pod">CredTax Pod</h3>
              <p className="desc">A team built around your workflow.</p>
            </div>
            <div className="md-body">
              <div>
                <p>
                  <b>How it works.</b> A Pod isn&apos;t a headcount &mdash; it&apos;s a structured team assembled around an agreed production workflow, with roles matched to what that workflow actually requires. A typical Pod might pair a preparer with a senior reviewer and a workflow coordinator; a more complex one might add a bookkeeping specialist. CredTax manages the agreed production workflow within a scope your firm defines up front. Your firm retains professional responsibility and every final decision &mdash; the Pod handles production, not sign-off.
                </p>
                <p>
                  Because a Pod has more than one person on it, it can absorb things a single dedicated professional can&apos;t: one member out doesn&apos;t stop the work, and different pieces of the workflow can run in parallel instead of queueing behind one person.
                </p>
                <div className="md-scenario">
                  <b>A quick illustration:</b> Consider a growing firm whose bookkeeping, tax preparation, and review needs have all scaled together, with more clients wanting the same fast turnaround. A Pod lets each part of that workflow &mdash; reconciliation, preparation, review &mdash; move at once, coordinated internally, rather than routing everything through a single person.
                </div>
                <div className="md-notfit">
                  <b>Where this doesn&apos;t fit:</b> if your workflow isn&apos;t yet documented, or is still being defined internally, it&apos;s difficult for any outside team to take on production responsibility for it &mdash; including a Pod. In that case, it&apos;s usually better to start with Flexible or Dedicated Support while the process takes shape, then move to a Pod once the workflow is established enough to hand over.
                </div>
                <p className="md-link" style={{ marginTop: '20px' }}>
                  <Link className="btn btn-secondary" href="/credtax-pod">
                    See the full CredTax Pod page &rarr;
                  </Link>
                </p>
              </div>
              <div className="facts-col">
                <div className="fact-block">
                  <h4 style={{ margin: '0 0 10px', fontSize: '0.95rem' }}>A Pod may include</h4>
                  <ul className="ticks">
                    <li>Tax preparer(s)</li>
                    <li>Senior reviewer</li>
                    <li>Accounting or bookkeeping specialist</li>
                    <li>Workflow coordinator</li>
                    <li>Other specialists, depending on requirements</li>
                  </ul>
                </div>
                <div className="fact-block">
                  <h4 style={{ margin: '0 0 10px', fontSize: '0.95rem' }}>What the Pod adds</h4>
                  <ul className="ticks">
                    <li>Multi-skill coverage and built-in backup</li>
                    <li>Internal coordination and quality control</li>
                    <li>Capacity that can scale with your firm</li>
                  </ul>
                </div>
                <div className="fact-block">
                  <h4 style={{ margin: '0 0 10px', fontSize: '0.95rem' }}>Best suited for</h4>
                  <ul className="ticks">
                    <li>Growing firms</li>
                    <li>Specialized niches</li>
                    <li>Recurring high-volume workflows</li>
                    <li>Firms that want coordination and backup by design</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* PROGRESSION */}
      <section className="section" aria-labelledby="h-prog">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">What changes as the relationship grows</span>
            <h2 id="h-prog">The difference isn&apos;t more people. It&apos;s how much of the workflow we hold.</h2>
          </div>
          <ol className="stepper" style={{ ['--n' as string]: 3 }} aria-label="How the relationship progresses">
            <li style={{ ['--i' as string]: 0 }}>
              <h3>Flexible</h3>
              <p className="quote" style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', color: 'var(--accent)', margin: '0 0 10px' }}>
                &ldquo;Help me with this.&rdquo;
              </p>
              <p style={{ margin: '0 0 4px' }}><b>Workflow:</b> your firm manages it</p>
              <p style={{ margin: '0 0 4px' }}><b>Work:</b> CredTax handles what&apos;s assigned</p>
            </li>
            <li style={{ ['--i' as string]: 1 }}>
              <h3>Dedicated</h3>
              <p className="quote" style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', color: 'var(--accent)', margin: '0 0 10px' }}>
                &ldquo;Give me someone who knows my firm.&rdquo;
              </p>
              <p style={{ margin: '0 0 4px' }}><b>Workflow:</b> your firm still manages it</p>
              <p style={{ margin: '0 0 4px' }}><b>Work:</b> the dedicated professional owns it</p>
            </li>
            <li style={{ ['--i' as string]: 2 }}>
              <h3>CredTax Pod</h3>
              <p className="quote" style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', color: 'var(--accent)', margin: '0 0 10px' }}>
                &ldquo;Build and support this workflow.&rdquo;
              </p>
              <p style={{ margin: '0 0 4px' }}><b>Workflow:</b> CredTax coordinates the agreed production</p>
              <p style={{ margin: '0 0 4px' }}><b>Decisions:</b> your firm retains professional responsibility</p>
            </li>
          </ol>
        </div>
      </section>

      {/* SELF DIAGNOSTIC */}
      <section className="section section--mist" id="svc-diagnostic" aria-labelledby="h-diag">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">A quick way to check</span>
            <h2 id="h-diag">Which model fits your firm?</h2>
          </div>
          <div className="diag">
            <div className="diag-card">
              <h3>Need help with specific work?</h3>
              <p>You have seasonal overflow, individual returns, bulk return projects, or occasional work you&apos;d rather hand off than staff for.</p>
              <div className="fit">
                Closest fit: <a href="#model-flexible">Flexible Support</a>
              </div>
            </div>
            <div className="diag-card">
              <h3>Need someone who knows your processes?</h3>
              <p>Your workload is recurring, and you&apos;d rather have one consistent professional working with your firm than a rotating set of people.</p>
              <div className="fit">
                Closest fit: <a href="#model-dedicated">Dedicated Professional</a>
              </div>
            </div>
            <div className="diag-card">
              <h3>Need support around an entire workflow?</h3>
              <p>You need more than one capability, along with coordination, backup coverage, niche knowledge, or capacity that can scale.</p>
              <div className="fit">
                Closest fit: <a href="#model-pod">CredTax Pod</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section" id="svc-comparison" aria-labelledby="h-cmp">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">Side by side</span>
            <h2 id="h-cmp">A closer look at the three models.</h2>
          </div>
          <ServicesComparison />
        </div>
      </section>

      {/* PRICING STRUCTURE */}
      <section className="section section--mist" id="svc-pricing" aria-labelledby="h-price2">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">Engagement flexibility</span>
            <h2 id="h-price2">How engagements are structured.</h2>
            <p>We don&apos;t publish fixed pricing, because the right structure depends on the work. Here&apos;s how each format generally works.</p>
          </div>
          <div className="four">
            <div className="mini-card">
              <h3>Hourly</h3>
              <p>Useful for specific tasks, short projects, or flexible support where the scope is still taking shape.</p>
            </div>
            <div className="mini-card">
              <h3>Per return</h3>
              <p>Useful for individual returns or recurring bulk-return work. For bulk work, terms are agreed based on return type, complexity, volume, and review requirements.</p>
            </div>
            <div className="mini-card">
              <h3>Dedicated</h3>
              <p>Structured around a dedicated professional and an agreed, recurring workload.</p>
            </div>
            <div className="mini-card">
              <h3>CredTax Pod</h3>
              <p>Structured around the scope and workflow being supported, and the roles required to run it.</p>
            </div>
          </div>
          <p style={{ marginTop: '28px' }}>
            <Link className="btn btn-primary" href="/contact">
              Discuss Your Workflow &amp; Get Pricing
            </Link>
          </p>
        </div>
      </section>

      {/* CHOOSING BETWEEN THEM */}
      <section className="section" aria-labelledby="h-choose">
        <div className="wrap split">
          <div>
            <span className="pill">Choosing between them</span>
            <h2 id="h-choose" style={{ fontSize: 'clamp(1.6rem, 1.2rem + 1.4vw, 2.2rem)' }}>
              The right model depends on predictability and complexity &mdash; not firm size.
            </h2>
            <p className="muted" style={{ marginTop: '16px' }}>
              A larger firm can have a simple, predictable need. A small firm can have a complex one. The questions worth asking are how steady the workload is, and how many different capabilities it touches.
            </p>
          </div>
          <ul className="example-list">
            <li>
              <b>20 returns during a busy period:</b> A short, defined project like this usually doesn&apos;t call for a dedicated person &mdash; Flexible Support fits.
            </li>
            <li>
              <b>Recurring monthly bookkeeping:</b> A steady, ongoing need like this is often better served by a Dedicated Professional who becomes familiar with your accounts.
            </li>
            <li>
              <b>Tax preparation, bookkeeping, review, and coordination together:</b> When several capabilities and backup coverage are all needed at once, a CredTax Pod is usually the better fit.
            </li>
          </ul>
        </div>
      </section>

      {/* WHEN TO MOVE */}
      <section className="section section--mist" aria-labelledby="h-move">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">No pressure, just a pattern</span>
            <h2 id="h-move">When should you move to the next model?</h2>
            <p>These are signs worth noticing, not a recommendation to change anything before you&apos;re ready.</p>
          </div>
          <div className="trans">
            <div>
              <h3>Flexible &rarr; Dedicated</h3>
              <p className="sub">Worth considering when:</p>
              <ul className="ticks">
                <li>The work has become predictable rather than occasional</li>
                <li>You need consistent availability, not just booked capacity</li>
                <li>You keep working with the same person and it&apos;s going well</li>
                <li>Training and process familiarity start to matter</li>
              </ul>
            </div>
            <div>
              <h3>Dedicated &rarr; Pod</h3>
              <p className="sub">Worth considering when:</p>
              <ul className="ticks">
                <li>One person is no longer enough for the workload</li>
                <li>Multiple skill sets are genuinely required</li>
                <li>Coordinating the work yourself has become a burden</li>
                <li>Backup coverage and niche depth start to matter more</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* RELATIONSHIP DEPTH (Dark container with high-contrast text) */}
      <section className="section dark" aria-labelledby="h-depth">
        <div className="wrap split">
          <div>
            <span className="pill" style={{ color: 'var(--accent-bright)', borderColor: 'var(--accent-bright)' }}>
              Relationship depth
            </span>
            <h2 id="h-depth" style={{ fontSize: 'clamp(1.6rem, 1.2rem + 1.4vw, 2.2rem)', color: '#fff', marginTop: '14px' }}>
              The longer we work together, the better we understand your workflow.
            </h2>
            <div className="niche-steps">
              <div className="niche-step">
                <div className="label">Flexible</div>
                <p>CredTax learns the assignment in front of it.</p>
              </div>
              <div className="niche-step">
                <div className="label">Dedicated</div>
                <p>CredTax learns the professional&apos;s recurring workload, and your firm&apos;s processes.</p>
              </div>
              <div className="niche-step">
                <div className="label">Pod</div>
                <p>The team can be deliberately structured around your firm&apos;s workflow and niche &mdash; for example, professional-services or healthcare clients with recurring reporting needs.</p>
              </div>
            </div>
          </div>
          <div className="pull" style={{ borderLeftColor: 'var(--accent-bright)' }}>
            <p className="big-line" style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600, marginBottom: '16px' }}>
              Every year, the value of a CredTax engagement should increase &mdash; not stay flat.
            </p>
            <p style={{ color: 'var(--on-dark-muted)' }}>
              The longer the relationship continues, the more CredTax comes to understand your processes, documentation standards, software, review preferences, client types, recurring issues, and communication style. That accumulated familiarity is what deepens the relationship over time.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section" id="svc-faq" aria-labelledby="h-svcfaq">
        <div className="wrap faq-wrap">
          <div className="sec-head">
            <span className="pill">Questions firms usually ask</span>
            <h2 id="h-svcfaq">A few things worth clarifying up front.</h2>
          </div>
          <FaqAccordion categories={SERVICES_FAQS} />
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band dark" aria-labelledby="h-svc-cta">
        <div className="wrap">
          <div className="inner">
            <h2 id="h-svc-cta" style={{ color: '#fff' }}>Let&apos;s find the right way to work together.</h2>
            <p style={{ color: 'var(--on-dark-muted)' }}>
              Tell us what your firm needs, how your current workflow operates, and where additional capacity would make the biggest difference. We&apos;ll work through which engagement model fits.
            </p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/book-appointment">
                Schedule a Consultation
              </Link>
              <Link className="btn btn-secondary" href="/credtax-pod">
                Explore the CredTax Pod
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
