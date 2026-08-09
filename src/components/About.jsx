import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { number: '3+', label: 'Years Experience' },
  { number: '50+', label: 'Projects Completed' },
  { number: '20+', label: 'Happy Clients' },
  { number: '24/7', label: 'Dedicated Support' },
];

/* SVG lotus / water-lily illustration for the center */
const LotusIllustration = () => (
  <svg viewBox="0 0 300 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '280px' }}>
    {/* Outer glow ring */}
    <circle cx="150" cy="170" r="120" stroke="rgba(211,150,140,0.08)" strokeWidth="1"/>
    <circle cx="150" cy="170" r="95" stroke="rgba(131,153,88,0.1)" strokeWidth="1" strokeDasharray="6 6"/>

    {/* Water surface ripples */}
    <ellipse cx="150" cy="295" rx="110" ry="14" stroke="#105666" strokeWidth="1.2" fill="none" opacity="0.35"/>
    <ellipse cx="150" cy="295" rx="80" ry="9" stroke="#105666" strokeWidth="1" fill="none" opacity="0.22"/>

    {/* Lily pads */}
    <path d="M150 295 C110 270 70 285 60 295 C80 300 130 298 150 295Z" fill="#0d3d2a" stroke="#839958" strokeWidth="1" opacity="0.9"/>
    <path d="M150 295 C190 270 230 285 240 295 C220 300 170 298 150 295Z" fill="#0d4a30" stroke="#839958" strokeWidth="1" opacity="0.8"/>

    {/* Stem */}
    <line x1="150" y1="295" x2="150" y2="190" stroke="#839958" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>

    {/* Back petals */}
    <ellipse cx="150" cy="155" rx="22" ry="50" fill="#b57a72" opacity="0.35" transform="rotate(-35 150 155)"/>
    <ellipse cx="150" cy="155" rx="22" ry="50" fill="#b57a72" opacity="0.35" transform="rotate(35 150 155)"/>
    <ellipse cx="150" cy="155" rx="20" ry="48" fill="#c48a82" opacity="0.4" transform="rotate(-60 150 155)"/>
    <ellipse cx="150" cy="155" rx="20" ry="48" fill="#c48a82" opacity="0.4" transform="rotate(60 150 155)"/>

    {/* Mid petals */}
    <ellipse cx="150" cy="148" rx="20" ry="44" fill="#D3968C" opacity="0.6" transform="rotate(-20 150 148)"/>
    <ellipse cx="150" cy="148" rx="20" ry="44" fill="#D3968C" opacity="0.6" transform="rotate(20 150 148)"/>
    <ellipse cx="150" cy="148" rx="18" ry="42" fill="#D3968C" opacity="0.65" transform="rotate(-50 150 148)"/>
    <ellipse cx="150" cy="148" rx="18" ry="42" fill="#D3968C" opacity="0.65" transform="rotate(50 150 148)"/>

    {/* Front petals */}
    <ellipse cx="150" cy="142" rx="18" ry="40" fill="#e8b0a6" opacity="0.75" transform="rotate(-10 150 142)"/>
    <ellipse cx="150" cy="142" rx="18" ry="40" fill="#e8b0a6" opacity="0.75" transform="rotate(10 150 142)"/>
    <ellipse cx="150" cy="138" rx="16" ry="36" fill="#f0c4bc" opacity="0.8"/>

    {/* Centre */}
    <circle cx="150" cy="130" r="14" fill="#F7F4D5" opacity="0.9"/>
    <circle cx="150" cy="130" r="9" fill="#e8b0a6" opacity="0.8"/>
    <circle cx="150" cy="130" r="5" fill="#D3968C" opacity="0.9"/>

    {/* Stamens */}
    {[0,36,72,108,144,180,216,252,288,324].map((a,i) => {
      const rad = (a * Math.PI) / 180;
      return <line key={i} x1="150" y1="130" x2={150 + Math.cos(rad)*12} y2={130 + Math.sin(rad)*12} stroke="#F7F4D5" strokeWidth="0.8" opacity="0.5"/>;
    })}

    {/* Floating petals */}
    <ellipse cx="80" cy="285" rx="10" ry="5" fill="#D3968C" opacity="0.3" transform="rotate(-20 80 285)"/>
    <ellipse cx="220" cy="290" rx="8" ry="4" fill="#D3968C" opacity="0.25" transform="rotate(15 220 290)"/>

    {/* Sparkles */}
    {[{x:90,y:130},{x:210,y:120},{x:75,y:210},{x:225,y:215},{x:150,y:60}].map((p,i) => (
      <g key={i}>
        <line x1={p.x} y1={p.y-5} x2={p.x} y2={p.y+5} stroke="#F7F4D5" strokeWidth="0.8" opacity="0.3"/>
        <line x1={p.x-5} y1={p.y} x2={p.x+5} y2={p.y} stroke="#F7F4D5" strokeWidth="0.8" opacity="0.3"/>
      </g>
    ))}
  </svg>
);

const StatCard = ({ number, label, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay, duration: 0.5 }} style={{ textAlign: 'center' }}>
      <div className="stat-number">{number}</div>
      <div style={{ color: '#839958', fontSize: '0.78rem', marginTop: '4px', letterSpacing: '0.05em' }}>{label}</div>
    </motion.div>
  );
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="about" style={{ padding: '120px 24px', background: 'linear-gradient(180deg, #0A3323 0%, #0d3d2a 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: '-80px', top: 0, width: '380px', height: '100%', background: 'linear-gradient(to left, rgba(16,86,102,0.05), transparent)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: '72px' }}>
          <p className="section-label" style={{ marginBottom: '10px' }}>✦ GET TO KNOW ME</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem,4vw,3.2rem)', fontWeight: 700, color: '#F7F4D5' }}>
            About{' '}
            <span style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#D3968C,#e8b0a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Me</span>
          </h2>
          <div className="divider" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '48px', alignItems: 'center' }} className="about-grid">

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            <p style={{ color: 'rgba(247,244,213,0.68)', lineHeight: 1.95, marginBottom: '44px', fontSize: '0.96rem' }}>
              I am a passionate developer with years of experience creating beautiful and functional web applications. I love turning ideas into reality through code and design — blending aesthetics with performance to craft experiences that feel alive.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px' }}>
              {stats.map((s, i) => <StatCard key={s.label} number={s.number} label={s.label} delay={0.3 + i * 0.1} />)}
            </div>
          </motion.div>

          {/* Centre — SVG lotus */}
          <motion.div initial={{ opacity: 0, scale: 0.82 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3, duration: 0.9 }}
            className="float-slow" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-20px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(211,150,140,0.1) 0%, transparent 70%)' }} />
            <LotusIllustration />
          </motion.div>

          {/* Right — cards */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 }} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {[
              { title: 'My Philosophy', text: 'Blending organic inspiration with modern technology to create unique, high-performance web experiences that feel both timeless and cutting-edge.' },
              { title: 'The Mission', text: 'Transforming complex ideas into clean, pixel-perfect, responsive interfaces that captivate users and leave a lasting impression.' },
              { title: 'The Vision', text: 'Building the future of web — one thoughtfully crafted component at a time, with passion, precision, and purpose.' },
            ].map(item => (
              <motion.div key={item.title} className="portfolio-card" whileHover={{ x: 6 }} style={{ padding: '20px 22px' }}>
                <h3 style={{ color: '#D3968C', fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px', fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>{item.title}</h3>
                <p style={{ color: 'rgba(247,244,213,0.58)', fontSize: '0.83rem', lineHeight: 1.75 }}>{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
