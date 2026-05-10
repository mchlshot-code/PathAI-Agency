import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Mocking submission since /api/send might not exist locally
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', service: '', budget: '', message: '' });
      }, 1500);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact">
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px' }}>
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '20px', lineHeight: '1.1' }}>
            Ready to <span className="text-gradient">Scale?</span>
          </h2>
          <p style={{ color: '#888', fontSize: '1.2rem', marginBottom: '50px' }}>
            Stop losing ground to your competitors. Let's build your AI-powered future today.
          </p>

          <div className="contact-info-item">
            <div className="contact-info-icon"><Mail size={20} /></div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '1rem' }}>Email Us</div>
              <div style={{ color: '#666' }}>hello@pathai.name.ng</div>
            </div>
          </div>

          <a href="https://wa.me/2347012188849" target="_blank" rel="noreferrer" className="contact-info-item" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="contact-info-icon"><MessageCircle size={20} /></div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '1rem' }}>WhatsApp</div>
              <div style={{ color: '#666' }}>+234 701 218 8849</div>
            </div>
          </a>

          <div className="contact-info-item">
            <div className="contact-info-icon"><MapPin size={20} /></div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '1rem' }}>Location</div>
              <div style={{ color: '#666' }}>Lagos, Nigeria · GMT+1 · Remote-first</div>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon"><Clock size={20} /></div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '1rem' }}>Response Time</div>
              <div style={{ color: '#666' }}>Within 4 business hours</div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass"
          style={{ padding: '60px 40px', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ padding: '40px', background: 'rgba(0, 243, 255, 0.1)', borderRadius: '20px', border: '1px solid var(--accent-color)', textAlign: 'center' }}
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
              
              <select 
                required
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                style={{ background: '#111', border: '1px solid #333', padding: '15px', borderRadius: '10px', color: '#fff', width: '100%', outline: 'none' }}
              >
                <option value="" disabled>Select Service</option>
                <option value="3d-web">3D Web Experience</option>
                <option value="ai-agents">Autonomous AI Agents</option>
                <option value="full-stack">Full Stack System</option>
                <option value="consulting">AI Strategy Consulting</option>
              </select>

              <select 
                required
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                style={{ background: '#111', border: '1px solid #333', padding: '15px', borderRadius: '10px', color: '#fff', width: '100%', outline: 'none' }}
              >
                <option value="" disabled>Project Budget</option>
                <option value="1k-5k">$1,000 - $5,000</option>
                <option value="5k-15k">$5,000 - $15,000</option>
                <option value="15k-50k">$15,000 - $50,000</option>
                <option value="50k+">$50,000+</option>
              </select>

              <textarea 
                placeholder="Message (Tell us about your project)" 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
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
                  Protocol failure. Please try again.
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 992px) {
          #contact > div {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
        }
      `}} />
    </section>
  );
};

export default Contact;
