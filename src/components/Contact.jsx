import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://formsubmit.co/ajax/adewalemchel@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Gig Inquiry: ${formData.name} - ${formData.service}`,
          _captcha: 'false',
          _template: 'table',
          ...formData,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && (!data || data.success !== 'false')) {
        setStatus('success');
        setFormData({ name: '', email: '', service: '', budget: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const contactItems = [
    {
      icon: <Mail size={18} />,
      label: 'Email',
      value: 'adewalemchel@gmail.com',
      href: 'mailto:adewalemchel@gmail.com',
    },
    {
      icon: <MessageCircle size={18} />,
      label: 'WhatsApp',
      value: '+234 701 218 8849',
      href: 'https://wa.me/2347012188849',
    },
    {
      icon: <MapPin size={18} />,
      label: 'Location',
      value: 'Lagos, Nigeria · GMT+1',
      href: null,
    },
  ];

  return (
    <section id="contact" style={{ padding: '130px 5%' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <div className="section-label" style={{ display: 'inline-flex', margin: '0 auto 20px' }}>
            <span className="dot" />
            Get In Touch
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: '1.1', marginBottom: '18px' }}>
            Let's Build <span style={{ color: 'var(--text-muted)' }}>Together</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto', lineHeight: '1.7', fontWeight: '400' }}>
            Ready to ship your next big idea? Tell me about your project and I'll get back within 24 hours.
          </p>
        </div>

        {/* 2-col layout */}
        <div className="contact-layout">
          {/* Info panel */}
          <div className="contact-info-panel">
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', fontWeight: '700' }}>Contact Info</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '28px', fontWeight: '400' }}>
                Prefer to reach out directly? Use any of the channels below.
              </p>
            </div>

            {contactItems.map((item, i) => {
              const Tag = item.href ? 'a' : 'div';
              return (
                <Tag
                  key={i}
                  href={item.href || undefined}
                  target={item.href && item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href && item.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="glass contact-info-card"
                >
                  <div className="contact-info-icon">{item.icon}</div>
                  <div>
                    <div className="contact-info-title">{item.label}</div>
                    <div className="contact-info-value">{item.value}</div>
                  </div>
                </Tag>
              );
            })}

            {/* Book a gig CTA */}
            <Link
              to="/collab/brief"
              className="glass contact-info-card"
              style={{ marginTop: '8px', textDecoration: 'none' }}
            >
              <div className="contact-info-icon" style={{
                background: 'rgba(255,255,255,0.02)',
              }}>
                <ArrowRight size={18} />
              </div>
              <div>
                <div className="contact-info-title">Detailed Brief</div>
                <div className="contact-info-value">Fill out the Gig Brief Form →</div>
              </div>
            </Link>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass"
            style={{ padding: '48px 40px', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: '40px',
                  background: 'rgba(0, 243, 255, 0.06)',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 243, 255, 0.2)',
                  textAlign: 'center',
                }}
              >
                <h3 style={{ color: '#fff', marginBottom: '12px', fontSize: '1.4rem' }}>
                  Message Received ✓
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                  Your message has been securely transmitted. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '50px',
                    color: '#fff',
                    padding: '10px 24px',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: '600',
                    transition: 'all 0.3s',
                  }}
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Work Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <div className="contact-full-width">
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="" disabled>Select Gig / Service</option>
                    <option value="3d-web">Premium 3D Web Experience</option>
                    <option value="ai-agents">Autonomous AI Agents & Automations</option>
                    <option value="full-stack">Custom Full-Stack Application</option>
                    <option value="consulting">Other / Custom Collab</option>
                  </select>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '8px', paddingLeft: '4px' }}>
                    e.g. "Launch a 3D product page", "Deploy a lead-gen agent", "Ship an MVP dashboard"
                  </div>
                </div>

                <select
                  className="contact-full-width"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                >
                  <option value="" disabled>Project Budget (Optional)</option>
                  <option value="not-sure">Not sure yet / Flexible</option>
                  <option value="under-1k">Under $1,000</option>
                  <option value="1k-3k">$1,000 – $3,000</option>
                  <option value="3k-10k">$3,000 – $10,000</option>
                  <option value="10k+">$10,000+</option>
                </select>

                <textarea
                  className="contact-full-width"
                  placeholder="Tell me about your project..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary contact-full-width"
                  style={{
                    border: 'none',
                    justifyContent: 'center',
                    opacity: status === 'loading' ? 0.7 : 1,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                  {status !== 'loading' && <ArrowRight size={16} />}
                </button>

                {status === 'error' && (
                  <p style={{ gridColumn: 'span 2', color: '#ff6666', fontSize: '0.85rem', marginTop: '8px', textAlign: 'center' }}>
                    Submission failed. Please try again or email directly.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
