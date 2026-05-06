import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Terminal, Shield } from 'lucide-react';

const projects = [
  {
    title: 'RemitAI',
    description: 'A sophisticated AI-driven platform for comparing and optimizing global remittance rates in real-time.',
    link: 'https://remitaiapp.com',
    tags: ['AI', 'FinTech', 'Data Analytics']
  },
  {
    title: 'Lone Star Contractors',
    description: 'A concept-to-deployment overhaul for specialized service providers, featuring AI lead-capture and sub-second load times.',
    link: '#',
    tags: ['ServiceTech', 'Lead Gen', 'Edge SEO']
  },
  {
    title: 'AudiologyLink',
    description: 'A specialized digital ecosystem connecting hearing care professionals with advanced patient management tools.',
    link: 'https://audiology-link.vercel.app',
    tags: ['HealthTech', 'React', 'Connectivity']
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" style={{ background: '#080808' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '10px' }}>Proven <span className="text-gradient">Innovations</span></h2>
        <p style={{ color: '#666' }}>A track record of engineering complex, mission-critical systems.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className="glass"
            style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{ fontSize: '0.7rem', padding: '4px 10px', border: '1px solid #333', borderRadius: '50px', color: '#888' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>{project.title}</h3>
              <p style={{ color: '#888', lineHeight: '1.6', marginBottom: '30px' }}>{project.description}</p>
            </div>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noreferrer" 
              style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00f3ff', textDecoration: 'none', fontWeight: '600' }}
            >
              Explore Project <ExternalLink size={18} />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
