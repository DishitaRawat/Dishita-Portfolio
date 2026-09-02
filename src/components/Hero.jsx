import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope, FaLinkedin } from 'react-icons/fa';

/* ── Subtle particle canvas (very sparse) ── */
const AmbientCanvas = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let id;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 22 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      alpha: 0,
      target: Math.random() * 0.3 + 0.05,
      dir: 1,
      color: ['#D3968C', '#839958', '#F7F4D5'][Math.floor(Math.random() * 3)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.alpha += 0.003 * p.dir;
        if (p.alpha >= p.target) p.dir = -1;
        if (p.alpha <= 0) { p.dir = 1; p.x = Math.random() * canvas.width; p.y = Math.random() * canvas.height; }
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />;
};

/* ── Animation variants ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

const Hero = () => (
  <section id="home" style={{
    minHeight: '100vh',
    background: 'linear-gradient(155deg, #071c12 0%, #0a2e1e 50%, #071c12 100%)',
    position: 'relative', overflow: 'hidden',
    display: 'flex', alignItems: 'center',
  }}>
    <AmbientCanvas />

    {/* Soft BG glows */}
    <div style={{ position: 'absolute', right: '5%', top: '10%', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(211,150,140,0.07) 0%, transparent 68%)', pointerEvents: 'none', zIndex: 0 }} />
    <div style={{ position: 'absolute', left: '-8%', bottom: '-8%', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(131,153,88,0.06) 0%, transparent 68%)', pointerEvents: 'none', zIndex: 0 }} />

    <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 40px', width: '100%', zIndex: 2, position: 'relative' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr auto',
        gap: '80px', alignItems: 'center',
        minHeight: '100vh', paddingTop: '80px', paddingBottom: '60px',
      }} className="hero-grid">

        {/* ── LEFT ── */}
        <div>
          {/* Label */}
          <motion.div {...fadeUp(0.1)} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <div style={{ width: '36px', height: '1px', background: '#839958' }} />
            <span style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem',
              letterSpacing: '0.28em', textTransform: 'uppercase', color: '#839958',
            }}>Dishita Rawat</span>
          </motion.div>

          {/* Name */}
          <motion.h1 {...fadeUp(0.22)} style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 700, lineHeight: 1.05,
            color: '#F7F4D5', margin: '0 0 6px',
            letterSpacing: '-0.02em',
          }}>
            Hi, I'm{' '}
            <span style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D3968C, #e8b4a8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Dishita.</span>
          </motion.h1>

          {/* Role */}
          <motion.p {...fadeUp(0.34)} style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#839958', margin: '0 0 32px',
          }}>
            Full Stack Developer  ·  AI Enthusiast
          </motion.p>

          {/* Divider */}
          <motion.div {...fadeUp(0.4)} style={{
            width: '48px', height: '1.5px',
            background: 'linear-gradient(90deg, #D3968C, transparent)',
            marginBottom: '28px',
          }} />

          {/* Bio */}
          <motion.p {...fadeUp(0.48)} style={{
            fontFamily: 'DM Sans, sans-serif',
            color: 'rgba(247,244,213,0.55)',
            lineHeight: 1.9, maxWidth: '420px',
            marginBottom: '44px', fontSize: '0.93rem',
          }}>
            BCA student with experience in developing{' '}
            <span style={{ color: '#D3968C', fontWeight: 500 }}>full-stack applications</span>
            {' '}using React, FastAPI, Python, and SQL, with an interest in{' '}
            <span style={{ color: '#a4b878', fontWeight: 500 }}>software development</span>
            {' '}and{' '}
            <span style={{ color: '#D3968C', fontWeight: 500 }}>AI-driven applications.</span>
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.58)} style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '48px', flexWrap: 'wrap' }}>
            <motion.a
              href="/DishitaResume.pdf" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 28px', borderRadius: '2px',
                background: 'transparent',
                border: '1px solid #D3968C',
                color: '#D3968C',
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                textDecoration: 'none', cursor: 'pointer',
                transition: 'background 0.3s, color 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#D3968C'; e.currentTarget.style.color = '#071c12'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#D3968C'; }}
            >
              Resume
            </motion.a>


          </motion.div>

          {/* Social icons */}
          <motion.div {...fadeUp(0.68)} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {[
              { Icon: FaGithub,   url: 'https://github.com/DishitaRawat',                          label: 'GitHub' },
              { Icon: FaLinkedin, url: 'https://www.linkedin.com/in/dishita-rawat-235675313/',     label: 'LinkedIn' },
              { Icon: FaEnvelope, url: 'mailto:rawatdishita06@gmail.com',                          label: 'Email' },
            ].map(({ Icon, url, label }) => (
              <motion.a
                key={label} href={url} target={label !== 'Email' ? '_blank' : '_self'}
                rel="noopener noreferrer" aria-label={label}
                whileHover={{ y: -3 }}
                style={{
                  color: 'rgba(247,244,213,0.35)', fontSize: '1.05rem',
                  textDecoration: 'none', transition: 'color 0.25s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#D3968C'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,244,213,0.35)'}
              >
                <Icon />
              </motion.a>
            ))}
            <div style={{ width: '1px', height: '16px', background: 'rgba(247,244,213,0.1)', margin: '0 4px' }} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(247,244,213,0.2)', textTransform: 'uppercase' }}>Connect</span>
          </motion.div>
        </div>

        {/* ── RIGHT — Photo ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
        >
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(211,150,140,0.14) 0%, rgba(131,153,88,0.07) 50%, transparent 70%)',
            filter: 'blur(30px)', zIndex: 0,
          }} />

          {/* Slow-rotating outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', width: '370px', height: '370px', borderRadius: '50%',
              border: '1px dashed rgba(211,150,140,0.2)', zIndex: 1,
            }}
          />

          {/* Inner counter ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', width: '310px', height: '310px', borderRadius: '50%',
              border: '1px solid rgba(131,153,88,0.12)', zIndex: 1,
            }}
          />

          {/* Photo frame */}
          <div style={{
            position: 'relative', zIndex: 2,
            width: '320px', height: '320px', borderRadius: '50%',
            padding: '2.5px',
            background: 'linear-gradient(135deg, #D3968C 0%, #839958 55%, #105666 100%)',
            boxShadow: '0 0 50px rgba(211,150,140,0.25), 0 20px 60px rgba(0,0,0,0.5)',
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden',
              background: '#071c12',
            }}>
              <img
                src="/Profile.jpeg"
                alt="Dishita Rawat"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', borderRadius: '50%',
                  objectPosition: 'center 5%', display: 'block',
                }}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </div>



    <style>{`
      @media (max-width: 768px) {
        .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        .hero-grid > div:last-child { display: none; }
      }
    `}</style>
  </section>
);

export default Hero;
