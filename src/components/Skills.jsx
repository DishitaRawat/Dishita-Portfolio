import React, { useEffect, useRef, useState } from 'react';

/* ══════════════════════════════════════════════════════════════
   TECH DATA
══════════════════════════════════════════════════════════════ */
const TECHS = [
  { name: 'HTML5',      color: '#E44D26', glow: 'rgba(228,77,38,0.5)',
    svg: `<svg viewBox="0 0 128 128"><path fill="#E44D26" d="M19 114L9 2h110l-10 112-45 12z"/><path fill="#F16529" d="M64 117l36-10 9-96H64z"/><path fill="#EBEBEB" d="M64 52H46l-1-14h19V25H29l3 38h32zm0 36l-15-4-1-11H34l2 22 28 8z"/><path fill="#fff" d="M64 52v14h17l-2 18-15 4v14l28-8 3-42zm0-27v14h33l1-7 1-7z"/></svg>` },
  { name: 'React',      color: '#61DAFB', glow: 'rgba(97,218,251,0.5)',
    svg: `<svg viewBox="0 0 128 128"><g fill="none" stroke="#61DAFB" stroke-width="5"><ellipse cx="64" cy="64" rx="60" ry="23"/><ellipse cx="64" cy="64" rx="60" ry="23" transform="rotate(60 64 64)"/><ellipse cx="64" cy="64" rx="60" ry="23" transform="rotate(120 64 64)"/></g><circle cx="64" cy="64" r="11" fill="#61DAFB"/></svg>` },
  { name: 'Vite',       color: '#BD34FE', glow: 'rgba(189,52,254,0.5)',
    svg: `<svg viewBox="0 0 128 128"><path fill="#41d1ff" d="M100 18L55 97c-1 2-3 2-4 0L7 18c-1-2 0-4 2-3l44 8h1l43-8c2 0 4 2 3 3z"/><path fill="#bd34fe" d="M74 3L44 9c-1 0-1 1-1 1L41 43c0 1 1 1 1 1l9-2c1 0 2 0 1 1l-3 13c0 1 1 1 1 1l5-2c1 0 2 1 1 1L52 76c0 1 1 2 2 1l25-50c1-1 0-2-1-2L69 27c-1 0-2 0-1-1L74 5c0-1-1-2-2-1z"/></svg>` },
  { name: 'JavaScript', color: '#F0DB4F', glow: 'rgba(240,219,79,0.5)',
    svg: `<svg viewBox="0 0 128 128"><path fill="#F0DB4F" d="M1 1h126v126H1z"/><path fill="#323330" d="M116 97c-1-6-5-11-16-15-4-2-8-3-9-6-1-2-1-3 0-4 1-3 5-4 8-3 2 1 4 2 5 5 5-3 5-3 9-6-1-2-2-3-3-4-3-4-8-5-15-5l-4 1c-3 1-7 3-9 5-6 7-4 18 3 23 7 5 18 7 19 12 1 6-4 8-10 7-4-1-7-3-9-7l-10 6c2 3 4 6 7 8 4 3 10 3 17 2 4-1 8-4 9-7 3-5 2-11 2-17V59H58v30c0 6 0 12-1 14-2 4-6 3-8 2-2-1-3-2-4-4l-10 6c2 3 4 6 7 8 4 3 10 3 17 2 4-1 8-4 9-7 3-5 2-11 2-17z"/></svg>` },
  { name: 'Python',     color: '#FFD43B', glow: 'rgba(255,212,59,0.5)',
    svg: `<svg viewBox="0 0 128 128"><path fill="#3776AB" d="M64 2c-4 0-8 0-12 1C34 5 32 9 32 16v9h25v3H30C23 28 17 32 15 40c-2 9-2 15 0 25 2 7 6 12 13 12h8V67c0-8 7-15 15-15h25c7 0 12-6 12-12V16c0-7-6-12-12-13C72 2 68 2 64 2zM50 10a5 5 0 110 10A5 5 0 0150 10z"/><path fill="#FFD43B" d="M92 28v11c0 9-7 16-15 16H52c-7 0-12 6-12 12v24c0 7 6 11 12 12 8 2 15 3 25 0 6-2 12-5 12-12v-9H64v-3h37c7 0 10-5 12-12 3-8 2-15 0-25-2-7-5-12-12-12H92zM78 88a5 5 0 110 10A5 5 0 0178 88z"/></svg>` },
  { name: 'Tailwind',   color: '#38BDF8', glow: 'rgba(56,189,248,0.5)',
    svg: `<svg viewBox="0 0 128 128"><path d="M64 26c-17 0-28 8-32 26 6-9 14-12 22-10 5 1 8 5 12 9 7 6 14 13 30 13 17 0 28-9 32-26-6 9-14 12-22 10-5-1-8-5-12-9C88 33 80 26 64 26zM32 64c-17 0-28 9-32 26 6-9 14-12 22-10 5 1 8 5 12 9 6 6 14 13 30 13 17 0 28-8 32-25-6 9-14 12-22 10-5-1-8-5-12-9-7-6-14-14-30-14z" fill="#38bdf8"/></svg>` },
  { name: 'FastAPI',    color: '#009688', glow: 'rgba(0,150,136,0.5)',
    svg: `<svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="62" fill="#009688"/><path fill="#fff" d="M72 14L47 71h21L57 114l55-72H88z"/></svg>` },
  { name: 'MongoDB',    color: '#47A248', glow: 'rgba(71,162,72,0.5)',
    svg: `<svg viewBox="0 0 128 128"><path fill="#47A248" d="M88 13C80 5 71 1 64 0c0 0-2 16 0 26 2 6 5 11 10 15l-1 1s0 55 0 65c0 10 6 19 6 21h3c0-2 6-11 6-21 0-14 0-64 0-64l-1-1c5-5 10-11 11-18C101 14 88 13 88 13z"/><path fill="#599636" d="M64 0C57 1 47 5 40 13c0 0-11 1-10 11 2 7 6 13 11 18l-1 1s0 50 0 64c0 10 7 19 7 21h2c0-2 6-11 6-21 0-10 0-65 0-65l-1-1c4-4 8-9 9-15 3-10 1-26 1-26z"/></svg>` },
  { name: 'C',          color: '#659AD3', glow: 'rgba(101,154,211,0.5)',
    svg: `<svg viewBox="0 0 128 128"><path fill="#659AD3" d="M115 31L67 3c-2-1-5-1-6 0L13 31c-2 1-3 4-3 5v56c0 1 0 2 1 3l107-61c-1-1-2-2-3-3z"/><path fill="#03599C" d="M11 95c0 1 1 2 2 2l48 28c2 1 4 1 6 0l48-28c2-1 3-4 3-5V36c0-1-1-2-1-3L11 95z"/><path fill="#fff" d="M85 76c-4 8-12 13-21 13-14 0-25-11-25-25s11-25 25-25c9 0 17 5 21 12l13-8C91 32 78 24 64 24c-22 0-39 18-39 40s17 40 39 40c15 0 27-8 34-20L85 76z"/></svg>` },
  { name: 'Java',       color: '#F89820', glow: 'rgba(248,152,32,0.5)',
    svg: `<svg viewBox="0 0 128 128"><path fill="#0074BD" d="M48 98s-5 3 3 4c10 1 15 1 26-1l7 3C60 114 29 103 48 98zm-3-14s-5 4 3 5c11 1 19 1 33-2l6 3C59 100 26 93 45 84z"/><path fill="#EA2D2E" d="M70 61c6 7-2 13-2 13s15-8 8-18c-7-9-12-14 16-30C92 26 49 37 70 61z"/><path fill="#0074BD" d="M102 108s4 3-4 5c-14 4-59 6-71 0-4-2 4-5 6-5h4c-5-3-32 7-14 10 50 8 91-4 79-10zM50 70s-23 5-8 7c6 1 19 1 30-1 9-1 19-2 19-2s-3 1-6 3C62 83 18 81 31 75c11-5 19-5 19-5zm41 23c23-12 13-24 5-22-2 0-3 1-3 1s1-1 2-2c15-5 26 16-5 24l1-1z"/><path fill="#EA2D2E" d="M76 2S89 15 64 35C44 51 60 60 64 71 52 60 44 51 50 42 58 28 82 22 76 2z"/><path fill="#0074BD" d="M52 126c22 1 57-1 58-11l-19 7c-19 4-43 3-57 1l18 3z"/></svg>` },
  { name: 'LangChain',  color: '#1E88E5', glow: 'rgba(30,136,229,0.5)',
    svg: `<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="#1C3F5E"/><text x="64" y="52" text-anchor="middle" font-family="Arial Black" font-size="38" font-weight="900" fill="#1E88E5">L</text><text x="64" y="90" text-anchor="middle" font-family="Arial Black" font-size="38" font-weight="900" fill="#42A5F5">C</text></svg>` },
  { name: 'GitHub',     color: '#D0D0D0', glow: 'rgba(200,200,200,0.4)',
    svg: `<svg viewBox="0 0 128 128"><path fill="#fff" d="M64 5C30 5 3 32 3 65c0 27 17 49 41 57 3 1 4-1 4-3v-11c-17 4-20-7-20-7-3-7-7-9-7-9-5-4 0-4 0-4 6 0 9 6 9 6 5 9 14 7 18 5 0-4 2-7 4-8-13-2-28-7-28-30 0-7 2-12 6-16-1-2-3-8 1-16 0 0 5-2 17 6 5-1 10-2 15-2s10 1 15 2c12-8 17-6 17-6 4 8 2 14 1 16 4 4 6 9 6 16 0 23-14 28-28 30 2 2 4 5 4 11v17c0 2 1 4 4 3C108 114 125 92 125 65 125 32 98 5 64 5z"/></svg>` },
  { name: 'Git',        color: '#F05032', glow: 'rgba(240,80,50,0.5)',
    svg: `<svg viewBox="0 0 128 128"><path fill="#F05032" d="M125 58L70 3a9 9 0 00-12 0L47 14l14 14c4-1 7 0 10 3 3 3 4 6 3 10l14 14c3-1 7-1 10 3 4 4 4 10 0 14a10 10 0 01-14 0 10 10 0 01-2-11L68 48v34a10 10 0 013 2c4 4 4 10 0 14-4 4-10 4-14 0-4-4-4-10 0-14a10 10 0 013-2V48a10 10 0 01-3-2c-3-3-4-7-2-11L41 20 3 58a8 8 0 000 11l55 55c3 3 8 3 12 0l55-55a8 8 0 000-11z"/></svg>` },
  { name: 'Vercel',     color: '#EEEEEE', glow: 'rgba(240,240,240,0.4)',
    svg: `<svg viewBox="0 0 128 128"><path fill="#fff" d="M64 9L128 119H0z"/></svg>` },
  { name: 'ChromaDB',   color: '#FF6B6B', glow: 'rgba(255,107,107,0.5)',
    svg: `<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="22" fill="#c0392b"/><text x="64" y="82" text-anchor="middle" font-family="Arial Black" font-size="72" font-weight="900" fill="#fff">C</text></svg>` },
  { name: 'Supabase',   color: '#3ECF8E', glow: 'rgba(62,207,142,0.5)',
    svg: `<svg viewBox="0 0 128 128"><defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#249361"/><stop offset="1" stop-color="#3ecf8e"/></linearGradient></defs><path fill="url(#sg)" d="M73 100c-2 3-7 1-7-2V67H9c-4 0-6-5-4-8L60 9c2-3 7-1 7 2v31h58c4 0 6 5 4 8z"/></svg>` },
  { name: 'Compass',    color: '#13AA52', glow: 'rgba(19,170,82,0.5)',
    svg: `<svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="62" fill="#13AA52"/><path fill="#fff" d="M64 18s-28 35-28 52c0 15 13 28 28 28s28-13 28-28C92 53 64 18 64 18zm0 62a10 10 0 110-20 10 10 0 010 20z"/></svg>` },
  { name: 'Vanilla CSS',color: '#1572B6', glow: 'rgba(21,114,182,0.5)',
    svg: `<svg viewBox="0 0 128 128"><path fill="#1572B6" d="M19 114L9 1h110l-10 113-45 12z"/><path fill="#33A9DC" d="M64 117l37-10 9-96H64z"/><path fill="#fff" d="M64 51H46l-1-14h19V24H30l3 38h31zm0 35l-15-4-1-11H34l2 21 28 8z"/><path fill="#EBEBEB" d="M64 51v13h17l-2 19-15 4v14l28-8 4-42zm0-27v13h33l1-13z"/></svg>` },
  { name: 'VS Code',    color: '#007ACC', glow: 'rgba(0,122,204,0.5)',
    svg: `<svg viewBox="0 0 128 128"><path fill="#0065A9" d="M91 127a10 10 0 007 0l25-10a10 10 0 007-10V20a10 10 0 00-7-10L97 0a10 10 0 00-12 3L45 52 27 37a7 7 0 00-9 1L2 53a7 7 0 000 10l18 15a7 7 0 009 1l20-14 40 48a10 10 0 002 15z"/><path fill="#007ACC" d="M120 10L94 1a10 10 0 00-12 3L2 53a7 7 0 000 10l18 15a7 7 0 009 1L115 24c3-2 7 1 7 4v-1l1-17zm0 107l-26 10a10 10 0 01-12-3L2 75a7 7 0 010-10l18-15a7 7 0 019-1l86 56c3 2 7-1 7-4v1l1 17z"/></svg>` },
];

