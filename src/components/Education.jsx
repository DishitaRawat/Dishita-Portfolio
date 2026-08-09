import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const education = [
  { degree: "Master's in Computer Science", school: 'University of Technology', period: '2021 – 2023', gpa: '4.0 GPA', color: '#D3968C' },
  { degree: "Bachelor's in Software Engineering", school: 'Institute of Technology', period: '2017 – 2021', gpa: '3.8 GPA', color: '#839958' },
  { degree: 'Web Development Bootcamp', school: 'Coding Academy', period: '2016', gpa: 'Excellence', color: '#105666' },
];

/* SVG botanical leaves decoration */
const LeafDecoration = () => (
  <svg viewBox="0 0 300 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '300px', opacity: 0.75 }}>
    {/* Main large monstera leaf */}
    <path d="M150 480 C150 480 120 380 90 300 C60 220 30 160 50 80 C80 100 110 160 130 240 C150 320 155 400 150 480Z"
      fill="#0d3d2a" stroke="#839958" strokeWidth="1.5" opacity="0.9"/>
    <path d="M150 480 C150 480 180 380 210 300 C240 220 270 160 250 80 C220 100 190 160 170 240 C150 320 145 400 150 480Z"
      fill="#0d4a30" stroke="#839958" strokeWidth="1.5" opacity="0.8"/>

    {/* Monstera split details on left leaf */}
    <path d="M100 280 C80 265 65 250 70 230" stroke="#839958" strokeWidth="1" opacity="0.5" fill="none"/>
    <path d="M108 320 C85 308 70 295 72 270" stroke="#839958" strokeWidth="1" opacity="0.4" fill="none"/>
    <path d="M95 240 C78 228 66 212 72 190" stroke="#839958" strokeWidth="1" opacity="0.45" fill="none"/>

    {/* Veins left leaf */}
    <path d="M125 370 C100 340 85 310 90 270" stroke="#a4b878" strokeWidth="0.8" opacity="0.4" fill="none"/>
    <path d="M115 300 C92 282 80 258 88 225" stroke="#a4b878" strokeWidth="0.8" opacity="0.35" fill="none"/>

    {/* Veins right leaf */}
    <path d="M175 370 C200 340 215 310 210 270" stroke="#a4b878" strokeWidth="0.8" opacity="0.4" fill="none"/>

    {/* Fern frond top left */}
    <path d="M80 120 C55 100 35 70 45 40 C60 55 75 80 82 110Z" fill="#0d3d2a" stroke="#839958" strokeWidth="1" opacity="0.7"/>
    <path d="M80 120 C65 95 58 70 68 45" stroke="#a4b878" strokeWidth="0.7" opacity="0.4" fill="none"/>

    {/* Fern frond top right */}
    <path d="M220 120 C245 100 265 70 255 40 C240 55 225 80 218 110Z" fill="#0d4a30" stroke="#839958" strokeWidth="1" opacity="0.65"/>

    {/* Small lotus bud top */}
    <ellipse cx="150" cy="55" rx="16" ry="26" fill="#D3968C" opacity="0.45" transform="rotate(-12 150 55)"/>
    <ellipse cx="150" cy="55" rx="16" ry="26" fill="#D3968C" opacity="0.45" transform="rotate(12 150 55)"/>
    <ellipse cx="150" cy="50" rx="11" ry="20" fill="#e8b0a6" opacity="0.55"/>
    <circle cx="150" cy="40" r="8" fill="#F7F4D5" opacity="0.4"/>

    {/* Droplets */}
    {[{x:95,y:200},{x:115,y:160},{x:185,y:195},{x:170,y:155}].map((p,i) => (
      <ellipse key={i} cx={p.x} cy={p.y} rx="2.5" ry="4" fill="#105666" opacity="0.35" transform={`rotate(${i%2?15:-15} ${p.x} ${p.y})`}/>
    ))}

    {/* Ground scatter */}
    <ellipse cx="150" cy="490" rx="90" ry="8" fill="rgba(13,61,42,0.5)" />
  </svg>
);

const EduItem = ({ edu, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: index * 0.15, duration: 0.5 }} style={{ display: 'flex', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: edu.color, boxShadow: `0 0 10px ${edu.color}88`, marginTop: '5px', flexShrink: 0 }} />
        {index < education.length - 1 && <div style={{ width: '1.5px', flex: 1, background: `linear-gradient(to bottom, ${edu.color}55, transparent)`, marginTop: '8px', minHeight: '32px' }} />}
      </div>
      <motion.div className="portfolio-card" whileHover={{ x: 6 }} style={{ flex: 1, padding: '22px 26px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.02rem', fontWeight: 600, color: '#F7F4D5', marginBottom: '5px' }}>{edu.degree}</h3>
            <p style={{ color: edu.color, fontSize: '0.8rem', fontWeight: 600 }}>{edu.school}</p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ color: 'rgba(247,244,213,0.4)', fontSize: '0.76rem' }}>{edu.period}</div>
            <div style={{ color: edu.color, fontSize: '0.76rem', marginTop: '4px', fontWeight: 600 }}>✦ {edu.gpa}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Education = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <section id="education" style={{ padding: '120px 24px', background: 'linear-gradient(180deg, #0A3323 0%, #071c12 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* SVG leaf decoration on left */}
      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
        className="sway" style={{ position: 'absolute', left: '-30px', bottom: '0', width: '300px', zIndex: 0 }}>
        <LeafDecoration />
      </motion.div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }} ref={ref}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }} className="edu-grid">
          <div /> {/* spacer */}
          <div>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-label" style={{ marginBottom: '10px' }}>✦ ACADEMIC JOURNEY</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 700, color: '#F7F4D5', marginBottom: '12px' }}>
              My <span style={{ fontStyle: 'italic', color: '#D3968C' }}>Education</span>
            </motion.h2>
            <div className="divider" style={{ marginBottom: '36px' }} />
            {education.map((e, i) => <EduItem key={e.degree} edu={e} index={i} />)}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .edu-grid { grid-template-columns: 1fr !important; }
          .edu-grid > div:first-child { display: none; }
        }
      `}</style>
    </section>
  );
};

export default Education;
