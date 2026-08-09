import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/* ─── Project Data ─────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 0,
    title: 'VoxVault',
    subtitle: 'Voice AI Platform',
    description:
      'A voice-based AI vault application with real-time speech recognition, intelligent processing, and a beautiful UI. Built for seamless, hands-free interaction with your data.',
    tags: ['React', 'Python', 'FastAPI', 'AI', 'WebSockets'],
    github: '#',
    demo: '#',
    color: '#D3968C',
    icon: '🎙️',
    year: '2024',
  },
  {
    id: 1,
    title: 'Portfolio v2',
    subtitle: 'Personal Portfolio',
    description:
      'My personal portfolio with stunning animations, botanical garden aesthetic, smooth scroll interactions, and a rotating circular project carousel built with Framer Motion.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
    github: '#',
    demo: '#',
    color: '#839958',
    icon: '🌿',
    year: '2024',
  },
  {
    id: 2,
    title: 'AI Chat Interface',
    subtitle: 'AI SaaS Product',
    description:
      'A sophisticated AI chat interface with real-time streaming responses, markdown rendering, syntax-highlighted code blocks, and a clean, modern design powered by GPT-4.',
    tags: ['Next.js', 'OpenAI', 'TypeScript', 'Prisma'],
    github: '#',
    demo: '#',
    color: '#105666',
    icon: '✦',
    year: '2023',
  },
  {
    id: 3,
    title: 'E-Commerce Dashboard',
    subtitle: 'Full-Stack Web App',
    description:
      'Full-stack e-commerce dashboard with real-time analytics, inventory management, order processing, and beautiful data visualizations using Recharts.',
    tags: ['React', 'Node.js', 'MongoDB', 'Recharts'],
    github: '#',
    demo: '#',
    color: '#D3968C',
    icon: '📊',
    year: '2023',
  },
];

/* ─── Circular Wheel Config ────────────────────────────────── */
// Radius of the virtual circle the thumbnails sit on
const WHEEL_RADIUS = 460;
// Angular spread between items (degrees)
const ITEM_ANGLE_STEP = 24;

function itemAngle(index, activeIndex, total) {
  const offset = index - activeIndex;
  return offset * ITEM_ANGLE_STEP;
}

// Convert polar (angle from bottom) → cartesian offset on an arc
function arcPosition(angleDeg, radius) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: radius * Math.sin(rad),
    y: -radius * (1 - Math.cos(rad)), // negative = upward
  };
}

