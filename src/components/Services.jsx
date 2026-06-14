import { motion } from 'framer-motion';
import { Layout, Code, Bot, Zap } from 'lucide-react';

const services = [
  {
    title: 'Digital Flagships',
    desc: 'Visually stunning, mobile-first landing pages engineered for premium brand positioning and maximum lead conversion.',
    icon: <Layout size={22} color="#fff" strokeWidth={1.5} />,
    large: true,
    highlight: 'Most popular',
  },
  {
    title: 'Custom Architectures',
    desc: 'Scalable, high-performance web applications built to solve complex business challenges with elegant code.',
    icon: <Code size={22} color="#fff" strokeWidth={1.5} />,
    large: false,
  },
  {
    title: 'Intelligent Systems',
    desc: 'Custom workflows and automation tools that scale your operations while maintaining a premium user experience.',
    icon: <Bot size={22} color="#fff" strokeWidth={1.5} />,
    large: false,
  },
  {
    title: 'Performance Audits',
    desc: 'Comprehensive speed, accessibility, and SEO audits with actionable engineering recommendations.',
    icon: <Zap size={22} color="#fff" strokeWidth={1.5} />,
    large: false,
  },
];

const Services = () => {
  return (
    <section id="services" className="bg-gradient" style={{ padding: '140px 5%' }}>
      <div style={{ textAlign: 'center', marginBottom: '70px' }}>
        <div className="section-label" style={{ display: 'inline-flex', margin: '0 auto 20px' }}>
          <span className="dot" />
          Expertise
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Engineering <span style={{ color: 'var(--text-muted)' }}>Excellence</span>
        </h2>
      </div>

      <div className="services-bento">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.6 }}
            className={`glass ${service.large ? 'service-card-large' : ''}`}
            style={{ padding: service.large ? '48px' : '36px', position: 'relative', overflow: 'hidden' }}
          >
            {service.highlight && (
              <span style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                fontSize: '0.65rem',
                fontWeight: '600',
                padding: '4px 10px',
                borderRadius: '4px',
                background: '#fff',
                color: '#000',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                {service.highlight}
              </span>
            )}
            <div className="service-icon-wrap">
              {service.icon}
            </div>
            <h3 style={{ fontSize: service.large ? '1.6rem' : '1.2rem', marginBottom: '14px', fontWeight: '700' }}>
              {service.title}
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.92rem' }}>
              {service.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
