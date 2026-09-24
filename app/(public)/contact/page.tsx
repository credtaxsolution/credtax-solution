import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Discuss Your Firm | CredTax',
  description:
    'Discuss your firm’s workflow with CredTax. Tell us where your team needs capacity and we’ll recommend a support model.',
};

export default function ContactPage() {
  return (
    <div className="page" data-page="contact">
      <section className="page-hero dark" aria-labelledby="h-contact">
        <div className="wrap">
          <h1 id="h-contact">Let&apos;s Talk About Your Firm.</h1>
          <p className="lead">
            Tell us where your team needs additional capacity. We&apos;ll understand the workflow before recommending a support model.
          </p>
        </div>
      </section>

      <section className="section" id="inquiry" aria-label="Inquiry form and next steps">
        <div className="wrap contact-grid">
          <ContactForm />

          <aside aria-labelledby="h-next">
            <h2 id="h-next" style={{ fontSize: '1.7rem', marginBottom: '24px' }}>
              What Happens Next
            </h2>
            <ol className="next">
              <li>
                <span className="n" aria-hidden="true">01</span>
                <div>
                  <h3>Tell Us About Your Firm</h3>
                  <p>Share your firm size, client profile and where capacity is tight.</p>
                </div>
              </li>
              <li>
                <span className="n" aria-hidden="true">02</span>
                <div>
                  <h3>Discuss the Workflow</h3>
                  <p>We walk through how work moves through your firm from intake to review.</p>
                </div>
              </li>
              <li>
                <span className="n" aria-hidden="true">03</span>
                <div>
                  <h3>Identify the Right Support Model</h3>
                  <p>Flexible, Dedicated or Pod, based purely on your workload.</p>
                </div>
              </li>
              <li>
                <span className="n" aria-hidden="true">04</span>
                <div>
                  <h3>Define Scope &amp; Pricing</h3>
                  <p>Volume, complexity and turnaround SLA shape the clear commercial proposal.</p>
                </div>
              </li>
              <li>
                <span className="n" aria-hidden="true">05</span>
                <div>
                  <h3>Start the Engagement</h3>
                  <p>Begin with defined pilot work or a structured onboarding period.</p>
                </div>
              </li>
            </ol>

            <dl className="contact-details">
              <dt>Email</dt>
              <dd>
                <a className="link" href="mailto:prnithin6@gmail.com">
                  prnithin6@gmail.com
                </a>
              </dd>
              <dt>Phone / WhatsApp</dt>
              <dd>
                <a className="link" href="tel:+919495915993">
                  +91 94959 15993
                </a>
              </dd>
              <dt>Direct Scheduling</dt>
              <dd>
                Prefer to pick a time directly?{' '}
                <Link className="link" href="/book-appointment">
                  Book an appointment online &rarr;
                </Link>
              </dd>
              <dt>Registered Address</dt>
              <dd>
                CREDTAX SOLUTION LLP, Menacheriveedu, Ward 6 Door No.459, Thattampady, Karumalloor, Paravoor, Kochi, Kerala, IN 683511
              </dd>
            </dl>
          </aside>
        </div>
      </section>
    </div>
  );
}
