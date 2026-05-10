
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'RemitAI',
    description: 'A sophisticated AI-driven platform for comparing and optimizing global remittance rates in real-time.',
    link: 'https://remitaiapp.com',
    tags: ['AI', 'FinTech', 'Data Analytics'],
    metric: 'Optimization Speed: < 200ms',
    watermark: '💸',
    bg: 'rgba(0, 243, 255, 0.05)'
  },
  {
    title: 'Lone Star Contractors',
    description: 'A concept-to-deployment overhaul for specialized service providers, featuring AI lead-capture and sub-second load times.',
    link: '#',
    tags: ['ServiceTech', 'Lead Gen', 'Edge SEO'],
    metric: 'Lead volume ×3 within 48hrs',
    watermark: '🏗️',
    bg: 'rgba(112, 0, 255, 0.05)'
  },
  {
    title: 'AudiologyLink',
    description: 'A specialized digital ecosystem connecting hearing care professionals with advanced patient management tools.',
    link: 'https://audiology-link.vercel.app',
    tags: ['HealthTech', 'React', 'Connectivity'],
    metric: 'Patient Retention: +45%',
    watermark: '👂',
    bg: 'rgba(255, 255, 255, 0.03)'
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" style={{ background: '#080808' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '10px' }}>Proven <span className="text-gradient">Innovations</span></h2>
        <p style={{ color: '#666' }}>A track record of engineering complex, mission-critical systems.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className="glass"
            style={{ 
              padding: '40px', 
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
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '25px' }}>
                {project.tags.map(tag => (
                  <span key={tag} className="badge" style={{ margin: 0 }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>{project.title}</h3>
              <p style={{ color: '#888', lineHeight: '1.6', marginBottom: '20px', fontSize: '0.95rem' }}>{project.description}</p>
              
              <div style={{ padding: '12px 20px', background: 'rgba(0, 243, 255, 0.1)', borderRadius: '12px', border: '1px solid rgba(0, 243, 255, 0.2)', marginBottom: '30px', display: 'inline-block' }}>
                <span style={{ color: 'var(--accent-color)', fontWeight: '700', fontSize: '0.9rem' }}>{project.metric}</span>
              </div>
            </div>

            <a 
              href={project.link} 
              target="_blank" 
              rel="noreferrer" 
              style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}
            >
              Explore Project <ExternalLink size={18} color="var(--accent-color)" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
