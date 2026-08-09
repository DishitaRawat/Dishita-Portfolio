import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import About from './components/About';
import Certificates from './components/Certificates';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

/* ── Scroll To Top ──────────────────────────────────────────── */
const ScrollTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity:0, scale:0.5, y:20 }}
          animate={{ opacity:1, scale:1, y:0 }}
          exit={{ opacity:0, scale:0.5, y:20 }}
          onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
          whileHover={{ scale:1.1 }}
          whileTap={{ scale:0.9 }}
          aria-label="Back to top"
          style={{
            position:'fixed', bottom:'30px', right:'30px',
            width:'48px', height:'48px', borderRadius:'50%',
            background:'linear-gradient(135deg, #D3968C, #b57a72)',
            border:'none', color:'#F7F4D5', fontSize:'1.1rem',
            cursor:'pointer', zIndex:999,
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 6px 24px rgba(211,150,140,0.4)',
          }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/* ── Loading Screen ─────────────────────────────────────────── */
const Loader = ({ onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, 2400); return () => clearTimeout(t); }, []);

  return (
    <motion.div
      exit={{ opacity:0 }}
      transition={{ duration:0.6, ease:'easeInOut' }}
      style={{
        position:'fixed', inset:0,
        background:'linear-gradient(160deg, #071c12 0%, #0A3323 60%, #071c12 100%)',
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        zIndex:9999, gap:'28px',
      }}
    >
      {/* Animated lotus petals */}
      {[...Array(5)].map((_, i) => (
        <motion.div key={i}
          initial={{ opacity:0, y:-30, x:(i-2)*50 }}
          animate={{ opacity:[0, 0.7, 0], y:60, rotate:[0, 180, 360] }}
          transition={{ delay:i*0.18, duration:1.8, repeat:Infinity, repeatDelay:0.4 }}
          style={{ position:'absolute', top:'28%', fontSize:'1.4rem' }}
        >
          🌸
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.6 }}
        style={{ textAlign:'center' }}
      >
        <div style={{
          fontFamily:'Playfair Display, serif', fontSize:'3.5rem', fontWeight:700,
          fontStyle:'italic', color:'#F7F4D5', letterSpacing:'-0.01em', lineHeight:1,
        }}>
          Dishita
        </div>
        <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.75rem', letterSpacing:'0.28em', color:'#839958', textTransform:'uppercase', marginTop:'8px' }}>
          Portfolio
        </div>
      </motion.div>

      {/* Loading bar */}
      <div style={{ width:'180px', height:'2px', background:'rgba(247,244,213,0.08)', borderRadius:'1px', overflow:'hidden' }}>
        <motion.div
          initial={{ width:'0%' }} animate={{ width:'100%' }}
          transition={{ duration:2.0, ease:[0.25, 0.46, 0.45, 0.94] }}
          style={{ height:'100%', background:'linear-gradient(90deg, #D3968C, #839958)', borderRadius:'1px' }}
        />
      </div>

      <motion.p initial={{ opacity:0 }} animate={{ opacity:[0, 0.6, 0] }} transition={{ duration:1.8, repeat:1 }}
        style={{ color:'rgba(247,244,213,0.3)', fontSize:'0.78rem', letterSpacing:'0.12em' }}>
        crafting your experience...
      </motion.p>
    </motion.div>
  );
};

/* ── App ─────────────────────────────────────────────────────── */
function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.6 }}>
          <Navbar />
          <main>
            <Hero />
            <TechMarquee />
            <About />
            <Certificates />
            <Education />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
          <ScrollTop />
        </motion.div>
      )}
    </>
  );
}

export default App;
