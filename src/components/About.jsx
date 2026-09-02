import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ── Add your memory photos here ──────────────────────────────
   Drop images into the /public folder and update the src paths.
   e.g. src: '/memory1.jpg', caption: 'Hackathon 2024'
─────────────────────────────────────────────────────────────── */
const PHOTOS = [
  { src: '/DR1.jpeg', caption: '2nd Best GenAI Project',               pos: 'center center' },
  { src: '/DR2.jpeg', caption: '24Hr HACKATHON - 2ND Runner Ups',       pos: 'center 15%' },
  { src: '/DR3.jpeg', caption: 'Awarded for Rank 1 & Subject Topper',  pos: 'center center' },
];

/* ── Stacked frame slideshow ─────────────────────────────────── */
const PhotoStack = () => {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  /* Auto-advance every 3.5s */
  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setCurrent(p => (p + 1) % PHOTOS.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const go = (idx) => {
    setDir(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const variants = {
    enter: (d) => ({ x: d > 0 ? 60 : -60, opacity: 0, scale: 0.95, rotate: d > 0 ? 4 : -4 }),
    center: { x: 0, opacity: 1, scale: 1, rotate: 0 },
    exit: (d) => ({ x: d > 0 ? -60 : 60, opacity: 0, scale: 0.95, rotate: d > 0 ? -4 : 4 }),
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '360px', margin: '0 auto' }}>

      {/* Stacked shadow frames behind */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: 'rotate(5deg) translateY(8px)',
        background: 'rgba(211,150,140,0.08)',
        border: '1px solid rgba(211,150,140,0.15)',
        borderRadius: '6px', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        transform: 'rotate(2.5deg) translateY(4px)',
        background: 'rgba(131,153,88,0.07)',
        border: '1px solid rgba(131,153,88,0.12)',
        borderRadius: '6px', zIndex: 1,
      }} />

      {/* Main frame */}
      <div style={{
        position: 'relative', zIndex: 2,
        borderRadius: '6px',
        border: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden',
        background: 'rgba(7,28,18,0.8)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
        aspectRatio: '4/3',
      }}>
        {/* Top film-strip accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '28px', zIndex: 10,
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', padding: '0 12px', gap: '5px',
        }}>
          {[...Array(12)].map((_, i) => (
            <div key={i} style={{ width: '6px', height: '10px', borderRadius: '1px', background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />
          ))}
          <div style={{ flex: 1 }} />
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'rgba(247,244,213,0.3)', textTransform: 'uppercase' }}>
            {current + 1} / {PHOTOS.length}
          </span>
        </div>

        {/* Photo */}
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={current}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ width: '100%', height: '100%' }}
          >
            {PHOTOS[current].src ? (
              <img
                src={PHOTOS[current].src}
                alt={PHOTOS[current].caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: PHOTOS[current].pos || 'center center', display: 'block' }}
              />
            ) : (
              /* Placeholder */
              <div style={{
                width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 12,
                background: 'linear-gradient(135deg, rgba(16,86,102,0.25) 0%, rgba(7,28,18,0.6) 100%)',
                paddingTop: '28px',
              }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="4" y="8" width="32" height="24" rx="3" stroke="rgba(211,150,140,0.4)" strokeWidth="1.5" />
                  <circle cx="14" cy="16" r="3" stroke="rgba(211,150,140,0.4)" strokeWidth="1.2" />
                  <path d="M4 26l8-7 6 5 5-4 9 7" stroke="rgba(131,153,88,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,244,213,0.25)' }}>
                  {PHOTOS[current].caption}
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Caption bar */}
        {PHOTOS[current].caption && (
          <motion.div
            key={`cap-${current}`}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              padding: '20px 14px 10px',
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(247,244,213,0.55)',
            }}
          >
            {PHOTOS[current].caption}
          </motion.div>
        )}

        {/* Click zones: prev / next */}
        <div onClick={() => go((current - 1 + PHOTOS.length) % PHOTOS.length)}
          style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '40%', cursor: 'pointer', zIndex: 5 }} />
        <div onClick={() => go((current + 1) % PHOTOS.length)}
          style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', cursor: 'pointer', zIndex: 5 }} />
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '7px', marginTop: '16px' }}>
        {PHOTOS.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{ all: 'unset', cursor: 'pointer' }}>
            <motion.div
              animate={{ width: i === current ? 20 : 6, background: i === current ? '#D3968C' : 'rgba(247,244,213,0.2)' }}
              transition={{ duration: 0.3 }}
              style={{ height: '4px', borderRadius: '2px' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ── Highlights ── */
const HIGHLIGHTS = [
  { label: 'Focus', value: 'Full-Stack + AI' },
  { label: 'Stack', value: 'React · FastAPI · Python' },
  { label: 'Degree', value: 'BCA (Pursuing)' },
  { label: 'Status', value: 'Open to Opportunities' },
];

/* ── About section ─────────────────────────────────────────── */
const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay },
  });

  return (
    <section id="about" style={{
      padding: '100px 40px',
      background: 'linear-gradient(180deg, #071c12 0%, #0a2419 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', right: 0, top: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(131,153,88,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }} ref={ref}>

        {/* Two-column layout */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 360px',
          gap: '80px', alignItems: 'start',
        }} className="about-grid">

          {/* LEFT — text */}
          <div>
            {/* Label */}
            <motion.div {...fade(0)} style={{ marginBottom: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: '36px', height: '1px', background: '#839958' }} />
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#839958' }}>About Me</span>
              </div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, color: '#F7F4D5', margin: '0 0 14px' }}>
                Who I{' '}
                <span style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#D3968C,#e8b4a8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Am</span>
              </h2>
              <div style={{ width: '40px', height: '1.5px', background: 'linear-gradient(90deg,#D3968C,transparent)' }} />
            </motion.div>

            {/* Bio */}
            <motion.p {...fade(0.15)} style={{
              fontFamily: 'DM Sans, sans-serif', color: 'rgba(247,244,213,0.6)',
              lineHeight: 1.9, fontSize: '0.97rem', maxWidth: '520px', marginBottom: '44px',
            }}>
              I'm a BCA student and full-stack developer with a passion for building clean, purposeful applications.
              I work across the stack — from crafting responsive UIs with React to building APIs with FastAPI and Python.
              Lately, I've been exploring{' '}
              <span style={{ color: '#D3968C', fontWeight: 500 }}>AI-driven applications</span>
              {' '}using LangChain and vector databases, bridging software development with intelligent systems.
            </motion.p>

            {/* Highlights */}
            <motion.div {...fade(0.28)} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '1px', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '4px', overflow: 'hidden',
            }}>
              {HIGHLIGHTS.map(({ label, value }, i) => (
                <motion.div key={label} whileHover={{ background: 'rgba(211,150,140,0.05)' }}
                  style={{
                    padding: '20px 22px',
                    borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    background: 'rgba(255,255,255,0.02)', transition: 'background 0.25s',
                  }}>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#839958', marginBottom: '7px' }}>{label}</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.92rem', color: '#F7F4D5', fontStyle: 'italic' }}>{value}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Photo stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
            style={{ paddingTop: '8px' }}
          >
            {/* Memory label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '20px', height: '1px', background: '#D3968C' }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.62rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#D3968C' }}>Memories</span>
            </div>
            <PhotoStack />

          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
