import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Cpu, Layout } from 'lucide-react';

const services = [
  {
    title: 'Rapid AI Prototyping',
    desc: 'Transforming concepts into high-fidelity, interactive applications in record time using advanced AI workflows.',
    icon: <Zap color="#00f3ff" />
  },
  {
    title: 'Autonomous Systems',
    desc: 'Engineering self-operating lead generation and outreach engines that work while you sleep.',
    icon: <Cpu color="#00f3ff" />
  },
  {
    title: 'Precision Lead Targeting',
    desc: 'Leveraging deep data scraping to identify high-value market gaps and untapped business opportunities.',
    icon: <Target color="#00f3ff" />
  },
  {
    title: 'Premium Brand Identity',
    desc: 'Crafting visually stunning, high-converting digital presences that establish immediate market authority.',
    icon: <Layout color="#00f3ff" />
  }
];

const Services = () => {
  return (
    <section id="services" className="bg-gradient">
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
