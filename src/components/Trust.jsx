import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { icon: <Zap size={22} />, label: 'Standard Delivery', value: '14', suffix: ' Days' },
  { icon: <TrendingUp size={22} />, label: 'Efficiency Gain', value: '40', suffix: '%+' },
  { icon: <Users size={22} />, label: 'Active Partners', value: '10', suffix: '+' },
  { icon: <Shield size={22} />, label: 'Uptime Protocol', value: '99.9', suffix: '%' },
];

const testimonials = [
  {
    name: 'Marcus Thorne',
    role: 'CEO',
    company: 'Vertex Logistics',
    quote: "PathAI didn't just build a website; they built a revenue-generating engine. Our lead volume tripled in the first 48 hours. Absolute game-changers.",
    avatar: 'M',
    stars: 5,
  },
  {
    name: 'Sarah Chen',
    role: 'Product Lead',
    company: 'Neuralab',
    quote: "The speed of execution is unlike anything I've seen. We went from a complex architecture blueprint to a live, functional system in 10 days.",
    avatar: 'S',
    stars: 5,
  },
  {
    name: 'David Okafor',
    role: 'Founder',
    company: 'Quantum FinTech',
    quote: "The AI integration is seamless. Our customer support overhead dropped by 70% thanks to the autonomous agents PathAI deployed for us.",
    avatar: 'D',
    stars: 5,
  },
];

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const num = parseFloat(target);
          const isDecimal = target.includes('.');
          const duration = 1200;
          const steps = 40;
          const increment = num / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              setCount(num);
              clearInterval(timer);
            } else {
              setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="stat-value">
      {count}{suffix}
    </span>
  );
}

const Trust = () => {
  return (
    <section id="reviews" className="bg-gradient" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Brand Row */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="section-label" style={{ display: 'inline-flex', margin: '0 auto 40px' }}>
            <span className="dot" />
            Trusted by the Bold
          </div>
          <div className="trust-brand-row">
            {[
              { shape: 'square', name: 'QUANTUM' },
              { shape: 'circle', name: 'VERTEX' },
              { shape: 'triangle', name: 'NEURALAB' },
              { shape: 'diamond', name: 'ORBIT' },
            ].map(({ shape, name }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: shape === 'square' ? '#fff' : shape === 'triangle' ? 'var(--accent-color)' : 'none',
                  border: shape === 'circle' || shape === 'diamond' ? '2px solid #fff' : 'none',
                  borderRadius: shape === 'circle' ? '50%' : shape === 'square' ? '4px' : '3px',
                  transform: shape === 'diamond' ? 'rotate(45deg)' : 'none',
                  clipPath: shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: '1.3rem', fontWeight: '800', fontFamily: 'var(--font-heading)', letterSpacing: '2px' }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ marginBottom: '100px' }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass stat-card"
            >
              <div style={{ color: '#fff', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <CountUp target={stat.value} suffix={stat.suffix} />
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
            Client <span style={{ color: 'var(--text-muted)' }}>Intelligence</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass testimonial-card"
            >
              <div className="testimonial-stars" style={{ color: '#fff', marginBottom: '16px' }}>
                {[...Array(t.stars)].map((_, idx) => (
                  <span key={idx} className="testimonial-star">★</span>
                ))}
              </div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.92rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