/* ─── Single Wheel Thumbnail ───────────────────────────────── */
const WheelThumb = ({ project, angleDeg, isActive, onClick }) => {
  const pos = arcPosition(angleDeg, WHEEL_RADIUS);
  const absAngle = Math.abs(angleDeg);

  // scale & opacity fall off as items move away from centre
  const scale = isActive ? 1 : Math.max(0.55, 1 - absAngle / 90);
  const opacity = isActive ? 1 : Math.max(0.35, 1 - absAngle / 70);
  const blur = isActive ? 0 : Math.min(3, absAngle / 14);
  // slight tilt following the arc
  const rotate = angleDeg * 0.3;

  const thumbW = isActive ? 170 : 130;
  const thumbH = isActive ? 220 : 165;

  return (
    <motion.div
      onClick={onClick}
      animate={{
        x: pos.x,
        y: pos.y,
        scale,
        opacity,
        rotate,
        filter: `blur(${blur}px)`,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 26 }}
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        marginLeft: `-${thumbW / 2}px`,
        width: thumbW,
        height: thumbH,
        cursor: isActive ? 'default' : 'pointer',
        zIndex: isActive ? 10 : Math.max(1, 9 - Math.round(absAngle / 10)),
        transformOrigin: 'bottom center',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '24px',
          overflow: 'hidden',
          border: isActive
            ? `2.5px solid ${project.color}`
            : '1.5px solid rgba(247,244,213,0.07)',
          boxShadow: isActive
            ? `0 0 40px ${project.color}55, 0 20px 60px rgba(0,0,0,0.6)`
            : '0 8px 32px rgba(0,0,0,0.5)',
          transition: 'border 0.4s, box-shadow 0.4s',
          position: 'relative',
          background: `linear-gradient(135deg, #0d3d2a, #071c12)`,
        }}
      >
        {/* Abstract botanical art card */}
        <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Gradient bg */}
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 40%, ${project.color}22 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(131,153,88,0.15) 0%, transparent 50%)` }} />
          {/* Centre icon */}
          <div style={{ fontSize: isActive ? '2.8rem' : '2rem', zIndex: 1, filter: `drop-shadow(0 0 8px ${project.color}88)` }}>
            {project.icon}
          </div>
          {/* Decorative rings */}
          <div style={{ position: 'absolute', inset: '12px', borderRadius: '50%', border: `1px solid ${project.color}22` }} />
          <div style={{ position: 'absolute', inset: '22px', borderRadius: '50%', border: `1px dashed ${project.color}15` }} />
          {/* Project name overlay bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px', background: `linear-gradient(to top, ${project.color}33, transparent)`, textAlign: 'center' }}>
            <span style={{ color: '#F7F4D5', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.06em', opacity: 0.8 }}>{project.title}</span>
          </div>
        </div>
        {/* Active badge */}
        {isActive && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ position: 'absolute', top: '8px', right: '8px', background: project.color, color: '#F7F4D5', fontSize: '0.6rem', fontWeight: 700, padding: '3px 8px', borderRadius: '20px', letterSpacing: '0.05em' }}>
            ● NOW
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

/* ─── Main Projects Component ──────────────────────────────── */
const Projects = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartIdx = useRef(0);
  const containerRef = useRef(null);

  const active = PROJECTS[activeIdx];
  const total = PROJECTS.length;

  /* Arrow navigation */
  const goNext = useCallback(() => setActiveIdx(i => (i + 1) % total), [total]);
  const goPrev = useCallback(() => setActiveIdx(i => (i - 1 + total) % total), [total]);

  /* Keyboard */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  /* Drag / swipe on the wheel area */
  const handleDragStart = (e) => {
    setDragging(false);
    dragStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartIdx.current = activeIdx;
  };
  const handleDragMove = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = dragStartX.current - clientX;
    if (Math.abs(delta) > 8) setDragging(true);
    const steps = Math.round(delta / 80);
    const newIdx = Math.min(total - 1, Math.max(0, dragStartIdx.current + steps));
    setActiveIdx(newIdx);
  };
  const handleDragEnd = () => setDragging(false);

  return (
    <section
      id="projects"
      style={{
        padding: '100px 0 0',
        background: 'linear-gradient(180deg, #071c12 0%, #0A3323 100%)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      {/* ── Ambient background glow ── */}
      <motion.div
        key={activeIdx}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: `radial-gradient(ellipse, ${active.color}22 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <p className="section-label" style={{ marginBottom: '8px' }}>🌸 MY WORK</p>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
          }}>
            <span style={{ color: '#fff' }}>Featured </span>
            <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* ── Project Detail Panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.42, ease: 'easeOut' }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '48px',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            {/* Left — Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{
                  background: `linear-gradient(135deg, ${active.color}, ${active.color}88)`,
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '4px 14px',
                  borderRadius: '20px',
                  letterSpacing: '0.08em',
                }}>{active.year}</span>
                <span style={{ color: '#8888aa', fontSize: '0.82rem' }}>{active.subtitle}</span>
              </div>

              <h3 style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '20px',
                background: `linear-gradient(135deg, #fff 30%, ${active.color})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>{active.title}</h3>

              <p style={{ color: '#aaaacc', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '24px' }}>
                {active.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {active.tags.map(tag => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <motion.a
                  href={active.demo}
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ background: `linear-gradient(135deg, ${active.color}, ${active.color}aa)` }}
                >
                  <FaExternalLinkAlt style={{ fontSize: '0.8rem' }} /> Live Demo
                </motion.a>
                <motion.a
                  href={active.github}
                  className="btn-outline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ borderColor: active.color, color: active.color }}
                >
                  <FaGithub /> GitHub
                </motion.a>
              </div>

              {/* Project counter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '32px' }}>
                {PROJECTS.map((_, i) => (
                  <motion.div
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    animate={{
                      width: i === activeIdx ? 32 : 8,
                      background: i === activeIdx ? active.color : 'rgba(255,255,255,0.2)',
                    }}
                    style={{
                      height: '8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right — Abstract project art panel */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '-16px', borderRadius: '32px', background: `radial-gradient(ellipse, ${active.color}1a 0%, transparent 70%)`, zIndex: 0 }} />
              <motion.div
                style={{
                  position: 'relative', zIndex: 1, borderRadius: '24px', overflow: 'hidden',
                  border: `1.5px solid ${active.color}44`,
                  boxShadow: `0 0 50px ${active.color}22, 0 24px 60px rgba(0,0,0,0.5)`,
                  aspectRatio: '4/3',
                  background: `linear-gradient(135deg, #071c12 0%, #0d3d2a 50%, #071c12 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                layoutId="active-project-art"
              >
                {/* Multi-layer abstract botanical art */}
                <div style={{ position: 'absolute', inset: 0 }}>
                  {/* Gradient layers */}
                  <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 25% 30%, ${active.color}22 0%, transparent 50%)` }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 75% 70%, rgba(131,153,88,0.12) 0%, transparent 50%)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(16,86,102,0.15) 0%, transparent 40%)' }} />
                  {/* Grid lines */}
                  {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${(i + 1) * 16.66}%`, height: '1px', background: 'rgba(247,244,213,0.03)' }} />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: `${(i + 1) * 12.5}%`, width: '1px', background: 'rgba(247,244,213,0.03)' }} />
                  ))}
                </div>
                {/* Large icon */}
                <div style={{ zIndex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '12px', filter: `drop-shadow(0 0 20px ${active.color})` }}>{active.icon}</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 600, fontStyle: 'italic', color: '#F7F4D5', opacity: 0.7, letterSpacing: '0.02em' }}>{active.title}</div>
                </div>
                {/* Bottom colour wash */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: `linear-gradient(to top, ${active.color}33, transparent)` }} />
              </motion.div>

              {/* Floating number badge */}
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                style={{ position: 'absolute', top: '-18px', right: '-18px', width: '56px', height: '56px', borderRadius: '50%', background: `linear-gradient(135deg, ${active.color}, ${active.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontWeight: 700, fontStyle: 'italic', fontSize: '1.3rem', color: '#F7F4D5', boxShadow: `0 8px 24px ${active.color}55`, zIndex: 2 }}>
                0{activeIdx + 1}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── View All button between panel and wheel ── */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 5, marginBottom: '-10px' }}>
        <motion.button
          className="btn-outline"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{ borderColor: active.color, color: active.color, fontSize: '0.82rem', padding: '8px 24px', fontFamily: 'DM Sans, sans-serif' }}
        >
          View All Projects
        </motion.button>
      </div>

      {/* ── Circular Wheel ── */}
      <div
        ref={containerRef}
        onMouseDown={handleDragStart}
        onMouseMove={dragging ? handleDragMove : undefined}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          cursor: dragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          overflow: 'visible',
        }}
      >
        {/* The big pink arc / half-circle backdrop */}
        <div style={{
          position: 'absolute',
          bottom: '-360px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1000px',
          height: '1000px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(211,150,140,0.12) 0%, rgba(131,153,88,0.06) 40%, transparent 68%)',
          border: '1.5px solid rgba(131,153,88,0.2)',
          boxShadow: 'inset 0 0 40px rgba(211,150,140,0.04)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Thumbnails on the wheel */}
        <div style={{
          position: 'absolute',
          bottom: '-260px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          zIndex: 5,
        }}>
          {PROJECTS.map((project, i) => {
            const angle = itemAngle(i, activeIdx, total);
            return (
              <WheelThumb
                key={project.id}
                project={project}
                angleDeg={angle}
                isActive={i === activeIdx}
                onClick={() => !dragging && setActiveIdx(i)}
              />
            );
          })}
        </div>

        {/* Left / Right navigation arrows */}
        <motion.button
          onClick={goPrev}
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.9 }}
          disabled={activeIdx === 0}
          style={{
            position: 'absolute',
            left: 'calc(50% - 280px)',
            bottom: '130px',
            zIndex: 20,
            background: 'rgba(233,30,140,0.15)',
            border: '1.5px solid rgba(233,30,140,0.4)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#e91e8c',
            fontSize: '1rem',
            cursor: activeIdx === 0 ? 'not-allowed' : 'pointer',
            opacity: activeIdx === 0 ? 0.3 : 1,
            transition: 'opacity 0.3s',
          }}
          aria-label="Previous project"
        >
          <FaChevronLeft />
        </motion.button>

        <motion.button
          onClick={goNext}
          whileHover={{ scale: 1.1, x: 3 }}
          whileTap={{ scale: 0.9 }}
          disabled={activeIdx === total - 1}
          style={{
            position: 'absolute',
            right: 'calc(50% - 280px)',
            bottom: '130px',
            zIndex: 20,
            background: 'rgba(233,30,140,0.15)',
            border: '1.5px solid rgba(233,30,140,0.4)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#e91e8c',
            fontSize: '1rem',
            cursor: activeIdx === total - 1 ? 'not-allowed' : 'pointer',
            opacity: activeIdx === total - 1 ? 0.3 : 1,
            transition: 'opacity 0.3s',
          }}
          aria-label="Next project"
        >
          <FaChevronRight />
        </motion.button>

        {/* Drag hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.25)',
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            zIndex: 20,
          }}
        >
          ← drag or click to explore →
        </motion.p>

        {/* Bottom gradient to blend into next section */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '60px',
          background: 'linear-gradient(to bottom, transparent, #071c12)',
          zIndex: 15,
          pointerEvents: 'none',
        }} />
      </div>
    </section>
  );
};

export default Projects;
