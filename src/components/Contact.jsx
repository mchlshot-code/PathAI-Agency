import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" style={{ textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass"
        style={{ padding: '80px 40px', maxWidth: '900px', margin: '0 auto' }}
      >
        <h2 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Ready to <span className="text-gradient">Scale?</span></h2>
        <p style={{ color: '#888', fontSize: '1.2rem', marginBottom: '40px' }}>
          Stop losing ground to your competitors. Let's build your AI-powered future today.
        </p>
        
        <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <input type="text" placeholder="Full Name" style={{ background: '#111', border: '1px solid #333', padding: '15px', borderRadius: '10px', color: '#fff' }} />
          <input type="email" placeholder="Work Email" style={{ background: '#111', border: '1px solid #333', padding: '15px', borderRadius: '10px', color: '#fff' }} />
          <textarea placeholder="Tell us about your vision" style={{ gridColumn: 'span 2', background: '#111', border: '1px solid #333', padding: '15px', borderRadius: '10px', color: '#fff', height: '150px' }}></textarea>
          <button type="button" className="btn-primary" style={{ gridColumn: 'span 2', border: 'none', cursor: 'pointer' }}>Initiate Protocol</button>
        </form>

        <p style={{ marginTop: '40px', color: '#444', fontSize: '0.9rem' }}>
          By clicking "Initiate Protocol," you agree to our growth-first strategy.
        </p>
      </motion.div>
    </section>
  );
};

export default Contact;
