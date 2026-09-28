'use client';

import React, { useState } from 'react';

export function SuccessionTransitionTabs() {
  const [activeTab, setActiveTab] = useState<'today' | 'transition' | 'future'>('today');

  return (
    <section className="section section--mist" aria-labelledby="h-real">
      <div className="wrap">
        <div className="sec-head center">
          <p className="eyebrow-s">A real transition</p>
          <h2 id="h-real">Today, transition, and a future state &mdash; not an overnight switch.</h2>
        </div>

        <div style={{ textAlign: 'center' }} className="seg-wrap">
          <div className="seg" role="tablist" aria-label="Today, transition and future state">
            <button
              type="button"
              role="tab"
              id="tr-tab-today"
              aria-controls="tr-panel-today"
              aria-selected={activeTab === 'today'}
              tabIndex={activeTab === 'today' ? 0 : -1}
              onClick={() => setActiveTab('today')}
            >
              Today
            </button>
            <button
              type="button"
              role="tab"
              id="tr-tab-transition"
              aria-controls="tr-panel-transition"
              aria-selected={activeTab === 'transition'}
              tabIndex={activeTab === 'transition' ? 0 : -1}
              onClick={() => setActiveTab('transition')}
            >
              Transition
            </button>
            <button
              type="button"
              role="tab"
              id="tr-tab-future"
              aria-controls="tr-panel-future"
              aria-selected={activeTab === 'future'}
              tabIndex={activeTab === 'future' ? 0 : -1}
              onClick={() => setActiveTab('future')}
            >
              Future state
            </button>
          </div>
        </div>

        {activeTab === 'today' && (
          <div
            className="tr-panel tabpanel"
            style={{ paddingTop: 'clamp(22px, 3vw, 36px)' }}
            role="tabpanel"
            id="tr-panel-today"
            aria-labelledby="tr-tab-today"
          >
            <p className="lead-in">Owner is involved in:</p>
            <ul className="tr-list">
              <li>Production</li>
              <li>Review</li>
              <li>Staff management</li>
              <li>Client questions</li>
              <li>Workflow</li>
              <li>Administrative decisions</li>
            </ul>
          </div>
        )}

        {activeTab === 'transition' && (
          <div
            className="tr-panel tabpanel"
            style={{ paddingTop: 'clamp(22px, 3vw, 36px)' }}
            role="tabpanel"
            id="tr-panel-transition"
            aria-labelledby="tr-tab-transition"
          >
            <p className="lead-in">CredTax:</p>
            <ul className="tr-list steps">
              <li>1. Understands the firm&apos;s workflow</li>
              <li>2. Documents processes</li>
              <li>3. Builds the required Pod structure</li>
              <li>4. Begins with controlled production</li>
              <li>5. Stabilizes the workflow</li>
              <li>6. Gradually absorbs agreed responsibilities</li>
            </ul>
          </div>
        )}

        {activeTab === 'future' && (
          <div
            className="tr-panel tabpanel"
            style={{ paddingTop: 'clamp(22px, 3vw, 36px)' }}
            role="tabpanel"
            id="tr-panel-future"
            aria-labelledby="tr-tab-future"
          >
            <p className="lead-in">Owner focuses on:</p>
            <ul className="tr-list">
              <li>Client relationships</li>
              <li>Professional decisions</li>
              <li>Strategic direction</li>
              <li>Business ownership</li>
              <li>Agreed level of involvement</li>
            </ul>
            <p className="lead-in" style={{ marginTop: '22px' }}>
              CredTax handles agreed:
            </p>
            <ul className="tr-list hi">
              <li>Production</li>
              <li>Workflow</li>
              <li>Coordination</li>
              <li>Quality controls</li>
              <li>Capacity</li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
