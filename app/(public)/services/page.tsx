import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Icon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Services for CPA Firms',
  description:
    'Offshore US tax, tax review and quality control, bookkeeping and accounting, and CPA-firm workflow support, delivered through Flexible, Dedicated or Pod engagement models.',
};

export default function ServicesPage() {
  return (
    <div className="page" data-page="services">
      <section className="page-hero dark" aria-labelledby="h-svc-page">
        <div className="wrap hero-split">
          <div>
            <h1 id="h-svc-page">Support that scales with your firm.</h1>
            <p className="lead">
              From individual returns and one-off projects to dedicated professionals and coordinated teams, CredTax gives CPA firms additional capacity — without forcing every firm into the same engagement model.
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
            <span className="pill" style={{ color: 'var(--accent-bright)', borderColor: 'var(--accent-bright)' }}>Flexible • Dedicated • Pod</span>
            <p style={{ marginTop: '16px', color: 'var(--on-dark-muted)' }}>Tailored capacity matching your workflow volume and complexity.</p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section" style={{ paddingBottom: 'clamp(24px, 3vw, 40px)' }} aria-labelledby="h-what">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">What we do</span>
            <h2 id="h-what">Four areas where CredTax supports CPA firms.</h2>
            <p>These are the capabilities we bring to an engagement. How they&apos;re delivered depends on the model your firm chooses.</p>
          </div>

          <section className="svc-block" id="svc-tax">
            <div>
              <Icon name="tax" className="ico-lg" />
              <h2>US Tax</h2>
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

          <section className="svc-block" id="svc-review">
            <div>
              <Icon name="review" className="ico-lg" />
              <h2>Tax Review &amp; Quality Control</h2>
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
                    <li>Review notes &amp; queries</li>
                    <li>Pre-final-review quality checks</li>
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

          <section className="svc-block" id="svc-accounting">
            <div>
              <Icon name="ledger" className="ico-lg" />
              <h2>Bookkeeping &amp; Accounting</h2>
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
                    <li>AP / AR support</li>
                    <li>Month-end close</li>
                    <li>Financial statements</li>
                    <li>Cleanup and catch-up</li>
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

          <section className="svc-block" id="svc-workflow">
            <div>
              <Icon name="flow" className="ico-lg" />
              <h2>CPA Firm Workflow Support</h2>
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
        </div>
      </section>

      {/* THREE SUPPORT MODELS */}
      <section className="section section--mist" id="svc-how" aria-labelledby="h-how-models">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">How you can work with us</span>
            <h2 id="h-how-models">Three ways to work with CredTax.</h2>
            <p>
              Not every firm needs the same thing. Some need help finishing a batch of returns. Others want one person who knows their systems well. Some need a coordinated team built around a workflow. CredTax offers three engagement models, matched to how predictable and complex your workload is — not how big your firm is.
            </p>
          </div>

          <article className="md" id="model-flexible">
            <div>
              <span className="pill">Model 1</span>
              <h3>Flexible Support</h3>
              <p className="desc">Additional capacity when you need it.</p>
            </div>
            <div className="md-body">
              <div>
                <p>
                  <b>How it works:</b> Your firm defines a specific piece of work — a batch of returns, a cleanup project, a busy-season overflow — and hands it to CredTax with clear boundaries. CredTax completes exactly what was assigned and returns it. Your firm keeps managing the overall workflow: assigning the work, sequencing it, and deciding what happens next.
                </p>
                <div className="md-scenario" style={{ background: 'var(--mist)', padding: '16px', borderRadius: '4px', borderLeft: '3px solid var(--gold)', margin: '16px 0' }}>
                  <b>A quick illustration:</b> Consider a firm facing a backlog of individual returns before an extension deadline. There&apos;s no ongoing need for extra capacity once the backlog clears. Flexible Support adds capacity for exactly that window, then steps back without the firm carrying an idle resource forward.
                </div>
              </div>
              <div className="facts-col">
                <div style={{ background: '#fff', padding: '16px', borderRadius: '4px', border: '1px solid var(--line)' }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '0.95rem' }}>Best suited for</h4>
                  <ul className="ticks">
                    <li>Seasonal overflow</li>
                    <li>Individual returns</li>
                    <li>Bulk return projects</li>
                    <li>Testing the relationship</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <article className="md" id="model-dedicated" style={{ marginTop: '36px', paddingTop: '36px', borderTop: '1px solid var(--line)' }}>
            <div>
              <span className="pill">Model 2</span>
              <h3>Dedicated Professional</h3>
              <p className="desc">A professional who learns your firm.</p>
            </div>
            <div className="md-body">
              <div>
                <p>
                  <b>How it works:</b> Instead of assigning individual pieces of work, your firm gets one CredTax professional whose time is committed to you on a recurring basis. Over successive weeks and months, that person becomes familiar with your documentation standards, the software you use, your review preferences, and the shape of your recurring workload.
                </p>
                <div className="md-scenario" style={{ background: 'var(--mist)', padding: '16px', borderRadius: '4px', borderLeft: '3px solid var(--gold)', margin: '16px 0' }}>
                  <b>A quick illustration:</b> Consider a firm with a steady monthly bookkeeping caseload. Early on, the dedicated professional learns the chart of accounts. A few months in, they recognize recurring adjusting entries and client-specific quirks without being told each time.
                </div>
              </div>
              <div className="facts-col">
                <div style={{ background: '#fff', padding: '16px', borderRadius: '4px', border: '1px solid var(--line)' }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '0.95rem' }}>Best suited for</h4>
                  <ul className="ticks">
                    <li>Recurring workload</li>
                    <li>Stable, predictable volume</li>
                    <li>Firms wanting the same person over time</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <article className="md md--pod" id="model-pod" style={{ marginTop: '36px', padding: '32px', borderRadius: '8px' }}>
            <div>
              <span className="pill" style={{ color: 'var(--accent-bright)', borderColor: 'var(--accent-bright)' }}>Model 3</span>
              <h3 style={{ color: '#fff' }}>CredTax Pod</h3>
              <p className="desc" style={{ color: 'var(--on-dark-muted)' }}>A team built around your workflow.</p>
            </div>
            <div className="md-body">
              <div>
                <p style={{ color: '#fff' }}>
                  <b>How it works:</b> A Pod is a structured team assembled around an agreed production workflow, with roles matched to what that workflow actually requires. A typical Pod pairs a preparer with a senior reviewer and a workflow coordinator; a more complex one adds an accounting specialist.
                </p>
                <p style={{ marginTop: '18px' }}>
                  <Link className="btn btn-secondary" href="/credtax-pod">
                    Explore CredTax Pods
                  </Link>
                </p>
              </div>
              <div className="facts-col">
                <div style={{ background: 'rgba(255,255,255,0.08)', padding: '16px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '0.95rem', color: '#fff' }}>A Pod includes</h4>
                  <ul className="ticks">
                    <li style={{ color: '#fff' }}>Tax Preparer(s)</li>
                    <li style={{ color: '#fff' }}>Senior Reviewer</li>
                    <li style={{ color: '#fff' }}>Workflow Coordinator</li>
                    <li style={{ color: '#fff' }}>Built-in backup capacity</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band dark" aria-labelledby="h-svc-cta">
        <div className="wrap">
          <div className="inner">
            <h2 id="h-svc-cta">Let&apos;s find the right way to work together.</h2>
            <p>
              Tell us what your firm needs, how your current workflow operates, and where additional capacity would make the biggest difference.
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
