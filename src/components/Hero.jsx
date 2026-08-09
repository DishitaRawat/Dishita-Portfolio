import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaDownload, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

/* Firefly canvas */
const FireflyCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    class Firefly {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.r = Math.random() * 2.2 + 0.4;
        this.vx = (Math.random() - 0.5) * 0.22;
        this.vy = (Math.random() - 0.5) * 0.22;
        this.alpha = 0;
        this.targetAlpha = Math.random() * 0.55 + 0.1;
        this.fadeIn = true;
        this.color = ['#D3968C', '#839958', '#F7F4D5', '#105666'][Math.floor(Math.random() * 4)];
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.fadeIn) { this.alpha = Math.min(this.alpha + 0.007, this.targetAlpha); }
        else { this.alpha = Math.max(this.alpha - 0.004, 0); if (this.alpha <= 0) this.reset(); }
        if (this.alpha >= this.targetAlpha) this.fadeIn = false;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const flies = Array.from({ length: 80 }, () => new Firefly());
    const animate = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); flies.forEach(f => { f.update(); f.draw(); }); animId = requestAnimationFrame(animate); };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }} />;
};

/* Abstract botanical SVG illustration — right side */
const BotanicalIllustration = () => (
  <svg viewBox="0 0 420 520" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '460px', filter: 'drop-shadow(0 20px 60px rgba(10,51,35,0.8))' }}>
    {/* Main stem */}
    <path d="M210 490 C210 490 205 380 200 280 C195 180 210 80 210 50" stroke="#839958" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>

    {/* Large leaf left */}
    <path d="M200 280 C160 260 80 220 60 160 C100 170 160 200 200 250" fill="#0d3d2a" stroke="#839958" strokeWidth="1.5" opacity="0.85"/>
    <path d="M200 280 C170 270 100 255 60 160" stroke="#839958" strokeWidth="1" opacity="0.4" strokeDasharray="4 4"/>

    {/* Large leaf right */}
    <path d="M205 320 C245 295 330 250 360 185 C315 200 250 230 210 285" fill="#0d3d2a" stroke="#839958" strokeWidth="1.5" opacity="0.85"/>
    <path d="M205 320 C235 305 310 285 360 185" stroke="#839958" strokeWidth="1" opacity="0.4" strokeDasharray="4 4"/>

    {/* Mid leaf left */}
    <path d="M202 200 C165 185 100 155 85 100 C120 115 170 140 205 190" fill="#0d4a30" stroke="#a4b878" strokeWidth="1.5" opacity="0.7"/>

    {/* Mid leaf right */}
    <path d="M207 230 C245 210 305 175 320 115 C280 135 235 165 210 220" fill="#0d4a30" stroke="#a4b878" strokeWidth="1.5" opacity="0.7"/>

    {/* Lotus flower at top */}
    <ellipse cx="210" cy="60" rx="28" ry="40" fill="#D3968C" opacity="0.6" transform="rotate(-15 210 60)"/>
    <ellipse cx="210" cy="60" rx="28" ry="40" fill="#D3968C" opacity="0.6" transform="rotate(15 210 60)"/>
    <ellipse cx="210" cy="55" rx="20" ry="35" fill="#e8b0a6" opacity="0.7"/>
    <ellipse cx="210" cy="52" rx="13" ry="25" fill="#f5cfc8" opacity="0.6"/>

    {/* Small decorative buds */}
    <circle cx="160" cy="145" r="6" fill="#D3968C" opacity="0.5"/>
    <circle cx="260" cy="170" r="5" fill="#D3968C" opacity="0.45"/>
    <circle cx="145" cy="240" r="4" fill="#839958" opacity="0.5"/>
    <circle cx="275" cy="265" r="4" fill="#839958" opacity="0.45"/>

    {/* Water ripples at base */}
    <ellipse cx="210" cy="490" rx="100" ry="12" stroke="#105666" strokeWidth="1.5" fill="none" opacity="0.3"/>
    <ellipse cx="210" cy="490" rx="140" ry="18" stroke="#105666" strokeWidth="1" fill="none" opacity="0.18"/>
    <ellipse cx="210" cy="490" rx="180" ry="24" stroke="#105666" strokeWidth="0.8" fill="none" opacity="0.1"/>

    {/* Scattered dots / pollen */}
    {[{x:130,y:80},{x:290,y:95},{x:95,y:190},{x:325,y:210},{x:75,y:310},{x:345,y:330},{x:120,y:420},{x:300,y:410}].map((p,i) => (
      <circle key={i} cx={p.x} cy={p.y} r="2" fill="#F7F4D5" opacity="0.25"/>
    ))}
  </svg>
);

