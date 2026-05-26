import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin } from 'lucide-react';

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
      const response = await fetch("https://formsubmit.co/ajax/adewalemchel@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `New Gig Inquiry: ${formData.name} - ${formData.service}`,
            _captcha: "false",
            _template: "table",
            ...formData
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', service: '', budget: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" style={{ padding: '120px 5%' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Get In Touch
          </span>
          <h2 style={{ fontSize: '3.5rem', marginTop: '10px', marginBottom: '20px', lineHeight: '1.1' }}>
            Let's Build <span className="text-gradient">Together</span>
          </h2>
          <p style={{ color: '#888', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            I help founders and modern businesses ship high-performance web products, interactive 3D experiences, and autonomous AI agents. Let's discuss your project.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass"
            style={{ padding: '60px 40px', border: '1px solid rgba(255,255,255,0.05)', maxWidth: '800px', margin: '0 auto', width: '100%' }}
          >
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ padding: '40px', background: 'rgba(0, 243, 255, 0.1)', borderRadius: '20px', border: '1px solid var(--accent-color)', textAlign: 'center' }}
              >
                <h3 style={{ color: 'var(--accent-color)', marginBottom: '10px' }}>Message Received</h3>
                <p>Your message has been securely transmitted. I will get back to you shortly.</p>
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
                
                <div className="contact-full-width">
                  <select 
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    style={{ background: '#111', border: '1px solid #333', padding: '15px', borderRadius: '10px', color: '#fff', width: '100%', outline: 'none' }}
                  >
                    <option value="" disabled>Select Gig / Service</option>
                    <option value="3d-web">Premium 3D Web Experience</option>
                    <option value="ai-agents">Autonomous AI Agents & Automations</option>
                    <option value="full-stack">Custom Full-Stack Application</option>
                    <option value="consulting">Other / Custom Collab</option>
                  </select>
                  <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '8px', paddingLeft: '5px' }}>
                    e.g. "Launch a 3D product page", "Deploy a lead-gen agent", "Ship an MVP dashboard"
                  </div>
                </div>

                <select 
                  className="contact-full-width"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  style={{ background: '#111', border: '1px solid #333', padding: '15px', borderRadius: '10px', color: '#fff', width: '100%', outline: 'none' }}
                >
                  <option value="" disabled>Project Budget (Optional)</option>
                  <option value="not-sure">Not sure yet / Flexible</option>
                  <option value="under-1k">Under $1,000</option>
                  <option value="1k-3k">$1,000 - $3,000</option>
                  <option value="3k-10k">$3,000 - $10,000</option>
                  <option value="10k+">$10,000+</option>
                </select>

                <textarea 
                  className="contact-full-width"
                  placeholder="Message (Tell me about your project)" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="btn-primary contact-full-width" 
                  style={{ border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
                {status === 'error' && (
                  <p style={{ gridColumn: 'span 2', color: '#ff4444', fontSize: '0.9rem', marginTop: '10px', textAlign: 'center' }}>
                    Submission failure. Please try again.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>

        {/* Secondary Contact Info */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '60px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666' }}>
            <Mail size={18} />
            <span style={{ fontSize: '0.9rem' }}>adewalemchel@gmail.com</span>
          </div>
          <a href="https://wa.me/2347012188849" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', textDecoration: 'none' }}>
            <MessageCircle size={18} />
            <span style={{ fontSize: '0.9rem' }}>+234 701 218 8849</span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666' }}>
            <MapPin size={18} />
            <span style={{ fontSize: '0.9rem' }}>Lagos, Nigeria</span>
          </div>
        </div>
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
