import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'RemitAI',
    role: 'Founder & Full‑Stack Developer',
    description: 'A sophisticated real-time comparison assistant for cross-border payments, using AI to scan and optimize global remittance rates.',
    before: 'Manual rate comparison across disjointed finance portals.',
    after: 'Real-time optimization engine operating at <200ms latency.',
    link: 'https://remitaiapp.com',
    tags: ['AI', 'FinTech', 'Data Analytics', 'Next.js'],
    watermark: '💸',
    bg: 'rgba(0, 243, 255, 0.04)'
  },
  {
    title: 'Nigerian Academy of Audiology Portal',
    role: 'Lead Full‑Stack Developer',
    description: 'National professional portal featuring secure membership management, dynamic Django form builders, and automated CPD credits tracking.',
    before: 'Offline member registration and manual CPD credits auditing.',
    after: 'Centralized database with automated credits tracking & 99.9% uptime.',
    link: 'https://naaudiology.org.ng',
    tags: ['Django', 'Python', 'PostgreSQL', 'Auth Systems'],
    watermark: '🎓',
    bg: 'rgba(112, 0, 255, 0.04)'
  },
  {
    title: 'AudiologyLink',
    role: 'Founder & Developer',
    description: 'Connected health care dashboard connecting audiology professionals with patients, featuring custom test analysis modules.',
    before: 'Fragmented patient records and manual exam coordination.',
    after: 'Unified digital workspace resulting in +45% patient retention.',
    link: 'https://audiology-link.vercel.app',
    tags: ['HealthTech', 'React', 'Digital Health', 'Charts'],
    watermark: '👂',
    bg: 'rgba(255, 255, 255, 0.02)'
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" style={{ background: '#080808', padding: '120px 5%' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '2px' }}>
          My Work
        </span>
        <h2 style={{ fontSize: '3.2rem', marginTop: '10px', marginBottom: '15px' }}>
          Proven <span className="text-gradient">Innovations</span>
        </h2>
        <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.6' }}>
          A selection of web products and platforms I have engineered, showcasing end-to-end full-stack development and system architecture.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8 }}
            className="glass"
            style={{ 
              padding: '40px 30px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              background: project.bg,
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <div className="project-watermark">{project.watermark}</div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '25px' }}>
                {project.tags.map(tag => (
                  <span key={tag} className="badge" style={{ margin: 0 }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '5px', letterSpacing: '-0.5px' }}>{project.title}</h3>
              <p style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '1px' }}>{project.role}</p>
              
              <p style={{ color: '#888', lineHeight: '1.6', marginBottom: '25px', fontSize: '0.92rem' }}>{project.description}</p>
              
              <div style={{ marginBottom: '30px', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', color: '#666', lineHeight: '1.4' }}>
                  <span style={{ color: '#ff4444' }}>-</span>
                  <span><strong>Before:</strong> {project.before}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', color: '#ccc', lineHeight: '1.4' }}>
                  <span style={{ color: 'var(--accent-color)' }}>+</span>
                  <span><strong>After:</strong> {project.after}</span>
                </div>
              </div>
            </div>

            <a 
              href={project.link} 
              target="_blank" 
              rel="noreferrer" 
              className="explore-link"
              style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', transition: 'all 0.3s' }}
            >
              Explore Project <ExternalLink size={16} color="var(--accent-color)" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
