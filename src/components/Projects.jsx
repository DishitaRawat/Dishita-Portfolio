import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/* ─── Project Data ─────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 0,
    title: 'VoxVault',
    subtitle: 'Source-Grounded Media Intelligence System',
    description:
      'Interactive knowledge workspace for extracting and exploring insights from long-form media. AI-powered platform that converts long-form audio/video into a searchable knowledge base using transcription, semantic search, and RAG. Enables users to ask questions and retrieve context-aware answers from their content.',
    tags: ['Generative AI', 'RAG', 'Semantic Search', 'FastAPI', 'Vector Database'],
    github: 'https://github.com/DishitaRawat/VoxVault',
    demo: 'https://drive.google.com/file/d/1u7ByDMBWZubZfzRgE6wWKkZzFc3IaqJD/view?usp=sharing',
    color: '#105666',
    icon: '🎙️',
    year: '2026',
  },
  {
    id: 1,
    title: 'AdAura Studio',
    subtitle: 'UGC Content Generation Platform',
    description:
      'An AI-powered platform for generating high-converting user-generated ad content, leveraging modern AI models, automated workflows, and high-performance rendering. A system that creates engaging, platform-ready content and advertisements from user inputs.Built to streamline content creation using Generative AI, helping creators and brands generate marketing content faster.',
    tags: ['React', 'Python', 'FastAPI', 'Generative AI', 'RAG'],
    github: 'https://github.com/DishitaRawat/AdAura_UGC_Ad_Generator',
    demo: 'https://vimeo.com/1180756553',
    color: '#839958',
    icon: '✨',
    year: '2026',
  },

  {
    id: 2,
    title: 'MLCrafter V2',
    subtitle: 'Automated ML Workspace',
    description:
      'An end-to-end automated machine learning platform allowing users to clean datasets, train multiple models, compare metrics, and deploy models seamlessly.',
    tags: ['Python', 'Data Science', 'Machine Learning', 'Streamlit'],
    github: 'https://github.com/DishitaRawat/MLCrafter-Version2',
    demo: '#',
    color: '#D3968C',
    icon: '⚙️',
    year: '2025',
  },
];

/* Helper to parse Google Drive, Vimeo, YouTube, or direct video links */
const getVideoEmbedUrl = (project) => {
  const url = project.demo || project.video;
  if (!url || url === '#') return null;

  /* Vimeo video link */
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return { type: 'iframe', src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&autopause=0` };
  }

  /* Google Drive video preview link */
  const driveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return { type: 'iframe', src: `https://drive.google.com/file/d/${driveMatch[1]}/preview` };
  }

  /* YouTube video link */
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]+)/);
  if (ytMatch && ytMatch[1]) {
    return { type: 'iframe', src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&loop=1` };
  }

  /* Direct MP4/WebM video file */
  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    return { type: 'video', src: url };
  }

  return null;
};

const Projects = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const active = PROJECTS[activeIdx];
  const videoEmbed = getVideoEmbedUrl(active);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  return (
    <section
      id="projects"
      style={{
        padding: '120px 24px',
        background: 'linear-gradient(180deg, #0A3323 0%, #071c12 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1140px', margin: '0 auto' }} ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <p className="section-label" style={{ marginBottom: '10px' }}>
            ✦ FEATURED WORK
          </p>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem,4vw,3rem)',
              fontWeight: 700,
              color: '#F7F4D5',
            }}
          >
            Featured <span style={{ fontStyle: 'italic', color: '#D3968C' }}>Projects</span>
          </h2>
          <div className="divider" style={{ margin: '16px auto' }} />
          <p style={{ color: 'rgba(247,244,213,0.5)', fontSize: '0.9rem' }}>
            Explore my latest applications, AI platforms, and open-source projects.
          </p>
        </motion.div>

        {/* ── Active Project Showcase Card ── */}
        <div style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 1fr',
                gap: '56px',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '24px',
                padding: '44px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                backdropFilter: 'blur(12px)',
                position: 'relative',
              }}
              className="project-showcase-grid"
            >
              {/* Left — Info & Details */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                  <span
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      fontStyle: 'italic',
                      color: active.color,
                    }}
                  >
                    0{activeIdx + 1}
                  </span>
                  <span
                    style={{
                      background: `rgba(${active.color === '#D3968C' ? '211,150,140' : active.color === '#839958' ? '131,153,88' : '16,86,102'},0.2)`,
                      color: active.color,
                      border: `1px solid ${active.color}44`,
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      padding: '4px 14px',
                      borderRadius: '20px',
                      letterSpacing: '0.06em',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    {active.year}
                  </span>
                  <span style={{ color: 'rgba(247,244,213,0.45)', fontSize: '0.84rem', fontFamily: 'DM Sans, sans-serif' }}>
                    {active.subtitle}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(2.2rem, 3.8vw, 3rem)',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    marginBottom: '20px',
                    color: '#F7F4D5',
                  }}
                >
                  {active.title}
                </h3>

                <p
                  style={{
                    color: 'rgba(247,244,213,0.62)',
                    lineHeight: 1.85,
                    fontSize: '0.96rem',
                    marginBottom: '28px',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {active.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '36px' }}>
                  {active.tags.map((tag) => (
                    <span key={tag} className="skill-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <motion.a
                    href={active.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      background: active.color,
                      borderColor: active.color,
                      color: '#071c12',
                      fontWeight: 700,
                      padding: '12px 26px',
                      borderRadius: '30px',
                      fontSize: '0.82rem',
                    }}
                  >
                    <FaExternalLinkAlt style={{ fontSize: '0.75rem' }} /> Live Demo
                  </motion.a>
                  <motion.a
                    href={active.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      borderColor: `${active.color}66`,
                      color: active.color,
                      padding: '12px 26px',
                      borderRadius: '30px',
                      fontSize: '0.82rem',
                    }}
                  >
                    <FaGithub style={{ fontSize: '0.9rem' }} /> GitHub
                  </motion.a>
                </div>
              </div>

              {/* Right — Abstract Showcase Panel */}
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: '-12px',
                    borderRadius: '28px',
                    background: `radial-gradient(circle, ${active.color}1e 0%, transparent 70%)`,
                    zIndex: 0,
                    filter: 'blur(20px)',
                  }}
                />
                <motion.div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: `1px solid ${active.color}33`,
                    boxShadow: `0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)`,
                    aspectRatio: '4/3',
                    background: `linear-gradient(135deg, #071c12 0%, #0d3d2a 50%, #071c12 100%)`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justify: 'center',
                  }}
                >
                  {videoEmbed ? (
                    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2, background: '#000' }}>
                      {videoEmbed.type === 'video' ? (
                        <video
                          src={videoEmbed.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '20px',
                          }}
                        />
                      ) : (
                        <iframe
                          src={videoEmbed.src}
                          title={`${active.title} Demo Video`}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                          style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            borderRadius: '20px',
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    <>
                      {/* Grid overlay lines */}
                      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            style={{
                              position: 'absolute',
                              left: 0,
                              right: 0,
                              top: `${(i + 1) * 16.66}%`,
                              height: '1px',
                              background: 'rgba(247,244,213,0.03)',
                            }}
                          />
                        ))}
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            style={{
                              position: 'absolute',
                              top: 0,
                              bottom: 0,
                              left: `${(i + 1) * 12.5}%`,
                              width: '1px',
                              background: 'rgba(247,244,213,0.03)',
                            }}
                          />
                        ))}
                      </div>

                      {/* Icon & Title */}
                      <div style={{ zIndex: 2, textAlign: 'center', padding: '20px' }}>
                        <div style={{ fontSize: '4.2rem', marginBottom: '14px', filter: `drop-shadow(0 0 24px ${active.color}aa)` }}>
                          {active.icon}
                        </div>
                        <div
                          style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '1.6rem',
                            fontWeight: 700,
                            fontStyle: 'italic',
                            color: '#F7F4D5',
                            letterSpacing: '0.02em',
                          }}
                        >
                          {active.title}
                        </div>
                      </div>

                      {/* Gradient Glow Wash */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '40%',
                          background: `linear-gradient(to top, ${active.color}22, transparent)`,
                          pointerEvents: 'none',
                        }}
                      />
                    </>
                  )}
                </motion.div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls & Pagination Dots */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              marginTop: '28px',
              padding: '0 8px',
            }}
          >
            {/* Pagination Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  style={{ all: 'unset', cursor: 'pointer', padding: '4px' }}
                  aria-label={`Go to project ${i + 1}`}
                >
                  <motion.div
                    animate={{
                      width: i === activeIdx ? 28 : 8,
                      background: i === activeIdx ? active.color : 'rgba(247,244,213,0.2)',
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ height: '6px', borderRadius: '3px' }}
                  />
                </button>
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <motion.button
                onClick={handlePrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous project"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#F7F4D5',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                <FaChevronLeft />
              </motion.button>
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next project"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#F7F4D5',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                <FaChevronRight />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .project-showcase-grid { grid-template-columns: 1fr !important; gap: 36px !important; padding: 28px !important; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
