
import { motion } from 'framer-motion';
import { Layout, Code, Bot } from 'lucide-react';

const services = [
  {
    title: 'Hyper-Speed Landing Pages',
    desc: 'Visually stunning, mobile-first landing pages engineered for sub-second performance and maximum lead conversion.',
    icon: <Layout color="#00f3ff" />
  },
  {
    title: 'Custom Web Applications',
    desc: 'Scalable, high-performance web applications built with React and Vite to solve complex business challenges.',
    icon: <Code color="#00f3ff" />
  },
  {
    title: 'Autonomous AI Agents',
    desc: 'Custom AI agents that automate your lead generation, customer support, and outreach workflows 24/7.',
    icon: <Bot color="#00f3ff" />
  }
];

const Services = () => {
  return (
    <section id="services" className="bg-gradient" style={{ padding: '160px 5%' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h2 style={{ fontSize: '3rem' }}>The <span className="text-gradient">PathAI Edge</span></h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{ padding: '40px' }}
            className="glass"
          >
            <div style={{ marginBottom: '20px', background: 'rgba(0, 243, 255, 0.1)', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>
              {service.icon}
            </div>
            <h3 style={{ marginBottom: '15px' }}>{service.title}</h3>
            <p style={{ color: '#888', lineHeight: '1.6' }}>{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
