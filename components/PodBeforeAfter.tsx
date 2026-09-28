'use client';

import React, { useState } from 'react';
import { RadialDiagram } from '@/components/RadialDiagram';

const RADIAL_ITEMS = [
  'Assign work',
  'Answer staff questions',
  'Follow up on missing info',
  'Check preparation',
  'Resolve reviewer comments',
  'Monitor deadlines',
  'Reassign when unavailable',
  'Train new staff',
  'Fix errors',
  'Manage capacity',
  'Handle seasonal spikes',
  'Coordinate bookkeeping',
  'Coordinate tax',
  'Manage client communication',
];

export function PodBeforeAfter() {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');

  return (
    <section className="section" id="pod-before-after" aria-labelledby="h-central">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow-s">The central idea</p>
          <h2 id="h-central">Your firm doesn&apos;t need another person.</h2>
          <p>
            It needs work completed correctly, consistently and on time — without you personally coordinating every step.
            The problem isn&apos;t that you can&apos;t do all of this. It&apos;s that all of it competes for your attention at once.
          </p>
        </div>

        <div className="seg-wrap">
          <div className="seg" role="tablist" aria-label="Before and after">
            <button
              type="button"
              role="tab"
              id="ba-tab-0"
              aria-controls="ba-panel-0"
              aria-selected={activeTab === 'before'}
              tabIndex={activeTab === 'before' ? 0 : -1}
              onClick={() => setActiveTab('before')}
            >
              Before: you manage the function
            </button>
            <button
              type="button"
              role="tab"
              id="ba-tab-1"
              aria-controls="ba-panel-1"
              aria-selected={activeTab === 'after'}
              tabIndex={activeTab === 'after' ? 0 : -1}
              onClick={() => setActiveTab('after')}
            >
              After: the CredTax Pod
            </button>
          </div>
        </div>

        {activeTab === 'before' && (
          <div className="tabpanel" style={{ paddingTop: 0 }} role="tabpanel" id="ba-panel-0" aria-labelledby="ba-tab-0">
            <RadialDiagram
              items={RADIAL_ITEMS}
              centerText={
                <>
                  You,
                  <br />
                  the CPA
                </>
              }
            />
            <p className="caption">
              Fourteen things now sit on you at once — each reasonable on its own, all competing for the same attention.
            </p>
          </div>
        )}

        {activeTab === 'after' && (
          <div className="tabpanel" style={{ paddingTop: '20px' }} role="tabpanel" id="ba-panel-1" aria-labelledby="ba-tab-1">
            <ol
              className="flow-list"
              style={{
                maxWidth: '420px',
                margin: '30px auto',
              }}
              aria-label="One relationship with a Pod behind it"
            >
              <li>
                <b>CPA Firm</b>
              </li>
              <li className="us">
                <b>CredTax Pod</b>
              </li>
              <li>
                <b>Coordinated Workflow</b>
              </li>
              <li>
                <b>Completed Work</b>
              </li>
            </ol>
            <p className="caption">
              One relationship. The specialists, review structure and backup capacity operate behind it.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
