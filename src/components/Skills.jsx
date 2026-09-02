import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ══════════════════════════════════════════════════════════════
   EXACT RESUME TECHNICAL SKILLS BREAKDOWN
══════════════════════════════════════════════════════════════ */
const SKILL_CATEGORIES = [
  {
    category: 'Programming Languages',
    color: '#D3968C',
    skills: [
      { name: 'Python', color: '#FFD43B', svg: `<svg viewBox="0 0 128 128"><path fill="#3776AB" d="M64 2c-4 0-8 0-12 1C34 5 32 9 32 16v9h25v3H30C23 28 17 32 15 40c-2 9-2 15 0 25 2 7 6 12 13 12h8V67c0-8 7-15 15-15h25c7 0 12-6 12-12V16c0-7-6-12-12-13C72 2 68 2 64 2zM50 10a5 5 0 110 10A5 5 0 0150 10z"/><path fill="#FFD43B" d="M92 28v11c0 9-7 16-15 16H52c-7 0-12 6-12 12v24c0 7 6 11 12 12 8 2 15 3 25 0 6-2 12-5 12-12v-9H64v-3h37c7 0 10-5 12-12 3-8 2-15 0-25-2-7-5-12-12-12H92zM78 88a5 5 0 110 10A5 5 0 0178 88z"/></svg>` },
      { name: 'Java', color: '#F89820', svg: `<svg viewBox="0 0 128 128"><path fill="#0074BD" d="M48 98s-5 3 3 4c10 1 15 1 26-1l7 3C60 114 29 103 48 98zm-3-14s-5 4 3 5c11 1 19 1 33-2l6 3C59 100 26 93 45 84z"/><path fill="#EA2D2E" d="M70 61c6 7-2 13-2 13s15-8 8-18c-7-9-12-14 16-30C92 26 49 37 70 61z"/><path fill="#0074BD" d="M102 108s4 3-4 5c-14 4-59 6-71 0-4-2 4-5 6-5h4c-5-3-32 7-14 10 50 8 91-4 79-10zM50 70s-23 5-8 7c6 1 19 1 30-1 9-1 19-2 19-2s-3 1-6 3C62 83 18 81 31 75c11-5 19-5 19-5zm41 23c23-12 13-24 5-22-2 0-3 1-3 1s1-1 2-2c15-5 26 16-5 24l1-1z"/><path fill="#EA2D2E" d="M76 2S89 15 64 35C44 51 60 60 64 71 52 60 44 51 50 42 58 28 82 22 76 2z"/><path fill="#0074BD" d="M52 126c22 1 57-1 58-11l-19 7c-19 4-43 3-57 1l18 3z"/></svg>` },
      { name: 'C', color: '#659AD3', svg: `<svg viewBox="0 0 128 128"><path fill="#659AD3" d="M115 31L67 3c-2-1-5-1-6 0L13 31c-2 1-3 4-3 5v56c0 1 0 2 1 3l107-61c-1-1-2-2-3-3z"/><path fill="#03599C" d="M11 95c0 1 1 2 2 2l48 28c2 1 4 1 6 0l48-28c2-1 3-4 3-5V36c0-1-1-2-1-3L11 95z"/><path fill="#fff" d="M85 76c-4 8-12 13-21 13-14 0-25-11-25-25s11-25 25-25c9 0 17 5 21 12l13-8C91 32 78 24 64 24c-22 0-39 18-39 40s17 40 39 40c15 0 27-8 34-20L85 76z"/></svg>` },
      { name: 'SQL', color: '#00758F', svg: `<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="#00758F"/><text x="64" y="78" text-anchor="middle" font-family="Arial Black" font-size="42" font-weight="900" fill="#fff">SQL</text></svg>` },
    ],
  },
  {
    category: 'Web Technologies',
    color: '#839958',
    skills: [
      { name: 'HTML5', color: '#E44D26', svg: `<svg viewBox="0 0 128 128"><path fill="#E44D26" d="M19 114L9 2h110l-10 112-45 12z"/><path fill="#F16529" d="M64 117l36-10 9-96H64z"/><path fill="#EBEBEB" d="M64 52H46l-1-14h19V25H29l3 38h32zm0 36l-15-4-1-11H34l2 22 28 8z"/><path fill="#fff" d="M64 52v14h17l-2 18-15 4v14l28-8 3-42zm0-27v14h33l1-7 1-7z"/></svg>` },
      { name: 'CSS3', color: '#1572B6', svg: `<svg viewBox="0 0 128 128"><path fill="#1572B6" d="M19 114L9 1h110l-10 113-45 12z"/><path fill="#33A9DC" d="M64 117l37-10 9-96H64z"/><path fill="#fff" d="M64 51H46l-1-14h19V24H30l3 38h31zm0 35l-15-4-1-11H34l2 21 28 8z"/><path fill="#EBEBEB" d="M64 51v13h17l-2 19-15 4v14l28-8 4-42zm0-27v13h33l1-13z"/></svg>` },
      { name: 'React', color: '#61DAFB', svg: `<svg viewBox="0 0 128 128"><g fill="none" stroke="#61DAFB" stroke-width="5"><ellipse cx="64" cy="64" rx="60" ry="23"/><ellipse cx="64" cy="64" rx="60" ry="23" transform="rotate(60 64 64)"/><ellipse cx="64" cy="64" rx="60" ry="23" transform="rotate(120 64 64)"/></g><circle cx="64" cy="64" r="11" fill="#61DAFB"/></svg>` },
    ],
  },
  {
    category: 'Backend & APIs',
    color: '#105666',
    skills: [
      { name: 'FastAPI', color: '#009688', svg: `<svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="62" fill="#009688"/><path fill="#fff" d="M72 14L47 71h21L57 114l55-72H88z"/></svg>` },
      { name: 'REST APIs', color: '#D3968C', svg: `<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="#0A3323"/><text x="64" y="78" text-anchor="middle" font-family="Arial Black" font-size="34" font-weight="900" fill="#D3968C">REST</text></svg>` },
    ],
  },
  {
    category: 'Databases',
    color: '#D3968C',
    skills: [
      { name: 'MySQL', color: '#4479A1', svg: `<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="#00618A"/><text x="64" y="78" text-anchor="middle" font-family="Arial Black" font-size="32" font-weight="900" fill="#F29111">MySQL</text></svg>` },
      { name: 'MongoDB', color: '#47A248', svg: `<svg viewBox="0 0 128 128"><path fill="#47A248" d="M88 13C80 5 71 1 64 0c0 0-2 16 0 26 2 6 5 11 10 15l-1 1s0 55 0 65c0 10 6 19 6 21h3c0-2 6-11 6-21 0-14 0-64 0-64l-1-1c5-5 10-11 11-18C101 14 88 13 88 13z"/><path fill="#599636" d="M64 0C57 1 47 5 40 13c0 0-11 1-10 11 2 7 6 13 11 18l-1 1s0 50 0 64c0 10 7 19 7 21h2c0-2 6-11 6-21 0-10 0-65 0-65l-1-1c4-4 8-9 9-15 3-10 1-26 1-26z"/></svg>` },
      { name: 'ChromaDB', color: '#FF6B6B', svg: `<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="22" fill="#c0392b"/><text x="64" y="82" text-anchor="middle" font-family="Arial Black" font-size="72" font-weight="900" fill="#fff">C</text></svg>` },
    ],
  },
  {
    category: 'AI / ML',
    color: '#839958',
    skills: [
      { name: 'Machine Learning', color: '#839958', svg: `<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="#1C3F5E"/><text x="64" y="78" text-anchor="middle" font-family="Arial Black" font-size="44" font-weight="900" fill="#839958">ML</text></svg>` },
      { name: 'Generative AI', color: '#D3968C', svg: `<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="#0A3323"/><text x="64" y="78" text-anchor="middle" font-family="Arial Black" font-size="40" font-weight="900" fill="#D3968C">GenAI</text></svg>` },
      { name: 'RAG', color: '#61DAFB', svg: `<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="#105666"/><text x="64" y="78" text-anchor="middle" font-family="Arial Black" font-size="40" font-weight="900" fill="#61DAFB">RAG</text></svg>` },
    ],
  },
  {
    category: 'Cloud & Tools',
    color: '#105666',
    skills: [
      { name: 'Vercel', color: '#EEEEEE', svg: `<svg viewBox="0 0 128 128"><path fill="#fff" d="M64 9L128 119H0z"/></svg>` },
      { name: 'Git', color: '#F05032', svg: `<svg viewBox="0 0 128 128"><path fill="#F05032" d="M125 58L70 3a9 9 0 00-12 0L47 14l14 14c4-1 7 0 10 3 3 3 4 6 3 10l14 14c3-1 7-1 10 3 4 4 4 10 0 14a10 10 0 01-14 0 10 10 0 01-2-11L68 48v34a10 10 0 013 2c4 4 4 10 0 14-4 4-10 4-14 0-4-4-4-10 0-14a10 10 0 013-2V48a10 10 0 01-3-2c-3-3-4-7-2-11L41 20 3 58a8 8 0 000 11l55 55c3 3 8 3 12 0l55-55a8 8 0 000-11z"/></svg>` },
      { name: 'GitHub', color: '#D0D0D0', svg: `<svg viewBox="0 0 128 128"><path fill="#fff" d="M64 5C30 5 3 32 3 65c0 27 17 49 41 57 3 1 4-1 4-3v-11c-17 4-20-7-20-7-3-7-7-9-7-9-5-4 0-4 0-4 6 0 9 6 9 6 5 9 14 7 18 5 0-4 2-7 4-8-13-2-28-7-28-30 0-7 2-12 6-16-1-2-3-8 1-16 0 0 5-2 17 6 5-1 10-2 15-2s10 1 15 2c12-8 17-6 17-6 4 8 2 14 1 16 4 4 6 9 6 16 0 23-14 28-28 30 2 2 4 5 4 11v17c0 2 1 4 4 3C108 114 125 92 125 65 125 32 98 5 64 5z"/></svg>` },
    ],
  },
];

