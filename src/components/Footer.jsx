import { Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      {/* CTA Strip */}
      <div className="footer-cta-strip">
        <p style={{ fontSize: '0.78rem', fontWeight: '700', color: '#fff', textTransform: 'uppercase', letterSpacing: '2.5px', margin: '0 auto 16px' }}>
          Ready to build?
        </p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '28px', maxWidth: '600px', margin: '0 auto 28px', lineHeight: '1.2' }}>
          Let's ship your next <span style={{ color: 'var(--text-muted)' }}>big idea</span>
        </h2>
        <Link to="/collab/brief" className="btn-primary" style={{ display: 'inline-flex' }}>
          Start Your Project
        </Link>
      </div>

      {/* Bottom links */}
      <div style={{ padding: '60px 5% 40px', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '36px' }}>
          <img src="/favicon.svg" alt="Michael Adewale" style={{ width: '28px', height: '28px', borderRadius: '7px', border: '1px solid rgba(0,243,255,0.15)' }} />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.04em' }}>
            Michael Adewale
          </span>
        </div>

        <div className="footer-links" style={{ marginBottom: '20px' }}>
          <a href="#gigs">Gigs</a>
          <a href="#about">About</a>
          <a href="#portfolio">Work</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-links" style={{ marginBottom: '36px' }}>
          <Link to="/collab/brief" style={{ color: '#fff', fontWeight: '600', textDecoration: 'none' }}>
            Gig Brief Form
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>
          <Link to="/collab/guide" style={{ color: 'var(--text-dim)', fontWeight: '500', textDecoration: 'none' }}>
            Collab Guide
          </Link>
        </div>

        <div className="social-links">
          <a href="https://linkedin.com/in/michael-adewale-140806243" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={17} />
          </a>
          <a href="https://github.com/mchlshot-code" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={17} />
          </a>
        </div>

        <div style={{
          marginTop: '48px',
          paddingTop: '28px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          color: 'var(--text-dim)',
          fontSize: '0.78rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p>&copy; 2026 Michael Adewale. All Rights Reserved.</p>
          <p>Lagos, Nigeria · GMT+1 · Global Delivery</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
