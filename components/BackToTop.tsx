'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 320) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Back to top"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 50,
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        background: '#183941',
        color: '#FFFFFF',
        border: '1.5px solid var(--gold)',
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 18px rgba(24, 57, 65, 0.25)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.25s ease, transform 0.25s ease, background 0.15s ease, box-shadow 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#2F616F';
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
        e.currentTarget.style.boxShadow = '0 6px 22px rgba(24, 57, 65, 0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#183941';
        e.currentTarget.style.transform = visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)';
        e.currentTarget.style.boxShadow = '0 4px 18px rgba(24, 57, 65, 0.25)';
      }}
    >
      <ChevronUp size={22} strokeWidth={2.5} />
    </button>
  );
}