/* ══════════════════════════════════════════════════════════════
   RING LAYOUT
   – Inner  (ring 0): 4 icons,  small arc oscillation
   – Middle (ring 1): 6 icons,  small arc oscillation
   – Outer  (ring 2): 9 icons,  UNIFORM CW rotation (left→right at top)
══════════════════════════════════════════════════════════════ */
const RINGS = [
  {
    radius: 130,
    techIds: [0, 1, 2, 3],           // 4 icons – inner
    color: 'rgba(211,150,140,0.45)',
    mode: 'oscillate',
    arcAmp:   0.18,
    arcSpeed: 0.38,
  },
  {
    radius: 245,
    techIds: [4, 5, 6, 7, 8, 9],     // 6 icons – middle
    color: 'rgba(131,153,88,0.4)',
    mode: 'oscillate',
    arcAmp:   0.14,
    arcSpeed: 0.30,
  },
  {
    radius: 370,
    techIds: [10,11,12,13,14,15,16,17,18], // 9 icons – outer
    color: 'rgba(16,86,102,0.45)',
    mode: 'rotate',                   // uniform left→right (clockwise)
    rotSpeed: 0.008,                  // radians per second – slow & smooth
  },
];

const SIZE = 820;
const CX   = 410;
const CY   = 410;

/* ══════════════════════════════════════════════════════════════
   MINIMAL STAR FIELD  –  30 subtle stars only
══════════════════════════════════════════════════════════════ */
const StarField = () => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    const stars = Array.from({ length: 32 }, () => ({
      x:     Math.random() * SIZE,
      y:     Math.random() * SIZE,
      r:     Math.random() * 1.1 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.006 + 0.002,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      t += 0.016;
      stars.forEach(s => {
        const alpha = 0.15 + 0.45 * (0.5 + 0.5 * Math.sin(t * s.speed * 60 + s.phase));
        ctx.globalAlpha = alpha;
        ctx.fillStyle   = '#ffffff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        /* Very faint cross sparkle only on slightly bigger stars */
        if (s.r > 0.9 && alpha > 0.4) {
          ctx.globalAlpha = alpha * 0.35;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth   = 0.5;
          const len = s.r * 4;
          ctx.beginPath();
          ctx.moveTo(s.x - len, s.y); ctx.lineTo(s.x + len, s.y);
          ctx.moveTo(s.x, s.y - len); ctx.lineTo(s.x, s.y + len);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas ref={canvasRef} width={SIZE} height={SIZE}
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0 }} />
  );
};

/* ══════════════════════════════════════════════════════════════
   RINGS CANVAS  –  glowing circles
══════════════════════════════════════════════════════════════ */
const RingsCanvas = () => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      t += 0.004;

      RINGS.forEach((ring, i) => {
        const pulse = 0.6 + 0.4 * Math.sin(t + i * 1.5);

        ctx.save();
        ctx.shadowColor = ring.color;
        ctx.shadowBlur  = 18 * pulse;
        ctx.strokeStyle = ring.color;
        ctx.lineWidth   = 1.0;
        ctx.globalAlpha = 0.55 + 0.3 * pulse;
        ctx.beginPath();
        ctx.arc(CX, CY, ring.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas ref={canvasRef} width={SIZE} height={SIZE}
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:1 }} />
  );
};

/* ══════════════════════════════════════════════════════════════
   ICON SPHERE  –  frosted glass, subtle glow, no over-shine
   receives x, y as live props from Orrery's RAF
══════════════════════════════════════════════════════════════ */
const SZ   = 72;
const HALF = SZ / 2;

const IconSphere = React.memo(({ tech, x, y }) => {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:   'absolute',
        left:        x - HALF,
        top:         y - HALF,
        width:       SZ,
        height:      SZ,
        borderRadius:'50%',
        cursor:      'pointer',
        zIndex:      hov ? 500 : 10,
        transform:   hov ? 'scale(1.42)' : 'scale(1)',
        transition:  'transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
        /* ── frosted glass ── */
        background: `radial-gradient(circle at 38% 32%,
          rgba(255,255,255,${hov ? 0.32 : 0.18}) 0%,
          rgba(255,255,255,0.06) 45%,
          rgba(0,0,0,0.18) 100%)`,
        backdropFilter: 'blur(18px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
        border: `1px solid rgba(255,255,255,${hov ? 0.35 : 0.18})`,
        boxShadow: hov
          ? `0 0 28px 8px ${tech.glow}, inset 0 1px 0 rgba(255,255,255,0.22), 0 8px 24px rgba(0,0,0,0.55)`
          : `0 0 12px 2px ${tech.glow}66, inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 12px rgba(0,0,0,0.4)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Subtle top highlight – thin crescent only */}
      <div style={{
        position:'absolute', top:'6%', left:'14%',
        width:'32%', height:'18%',
        background:'radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, transparent 100%)',
        borderRadius:'50%', pointerEvents:'none',
      }} />

      {/* Icon */}
      <div
        style={{
          width:42, height:42,
          position:'relative', zIndex:2, flexShrink:0,
          opacity: hov ? 1 : 0.88,
          filter:  hov ? `drop-shadow(0 0 5px ${tech.color}bb)` : 'none',
          transition: 'opacity 0.25s, filter 0.25s',
        }}
        dangerouslySetInnerHTML={{ __html: tech.svg }}
      />

      {/* Tooltip */}
      {hov && (
        <div style={{
          position:'absolute', bottom:'calc(100% + 10px)', left:'50%',
          transform:'translateX(-50%)',
          background:'rgba(4,12,9,0.94)',
          border:`1px solid ${tech.color}44`,
          color: tech.color,
          fontSize:'0.6rem', fontFamily:'DM Sans, sans-serif',
          fontWeight:700, letterSpacing:'0.13em',
          padding:'4px 12px', borderRadius:'20px',
          whiteSpace:'nowrap', boxShadow:`0 4px 18px ${tech.glow}`,
          pointerEvents:'none', zIndex:9999, textTransform:'uppercase',
          animation:'tipPop 0.18s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          {tech.name}
        </div>
      )}
    </div>
  );
});

/* ══════════════════════════════════════════════════════════════
   CENTRE NUCLEUS
══════════════════════════════════════════════════════════════ */
const Nucleus = () => (
  <div style={{
    position:'absolute', left:CX-34, top:CY-34,
    width:68, height:68, borderRadius:'50%', zIndex:20,
    background:'radial-gradient(circle at 34% 28%, rgba(255,255,255,0.38) 0%, rgba(211,150,140,0.22) 40%, rgba(131,153,88,0.12) 100%)',
    boxShadow:'0 0 40px rgba(211,150,140,0.55), 0 0 80px rgba(131,153,88,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
    border:'1px solid rgba(255,255,255,0.25)',
    display:'flex', alignItems:'center', justifyContent:'center',
    animation:'nucleusPulse 3.5s ease-in-out infinite',
    pointerEvents:'none',
  }}>
    <div style={{
      position:'absolute', top:'7%', left:'12%',
      width:'34%', height:'20%',
      background:'radial-gradient(ellipse, rgba(255,255,255,0.7) 0%, transparent 100%)',
      borderRadius:'50%',
    }} />
    <div style={{
      width:24, height:24, borderRadius:'50%',
      background:'radial-gradient(circle, #F7F4D5 0%, #D3968C 100%)',
      boxShadow:'0 0 18px rgba(211,150,140,0.9)',
    }} />
  </div>
);

/* ══════════════════════════════════════════════════════════════
   ORRERY  –  single RAF drives ALL icon positions
   Inner/Middle: per-icon arc oscillation
   Outer:        all icons rotate together CW (left→right)
══════════════════════════════════════════════════════════════ */

/* Pre-compute per-icon static data */
const ICON_DATA = (() => {
  const items = [];
  RINGS.forEach((ring, ri) => {
    const total = ring.techIds.length;
    ring.techIds.forEach((tid, ii) => {
      const baseAngle = (ii / total) * Math.PI * 2 - Math.PI / 2;
      items.push({
        tid, ri, ii,
        ring,
        baseAngle,
        /* oscillation personality (only used for oscillate rings) */
        arcPhase: ii * 1.55 + ri * 2.4,
        key: `${ri}-${ii}`,
      });
    });
  });
  return items;
})();

const Orrery = () => {
  const [positions, setPositions] = useState(() =>
    ICON_DATA.map(d => ({
      x: CX + d.ring.radius * Math.cos(d.baseAngle),
      y: CY + d.ring.radius * Math.sin(d.baseAngle),
    }))
  );

  const rafRef   = useRef(null);
  const startRef = useRef(null);
  /* Outer ring shared offset – accumulates each frame */
  const outerAngleRef = useRef(0);

  useEffect(() => {
    let lastTs = null;

    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const t  = (ts - startRef.current) / 1000;
      const dt = lastTs ? (ts - lastTs) / 1000 : 0;
      lastTs   = ts;

      /* Advance outer ring offset */
      outerAngleRef.current += RINGS[2].rotSpeed * dt;

      const newPositions = ICON_DATA.map((d) => {
        let angle;
        if (d.ring.mode === 'rotate') {
          /* Uniform CW rotation – all icons share same offset */
          angle = d.baseAngle + outerAngleRef.current;
        } else {
          /* Individual arc oscillation */
          angle = d.baseAngle + d.ring.arcAmp * Math.sin(
            t * d.ring.arcSpeed + d.arcPhase
          );
        }
        return {
          x: CX + d.ring.radius * Math.cos(angle),
          y: CY + d.ring.radius * Math.sin(angle),
        };
      });

      setPositions(newPositions);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div style={{
      position:'relative', width:SIZE, height:SIZE,
      maxWidth:'96vw', maxHeight:'96vw',
      margin:'0 auto', flexShrink:0,
    }}>
      <StarField />
      <RingsCanvas />
      <Nucleus />

      {ICON_DATA.map((d, idx) => (
        <IconSphere
          key={d.key}
          tech={TECHS[d.tid]}
          x={positions[idx].x}
          y={positions[idx].y}
        />
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   SKILLS SECTION
══════════════════════════════════════════════════════════════ */
const Skills = () => {
  const secRef  = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    if (secRef.current) obs.observe(secRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={secRef} style={{
      padding:'80px 24px 56px',
      background:'linear-gradient(180deg, #071c12 0%, #030d07 55%, #071c12 100%)',
      position:'relative', overflow:'hidden',
      display:'flex', flexDirection:'column', alignItems:'center',
    }}>
      <style>{`
        @keyframes nucleusPulse {
          0%,100% { box-shadow:0 0 40px rgba(211,150,140,0.55),0 0 80px rgba(131,153,88,0.2),inset 0 1px 0 rgba(255,255,255,0.3); }
          50%      { box-shadow:0 0 56px rgba(211,150,140,0.75),0 0 110px rgba(131,153,88,0.35),inset 0 1px 0 rgba(255,255,255,0.38); }
        }
        @keyframes tipPop {
          from { opacity:0; transform:translateX(-50%) translateY(6px) scale(0.88); }
          to   { opacity:1; transform:translateX(-50%) translateY(0)  scale(1); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        textAlign:'center', marginBottom:44,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition:'opacity 0.8s ease, transform 0.8s ease',
        position:'relative', zIndex:5,
      }}>
        <p style={{
          fontFamily:'DM Sans, sans-serif', fontSize:'0.7rem',
          letterSpacing:'0.28em', textTransform:'uppercase',
          color:'#839958', margin:'0 0 12px',
        }}>✦ TECH UNIVERSE</p>
        <h2 style={{
          fontFamily:'Playfair Display, serif',
          fontSize:'clamp(2rem,4vw,3rem)',
          fontWeight:700, color:'#F7F4D5', lineHeight:1.1, margin:0,
        }}>
          My <span style={{ fontStyle:'italic', color:'#D3968C' }}>Tech Stack</span>
        </h2>
        <div style={{
          width:56, height:2,
          background:'linear-gradient(90deg, #D3968C, #839958)',
          margin:'14px auto 0', borderRadius:1,
        }}/>
      </div>

      {/* Orrery */}
      <div style={{
        opacity: inView ? 1 : 0,
        transition:'opacity 1.2s ease 0.15s',
        width:'100%', display:'flex', justifyContent:'center',
      }}>
        {inView && <Orrery />}
      </div>

      {/* Legend */}
      <div style={{
        marginTop:36,
        display:'flex', flexWrap:'wrap', gap:'7px 12px',
        justifyContent:'center', maxWidth:840,
        opacity: inView ? 1 : 0,
        transition:'opacity 0.9s ease 1s',
        position:'relative', zIndex:5,
      }}>
        {TECHS.map(t => (
          <div key={t.name} style={{
            display:'flex', alignItems:'center', gap:5,
            background:'rgba(255,255,255,0.03)',
            border:`1px solid ${t.color}22`,
            borderRadius:20, padding:'3px 11px',
            fontSize:'0.68rem',
            fontFamily:'DM Sans, sans-serif',
            color:'rgba(247,244,213,0.55)',
            letterSpacing:'0.04em',
          }}>
            <div style={{
              width:6, height:6, borderRadius:'50%',
              background:t.color, boxShadow:`0 0 5px ${t.color}`,
              flexShrink:0,
            }}/>
            {t.name}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