const Hero = () => (
  <section id="home" style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #071c12 0%, #0A3323 45%, #0d2e1f 75%, #071c12 100%)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
    <FireflyCanvas />

    {/* Large watermark */}
    <div style={{ position: 'absolute', bottom: '5%', left: '3%', fontFamily: 'Playfair Display, serif', fontSize: '12vw', fontWeight: 700, fontStyle: 'italic', color: 'rgba(247,244,213,0.025)', zIndex: 1, pointerEvents: 'none', lineHeight: 1, userSelect: 'none' }}>
      Dishita
    </div>

    {/* BG glows */}
    <div style={{ position: 'absolute', right: '-10%', top: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,86,102,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
    <div style={{ position: 'absolute', left: '-5%', bottom: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(131,153,88,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />

    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 28px', width: '100%', zIndex: 2, position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', minHeight: '100vh', paddingTop: '90px', paddingBottom: '40px' }} className="hero-grid">

        {/* LEFT */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '30px', height: '1.5px', background: '#839958' }} />
            <span className="section-label">DISHITA RAWAT</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', fontWeight: 700, lineHeight: 1.08, marginBottom: '18px', color: '#F7F4D5' }}>
            Hi, I'm{' '}
            <span style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #D3968C, #e8b0a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Dishita
            </span>
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.2rem, 2.2vw, 1.65rem)', fontWeight: 400, marginBottom: '26px', color: '#a4b878', letterSpacing: '0.02em' }}>
            I craft{' '}
            <TypeAnimation sequence={['digital experiences.', 2000, 'beautiful interfaces.', 2000, 'creative solutions.', 2000, 'with purpose.', 2000]}
              wrapper="span" speed={50} repeat={Infinity} style={{ color: '#D3968C', fontStyle: 'italic' }} />
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.54 }}
            style={{ color: 'rgba(247,244,213,0.62)', lineHeight: 1.88, maxWidth: '460px', marginBottom: '38px', fontSize: '0.96rem' }}>
            A passionate developer with a love for creating beautiful, functional web experiences. I turn ideas into living, breathing digital spaces — with intention and craft.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.64 }}
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '36px' }}>
            <motion.a href="#" className="btn-primary pulse-glow" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <FaDownload style={{ fontSize: '0.8rem' }} /> Download CV
            </motion.a>
            <motion.a href="#contact" className="btn-outline" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Let's Talk
            </motion.a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.74 }} style={{ display: 'flex', gap: '14px' }}>
            {[{ Icon: FaGithub, label: 'GitHub' }, { Icon: FaInstagram, label: 'Instagram' }, { Icon: FaLinkedin, label: 'LinkedIn' }].map(({ Icon, label }) => (
              <motion.a key={label} href="#" whileHover={{ scale: 1.15, y: -2 }} aria-label={label}
                style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1.5px solid rgba(211,150,140,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(247,244,213,0.55)', fontSize: '1rem', transition: 'all 0.3s', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#D3968C'; e.currentTarget.style.color = '#D3968C'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(211,150,140,0.3)'; e.currentTarget.style.color = 'rgba(247,244,213,0.55)'; }}>
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — Botanical SVG */}
        <motion.div initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="float-anim" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          {/* Glow halo */}
          <div style={{ position: 'absolute', inset: '-30px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(211,150,140,0.1) 0%, transparent 65%)', zIndex: 0 }} />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', inset: '-20px', borderRadius: '50%', border: '1px dashed rgba(131,153,88,0.2)', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '460px' }}>
            <BotanicalIllustration />
          </div>

          {/* Floating badge */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
            style={{ position: 'absolute', bottom: '60px', left: '-20px', zIndex: 3, background: 'rgba(10,51,35,0.92)', border: '1px solid rgba(131,153,88,0.35)', borderRadius: '14px', padding: '14px 18px', backdropFilter: 'blur(12px)' }}>
            <div style={{ color: '#839958', fontSize: '0.66rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>Available For</div>
            <div style={{ color: '#F7F4D5', fontWeight: 600, fontSize: '0.86rem' }}>Freelance &amp; Full-Time</div>
            <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
              style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#839958', marginTop: '6px' }} />
          </motion.div>
        </motion.div>
      </div>
    </div>

    {/* Scroll indicator */}
    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
      style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(247,244,213,0.25)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
      <span>Scroll</span>
      <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(211,150,140,0.45), transparent)' }} />
    </motion.div>

    <style>{`
      @media (max-width: 768px) {
        .hero-grid { grid-template-columns: 1fr !important; }
        .hero-grid > div:last-child { display: none; }
      }
    `}</style>
  </section>
);

export default Hero;
