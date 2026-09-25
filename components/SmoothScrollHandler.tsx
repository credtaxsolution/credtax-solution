'use client';

import { useEffect } from 'react';

/**
 * Handles smooth scrolling across the entire site, including anchor links
 * and header offset calculations.
 */
export function SmoothScrollHandler() {
  useEffect(() => {
    // 1. Intercept hash link clicks for seamless offset scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;

      const elementId = href.slice(1);
      const targetElement = document.getElementById(elementId);
      if (!targetElement) return;

      e.preventDefault();

      const headerHeight = 76; // matches --header-h
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - headerHeight);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Update URL hash without harsh jumping
      window.history.pushState(null, '', href);
    };

    document.addEventListener('click', handleAnchorClick);

    // 2. Handle initial page load with hash in URL
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const headerHeight = 76;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: Math.max(0, elementPosition - headerHeight),
            behavior: 'smooth',
          });
        }, 150);
      }
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return null;
}
