import React from 'react';
import type { Metadata } from 'next';
import { BookingEngine } from '@/components/BookingEngine';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';

export const metadata: Metadata = {
  title: 'Schedule a Discovery Consultation | CredTax Solution',
  description:
    'Book a discovery session with CredTax Solution. Select a time that works for your CPA firm. A Google Meet video link will be automatically generated and sent to your email.',
};

export default function BookAppointmentPage() {
  const useCalendly = process.env.NEXT_PUBLIC_USE_CALENDLY !== 'false';
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/credtaxsolution/30min';

  return (
    <div
      className="section"
      style={{
        background: '#FAFCFC',
        minHeight: 'calc(100vh - 150px)',
        paddingBlock: 'clamp(36px, 4.5vw, 60px)',
      }}
    >
      <div className="wrap">
        <div
          style={{
            maxWidth: '820px',
            marginInline: 'auto',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          <span className="pill" style={{ marginBottom: '14px' }}>
            Consultation &amp; Capacity Review
          </span>
          <h1
            style={{
              fontSize: 'clamp(1.9rem, 1.4rem + 1.8vw, 2.75rem)',
              color: 'var(--navy-900)',
              marginBottom: '12px',
              lineHeight: 1.2,
            }}
          >
            Schedule a Discovery Consultation
          </h1>
          <p
            className="lead"
            style={{
              margin: 0,
              fontSize: '1.05rem',
              color: 'var(--muted)',
              maxWidth: '65ch',
              marginInline: 'auto',
            }}
          >
            Select a date and time that suits your firm. A Google Meet video link will be generated
            automatically and sent to your email along with calendar invites.
          </p>
        </div>

        {useCalendly ? <CalendlyEmbed url={calendlyUrl} /> : <BookingEngine />}
      </div>
    </div>
  );
}
