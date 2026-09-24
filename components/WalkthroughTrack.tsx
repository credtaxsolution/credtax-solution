'use client';

import React, { useState } from 'react';

const STEPS = [
  {
    step: '01',
    label: 'Intake',
    who: 'Tax Coordinator',
    what: 'Client engagement is logged and scoped into the Pod workflow.',
    moves: 'Client details, engagement scope, prior-year reference.',
    check: 'Intake completeness check.',
    cpa: 'Client relationship and engagement terms.',
  },
  {
    step: '02',
    label: 'Document Collection',
    who: 'Tax Coordinator',
    what: 'Source documents are requested and tracked to completion.',
    moves: 'W-2s, 1099s, prior returns, supporting records.',
    check: 'Document checklist against return type.',
    cpa: 'Nothing — CredTax follows up directly within agreed scope.',
  },
  {
    step: '03',
    label: 'Missing Info',
    who: 'Tax Coordinator',
    what: 'Gaps are identified and followed up on with the client or firm contact.',
    moves: 'Outstanding items list.',
    check: 'Follow-up tracked to resolution.',
    cpa: 'Approves any direct client escalation, if needed.',
  },
  {
    step: '04',
    label: 'Preparation',
    who: 'Tax Preparer',
    what: 'The return is prepared from validated source documents.',
    moves: 'Draft return.',
    check: 'Preparer self-review against source documents.',
    cpa: 'Nothing at this stage.',
  },
  {
    step: '05',
    label: 'Internal Review',
    who: 'Senior Tax Reviewer',
    what: 'A senior reviewer checks the draft return for accuracy and completeness.',
    moves: 'Reviewed draft with comments.',
    check: 'Structured review checklist.',
    cpa: 'Nothing at this stage.',
  },
  {
    step: '06',
    label: 'Corrections',
    who: 'Tax Preparer',
    what: 'Reviewer comments are resolved and the return is corrected.',
    moves: 'Corrected draft.',
    check: 'Comment resolution confirmed.',
    cpa: 'Nothing at this stage.',
  },
  {
    step: '07',
    label: 'Senior QC Sign-off',
    who: 'Senior Tax Reviewer',
    what: 'A final internal quality pass confirms the return is review-ready.',
    moves: 'Review-ready return.',
    check: 'Final internal sign-off.',
    cpa: 'Nothing at this stage.',
  },
  {
    step: '08',
    label: 'CPA Final Review',
    who: 'CPA (Your Firm)',
    what: 'Your firm applies professional judgment and reviews the completed return.',
    moves: 'Final questions or adjustments, if any.',
    check: 'Firm-level professional review.',
    cpa: 'Professional judgment and final decisions.',
  },
  {
    step: '09',
    label: 'Finalization',
    who: 'Tax Coordinator',
    what: 'The return is finalized and prepared for filing support.',
    moves: 'Approved, filing-ready return.',
    check: 'Final documentation confirmed.',
    cpa: 'Final approval and client sign-off.',
  },
];

export function WalkthroughTrack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = STEPS[activeIndex];

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: '8px',
          marginBottom: '24px',
        }}
      >
        {STEPS.map((s, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveIndex(idx)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '6px',
                textAlign: 'left',
                padding: '12px 10px',
                background: isActive ? 'var(--navy-900)' : '#fff',
                color: isActive ? '#fff' : 'var(--navy-900)',
                border: '1.5px solid',
                borderColor: isActive ? 'var(--navy-900)' : 'var(--line)',
                borderTop: `3px solid ${isActive ? 'var(--gold)' : 'var(--line)'}`,
                borderRadius: 'var(--radius)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <span
                style={{
                  fontWeight: 650,
                  fontSize: '0.8rem',
                  color: isActive ? 'var(--accent-bright)' : 'var(--accent)',
                }}
              >
                {s.step}
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{s.label}</span>
            </button>
          );
        })}
      </div>

      <div
        style={{
          background: '#fff',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius)',
          padding: 'clamp(20px, 3vw, 32px)',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 650, color: 'var(--accent)', marginBottom: '4px' }}>
              Who handles it
            </span>
            <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>{activeStep.who}</span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 650, color: 'var(--accent)', marginBottom: '4px' }}>
              What happens
            </span>
            <span style={{ fontSize: '1rem' }}>{activeStep.what}</span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 650, color: 'var(--accent)', marginBottom: '4px' }}>
              Quality check
            </span>
            <span style={{ fontSize: '1rem' }}>{activeStep.check}</span>
          </div>
          <div
            style={{
              padding: '12px 16px',
              background: '#FBF5E4',
              borderLeft: '3px solid var(--gold)',
              borderRadius: '0 4px 4px 0',
            }}
          >
            <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 650, color: 'var(--navy-900)', marginBottom: '4px' }}>
              Stays with your firm
            </span>
            <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--navy-900)' }}>{activeStep.cpa}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
