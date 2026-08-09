import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const certificates = [
  { title:'Advanced React Development', issuer:'Meta', year:'2024', tags:['React','Hooks','Context API'], color:'#D3968C' },
  { title:'Full Stack JavaScript', issuer:'IBM', year:'2023', tags:['Node.js','Express','MongoDB'], color:'#839958' },
  { title:'UI/UX Design', issuer:'Google', year:'2024', tags:['Figma','User Research','Prototyping'], color:'#105666' },
  { title:'AWS Cloud Practitioner', issuer:'Amazon', year:'2023', tags:['Cloud','AWS','DevOps'], color:'#D3968C' },
  { title:'Python for Data Science', issuer:'Coursera', year:'2022', tags:['Python','Pandas','ML'], color:'#839958' },
  { title:'Agile Project Management', issuer:'PMI', year:'2024', tags:['Agile','Scrum','Kanban'], color:'#105666' },
];

const CertCard = ({ cert, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, amount:0.25 });
  return (
    <motion.div ref={ref} className="portfolio-card" initial={{ opacity:0, y:28 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:index * 0.1, duration:0.5 }} style={{ padding:'28px', position:'relative', overflow:'hidden' }}>
      {/* Top accent bar */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:`linear-gradient(90deg, ${cert.color}, transparent)` }} />

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'14px' }}>
        <div>
          <h3 style={{ fontFamily:'Playfair Display, serif', fontSize:'1.02rem', fontWeight:600, marginBottom:'4px', color:'#F7F4D5' }}>{cert.title}</h3>
          <p style={{ color:'#839958', fontSize:'0.8rem', fontFamily:'DM Sans, sans-serif' }}>{cert.issuer}</p>
        </div>
        <span style={{ background:`rgba(${cert.color === '#D3968C' ? '211,150,140' : cert.color === '#839958' ? '131,153,88' : '16,86,102'},0.18)`, color:cert.color, border:`1px solid ${cert.color}44`, padding:'4px 12px', borderRadius:'20px', fontSize:'0.75rem', fontWeight:700, flexShrink:0 }}>{cert.year}</span>
      </div>

      <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'20px' }}>
        {cert.tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
      </div>

      <a href="#" style={{ display:'flex', alignItems:'center', gap:'6px', color:cert.color, fontSize:'0.8rem', fontWeight:600, textDecoration:'none', transition:'gap 0.3s' }}
        onMouseEnter={e => e.currentTarget.style.gap='10px'} onMouseLeave={e => e.currentTarget.style.gap='6px'}>
        <FaExternalLinkAlt style={{ fontSize:'0.68rem' }} /> View Certificate
      </a>
    </motion.div>
  );
};

const Certificates = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, amount:0.1 });
  return (
    <section id="certificates" style={{ padding:'120px 24px', background:'linear-gradient(180deg, #0d3d2a 0%, #0A3323 100%)', position:'relative' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }} ref={ref}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} style={{ textAlign:'center', marginBottom:'64px' }}>
          <p className="section-label" style={{ marginBottom:'10px' }}>✦ ACHIEVEMENTS</p>
          <h2 style={{ fontFamily:'Playfair Display, serif', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'#F7F4D5' }}>
            Certificates &{' '}
            <span style={{ fontStyle:'italic', color:'#D3968C' }}>Awards</span>
          </h2>
          <div className="divider" style={{ margin:'16px auto' }} />
          <p style={{ color:'rgba(247,244,213,0.5)', fontSize:'0.9rem' }}>Professional achievements &amp; certifications</p>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'22px' }}>
          {certificates.map((c, i) => <CertCard key={c.title} cert={c} index={i} />)}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
