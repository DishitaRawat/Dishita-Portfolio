import React, { useState, useEffect } from 'react';
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

/* ── App ─────────────────────────────────────────────────────── */
function App() {
  return (
    <>
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
    </>
  );
}

export default App;
