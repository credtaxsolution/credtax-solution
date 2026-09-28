'use client';

import React, { useEffect, useRef, useState } from 'react';

interface RadialDiagramProps {
  items: string[];
  centerText: React.ReactNode;
}

export function RadialDiagram({ items, centerText }: RadialDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFlat, setIsFlat] = useState(false);
  const [positions, setPositions] = useState<Array<{ left: string; top: string }>>([]);

  useEffect(() => {
    function updateLayout() {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const flat = width < 900;
      setIsFlat(flat);

      if (!flat) {
        const n = items.length;
        const rx = Math.min(width / 2 - 120, 440);
        const ry = 200;
        const newPos = items.map((_, i) => {
          const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
          return {
            left: `calc(50% + ${(Math.cos(ang) * rx).toFixed(1)}px)`,
            top: `calc(50% + ${(Math.sin(ang) * ry).toFixed(1)}px)`,
          };
        });
        setPositions(newPos);
      }
    }

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [items]);

  return (
    <div
      ref={containerRef}
      className={`radial ${isFlat ? 'flat' : ''}`}
      style={{ marginBlock: '20px' }}
    >
      <div className="r-center">{centerText}</div>
      <div className="r-chips">
        {items.map((item, idx) => {
          const pos = positions[idx];
          const style: React.CSSProperties = isFlat || !pos
            ? {}
            : {
                left: pos.left,
                top: pos.top,
                transform: 'translate(-50%, -50%)',
              };

          return (
            <div key={idx} className="r-chip show" style={style}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
