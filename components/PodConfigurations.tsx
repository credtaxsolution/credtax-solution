'use client';

import React, { useState } from 'react';

export function PodConfigurations() {
  const [activeTab, setActiveTab] = useState<'tax' | 'accounting' | 'combined'>('tax');

  return (
    <section className="section" id="pod-configurations" aria-labelledby="h-conf">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow-s">Three Pod configurations</p>
          <h2 id="h-conf">Built around one function, or several.</h2>
          <p>
            The actual Pod structure is determined by workload and complexity — not every engagement uses every role shown here.
          </p>
        </div>

        <div className="seg-wrap">
          <div className="seg" role="tablist" aria-label="Pod configuration">
            <button
              type="button"
              role="tab"
              id="pod-tab-tax"
              aria-controls="pod-panel-tax"
              aria-selected={activeTab === 'tax'}
              tabIndex={activeTab === 'tax' ? 0 : -1}
              onClick={() => setActiveTab('tax')}
            >
              Tax Pod
            </button>
            <button
              type="button"
              role="tab"
              id="pod-tab-accounting"
              aria-controls="pod-panel-accounting"
              aria-selected={activeTab === 'accounting'}
              tabIndex={activeTab === 'accounting' ? 0 : -1}
              onClick={() => setActiveTab('accounting')}
            >
              Accounting Pod
            </button>
            <button
              type="button"
              role="tab"
              id="pod-tab-combined"
              aria-controls="pod-panel-combined"
              aria-selected={activeTab === 'combined'}
              tabIndex={activeTab === 'combined' ? 0 : -1}
              onClick={() => setActiveTab('combined')}
            >
              Combined Pod
            </button>
          </div>
        </div>

        {activeTab === 'tax' && (
          <div className="tabpanel" role="tabpanel" id="pod-panel-tax" aria-labelledby="pod-tab-tax">
            <div className="pod-top">
              <div>
                <p style={{ margin: 0 }}>
                  A specialized production function for tax — from document collection through a review-ready return.
                </p>
                <ul className="benefits">
                  <li>Dedicated tax specialization</li>
                  <li>Structured internal review</li>
                  <li>Seasonal capacity</li>
                  <li>Workflow coordination</li>
                  <li>Consistent process knowledge</li>
                  <li>Backup coverage</li>
                  <li>Support across different return types</li>
                  <li>Capacity that expands with volume</li>
                </ul>
              </div>
              <div>
                <span className="pf-label">Inside the Pod</span>
                <div className="role-stack">
                  <div className="role-chip coord">Tax Coordinator</div>
                  <div className="role-chip">Tax Preparers</div>
                  <div className="role-chip review">Senior Tax Reviewer</div>
                  <div className="role-chip">Technical Specialist</div>
                  <div className="role-chip">Backup Capacity</div>
                </div>
              </div>
            </div>
            <span className="pf-label">Workflow</span>
            <ol className="wf">
              <li>Client Information</li>
              <li>Document Collection</li>
              <li>Organize &amp; Validate</li>
              <li>Tax Preparation</li>
              <li>Internal Review</li>
              <li>Corrections</li>
              <li>Review-Ready Return</li>
              <li>CPA Final Review</li>
              <li>Filing Support</li>
            </ol>
            <p className="wf-note">
              CredTax does not promise tax accuracy or guaranteed outcomes — those remain professional determinations made by your firm.
            </p>
          </div>
        )}

        {activeTab === 'accounting' && (
          <div className="tabpanel" role="tabpanel" id="pod-panel-accounting" aria-labelledby="pod-tab-accounting">
            <div className="pod-top">
              <div>
                <p style={{ margin: 0 }}>
                  A dedicated bookkeeping and accounting workflow, from transaction processing through tax-ready books.
                </p>
                <ul className="benefits">
                  <li>Dedicated accounting workflow</li>
                  <li>Consistent bookkeeping processes</li>
                  <li>Month-end continuity</li>
                  <li>Review / QC structure</li>
                  <li>Cleanup support</li>
                  <li>Backup capacity</li>
                  <li>Scalable workload</li>
                  <li>Continuity across recurring periods</li>
                </ul>
              </div>
              <div>
                <span className="pf-label">Inside the Pod</span>
                <div className="role-stack">
                  <div className="role-chip coord">Accounting Coordinator</div>
                  <div className="role-chip">Bookkeeper(s)</div>
                  <div className="role-chip">Accountant(s)</div>
                  <div className="role-chip review">Senior Accounting Reviewer</div>
                  <div className="role-chip">Specialist / Cleanup Support</div>
                  <div className="role-chip">Backup Capacity</div>
                </div>
              </div>
            </div>
            <span className="pf-label">Workflow</span>
            <ol className="wf">
              <li>Client / Data Sources</li>
              <li>Transaction Processing</li>
              <li>Categorization</li>
              <li>Reconciliation</li>
              <li>Adjustments</li>
              <li>Month-End Close</li>
              <li>Financial Statements</li>
              <li>Review</li>
              <li>Tax-Ready Books</li>
            </ol>
            <p className="wf-note">
              Not every client uses every role above — structure follows workload and complexity.
            </p>
          </div>
        )}

        {activeTab === 'combined' && (
          <div className="tabpanel" role="tabpanel" id="pod-panel-combined" aria-labelledby="pod-tab-combined">
            <div className="pod-top" style={{ gridTemplateColumns: '1fr' }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: 'var(--navy-900)' }}>Tax + Accounting + Operational Coordination.</strong> For
                firms that want CredTax to support multiple connected functions — not simply more staff, but coordination between them.
              </p>
            </div>
            <span className="pf-label">Workflow</span>
            <ol className="wf">
              <li>Bookkeeping</li>
              <li>Reconciled Books</li>
              <li>Year-End Adjustments</li>
              <li>Tax Preparation</li>
              <li>Tax Review</li>
              <li>CPA Final Review</li>
            </ol>
            <div className="tri" style={{ marginTop: '32px' }}>
              <div>
                <span className="pf-label">Accounting Team</span>
                <div className="role-stack">
                  <div className="role-chip">Bookkeeper</div>
                  <div className="role-chip">Accountant</div>
                  <div className="role-chip review">Senior Accounting Support</div>
                </div>
              </div>
              <div>
                <span className="pf-label">Tax Team</span>
                <div className="role-stack">
                  <div className="role-chip">Tax Preparers</div>
                  <div className="role-chip review">Senior Tax Reviewer</div>
                  <div className="role-chip">Technical Support</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '24px' }}>
              <span className="pf-label">Coordination Layer</span>
              <div className="role-stack" style={{ maxWidth: '520px' }}>
                <div className="role-chip coord">Pod Coordinator</div>
                <div className="role-chip">Shared Backup / Specialist Resources</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
