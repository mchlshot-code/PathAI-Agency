import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    vision: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', vision: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

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
        
        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: '40px', background: 'rgba(0, 243, 255, 0.1)', borderRadius: '20px', border: '1px solid var(--accent-color)' }}
          >
            <h3 style={{ color: 'var(--accent-color)', marginBottom: '10px' }}>Protocol Initiated</h3>
            <p>Your message has been securely transmitted. Our team will contact you shortly.</p>
            <button 
              onClick={() => setStatus('idle')}
              style={{ marginTop: '20px', background: 'none', border: 'none', color: 'var(--accent-color)', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form-grid">
            <input 
              type="text" 
              placeholder="Full Name" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="Work Email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <textarea 
              placeholder="Tell us about your vision" 
              required
              value={formData.vision}
              onChange={(e) => setFormData({...formData, vision: e.target.value})}
            ></textarea>
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="btn-primary btn-full" 
              style={{ border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}
            >
              {status === 'loading' ? 'Initiating...' : 'Initiate Protocol'}
            </button>
            {status === 'error' && (
              <p style={{ gridColumn: 'span 2', color: '#ff4444', fontSize: '0.9rem', marginTop: '10px', textAlign: 'center' }}>
                Protocol failure. Please try again or contact us directly.
              </p>
            )}
          </form>
        )}

        <p style={{ marginTop: '40px', color: '#444', fontSize: '0.9rem' }}>
          By clicking "Initiate Protocol," you agree to our growth-first strategy.
        </p>
      </motion.div>
    </section>
  );
};

export default Contact;