const CategoryCard = ({ group, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <motion.div
      ref={ref}
      className="portfolio-card"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{
        padding: '24px 28px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${group.color}, transparent)`,
        }}
      />

      <div>
        {/* Category Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: group.color, boxShadow: `0 0 10px ${group.color}` }} />
          <h3
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#F7F4D5',
              margin: 0,
            }}
          >
            {group.category}
          </h3>
        </div>

        {/* Skill Badges List */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {group.skills.map((skill) => (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 16px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${skill.color}22`,
                boxShadow: `0 2px 10px rgba(0,0,0,0.2)`,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${skill.color}66`;
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow = `0 0 16px ${skill.color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${skill.color}22`;
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.boxShadow = `0 2px 10px rgba(0,0,0,0.2)`;
              }}
            >
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                }}
                dangerouslySetInnerHTML={{ __html: skill.svg }}
              />
              <span
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#F7F4D5',
                }}
              >
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="skills"
      style={{
        padding: '120px 24px',
        background: 'linear-gradient(180deg, #071c12 0%, #0A3323 50%, #071c12 100%)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <p className="section-label" style={{ marginBottom: '10px' }}>
            ✦ TECHNICAL PROFICIENCY
          </p>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem,4vw,3rem)',
              fontWeight: 700,
              color: '#F7F4D5',
            }}
          >
            Technical <span style={{ fontStyle: 'italic', color: '#D3968C' }}>Skills</span>
          </h2>
          <div className="divider" style={{ margin: '16px auto' }} />
          <p style={{ color: 'rgba(247,244,213,0.5)', fontSize: '0.9rem' }}>
            Comprehensive technical stack categorized by domain & specialization.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {SKILL_CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.category} group={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
