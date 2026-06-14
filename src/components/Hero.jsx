import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="hero-layout">
      <div className="hero-text">
        {/* Availability badge */}
        <motion.div
          className="hero-availability"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span style={{ 
            width: '6px', 
            height: '6px', 
            background: '#fff', 
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(255,255,255,0.8)' 
          }} />
          Available for new projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{ fontSize: 'clamp(2.8rem, 6vw, 4.2rem)', lineHeight: '1.1', marginBottom: '22px' }}
        >
          Building <span style={{ color: 'var(--text-muted)' }}>Premium</span><br />
          Web Experiences<br />
          &amp; Digital Products
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{
            fontSize: '1.15rem',
            color: 'var(--text-muted)',
            marginBottom: '44px',
            maxWidth: '600px',
            margin: '0 auto 44px',
            lineHeight: '1.7',
            fontWeight: '400',
          }}
        >
          I help modern businesses and founders engineer high-performance, aesthetically exceptional web applications and intelligent digital systems.
        </motion.p>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#gigs" className="btn-primary">
            Explore Services <ArrowRight size={16} />
          </a>
          <a href="#portfolio" className="btn-ghost">
            View Case Studies
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
