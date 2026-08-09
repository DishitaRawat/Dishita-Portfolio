import React from 'react';

const techStack = [
  { name: 'React JS', icon: '⚛️' },
  { name: 'Vue JS', icon: '🍃' },
  { name: 'Tailwind CSS', icon: '🌊' },
  { name: 'Next JS', icon: '▲' },
  { name: 'Node JS', icon: '🌿' },
  { name: 'MongoDB', icon: '🌱' },
  { name: 'TypeScript', icon: '💙' },
  { name: 'Python', icon: '🐍' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Docker', icon: '🐋' },
];

const TechMarquee = () => {
  const doubled = [...techStack, ...techStack];
  return (
    <div style={{
      background: 'rgba(7,28,18,0.9)',
      borderTop: '1px solid rgba(131,153,88,0.18)',
      borderBottom: '1px solid rgba(131,153,88,0.18)',
      padding: '18px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Fade edges */}
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'120px', background:'linear-gradient(to right, rgba(7,28,18,1), transparent)', zIndex:2, pointerEvents:'none' }} />
      <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'120px', background:'linear-gradient(to left, rgba(7,28,18,1), transparent)', zIndex:2, pointerEvents:'none' }} />

      <div className="marquee-track" style={{ display:'flex', gap:'52px', width:'max-content' }}>
        {doubled.map((tech, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px', whiteSpace:'nowrap' }}>
            <span style={{ fontSize:'1.1rem' }}>{tech.icon}</span>
            <span style={{ color:'rgba(247,244,213,0.5)', fontSize:'0.88rem', fontWeight:500, letterSpacing:'0.04em' }}>{tech.name}</span>
            <span style={{ color:'rgba(131,153,88,0.35)', marginLeft:'18px', fontSize:'1rem' }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
