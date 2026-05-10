import { useEffect, useRef, useState } from 'react';
import { Search, PenTool, Zap, ShieldCheck, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <Search size={28} />,
    title: 'Discovery',
    desc: 'Deep dive into your business logic, bottlenecks, and growth targets.'
  },
  {
    icon: <PenTool size={28} />,
    title: 'Architecture',
    desc: 'Designing the technical blueprint for your AI systems and UI.'
  },
  {
    icon: <Zap size={28} />,
    title: 'Rapid Build',
    desc: 'High-intensity development phase using our proprietary AI frameworks.'
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'QA & Refine',
    desc: 'Rigorous stress testing and fine-tuning for sub-second performance.'
  },
  {
    icon: <Rocket size={28} />,
    title: 'Deploy & Scale',
    desc: 'Live production launch and transition to autonomous growth mode.'
  }
];

const Process = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          entry.target.classList.add('active');
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="reveal" ref={sectionRef}>
      <div style={{ textAlign: 'center', marginBottom: '100px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '10px' }}>The <span className="text-gradient">Protocol</span></h2>
        <p style={{ color: '#666' }}>A systematic engineering approach to building high-frequency business engines.</p>
      </div>

      <div className="process-timeline">
        <div className="process-line-bg"></div>
        <div 
          className="process-line-progress" 
          style={{ width: inView ? '100%' : '0%' }}
        ></div>

        {steps.map((step, index) => (
          <div key={index} className="process-step">
            <div className="process-node" style={{ transitionDelay: `${index * 0.2}s` }}>
              {step.icon}
              <div className="process-number">{index + 1}</div>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>{step.title}</h3>
            <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.6' }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
