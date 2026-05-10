
import { motion } from 'framer-motion';
import AgentNetworkCanvas from './AgentNetworkCanvas';

const Hero = () => {
  return (
    <section id="hero" className="bg-gradient hero-layout">
      <div className="hero-text">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: 'inline-block', padding: '6px 14px', background: 'rgba(0, 243, 255, 0.1)', border: '1px solid rgba(0, 243, 255, 0.2)', borderRadius: '50px', marginBottom: '25px' }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '2px' }}>
            📍 Lagos, Nigeria · GMT+1 · Remote-first
          </span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ fontSize: '5rem', lineHeight: '1.1', marginBottom: '20px' }}
        >
          Engineering the <span className="text-gradient">Future of AI</span> Web Presence
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: '1.2rem', color: '#888', marginBottom: '40px', maxWidth: '500px' }}
        >
          PathAI transforms businesses into digital powerhouses with rapid AI-driven development and autonomous systems.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#contact" className="btn-primary">Scale Your Vision</a>
        </motion.div>
      </div>

      <div className="hero-canvas-wrapper" style={{ cursor: 'grab' }}>
        <AgentNetworkCanvas />
      </div>
    </section>
  );
};

export default Hero;
