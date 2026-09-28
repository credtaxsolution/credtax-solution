'use client';

import { useEffect } from 'react';

export function DynamicFavicon() {
  useEffect(() => {
    try {
      const updateFavicon = (url: string) => {
        // Find or create rel="icon" and rel="shortcut icon"
        let iconLink = document.querySelector<HTMLLinkElement>("link[rel='icon']");
        if (!iconLink) {
          iconLink = document.createElement('link');
          iconLink.rel = 'icon';
          document.head.appendChild(iconLink);
        }
        iconLink.href = url;

        let shortcutLink = document.querySelector<HTMLLinkElement>("link[rel='shortcut icon']");
        if (!shortcutLink) {
          shortcutLink = document.createElement('link');
          shortcutLink.rel = 'shortcut icon';
          document.head.appendChild(shortcutLink);
        }
        shortcutLink.href = url;
      };

      // Always bust browser cache on initial load to fetch the latest configured favicon
      updateFavicon('/api/favicon?t=' + Date.now());

      // Listen for custom favicon updates dispatched from admin panel
      const handleFaviconChange = (e: CustomEvent<string>) => {
        if (e.detail) {
          updateFavicon(e.detail);
        }
      };

      window.addEventListener('credtax:favicon-updated' as any, handleFaviconChange as EventListener);

      return () => {
        window.removeEventListener('credtax:favicon-updated' as any, handleFaviconChange as EventListener);
      };
    } catch (e) {
      console.error('Error updating favicon:', e);
    }
  }, []);

  return null;
}
