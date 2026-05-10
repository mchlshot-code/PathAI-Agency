import { useEffect, useRef } from 'react';
import { Zap, Eye, Cpu, Globe } from 'lucide-react';

const values = [
  { icon: <Zap size={24} />, title: 'Speed', desc: 'From idea to production in days, not months. We build at the speed of thought.' },
  { icon: <Eye size={24} />, title: 'Transparency', desc: 'No black boxes. Real-time updates and clear communication at every stage.' },
  { icon: <Cpu size={24} />, title: 'AI-First', desc: 'We don’t just use AI; we architect entire systems around it for maximum efficiency.' },
  { icon: <Globe size={24} />, title: 'African Edge', desc: 'Nigerian-built with a global standard. Local grit meeting world-class engineering.' }
];

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="reveal" ref={sectionRef}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', maxWidth: '1200px', margin: '0 auto', alignItems: 'center' }}>
        <div>
          <h3 style={{ color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '20px' }}>
            Our Mission
          </h3>
          <h2 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '30px' }}>
            Not An Agency. <br /><span className="text-gradient">A Force Multiplier.</span>
          </h2>
          <div style={{ color: '#aaa', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '20px' }}>
              Born in the heart of Lagos, PathAI was founded on a simple realization: the traditional agency model is broken. It's too slow, too opaque, and too disconnected from the AI revolution.
            </p>
            <p style={{ marginBottom: '30px' }}>
              We started as a small team of engineers obsessed with automation. Today, we're a specialized lab that transforms businesses into AI-native powerhouses. We don't just build websites; we build the future of how companies operate.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '40px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: 'var(--accent-color)', border: '2px solid #333' }}>MA</div>
            <div>
              <p style={{ fontWeight: '700', fontSize: '1rem', color: '#fff' }}>Michael A.</p>
              <p style={{ fontSize: '0.8rem', color: '#666' }}>Founder & Lead Architect · Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {values.map((value, index) => (
            <div key={index} className="glass" style={{ padding: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ color: 'var(--accent-color)', marginBottom: '15px' }}>{value.icon}</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{value.title}</h4>
              <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.5' }}>{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive adjustments for mobile */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 992px) {
          #about > div {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
        }
      `}} />
    </section>
  );
};

export default About;
