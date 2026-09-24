'use client';

import React, { useState } from 'react';

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}

export function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="faq-wrap">
      {categories.map((cat, catIdx) => (
        <div key={cat.title} className="faq-group">
          <h2>{cat.title}</h2>
          {cat.items.map((item, itemIdx) => {
            const key = `${catIdx}-${itemIdx}`;
            const isOpen = !!openMap[key];
            return (
              <div key={item.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <h3>
                  <button
                    className="faq-q"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggle(key)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-mark" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq-a">
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
