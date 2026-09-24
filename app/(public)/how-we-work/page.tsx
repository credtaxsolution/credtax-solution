import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How We Work | CredTax',
  description:
    'CredTax starts with your workflow: understand, define, start, stabilize, expand and build a function around recurring CPA-firm work.',
};

export default function HowWeWorkPage() {
  return (
    <div className="page" data-page="how-we-work">
      <section className="page-hero dark" aria-labelledby="h-how">
        <div className="wrap">
          <h1 id="h-how">We Don&apos;t Start by Assigning People. We Start by Understanding the Work.</h1>
          <p className="lead">
            Before recommending a support structure, CredTax needs to understand how the work moves through your firm.
          </p>
        </div>
      </section>

      <section className="section" id="stages" aria-labelledby="h-stages">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">Engagement Lifecycle</span>
            <h2 id="h-stages">Six Stages, From First Conversation to a Built Function</h2>
          </div>

          <ol className="stages">
            <li className="stage">
              <span className="stage-n" aria-hidden="true">01</span>
              <div>
                <h3>Understand</h3>
                <p className="lede">We learn your firm, your services, client types, systems, workflow, documentation, review process, and workload.</p>
              </div>
            </li>
            <li className="stage">
              <span className="stage-n" aria-hidden="true">02</span>
              <div>
                <h3>Define</h3>
                <p className="lede">We identify work scope, volume, complexity, required roles, communication structure, and review requirements.</p>
              </div>
            </li>
            <li className="stage">
              <span className="stage-n" aria-hidden="true">03</span>
              <div>
                <h3>Start</h3>
                <p className="lede">Begin with Flexible Support, a Dedicated Professional, or an appropriately scoped Pod arrangement.</p>
              </div>
            </li>
            <li className="stage">
              <span className="stage-n" aria-hidden="true">04</span>
              <div>
                <h3>Stabilize</h3>
                <p className="lede">Establish recurring processes, communication expectations, documentation standards, review flow, and ownership.</p>
              </div>
            </li>
            <li className="stage">
              <span className="stage-n" aria-hidden="true">05</span>
              <div>
                <h3>Expand</h3>
                <p className="lede">Increase capacity as workload grows without disrupting quality or turnaround times.</p>
              </div>
            </li>
            <li className="stage is-final">
              <span className="stage-n" aria-hidden="true">06</span>
              <div>
                <h3>Build a Function</h3>
                <p className="lede">
                  When the workflow becomes large enough, CredTax structures coordinated team support around it: a CredTax Pod.
                </p>
                <p style={{ marginTop: '12px' }}>
                  <Link className="link" href="/credtax-pod">
                    See how a CredTax Pod works &rarr;
                  </Link>
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section section--mist" id="continuity" aria-labelledby="h-cont">
        <div className="wrap">
          <div className="sec-head">
            <span className="pill">Familiarity Compounding</span>
            <h2 id="h-cont">Every Engagement Should Become Easier to Operate Over Time.</h2>
            <p>Accumulated familiarity is the point of a long-term relationship.</p>
          </div>
          <ol className="stepper" style={{ ['--n' as string]: 4 }} aria-label="How an engagement typically matures">
            <li style={{ ['--i' as string]: 0 }}><h3>Month 1</h3><p>Learn the firm &amp; standards.</p></li>
            <li style={{ ['--i' as string]: 1 }}><h3>Month 3</h3><p>Recognize recurring patterns.</p></li>
            <li style={{ ['--i' as string]: 2 }}><h3>Month 6</h3><p>Operate within established expectations.</p></li>
            <li style={{ ['--i' as string]: 3 }}><h3>Long-term</h3><p>Fewer repeated explanations and higher efficiency.</p></li>
          </ol>
        </div>
      </section>

      <section className="cta-band dark">
        <div className="wrap">
          <div className="inner">
            <h2>Start With the Workflow.</h2>
            <p>Tell us how work moves through your firm today. We&apos;ll help you work out where structured support fits.</p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/book-appointment">
                Schedule a Discussion
              </Link>
              <Link className="btn btn-secondary" href="/services">
                See Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
