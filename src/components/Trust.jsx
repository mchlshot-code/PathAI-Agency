import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp, Users } from 'lucide-react';

const stats = [
  { icon: <Zap size={24} />, label: 'Avg. Deployment', value: '24 Hours' },
  { icon: <TrendingUp size={24} />, label: 'Client ROI', value: '400%+' },
  { icon: <Users size={24} />, label: 'Active Partners', value: '12+' },
  { icon: <Shield size={24} />, label: 'Security Score', value: '99.9%' },
];

const Trust = () => {
  return (
    <section className="bg-gradient" style={{ borderTop: '1px solid #111', borderBottom: '1px solid #111' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--accent-color)', marginBottom: '10px' }}>
            Trusted by the Bold
          </h3>
          <div className="trust-brand-row">
            <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>QUANTUM.</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>VERTEX</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>NEURALAB</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>ORBIT</span>
          </div>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass"
              style={{ padding: '30px', textAlign: 'center' }}
            >
              <div style={{ color: 'var(--accent-color)', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <h4 style={{ fontSize: '2rem', marginBottom: '5px' }}>{stat.value}</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: '80px', textAlign: 'center', maxWidth: '800px', margin: '80px auto 0' }}
        >
          <div style={{ fontSize: '1.5rem', fontStyle: 'italic', color: '#ccc', marginBottom: '20px' }}>
            "PathAI didn't just build a website; they built a revenue-generating engine. Our lead volume tripled in the first 48 hours."
          </div>
          <div style={{ fontWeight: '600', color: '#fff' }}>— Marcus Thorne, CEO of Vertex Logistics</div>
        </motion.div>
      </div>
    </section>
  );
};

export default Trust;
