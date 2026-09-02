import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaExternalLinkAlt, FaAward } from 'react-icons/fa';

/* Helper to extract image thumbnail from Google Drive links or direct image URLs */
const getImageUrl = (cert) => {
  if (cert.image) return cert.image;
  if (!cert.link) return null;

  /* Extract Google Drive File ID */
  const match = cert.link.match(/\/d\/([a-zA-Z0-9_-]+)/) || cert.link.match(/id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    /* Using lh3.googleusercontent.com which serves raw images for public drive files */
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return cert.link.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? cert.link : null;
};

const certificates = [
  {
    title: 'Matrix 3.0 24hr Hackathon - 2nd Runner Up',
    issuer: 'IITM',
    year: '2026',
    tags: ['Built - AdAura Studio', 'UGC content generation platform', 'AI - Innovation'],
    color: '#D3968C',
    link: 'https://drive.google.com/file/d/1X66pz9Y0v7OEWgg8tuftlutbcLYvHTzo/view?usp=sharing'
  },
  {
    title: 'NexHack — Top 40 Finalist',
    issuer: 'National Level Hackathon',
    year: '2025',
    tags: ['Built - SignVerse', 'Indian Sign Language', 'Machine Learning', 'Speech-To-Text'],
    color: '#839958',
    link: 'https://drive.google.com/file/d/1wGVmNA_d0YEkSUFiIK4uipYWnYFsCkzz/view?usp=sharing'
  },
  {
    title: 'BCA Program — Rank 1',
    issuer: 'College Level',
    year: '2025',
    tags: ['Academic Excellence', '9.77 CGPA', 'Annual Day'],
    color: '#105666',
    link: 'https://drive.google.com/file/d/1kCo5k0ptnjIze8A7oOQQtZPTXLlptgjA/view?usp=sharing'
  },
  {
    title: 'IPU University Subject Topper — OOPs Using Java',
    issuer: 'GGSIPU',
    year: '2025',
    tags: ['Java', 'OOPS', 'Academic Excellence'],
    color: '#D3968C',
    link: 'https://drive.google.com/file/d/1HqIDgzEcp_ebj4heGNj6zh25rHvxegEL/view?usp=sharing'
  },
  {
    title: 'Generative AI Training — 2nd Best Project',
    issuer: 'Moncerra',
    year: '2026',
    tags: ['Built - VoxVault', 'Generative AI', 'Source grounded RAG'],
    color: '#839958',
    link: 'https://drive.google.com/file/d/1u6jiJft5tQi0D8QmUpRMwd6tnMU0Pnby/view?usp=sharing'
  },
  {
    title: 'Data Science & Machine Learning Training',
    issuer: 'S.O. Infotech',
    year: '2025',
    tags: ['Built - MLCrafter V2', 'Machine Learning', 'Data Science', 'Automated ML'],
    color: '#105666',
    link: 'https://drive.google.com/file/d/1vtNtLB7wf8fs9vBIKcFFjG11i0f2lQRb/view?usp=sharing'
  },
];

const CertCard = ({ cert, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [imgError, setImgError] = useState(false);
  const imgUrl = getImageUrl(cert);

  return (
    <motion.div
      ref={ref}
      className="portfolio-card"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{
        padding: '24px',
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
          background: `linear-gradient(90deg, ${cert.color}, transparent)`,
        }}
      />

      <div>
        {/* Certificate Image Preview (from Google Drive link or direct URL) */}
        {imgUrl && !imgError ? (
          <a
            href={cert.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              height: '180px',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '18px',
              border: '1px solid rgba(255,255,255,0.08)',
              position: 'relative',
              background: 'rgba(0,0,0,0.3)',
            }}
          >
            <motion.img
              src={imgUrl}
              alt={cert.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                display: 'block',
              }}
            />
            {/* Subtle glass overlay on hover hint */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(7,28,18,0.7) 0%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />
          </a>
        ) : (
          /* Placeholder banner if no image link yet */
          <div
            style={{
              width: '100%',
              height: '130px',
              borderRadius: '8px',
              marginBottom: '18px',
              border: `1px dashed ${cert.color}33`,
              background: `radial-gradient(circle at 50% 50%, ${cert.color}10 0%, transparent 70%)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justify: 'center',
              gap: '8px',
            }}
          >
            <FaAward style={{ color: cert.color, fontSize: '1.8rem', opacity: 0.8 }} />
            <span style={{ fontSize: '0.68rem', fontFamily: 'DM Sans, sans-serif', color: 'rgba(247,244,213,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Certificate Badge
            </span>
          </div>
        )}

        {/* Title & Issuer Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', gap: '12px' }}>
          <div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.02rem', fontWeight: 600, marginBottom: '4px', color: '#F7F4D5', lineHeight: 1.35 }}>
              {cert.title}
            </h3>
            <p style={{ color: '#839958', fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif' }}>{cert.issuer}</p>
          </div>
          <span
            style={{
              background: `rgba(${cert.color === '#D3968C' ? '211,150,140' : cert.color === '#839958' ? '131,153,88' : '16,86,102'},0.18)`,
              color: cert.color,
              border: `1px solid ${cert.color}44`,
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {cert.year}
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {cert.tags.map((t) => (
            <span key={t} className="skill-tag">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* View Link */}
      <a
        href={cert.link || '#'}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: cert.color,
          fontSize: '0.8rem',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'gap 0.3s',
          marginTop: 'auto',
          paddingTop: '8px',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.gap = '10px')}
        onMouseLeave={(e) => (e.currentTarget.style.gap = '6px')}
      >
        <FaExternalLinkAlt style={{ fontSize: '0.68rem' }} /> View Certificate
      </a>
    </motion.div>
  );
};

const Certificates = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <section id="certificates" style={{ padding: '120px 24px', background: 'linear-gradient(180deg, #0d3d2a 0%, #0A3323 100%)', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="section-label" style={{ marginBottom: '10px' }}>
            ✦ ACHIEVEMENTS
          </p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#F7F4D5' }}>
            Certificates & <span style={{ fontStyle: 'italic', color: '#D3968C' }}>Awards</span>
          </h2>
          <div className="divider" style={{ margin: '16px auto' }} />
          <p style={{ color: 'rgba(247,244,213,0.5)', fontSize: '0.9rem' }}>Professional achievements &amp; certifications</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {certificates.map((c, i) => (
            <CertCard key={c.title} cert={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
