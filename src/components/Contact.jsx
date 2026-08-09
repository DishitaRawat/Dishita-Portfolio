import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, amount:0.1 });
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name:'', email:'', message:'' });
  };

  const inputStyle = {
    width:'100%', padding:'13px 18px',
    background:'rgba(10,51,35,0.5)',
    border:'1.5px solid rgba(131,153,88,0.2)',
    borderRadius:'12px', color:'#F7F4D5',
    fontSize:'0.9rem', outline:'none',
    transition:'border-color 0.3s, box-shadow 0.3s',
    fontFamily:'DM Sans, sans-serif',
  };
  const focusIn = e => { e.target.style.borderColor='#D3968C'; e.target.style.boxShadow='0 0 16px rgba(211,150,140,0.18)'; };
  const focusOut = e => { e.target.style.borderColor='rgba(131,153,88,0.2)'; e.target.style.boxShadow='none'; };

  return (
    <section id="contact" style={{ padding:'120px 24px', background:'linear-gradient(180deg, #0A3323 0%, #071c12 100%)', position:'relative', overflow:'hidden' }}>
      {/* Soft bg glow */}
      <div style={{ position:'absolute', right:'-150px', top:'30%', width:'500px', height:'500px', background:'radial-gradient(circle, rgba(16,86,102,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />

      <div style={{ maxWidth:'1000px', margin:'0 auto', position:'relative', zIndex:1 }} ref={ref}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} style={{ textAlign:'center', marginBottom:'64px' }}>
          <p className="section-label" style={{ marginBottom:'10px' }}>✦ LET'S CONNECT</p>
          <h2 style={{ fontFamily:'Playfair Display, serif', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'#F7F4D5' }}>
            Get In{' '}
            <span style={{ fontStyle:'italic', color:'#D3968C' }}>Touch</span>
          </h2>
          <div className="divider" style={{ margin:'16px auto' }} />
          <p style={{ color:'rgba(247,244,213,0.5)', maxWidth:'480px', margin:'0 auto', fontSize:'0.92rem' }}>
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:'48px' }} className="contact-grid">
          {/* Info cards */}
          <motion.div initial={{ opacity:0, x:-24 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ delay:0.2 }} style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
            {[
              { Icon:FaEnvelope, label:'Email', value:'hello@dishita.dev', color:'#D3968C' },
              { Icon:FaMapMarkerAlt, label:'Location', value:'India 🇮🇳', color:'#839958' },
              { Icon:FaPhone, label:'Phone', value:'+91 98765 43210', color:'#105666' },
            ].map(({ Icon, label, value, color }) => (
              <motion.div key={label} className="portfolio-card" whileHover={{ x:5, borderColor:color }} style={{ display:'flex', gap:'16px', alignItems:'center', padding:'18px 20px' }}>
                <div style={{ width:'44px', height:'44px', borderRadius:'12px', background:`rgba(${color==='#D3968C'?'211,150,140':color==='#839958'?'131,153,88':'16,86,102'},0.15)`, border:`1px solid ${color}33`, display:'flex', alignItems:'center', justifyContent:'center', color, fontSize:'1rem', flexShrink:0 }}>
                  <Icon />
                </div>
                <div>
                  <div style={{ color:'rgba(247,244,213,0.4)', fontSize:'0.72rem', marginBottom:'2px', letterSpacing:'0.08em' }}>{label}</div>
                  <div style={{ color:'#F7F4D5', fontSize:'0.88rem', fontWeight:500 }}>{value}</div>
                </div>
              </motion.div>
            ))}

            {/* Available badge */}
            <div style={{ display:'flex', alignItems:'center', gap:'12px', padding:'16px 20px', background:'rgba(131,153,88,0.1)', border:'1px solid rgba(131,153,88,0.25)', borderRadius:'14px' }}>
              <motion.div animate={{ scale:[1,1.4,1] }} transition={{ duration:1.6, repeat:Infinity }} style={{ width:'9px', height:'9px', borderRadius:'50%', background:'#839958', flexShrink:0 }} />
              <span style={{ color:'rgba(247,244,213,0.65)', fontSize:'0.84rem' }}>Available for freelance &amp; full-time work</span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form onSubmit={handleSubmit} initial={{ opacity:0, x:24 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ delay:0.3 }} className="portfolio-card" style={{ padding:'34px', display:'flex', flexDirection:'column', gap:'18px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
              <div>
                <label style={{ display:'block', color:'rgba(247,244,213,0.45)', fontSize:'0.75rem', marginBottom:'8px', letterSpacing:'0.08em' }}>NAME</label>
                <input type="text" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={inputStyle} onFocus={focusIn} onBlur={focusOut} required />
              </div>
              <div>
                <label style={{ display:'block', color:'rgba(247,244,213,0.45)', fontSize:'0.75rem', marginBottom:'8px', letterSpacing:'0.08em' }}>EMAIL</label>
                <input type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={inputStyle} onFocus={focusIn} onBlur={focusOut} required />
              </div>
            </div>
            <div>
              <label style={{ display:'block', color:'rgba(247,244,213,0.45)', fontSize:'0.75rem', marginBottom:'8px', letterSpacing:'0.08em' }}>MESSAGE</label>
              <textarea placeholder="Tell me about your project..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={5} style={{ ...inputStyle, resize:'vertical', minHeight:'120px' }} onFocus={focusIn} onBlur={focusOut} required />
            </div>
            <motion.button type="submit" className="btn-primary" whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }} style={{ alignSelf:'flex-start' }}>
              {sent ? '✦ Message Sent!' : <><FaPaperPlane style={{ fontSize:'0.8rem' }} /> Send Message</>}
            </motion.button>
          </motion.form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
