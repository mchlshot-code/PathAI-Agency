import { motion } from 'framer-motion';
import { ExternalLink, Globe, GraduationCap, Headphones } from 'lucide-react';

const projects = [
  {
    title: 'RemitAI',
    role: 'Full-Stack Developer',
    description: 'A sophisticated real-time comparison assistant for cross-border payments, optimizing global remittance rates.',
    before: 'Manual rate comparison across portals.',
    after: 'Real-time engine at <200ms latency.',
    link: 'https://remitaiapp.com',
    tags: ['FinTech', 'Data Analytics', 'Next.js'],
    Icon: Globe,
  },
  {
    title: 'NAA Portal',
    role: 'Lead Architect',
    description: 'National professional portal featuring secure membership management and automated CPD credits tracking.',
    before: 'Offline registration and manual audits.',
    after: 'Centralized DB with automated tracking.',
    link: 'https://naaudiology.org.ng',
    tags: ['Python', 'PostgreSQL', 'Auth Systems'],
    Icon: GraduationCap,
  },
  {
    title: 'AudiologyLink',
    role: 'Frontend Engineer',
    description: 'Connected health care dashboard connecting professionals with patients, featuring custom test analysis.',
    before: 'Fragmented patient records.',
    after: 'Unified digital workspace.',
    link: 'https://audiology-link.vercel.app',
    tags: ['React', 'Digital Health', 'Charts'],
    Icon: Headphones,
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" style={{ background: '#0a0a0c', padding: '130px 5%', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <div className="section-label" style={{ display: 'inline-flex', margin: '0 auto 20px' }}>
          <span className="dot" />
          Selected Work
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '16px' }}>
          Proven <span style={{ color: 'var(--text-muted)' }}>Case Studies</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.7', fontWeight: '400' }}>
          A selection of web products and platforms I have engineered, showcasing end-to-end full-stack development and system architecture.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {projects.map((project, index) => {
          const { Icon } = project;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass project-card"
              style={{
                padding: '36px 32px',
                background: 'rgba(255,255,255,0.01)',
              }}
            >
              {/* Background icon watermark */}
              <div className="project-card-icon">
                <Icon size={120} strokeWidth={0.5} />
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                {project.tags.map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>

              {/* Title */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.7rem', fontWeight: '700', marginBottom: '4px', letterSpacing: '-0.5px' }}>
                  {project.title}
                </h3>
                <p style={{
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  marginBottom: '18px',
                  letterSpacing: '1px',
                }}>
                  {project.role}
                </p>

                <p style={{ color: 'var(--text-muted)', lineHeight: '1.65', marginBottom: '24px', fontSize: '0.9rem' }}>
                  {project.description}
                </p>

                {/* Before / After */}
                <div className="result-bar">
                  <div className="result-item before">
                    <div className="result-label" style={{ color: '#a1a1aa' }}>Challenge</div>
                    {project.before}
                  </div>
                  <div className="result-item after">
                    <div className="result-label" style={{ color: '#fff' }}>Solution</div>
                    {project.after}
                  </div>
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="explore-link"
                >
                  Explore Project <ExternalLink size={15} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Portfolio;
