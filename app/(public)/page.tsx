import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/Icons';
import { createPublicClient } from '@/lib/supabase/public';

export const revalidate = 60;

export default async function HomePage() {
  // Fetch active testimonials from Supabase (falling back gracefully)
  let testimonials: Array<{
    id: string;
    client_name: string;
    client_title: string;
    firm_name: string;
    quote: string;
  }> = [];

  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from('testimonials')
      .select('id, client_name, client_title, firm_name, quote')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .limit(4);

    if (data && data.length > 0) {
      testimonials = data;
    }
  } catch (err) {
    console.error('Failed to fetch testimonials for home page:', err);
  }

  // Fallback if none in database yet
  if (testimonials.length === 0) {
    testimonials = [
      {
        id: '1',
        client_name: 'David M., CPA',
        client_title: 'Managing Partner',
        firm_name: 'US CPA Practice (California)',
        quote:
          'CredTax has transformed our busy season workflow. Having our workpapers and returns pre-reviewed with clear quality control notes before partner sign-off cut our review bottlenecks in half.',
      },
      {
        id: '2',
        client_name: 'Sarah L., CPA, CA',
        client_title: 'Tax & Accounting Director',
        firm_name: 'Accounting & Advisory Firm (Ontario)',
        quote:
          'The Pod model gives us the exact predictability we needed. Their team adapted directly into our TaxDome and QuickBooks workflows without missing a beat.',
      },
    ];
  }

  return (
    <div className="page" data-page="home">
      {/* HERO */}
      <section className="hero dark" aria-labelledby="h-hero">
        <div className="wrap hero-grid">
          <div>
            <p className="hero-tag">Offshore support for US and Canadian CPA firms</p>
            <h1 id="h-hero">Extend Your CPA Firm Without Building Every Function In-House.</h1>
            <p className="lead">
              CredTax provides US and Canadian CPA firms with offshore tax, accounting and workflow support built around the way your firm already works.
            </p>
            <ul className="hero-areas" aria-label="Areas of support">
              <li>Tax</li>
              <li>Accounting</li>
              <li>Workflow Support</li>
            </ul>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/book-appointment">
                Book Consultation
              </Link>
              <Link className="btn btn-secondary" href="/how-we-work">
                Explore How We Work
              </Link>
            </div>
          </div>

          <figure className="chain" aria-label="How work moves from your CPA firm through CredTax and a structured workflow to completed work">
            <ol>
              <li style={{ ['--i' as string]: 0 }}>
                <span className="node-k">CPA Firm</span>
                <span className="node-d">Your client relationships, professional judgment and final sign-off.</span>
              </li>
              <li className="is-us" style={{ ['--i' as string]: 1 }}>
                <span className="node-k">CredTax</span>
                <span className="node-d">Learns your systems, standards and recurring work.</span>
              </li>
              <li style={{ ['--i' as string]: 2 }}>
                <span className="node-k">Structured Workflow</span>
                <span className="node-d">Preparation and processing, then internal QC, then review-ready work.</span>
              </li>
              <li style={{ ['--i' as string]: 3 }}>
                <span className="node-k">Completed Work</span>
                <span className="node-d">Reviewed by your firm before it goes any further.</span>
              </li>
            </ol>
            <figcaption>Your firm keeps client relationships, professional judgment and final review.</figcaption>
          </figure>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="section" id="audience" aria-labelledby="h-audience">
        <div className="wrap">
          <div className="split">
            <h2 id="h-audience">Built for CPA Firms</h2>
            <p className="lead muted" style={{ margin: 0 }}>
              CredTax was built around a simple idea: offshore support should feel less like assigning work to an outside vendor and more like extending the operating capacity of your firm.
            </p>
          </div>
          <div className="areas">
            <div className="area">
              <Icon name="tax" className="ico-lg" />
              <h3>Tax</h3>
              <p>Tax preparation, supporting workpapers, review support and technical workflow assistance.</p>
            </div>
            <div className="area">
              <Icon name="ledger" className="ico-lg" />
              <h3>Accounting</h3>
              <p>Bookkeeping, reconciliations, accounting support and recurring financial workflows.</p>
            </div>
            <div className="area">
              <Icon name="flow" className="ico-lg" />
              <h3>Workflow</h3>
              <p>Document collection, task coordination, client follow-up, administrative support and recurring firm operations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section section--mist" id="problem" aria-labelledby="h-problem">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 id="h-problem">The Work Behind the Work Can Become the Bottleneck.</h2>
            </div>
            <div>
              <p className="lead muted">
                A CPA firm does more than prepare and review. Around every return and every set of books sits a layer of coordination that also needs someone&apos;s time.
              </p>
              <ul className="chips" aria-label="Work that surrounds preparation and review" style={{ margin: '26px 0 0' }}>
                <li>Preparation</li>
                <li>Review</li>
                <li>Missing documents</li>
                <li>Client follow-ups</li>
                <li>Task coordination</li>
                <li>Deadlines</li>
                <li>Bookkeeping</li>
                <li>Cleanup</li>
                <li>Seasonal capacity</li>
                <li>Staff training</li>
                <li>Recurring workflow management</li>
              </ul>
            </div>
          </div>
          <div className="pull" style={{ marginTop: 'clamp(40px,6vw,72px)' }}>
            <p className="statement">
              The problem is not always finding another person. Sometimes the problem is structuring the work itself.
            </p>
            <p className="muted" style={{ margin: '18px 0 0', maxWidth: '62ch' }}>
              That is where CredTax fits: an offshore extension of your firm, working inside your workflow, your systems and your review structure.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="section" id="services-overview" aria-labelledby="h-svc">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="h-svc">What CredTax Supports</h2>
            <p>Four areas of support that map to how a CPA firm actually operates.</p>
          </div>
          <div className="grid-2">
            <article className="rule-top">
              <Icon name="tax" className="ico-lg" />
              <h3>US Tax</h3>
              <ul className="ticks">
                <li>Individual returns (Form 1040)</li>
                <li>Business returns (Form 1065, 1120, 1120-S)</li>
                <li>Tax preparation &amp; workpapers</li>
                <li>Supporting schedules and workpapers</li>
                <li>Tax research support</li>
                <li>Review support</li>
              </ul>
              <Link className="link" href="/services#svc-tax">
                See US Tax support
              </Link>
            </article>
            <article className="rule-top">
              <Icon name="review" className="ico-lg" />
              <h3>Tax Review &amp; Quality Control</h3>
              <ul className="ticks">
                <li>Return review</li>
                <li>Workpaper review</li>
                <li>Missing-information identification</li>
                <li>Review notes &amp; queries</li>
                <li>Corrections</li>
                <li>Pre-final-review quality checks</li>
              </ul>
              <Link className="link" href="/services#svc-review">
                See review and quality control
              </Link>
            </article>
            <article className="rule-top">
              <Icon name="ledger" className="ico-lg" />
              <h3>Bookkeeping &amp; Accounting</h3>
              <ul className="ticks">
                <li>Bookkeeping &amp; QuickBooks Online</li>
                <li>Reconciliations</li>
                <li>General ledger support</li>
                <li>Cleanup and catch-up</li>
                <li>Month-end close</li>
                <li>Financial statements</li>
                <li>Accounting review support</li>
              </ul>
              <Link className="link" href="/services#svc-accounting">
                See bookkeeping and accounting support
              </Link>
            </article>
            <article className="rule-top">
              <Icon name="flow" className="ico-lg" />
              <h3>CPA Firm Workflow Support</h3>
              <ul className="ticks">
                <li>Document collection &amp; tracking</li>
                <li>Client follow-up</li>
                <li>Task coordination (TaxDome, etc.)</li>
                <li>Inbox and workflow support</li>
                <li>Administrative support</li>
                <li>Deadline and task tracking</li>
                <li>Recurring firm operations</li>
              </ul>
              <Link className="link" href="/services#svc-workflow">
                See workflow support
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* THREE SUPPORT MODELS */}
      <section className="section section--mist" id="models" aria-labelledby="h-models">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="h-models">Choose the Level of Support Your Firm Actually Needs.</h2>
            <p>Start with defined work. Build continuity. Move toward workflow support when the function becomes large enough.</p>
          </div>

          <ol className="ladder" aria-label="Progression of support: work, assigned capacity, workflow">
            <li><b>Work</b>Flexible Support</li>
            <li><b>Assigned capacity</b>Dedicated Professional</li>
            <li><b>Workflow</b>CredTax Pod</li>
          </ol>

          <div className="models">
            <article className="model" aria-labelledby="m1">
              <div className="depth" aria-hidden="true"><i className="on"></i><i></i><i></i></div>
              <div className="model-body">
                <span className="pill">Work</span>
                <h3 id="m1">Flexible Support</h3>
                <p className="quote">&ldquo;I need help with this work.&rdquo;</p>
                <p className="desc">For defined assignments, seasonal overflow, per-return work and project-based support.</p>
                <p className="ex-label">Typical examples</p>
                <ul className="ticks">
                  <li>Seasonal capacity</li>
                  <li>Defined assignments</li>
                  <li>Individual or bulk returns</li>
                  <li>One-off projects</li>
                  <li>Overflow work</li>
                </ul>
                <p className="pos">You manage the workflow. CredTax completes the agreed work.</p>
                <Link className="btn btn-secondary" href="/services#model-flexible">
                  Explore Flexible Support
                </Link>
              </div>
            </article>

            <article className="model" aria-labelledby="m2">
              <div className="depth" aria-hidden="true"><i className="on"></i><i className="on"></i><i></i></div>
              <div className="model-body">
                <span className="pill">Assigned capacity</span>
                <h3 id="m2">Dedicated Professional</h3>
                <p className="quote">&ldquo;I need someone who knows my firm.&rdquo;</p>
                <p className="desc">A professional primarily allocated to your firm who learns its systems, processes, standards and recurring work.</p>
                <p className="ex-label">Typical examples</p>
                <ul className="ticks">
                  <li>Recurring workload</li>
                  <li>Predictable monthly capacity</li>
                  <li>Long-term support</li>
                  <li>Firms seeking continuity</li>
                </ul>
                <p className="pos">You manage the workflow. CredTax provides dedicated capacity.</p>
                <Link className="btn btn-secondary" href="/services#model-dedicated">
                  Explore Dedicated Support
                </Link>
              </div>
            </article>

            <article className="model model--pod" aria-labelledby="m3">
              <div className="depth" aria-hidden="true"><i className="on"></i><i className="on"></i><i className="on"></i></div>
              <div className="model-body">
                <span className="pill">Workflow</span>
                <h3 id="m3">CredTax Pod</h3>
                <p className="quote">&ldquo;I need a function supported by a team.&rdquo;</p>
                <p className="desc">A coordinated team organized around an agreed production workflow.</p>
                <p className="ex-label">Typical examples</p>
                <ul className="ticks">
                  <li>High-volume recurring work</li>
                  <li>Specialized workflows</li>
                  <li>Multiple roles (Preparer, Reviewer, Coordinator)</li>
                  <li>Quality-control requirements</li>
                  <li>Capacity and backup needs</li>
                </ul>
                <p className="pos">CredTax coordinates the agreed workflow within the defined scope.</p>
                <Link className="btn btn-secondary" href="/credtax-pod">
                  Learn About CredTax Pods
                </Link>
              </div>
            </article>
          </div>

          <div className="models-close pull">
            <p className="statement">A person can complete work. A Pod can own a workflow.</p>
          </div>
        </div>
      </section>

      {/* FAMILIARITY LEDGER */}
      <section className="section dark" id="familiarity" aria-labelledby="h-fam">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 id="h-fam">The Longer We Work Together, the Less You Have to Explain.</h2>
              <div className="pull" style={{ marginTop: '32px' }}>
                <p className="statement" style={{ fontSize: 'clamp(1.2rem, 1rem + .9vw, 1.55rem)' }}>
                  The value of a long-term relationship is not just the hours delivered. It is the operational familiarity accumulated around your firm.
                </p>
              </div>
            </div>
            <div>
              <p className="ledger-title">At the start, CredTax learns your firm&apos;s</p>
              <ul className="ledger">
                <li>Software <span>the systems you use</span></li>
                <li>Workflow <span>how work moves</span></li>
                <li>Documentation standards <span>what &ldquo;complete&rdquo; means</span></li>
                <li>Review preferences <span>how you like work presented</span></li>
                <li>Recurring client patterns <span>what repeats each cycle</span></li>
                <li>Communication expectations <span>who hears what, and when</span></li>
              </ul>
            </div>
          </div>

          <ol className="stepper stepper--dark" style={{ ['--n' as string]: 5, marginTop: 'clamp(48px, 6vw, 88px)' }} aria-label="How familiarity builds over an engagement">
            <li style={{ ['--i' as string]: 0 }}><h3>Learn</h3><p>Your systems, standards and preferences.</p></li>
            <li style={{ ['--i' as string]: 1 }}><h3>Adapt</h3><p>Fit the way your firm already works.</p></li>
            <li style={{ ['--i' as string]: 2 }}><h3>Repeat</h3><p>Recurring work becomes routine.</p></li>
            <li style={{ ['--i' as string]: 3 }}><h3>Improve</h3><p>Fewer repeated explanations over time.</p></li>
            <li style={{ ['--i' as string]: 4 }}><h3>Expand</h3><p>Add capacity without starting from zero.</p></li>
          </ol>
        </div>
      </section>

      {/* BUILT AROUND YOUR FIRM */}
      <section className="section" id="built-around" aria-labelledby="h-built">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="h-built">Built Around Your Firm</h2>
            <p>CredTax adapts to how your firm works, not the other way around.</p>
          </div>
          <div className="five">
            <div><Icon name="systems" className="icon" /><h3>Your Systems</h3><p>Work within your agreed software and systems.</p></div>
            <div><Icon name="standards" className="icon" /><h3>Your Standards</h3><p>Learn your documentation and quality expectations.</p></div>
            <div><Icon name="process" className="icon" /><h3>Your Workflow</h3><p>Support the process the way your firm actually operates.</p></div>
            <div><Icon name="review" className="icon" /><h3>Your Review Process</h3><p>Prepare and organize work around your firm&apos;s review structure.</p></div>
            <div><Icon name="capacity" className="icon" /><h3>Your Capacity</h3><p>Add support as workload grows.</p></div>
          </div>
          <p className="fineprint">Software and system access is agreed engagement by engagement, subject to compatibility and scope.</p>
        </div>
      </section>

      {/* WORKFLOW DIAGRAM */}
      <section className="section section--mist" id="workflow" aria-labelledby="h-workflow">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="h-workflow">How Work Moves Between Your Firm and CredTax</h2>
            <p>Defined stages sit between the assignment and your final review, and your firm stays on both ends.</p>
          </div>

          <ol className="flow-list" aria-label="Work flow sequence" style={{ maxWidth: '640px', marginInline: 'auto' }}>
            <li><span className="pill">Step 1</span><b>CPA Firm</b><span>Assigns agreed work and shares source documents.</span></li>
            <li className="us"><span className="pill">Step 2</span><b>CredTax Intake</b><span>Understands systems, checks document completeness.</span></li>
            <li className="us"><span className="pill">Step 3</span><b>Prepare / Process</b><span>Work is completed within agreed technical scope.</span></li>
            <li className="us"><span className="pill">Step 4</span><b>Internal QC &amp; Senior Review</b><span>A senior reviewer applies internal QC checklist.</span></li>
            <li className="us"><span className="pill">Step 5</span><b>Review-Ready Delivery</b><span>Delivered to your portal with review notes attached.</span></li>
            <li><span className="pill">Step 6</span><b>CPA Final Review &amp; Sign-off</b><span>Your firm applies professional judgment and final sign-off.</span></li>
          </ol>
        </div>
      </section>

      {/* RESPONSIBILITY BOUNDARY */}
      <section className="section" id="boundary" aria-labelledby="h-boundary">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="h-boundary">What Stays With Your Firm. What CredTax Handles.</h2>
            <p>A clear line makes the working relationship easier to run.</p>
          </div>
          <div className="boundary">
            <div className="b-col">
              <h3>Your Firm</h3>
              <ul className="ticks">
                <li>Client relationships</li>
                <li>Professional judgment</li>
                <li>Final decisions</li>
                <li>Final review and sign-off</li>
                <li>Firm standards</li>
                <li>Client communication where appropriate</li>
              </ul>
            </div>
            <div className="b-mid" aria-hidden="true">
              <span><Icon name="handoff" className="icon" /></span>
            </div>
            <div className="b-col b-us dark">
              <h3>CredTax</h3>
              <ul className="ticks">
                <li>Agreed production work</li>
                <li>Workflow coordination</li>
                <li>Preparation</li>
                <li>Internal quality-control steps</li>
                <li>Documentation</li>
                <li>Staff allocation within agreed scope</li>
                <li>Operational continuity</li>
              </ul>
            </div>
          </div>
          <p className="note">
            CredTax provides preparation, review-support and workflow services. The CPA firm retains professional responsibility, client relationships and final professional decisions.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section section--mist" id="feedback" aria-labelledby="h-feedback">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="h-feedback">Trusted Through the Work</h2>
            <p>We&apos;re building CredTax through long-term working relationships and the quality of the work behind them.</p>
          </div>
          <div className="quotes">
            {testimonials.map((t) => (
              <figure key={t.id} className="quote-card" style={{ margin: 0 }}>
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption>
                  <cite>{t.client_name}</cite>
                  <small>{t.client_title}, {t.firm_name}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FACTS */}
      <section className="section dark" id="facts" aria-labelledby="h-facts">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="h-facts">CredTax at a Glance</h2>
          </div>
          <div className="facts">
            <div className="fact">
              <span className="fact-n" aria-hidden="true">3</span>
              <h3>Support Models</h3>
              <p>Flexible, Dedicated, and Pod.</p>
            </div>
            <div className="fact">
              <span className="fact-n" aria-hidden="true">4</span>
              <h3>Core Functions</h3>
              <p>Tax, Review, Accounting, Workflow.</p>
            </div>
            <div className="fact">
              <span className="fact-n" aria-hidden="true">2</span>
              <h3>Partners</h3>
              <p>Raijo Jose &amp; Nithin PR.</p>
            </div>
            <div className="fact">
              <span className="fact-n" aria-hidden="true">1</span>
              <h3>Operating Philosophy</h3>
              <p>Support the workflow, not just the task.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="section" id="team" aria-labelledby="h-team">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="h-team">The People Behind CredTax</h2>
            <p>CredTax is partner-led. You work directly with the people who run it.</p>
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
                  <li>Client relationships</li>
                  <li>Service coordination</li>
                  <li>Business development</li>
                  <li>Administration</li>
                  <li>Client communication</li>
                  <li>Operational coordination</li>
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
                  <li>US tax workflow</li>
                  <li>Accounting operations</li>
                  <li>Preparation and review processes</li>
                  <li>Quality control</li>
                  <li>Workflow design</li>
                  <li>Operational delivery</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-band dark" id="final-cta" aria-labelledby="h-cta">
        <div className="wrap">
          <div className="inner">
            <h2 id="h-cta">Let&apos;s Build the Right Support Structure for Your Firm.</h2>
            <p>
              Tell us what is consuming your team&apos;s capacity. We&apos;ll understand the workflow, workload and level of support required before recommending the right CredTax model.
            </p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/book-appointment">
                Schedule a Consultation
              </Link>
              <Link className="btn btn-secondary" href="/services">
                Explore Support Models
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
