import { useEffect, useRef } from 'react';

const offerings = [
  {
    num: '01',
    title: '3D Web Experiences',
    subtitle: 'Immersive interfaces that stop the scroll',
    desc: 'Custom three.js / WebGL / R3F builds — interactive 3D product viewers, animated hero scenes, spatial UI. Your brand in three dimensions.',
    tags: ['Three.js', 'React Three Fiber', 'WebGL', 'GSAP'],
    cta: 'Get a 3D Site',
    color: 'rgba(0, 243, 255, 0.02)'
  },
  {
    num: '02',
    title: 'Autonomous AI Agents',
    subtitle: 'Your business runs while you sleep',
    desc: 'End-to-end AI agent pipelines — lead capture, qualification, follow-up, support, and reporting. Plug into your CRM, WhatsApp, email, and Slack.',
    tags: ['LLM', 'n8n', 'Make', 'Zapier', 'OpenAI', 'RAG'],
    cta: 'Deploy an Agent',
    color: 'rgba(112, 0, 255, 0.02)'
  },
  {
    num: '03',
    title: 'Full Stack Systems',
    subtitle: 'From idea to production in days',
    desc: 'Complete web applications built with React, Node.js, and Supabase. Auth, database, API, dashboard — the full thing, fast.',
    tags: ['React', 'Node.js', 'Supabase', 'TypeScript', 'REST'],
    cta: 'Build My App',
    color: 'rgba(255, 255, 255, 0.02)'
  }
];

const Offerings = () => {
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
    <section id="offerings" className="reveal" ref={sectionRef} style={{ background: '#050505', paddingTop: '60px' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '10px' }}>Pick Your <span className="text-gradient">Build</span></h2>
        <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>Choose a specialized engineering path to accelerate your business growth.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        {offerings.map((offering, index) => (
          <div 
            key={index} 
            className="glass offering-card" 
            style={{ padding: '50px 40px', background: offering.color, border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <span className="card-number">{offering.num}</span>
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{offering.title}</h3>
              <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: '600' }}>{offering.subtitle}</p>
            </div>
            
            <p style={{ color: '#888', lineHeight: '1.7', marginBottom: '30px', fontSize: '0.95rem' }}>
              {offering.desc}
            </p>

            <div style={{ marginBottom: '40px' }}>
              {offering.tags.map(tag => (
                <span key={tag} className="badge">{tag}</span>
              ))}
            </div>

            <a href="#contact" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
              {offering.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offerings;
