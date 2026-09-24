'use client';

import React, { useState } from 'react';

export function PodConfigurator() {
  const [scope, setScope] = useState<'tax' | 'accounting' | 'both'>('tax');
  const [volume, setVolume] = useState<'low' | 'growing' | 'high' | 'complex'>('low');

  const scopeLabels = {
    tax: 'Tax',
    accounting: 'Accounting',
    both: 'Tax + Accounting',
  };

  const volumeLabels = {
    low: 'Low Volume',
    growing: 'Growing Volume',
    high: 'High Volume',
    complex: 'Complex / Specialized',
  };

  const volumeDescriptions = {
    low: 'a focused Pod with a dedicated coordinator, a lean production team and senior review — sized for a steady, focused workload.',
    growing: 'a Pod with added production capacity and a defined backup layer, so throughput can flex as volume increases.',
    high: 'a full Pod structure with expanded production, dedicated senior review capacity and standing backup coverage.',
    complex: 'a Pod with additional technical specialists layered in alongside coordination and review, for complex or specialized multi-entity work.',
  };

  const podName = scope === 'both' ? 'a Combined Pod' : `a ${scopeLabels[scope]} Pod`;

  return (
    <div className="config">
      <p className="config-q" style={{ fontWeight: 650, color: 'var(--navy-900)', marginBottom: '12px' }}>
        What does your firm need support with?
      </p>
      <div className="pills" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {(['tax', 'accounting', 'both'] as const).map((s) => (
          <button
            key={s}
            type="button"
            className="pill-btn"
            aria-pressed={scope === s}
            onClick={() => setScope(s)}
          >
            {scopeLabels[s]}
          </button>
        ))}
      </div>

      <p className="config-q" style={{ fontWeight: 650, color: 'var(--navy-900)', marginBottom: '12px' }}>
        What best describes your current volume?
      </p>
      <div className="pills" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {(['low', 'growing', 'high', 'complex'] as const).map((v) => (
          <button
            key={v}
            type="button"
            className="pill-btn"
            aria-pressed={volume === v}
            onClick={() => setVolume(v)}
          >
            {volumeLabels[v]}
          </button>
        ))}
      </div>

      <div
        className="config-result"
        style={{
          padding: '20px 22px',
          background: 'var(--mist)',
          borderLeft: '4px solid var(--gold)',
          borderRadius: '0 var(--radius) var(--radius) 0',
        }}
      >
        <span
          style={{
            display: 'block',
            fontWeight: 650,
            fontSize: '0.85rem',
            color: 'var(--accent)',
            marginBottom: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Recommended Pod structure
        </span>
        <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: '1.5' }}>
          For <strong>{scopeLabels[scope]}</strong> at <strong>{volumeLabels[volume]}</strong>, firms typically start with <strong>{podName}</strong>: {volumeDescriptions[volume]} The final structure is customized to your firm during onboarding.
        </p>
      </div>
    </div>
  );
}
