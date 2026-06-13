import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    const sections = ['gigs', 'about', 'portfolio', 'contact'];
    const observers = sections.map(id => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach(obs => obs?.disconnect());
    };
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={(e) => handleNavClick(e, 'hero')}>
        <img src="/favicon.svg" alt="Michael Adewale" style={{ width: '35px', height: '35px', borderRadius: '8px' }} />
        <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-1.2px' }}>Michael Adewale</span>
      </div>

      <button className="mobile-menu-btn" onClick={() => setIsMobileOpen(!isMobileOpen)}>
        {isMobileOpen ? (
          <>Close <X size={16} /></>
        ) : (
          <>Menu <Menu size={16} /></>
        )}
      </button>

      <div className={`nav-links ${isMobileOpen ? 'mobile-open' : ''}`}>
        <a href="#gigs" onClick={(e) => handleNavClick(e, 'gigs')} className={activeSection === 'gigs' ? 'active' : ''}>Gigs</a>
        <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={activeSection === 'about' ? 'active' : ''}>About</a>
        <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className={activeSection === 'portfolio' ? 'active' : ''}>Work</a>
        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
        <Link to="/collab/brief" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem', marginLeft: '10px' }}>Book a Gig</Link>
      </div>
    </nav>
  );
};

export default Navbar;

