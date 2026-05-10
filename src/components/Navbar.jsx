import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    const sections = ['about', 'services', 'process', 'portfolio', 'reviews', 'contact'];
    const observers = sections.map(id => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.5 }
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
        <div style={{ width: '35px', height: '35px', background: 'var(--accent-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: '#000', fontSize: '1.2rem' }}>P</div>
        <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-1px' }}>PathAI</span>
      </div>

      <div className="nav-links">
        <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={activeSection === 'about' ? 'active' : ''}>About</a>
        <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className={activeSection === 'services' ? 'active' : ''}>Services</a>
        <a href="#process" onClick={(e) => handleNavClick(e, 'process')} className={activeSection === 'process' ? 'active' : ''}>Process</a>
        <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className={activeSection === 'portfolio' ? 'active' : ''}>Work</a>
        <a href="#reviews" onClick={(e) => handleNavClick(e, 'reviews')} className={activeSection === 'reviews' ? 'active' : ''}>Reviews</a>
        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem', marginLeft: '10px' }}>Start a Project</a>
      </div>
    </nav>
  );
};

export default Navbar;
