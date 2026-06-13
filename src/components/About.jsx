import { useEffect, useRef } from 'react';
import { Award, Code, Brain, Cpu, BookOpen } from 'lucide-react';
import profileImg from '../assets/michael-adewale-profile.jpg';

const experience = [
  {
    date: 'May 2026 – Present',
    title: 'Founder & Lead Architect',
    company: 'PathAI Systems',
    desc: 'Engineering high-performance 3D interfaces and autonomous AI pipelines (ReAct, function calling) to automate business operations and client acquisition for founders and SMEs.'
  },
  {
    date: '2024 – Present',
    title: 'Lead Full-Stack Developer',
    company: 'Nigerian Academy of Audiology (NAA)',
    desc: 'Architected and deployed the official national NAA professional portal, featuring secure membership authentication, automatic CPD points tracking, and a dynamic forms builder in Django.'
  },
  {
    date: '2025',
    title: 'Founder & Developer',
    company: 'RemitAI',
    desc: 'Designed and built a real-time FinTech comparison assistant for cross-border payments, optimizing remittance rates globally with AI insights.'
  },
  {
    date: '2024',
    title: 'Founder & Developer',
    company: 'AudiologyLink',
    desc: 'Developed a specialized patient management portal and audiogram analysis system connecting hearing care professionals.'
  }
];

const achievements = [
  {
    icon: <Award size={20} />,
    title: 'Digital Health Innovation Winner',
    desc: 'Won the ITHISAN Week Hackathon for designing and building AudiologyLink.'
  },
  {
    icon: <Cpu size={20} />,
    title: '3MTT NextGen Fellow',
    desc: 'Selected fellow of the 3 Million Technical Talent (3MTT) Program.'
  },
  {
    icon: <BookOpen size={20} />,
    title: 'Bachelor of Audiology',
    desc: 'Federal University of Health Sciences, Ila Orangun.'
  }
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
    <section id="about" className="reveal" ref={sectionRef} style={{ padding: '120px 5%' }}>
      <div className="about-grid">
        {/* Left column: Bio & Achievements */}
        <div>
          <h3 style={{ color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '20px' }}>
            About Me
          </h3>
          <h2 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '30px', fontWeight: '800' }}>
            Not Just a Developer. <br /><span className="text-gradient">A Technical Force Multiplier.</span>
          </h2>
          <div style={{ color: '#aaa', lineHeight: '1.8', fontSize: '1.05rem' }}>
            <p style={{ marginBottom: '20px' }}>
              I am a Full-Stack Engineer and AI Architect based in Lagos, Nigeria. I specialize in bridging the gap between advanced agentic AI networks and immersive web frontend interfaces.
            </p>
            <p style={{ marginBottom: '30px' }}>
              Obsessed with performance and speed, I build custom 3D web applications and automate complex operational workflows. Whether developing clinical ecosystems for digital health or optimizing fintech rails, I design software that delivers measurable growth.
            </p>
          </div>

          {/* Core Qualifications Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginTop: '40px' }}>
            {achievements.map((item, index) => (
              <div 
                key={index} 
                className="glass" 
                style={{ 
                  padding: '20px 25px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '20px', 
                  border: '1px solid rgba(255,255,255,0.03)',
                  textAlign: 'left'
                }}
              >
                <div style={{ color: 'var(--accent-color)', display: 'flex', alignItems: 'center' }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: '700', color: '#fff', marginBottom: '3px' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#666' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Profile Photo & Skills Frame */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
          {/* Glowing Conic Border Profile Picture */}
          <div className="profile-frame">
            <div className="profile-img-container">
              <img src={profileImg} alt="Michael Adewale" className="profile-img" />
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: '700', fontSize: '1.2rem', color: '#fff', marginBottom: '2px' }}>Michael Adewale</p>
            <p style={{ fontSize: '0.85rem', color: '#555', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '600' }}>Full-Stack Engineer & AI Architect</p>
          </div>
        </div>
      </div>

      {/* Experience Timeline Section */}
      <div style={{ maxWidth: '800px', margin: '100px auto 0' }}>
        <h3 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '50px' }}>
          Professional <span className="text-gradient">Timeline</span>
        </h3>
        
        <div className="timeline-container">
          {experience.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-date">{item.date}</div>
              <h4 className="timeline-title">
                {item.title}
              </h4>
              <div className="timeline-subtitle">
                {item.company}
              </div>
              <p className="timeline-desc">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
