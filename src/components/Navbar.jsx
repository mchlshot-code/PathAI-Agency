import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
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
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo" onClick={(e) => handleNavClick(e, 'hero')}>
        <img src="/favicon.svg" alt="Michael Adewale" className="nav-logo-img" />
        <span className="nav-logo-text">Michael Adewale</span>
      </div>

      <button className="mobile-menu-btn" onClick={() => setIsMobileOpen(!isMobileOpen)}>
        {isMobileOpen ? (<><span>Close</span> <X size={15} /></>) : (<><span>Menu</span> <Menu size={15} /></>)}
      </button>

      <div className={`nav-links ${isMobileOpen ? 'mobile-open' : ''}`}>
        {[
          { id: 'gigs', label: 'Gigs' },
          { id: 'about', label: 'About' },
          { id: 'portfolio', label: 'Work' },
          { id: 'contact', label: 'Contact' },
        ].map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleNavClick(e, id)}
            className={activeSection === id ? 'active' : ''}
          >
            {label}
          </a>
        ))}
        <Link
          to="/collab/brief"
          className="btn-primary"
          style={{ padding: '10px 22px', fontSize: '0.82rem' }}
        >
          Book a Gig
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
