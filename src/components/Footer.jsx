import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => (
  <footer style={{ background:'#040f08', borderTop:'1px solid rgba(131,153,88,0.15)', padding:'48px 24px 28px' }}>
    <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'24px', marginBottom:'32px' }}>
        <div>
          <div style={{ fontFamily:'Playfair Display, serif', fontWeight:700, fontStyle:'italic', fontSize:'1.5rem', color:'#F7F4D5', marginBottom:'6px' }}>Dishita</div>
          <p style={{ color:'rgba(247,244,213,0.4)', fontSize:'0.82rem' }}>Full Stack Developer &amp; Designer</p>
          <div className="divider" style={{ marginTop:'12px', marginBottom:0 }} />
        </div>

        <div style={{ display:'flex', gap:'14px' }}>
          {[
            { Icon: FaGithub, label: 'GitHub', url: 'https://github.com/DishitaRawat', isExternal: true },
            { Icon: FaLinkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/dishita-rawat-235675313/', isExternal: true },
            { Icon: FaEnvelope, label: 'Email', url: 'mailto:rawatdishita06@gmail.com', isExternal: false }
          ].map(({ Icon, label, url, isExternal }, i) => (
            <motion.a key={i} href={url} target={isExternal ? '_blank' : '_self'} rel={isExternal ? 'noopener noreferrer' : undefined} aria-label={label} whileHover={{ scale:1.15, y:-2 }}
              style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1.5px solid rgba(211,150,140,0.25)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(247,244,213,0.4)', fontSize:'1rem', transition:'all 0.3s', textDecoration:'none' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='#D3968C'; e.currentTarget.style.color='#D3968C'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(211,150,140,0.25)'; e.currentTarget.style.color='rgba(247,244,213,0.4)'; }}
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </div>

      <div style={{ borderTop:'1px solid rgba(255,255,255,0.04)', paddingTop:'20px', textAlign:'center', color:'rgba(247,244,213,0.25)', fontSize:'0.8rem', display:'flex', alignItems:'center', justifyContent:'center', gap:'4px' }}>
        Crafted with <FaHeart style={{ color:'#D3968C', margin:'0 4px' }} /> by Dishita Rawat © {new Date().getFullYear()}
      </div>
    </div>
  </footer>
);

export default Footer;
