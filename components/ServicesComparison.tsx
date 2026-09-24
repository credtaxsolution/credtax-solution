'use client';

import React, { useState } from 'react';

const COMPARISON_DATA = [
  {
    criterion: 'You need',
    flexible: 'Specific work completed',
    dedicated: 'A consistent professional',
    pod: 'A coordinated workflow',
  },
  {
    criterion: 'Engagement',
    flexible: 'Hourly, project, or per return',
    dedicated: 'Dedicated, recurring workload',
    pod: 'Scoped to the agreed workflow',
  },
  {
    criterion: 'Work ownership',
    flexible: 'CredTax completes assigned work',
    dedicated: 'Dedicated professional owns the workload',
    pod: 'CredTax manages agreed production',
  },
  {
    criterion: 'Workflow coordination',
    flexible: 'Your firm manages it',
    dedicated: 'Your firm manages it',
    pod: 'CredTax coordinates within scope',
  },
  {
    criterion: 'Availability',
    flexible: 'Booked as needed',
    dedicated: 'Reserved for your firm',
    pod: 'Structured around the team',
  },
  {
    criterion: 'Niche development',
    flexible: 'Limited, per project',
    dedicated: 'Grows with the individual over time',
    pod: 'Deliberately built into the team',
  },
  {
    criterion: 'Backup',
    flexible: 'Project by project',
    dedicated: 'Requires advance planning',
    pod: 'Built in',
  },
  {
    criterion: 'Skill coverage',
    flexible: 'Matched to the assignment',
    dedicated: 'Reflects one professional’s background',
    pod: 'Multiple roles working together',
  },
  {
    criterion: 'Scaling',
    flexible: 'Project by project',
    dedicated: 'Requires adding another resource',
    pod: 'Designed to scale with your firm',
  },
  {
    criterion: 'Best suited for',
    flexible: 'Overflow, bulk projects, testing the relationship',
    dedicated: 'Recurring, stable volume',
    pod: 'Growth, specialization, coordination needs',
  },
];

export function ServicesComparison() {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);

  return (
    <div id="svc-comparison-inner">
      {/* Desktop / Tablet Table */}
      <div className="cmp-wrap">
        <table className="cmp">
          <caption className="visually-hidden">
            Comparison of Flexible Support, Dedicated Professional and CredTax Pod
          </caption>
          <thead>
            <tr>
              <td style={{ background: 'var(--navy-900)' }}></td>
              <th scope="col">Flexible / Per-Return</th>
              <th scope="col">Dedicated Professional</th>
              <th scope="col">CredTax Pod</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_DATA.map((row) => (
              <tr key={row.criterion}>
                <th scope="row">{row.criterion}</th>
                <td>{row.flexible}</td>
                <td>{row.dedicated}</td>
                <td>{row.pod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Tabbed View */}
      <div className="cmp-mobile">
        <div className="seg-wrap">
          <div className="seg" role="tablist" aria-label="Choose a model to compare">
            <button
              type="button"
              role="tab"
              id="cmp-tab-0"
              aria-controls="cmp-panel-0"
              aria-selected={activeTab === 0}
              onClick={() => setActiveTab(0)}
            >
              Flexible
            </button>
            <button
              type="button"
              role="tab"
              id="cmp-tab-1"
              aria-controls="cmp-panel-1"
              aria-selected={activeTab === 1}
              onClick={() => setActiveTab(1)}
            >
              Dedicated
            </button>
            <button
              type="button"
              role="tab"
              id="cmp-tab-2"
              aria-controls="cmp-panel-2"
              aria-selected={activeTab === 2}
              onClick={() => setActiveTab(2)}
            >
              Pod
            </button>
          </div>
        </div>

        <div
          className="cmp-panel"
          role="tabpanel"
          id="cmp-panel-0"
          aria-labelledby="cmp-tab-0"
          hidden={activeTab !== 0}
        >
          <dl>
            {COMPARISON_DATA.map((row) => (
              <div className="row" key={row.criterion}>
                <dt>{row.criterion}</dt>
                <dd>{row.flexible}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="cmp-panel"
          role="tabpanel"
          id="cmp-panel-1"
          aria-labelledby="cmp-tab-1"
          hidden={activeTab !== 1}
        >
          <dl>
            {COMPARISON_DATA.map((row) => (
              <div className="row" key={row.criterion}>
                <dt>{row.criterion}</dt>
                <dd>{row.dedicated}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="cmp-panel"
          role="tabpanel"
          id="cmp-panel-2"
          aria-labelledby="cmp-tab-2"
          hidden={activeTab !== 2}
        >
          <dl>
            {COMPARISON_DATA.map((row) => (
              <div className="row" key={row.criterion}>
                <dt>{row.criterion}</dt>
                <dd>{row.pod}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
