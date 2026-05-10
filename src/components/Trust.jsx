
import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp, Users } from 'lucide-react';

const stats = [
  { icon: <Zap size={24} />, label: 'Avg. Deployment', value: '24 Hours' },
  { icon: <TrendingUp size={24} />, label: 'Client ROI', value: '400%+' },
  { icon: <Users size={24} />, label: 'Active Partners', value: '12+' },
  { icon: <Shield size={24} />, label: 'Security Score', value: '99.9%' },
];

const testimonials = [
  {
    name: 'Marcus Thorne',
    role: 'CEO',
    company: 'Vertex Logistics',
    quote: "PathAI didn't just build a website; they built a revenue-generating engine. Our lead volume tripled in the first 48 hours. Absolute game-changers.",
    avatar: 'M',
    stars: 5
  },
  {
    name: 'Sarah Chen',
    role: 'Product Lead',
    company: 'Neuralab',
    quote: "The speed of execution is unlike anything I've seen. We went from a complex architecture blueprint to a live, functional system in 10 days.",
    avatar: 'S',
    stars: 5
  },
  {
    name: 'David Okafor',
    role: 'Founder',
    company: 'Quantum FinTech',
    quote: "The AI integration is seamless. Our customer support overhead dropped by 70% thanks to the autonomous agents PathAI deployed for us.",
    avatar: 'D',
    stars: 5
  }
];

const Trust = () => {
  return (
    <section id="reviews" className="bg-gradient" style={{ borderTop: '1px solid #111', borderBottom: '1px solid #111' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--accent-color)', marginBottom: '20px' }}>
            Trusted by the Bold
          </h3>
          <div className="trust-brand-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '25px', height: '25px', background: '#fff', borderRadius: '4px' }}></div>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', opacity: 1 }}>QUANTUM</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '25px', height: '25px', border: '2px solid #fff', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', opacity: 1 }}>VERTEX</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '25px', height: '25px', background: 'var(--accent-color)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', opacity: 1 }}>NEURALAB</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '25px', height: '25px', border: '2px solid var(--accent-color)', borderRadius: '4px', transform: 'rotate(45deg)' }}></div>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', opacity: 1 }}>ORBIT</span>
            </div>
          </div>
        </div>

        <div className="stats-grid" style={{ marginBottom: '100px' }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass"
              style={{ padding: '30px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div style={{ color: 'var(--accent-color)', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <h4 style={{ fontSize: '2.5rem', marginBottom: '5px' }}>{stat.value}</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem' }}>Client <span className="text-gradient">Intelligence</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {testimonials.map((t, i) => (
            <div key={i} className="glass testimonial-card" style={{ padding: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                {[...Array(t.stars)].map((_, index) => (
                  <span key={index} style={{ color: 'var(--accent-color)', fontSize: '1.2rem' }}>★</span>
                ))}
              </div>
              <p style={{ fontStyle: 'italic', color: '#ccc', lineHeight: '1.7', marginBottom: '30px', fontSize: '1rem' }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#1a1a1a', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: 'var(--accent-color)' }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.95rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
