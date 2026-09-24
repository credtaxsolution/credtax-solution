import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FaqAccordion } from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'FAQ for CPA Firms | CredTax',
  description:
    'Answers for CPA firms about CredTax support models, review responsibility, software, seasonal work and pricing.',
};

const FAQ_DATA = [
  {
    title: 'About CredTax',
    items: [
      {
        q: 'Who do you work with?',
        a: 'Primarily US and Canadian CPA and accounting firms seeking tax preparation, review, bookkeeping and workflow support.',
      },
      {
        q: 'Do you work directly with individual taxpayers?',
        a: 'No. Our primary model is strictly supporting CPA and accounting firms as an extension of their team. Your firm always retains client ownership and contact.',
      },
      {
        q: 'Where is CredTax located?',
        a: 'CredTax, operated by CredTax Solution LLP, is based in Kochi, Kerala, India and provides offshore support to international CPA and accounting firms.',
      },
    ],
  },
  {
    title: 'Support Models',
    items: [
      {
        q: 'Can we start with a small amount of work?',
        a: 'Yes. Flexible Support can begin with defined return batches or single projects, and can evolve as the relationship develops.',
      },
      {
        q: 'Can we have a dedicated professional?',
        a: 'Yes. Dedicated Professional is designed for recurring workload that benefits from one person who learns your systems, chart of accounts, and preferences over time.',
      },
      {
        q: 'What is a CredTax Pod?',
        a: 'A Pod is a coordinated team structured around an agreed production workflow rather than a single headcount, featuring built-in coordinators, preparers, senior review, and backup.',
      },
      {
        q: 'Can you support seasonal tax workload?',
        a: 'Yes. Flexible Support can be scaled up specifically for seasonal overflow and extension deadlines, then dialed back without carrying overhead.',
      },
      {
        q: 'What happens if our workload grows?',
        a: 'The engagement can expand seamlessly from defined overflow support toward dedicated capacity or an entire Pod as your client roster grows.',
      },
    ],
  },
  {
    title: 'Working Together',
    items: [
      {
        q: 'Who reviews the work?',
        a: 'CredTax provides preparation and internal senior review/QC checks before returning work. The CPA firm retains final professional review and filing responsibility.',
      },
      {
        q: 'Can you work within our existing software?',
        a: 'Yes. CredTax works directly inside your agreed systems (UltraTax, Drake, CCH Axcess, Lacerte, TaxDome, QuickBooks Online, Xero), subject to access and scope.',
      },
    ],
  },
  {
    title: 'Pricing & Continuity',
    items: [
      {
        q: 'How is pricing determined?',
        a: 'Pricing depends on the support model, workload volume, complexity, scope and required turnaround capacity. We map your workflow first to ensure fair, transparent terms.',
      },
      {
        q: 'Is CredTax buying my firm under the succession model?',
        a: 'Not necessarily. The succession model is designed as an operational continuity partnership where CredTax operates production while the owner retains agreed equity/revenue participation.',
      },
    ],
  },
];

// Generate JSON-LD Schema for Google Rich Snippets
const allQuestions = FAQ_DATA.flatMap((cat) => cat.items);
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: allQuestions.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="page" data-page="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="page-hero dark" aria-labelledby="h-faq">
        <div className="wrap">
          <h1 id="h-faq">Questions CPA Firms Ask Before Working With Us.</h1>
          <p className="lead">
            Straight answers on support models, review responsibility, software, seasonal work and pricing.
          </p>
        </div>
      </section>

      <section className="section" aria-label="Frequently asked questions">
        <div className="wrap">
          <FaqAccordion categories={FAQ_DATA} />

          <div className="grid-2" style={{ marginTop: '48px' }}>
            <div className="rule-top">
              <h3>Questions about engagement models</h3>
              <p>Learn about onboarding, backup, judgment calls and which model to start with.</p>
              <Link className="link" href="/services">
                Explore Services &rarr;
              </Link>
            </div>
            <div className="rule-top">
              <h3>Questions about succession</h3>
              <p>Learn about ownership, retirement, operational handover, and transition phases.</p>
              <Link className="link" href="/succession-continuity">
                Explore Continuity &rarr;
              </Link>
            </div>
          </div>

          <p style={{ marginTop: '36px', textAlign: 'center' }}>
            Have a question that isn&apos;t here?{' '}
            <Link className="link" href="/book-appointment">
              Discuss your workflow with us &rarr;
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
