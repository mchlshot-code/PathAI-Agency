
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'RemitAI',
    role: 'Architecture + Full-stack build',
    description: 'A sophisticated AI-driven platform for comparing and optimizing global remittance rates in real-time.',
    before: 'Manual comparison of remittance providers across multiple portals.',
    after: 'Real-time optimization <200ms, sub-second execution.',
    link: 'https://remitaiapp.com',
    tags: ['AI', 'FinTech', 'Data Analytics'],
    watermark: '💸',
    bg: 'rgba(0, 243, 255, 0.05)'
  },
  {
    title: 'AudiologyLink',
    role: 'Agent design + Full-stack integration',
    description: 'A specialized digital ecosystem connecting hearing care professionals with advanced patient management tools.',
    before: 'Fragmented patient management and manual coordination.',
    after: 'Seamless digital ecosystem, +45% patient retention increase.',
    link: 'https://audiology-link.vercel.app',
    tags: ['HealthTech', 'React', 'Connectivity'],
    watermark: '👂',
    bg: 'rgba(255, 255, 255, 0.03)'
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" style={{ background: '#080808', padding: '160px 5%' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '10px' }}>Proven <span className="text-gradient">Innovations</span></h2>
        <p style={{ color: '#666' }}>A track record of engineering complex, mission-critical systems.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
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
              <h3 style={{ fontSize: '2rem', marginBottom: '5px' }}>{project.title}</h3>
              <p style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '1px' }}>{project.role}</p>
              
              <p style={{ color: '#888', lineHeight: '1.6', marginBottom: '25px', fontSize: '0.95rem' }}>{project.description}</p>
              
              <div style={{ marginBottom: '30px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', color: '#666' }}>
                  <span style={{ color: '#ff4444' }}>-</span>
                  <span><strong>Before:</strong> {project.before}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', color: '#ccc' }}>
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
              Explore Project <ExternalLink size={18} color="var(--accent-color)" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
