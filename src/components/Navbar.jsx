import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Certificates', id: 'certificates' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => document.getElementById(l.id));
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPos) {
          setActive(navLinks[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '10px 0' : '18px 0',
        background: scrolled ? 'rgba(10,51,35,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(131,153,88,0.2)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          onClick={() => scrollTo('home')}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700,
            fontStyle: 'italic',
            fontSize: '1.4rem',
            color: '#F7F4D5',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{
            display: 'inline-block',
            width: '32px', height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #D3968C, #b57a72)',
            flexShrink: 0,
          }} />
          Dishita
        </motion.div>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }} className="nav-desktop">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`nav-link ${active === link.id ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
            >
              {link.label}
            </button>
          ))}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
            style={{ padding: '9px 22px', fontSize: '0.8rem' }}
            onClick={() => scrollTo('contact')}
          >
            Hire Me
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: '#D3968C', fontSize: '1.3rem', cursor: 'pointer', display: 'none' }}
          className="nav-mobile-btn"
          aria-label="Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(10,51,35,0.98)', borderTop: '1px solid rgba(131,153,88,0.2)', padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}
          >
            {navLinks.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className={`nav-link ${active === link.id ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '1rem' }}>
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
