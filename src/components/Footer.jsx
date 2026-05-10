
import { Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ padding: '80px 5% 40px', background: '#050505', borderTop: '1px solid #111', textAlign: 'center' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
          <img src="/favicon.ico" alt="PathAI" style={{ width: '30px', height: '30px', borderRadius: '6px' }} />
          <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-1px' }}>PathAI</span>
        </div>

        <div className="footer-links" style={{ marginBottom: '40px' }}>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#portfolio">Work</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="social-links">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={20} /></a>
          <a href="https://github.com/mchlshot-code" target="_blank" rel="noreferrer"><Github size={20} /></a>
        </div>

        <div style={{ marginTop: '60px', borderTop: '1px solid #111', paddingTop: '40px', color: '#444', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <p>&copy; 2026 PathAI Systems. Built with Autonomous Precision.</p>
          <p>Lagos, Nigeria · GMT+1 · Global Delivery</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
