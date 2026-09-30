'use client';

import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface CalendlyEmbedProps {
  url?: string;
}

export function CalendlyEmbed({
  url = 'https://calendly.com/credtaxsolution/30min',
}: CalendlyEmbedProps) {
  const [loading, setLoading] = useState(true);

  // Append brand styling parameters: deep navy primary color (#183941)
  const embedUrl = url.includes('?')
    ? `${url}&hide_landing_page_details=0&hide_gdpr_banner=1&primary_color=183941`
    : `${url}?hide_landing_page_details=0&hide_gdpr_banner=1&primary_color=183941`;

  useEffect(() => {
    // Listen for Calendly event booking completion
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data && e.data.event === 'calendly.event_scheduled') {
        console.log('[Calendly] Meeting scheduled successfully:', e.data.payload);
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1000px',
        marginInline: 'auto',
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid var(--line)',
        boxShadow: '0 8px 30px rgba(24, 57, 65, 0.05)',
        overflow: 'hidden',
        minHeight: '750px',
      }}
    >
      {/* Loading state skeleton */}
      {loading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ffffff',
            zIndex: 2,
            gap: '12px',
            color: 'var(--muted)',
          }}
        >
          <Loader2 className="spin" size={32} color="var(--accent)" />
          <p style={{ fontSize: '0.95rem', margin: 0, fontWeight: 500 }}>
            Loading CredTax scheduling calendar...
          </p>
        </div>
      )}

      {/* Embedded Calendly scheduling frame */}
      <iframe
        src={embedUrl}
        width="100%"
        height="750px"
        title="Schedule a Discovery Consultation with CredTax Solution"
        onLoad={() => setLoading(false)}
        style={{
          display: 'block',
          width: '100%',
          height: '750px',
          border: 'none',
        }}
      />
    </div>
  );
}
