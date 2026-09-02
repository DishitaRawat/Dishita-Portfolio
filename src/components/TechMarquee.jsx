import React from 'react';

const MARQUEE_ITEMS = [
  'FULL-STACK DEVELOPMENT',
  'GENERATIVE AI & RAG',
  'CLEAN CODE',
  'DATA SCIENCE',
  'SEMANTIC SEARCH',
  'SCALABLE ARCHITECTURE',
  'REASONING WORKSPACES',
];

const TechMarquee = () => {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #071c12 0%, #0d2e1f 50%, #071c12 100%)',
        borderTop: '1px solid rgba(211,150,140,0.25)',
        borderBottom: '1px solid rgba(211,150,140,0.25)',
        padding: '24px 0',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Soft gradient fade edges */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '140px',
          background: 'linear-gradient(to right, #071c12 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '140px',
          background: 'linear-gradient(to left, #071c12 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Marquee Track */}
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          gap: '64px',
          width: 'max-content',
          alignItems: 'center',
        }}
      >
        {doubled.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '32px', whiteSpace: 'nowrap' }}>
            <span
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.2rem, 2.2vw, 1.65rem)',
                fontWeight: 800,
                color: '#F7F4D5',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textShadow: '0 0 20px rgba(247,244,213,0.2)',
              }}
            >
              {item}
            </span>
            <span style={{ color: '#D3968C', fontSize: '1.2rem', opacity: 0.8 }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
