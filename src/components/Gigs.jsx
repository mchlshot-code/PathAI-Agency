import { useEffect, useRef } from 'react';
import { Layout, Bot, Server, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const gigs = [
  {
    num: '01',
    type: '3d',
    title: 'Premium 3D Web Experiences',
    price: 'Starting at $800',
    subtitle: 'Immersive spatial UIs that stop the scroll',
    desc: 'Interactive 3D hero sections, custom product customizers, and spatial experiences engineered to run at 60 FPS natively in the browser.',
    deliverables: [
      'Responsive React/Next.js layout',
      'Custom 3D scene (Three.js / WebGL / R3F)',
      'Smooth scroll & micro-interactions (GSAP)',
      'Basic CMS / config file for easy content edits',
      'Mobile & performance optimization',
      '7–10 day delivery for standard scopes'
    ],
    tags: ['Three.js', 'WebGL', 'React Three Fiber', 'GSAP'],
    color: 'rgba(0, 243, 255, 0.03)',
    borderColor: 'rgba(0, 243, 255, 0.15)',
    glowColor: '#00f3ff'
  },
  {
    num: '02',
    type: 'ai',
    title: 'Autonomous AI Agents & Automations',
    price: 'Starting at $600',
    subtitle: 'Automate operations & scale lead capture 24/7',
    desc: 'Custom autonomous agent loops, lead scoring engines, and API integrations that connect your site to CRM, email, WhatsApp, and Slack.',
    deliverables: [
      'Task/Conversation-based AI agent setup (OpenAI/Claude)',
      'Automations built with n8n / Make / Zapier',
      'Integrations with email, CRM, and forms',
      'Secure API keys & environment configuration',
      'Simple monitoring dashboard / log view',
      'Loom walkthrough + handover documentation',
      '7–10 day delivery for standard workflows'
    ],
    tags: ['OpenAI', 'n8n', 'Make', 'APIs', 'Agentic Loop'],
    color: 'rgba(112, 0, 255, 0.03)',
    borderColor: 'rgba(112, 0, 255, 0.2)',
    glowColor: '#7000ff'
  },
  {
    num: '03',
    type: 'stack',
    title: 'Custom Full‑Stack Applications',
    price: 'Starting at $1,200',
    subtitle: 'Production-ready SaaS & tools built fast',
    desc: 'Complete full-stack applications with modular backends, robust database design, role-based access, and smooth interactive dashboard interfaces.',
    deliverables: [
      'Full-stack app (React/Next.js + Django/Node)',
      'Supabase / PostgreSQL database design',
      'User auth & role-based access control',
      'Responsive dashboard UI & analytics charts',
      'Payment gateway (Stripe / Paystack / Flutterwave)',
      'Deployment to Vercel / Render / AWS',
      '14–21 day delivery for MVPs'
    ],
    tags: ['React', 'Django', 'Node.js', 'PostgreSQL', 'Supabase'],
    color: 'rgba(255, 255, 255, 0.02)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    glowColor: '#ffffff'
  }
];

// Interactive 3D Canvas Visualizer component
const GigVisualizer = ({ type, glowColor }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isHovered = useRef(false);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let rotation = { x: 0, y: 0 };
    let time = 0;

    // Resizing
    const resize = () => {
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    // 3D Math helper
    const project = (x, y, z, w, h) => {
      const fov = 300;
      const scale = fov / (fov + z);
      return {
        x: x * scale + w / 2,
        y: y * scale + h / 2,
        scale: scale
      };
    };

    const rotateX = (x, y, z, angle) => {
      const rad = angle;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return [x, y * cos - z * sin, y * sin + z * cos];
    };

    const rotateY = (x, y, z, angle) => {
      const rad = angle;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return [x * cos - z * sin, y, x * sin + z * cos];
    };

    // --- ANIMATION TYPE: 3D CUBE ---
    const cubeVertices = [
      [-40, -40, -40], [40, -40, -40], [40, 40, -40], [-40, 40, -40],
      [-40, -40, 40],  [40, -40, 40],  [40, 40, 40],  [-40, 40, 40]
    ];
    const cubeEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];

    // --- ANIMATION TYPE: AI NEURAL NET ---
    const neuralNodes = Array.from({ length: 6 }, (_, i) => {
      if (i === 0) return { x: 0, y: 0, z: 0, size: 7 }; // Central node
      const angle = (i * 2 * Math.PI) / 5;
      return {
        x: Math.cos(angle) * 45,
        y: Math.sin(angle) * 45,
        z: (Math.random() - 0.5) * 20,
        size: 4
      };
    });
    const neuralPackets = Array.from({ length: 5 }, (_, i) => ({
      from: 0,
      to: i + 1,
      progress: Math.random(),
      speed: 0.01 + Math.random() * 0.015
    }));

    // --- ANIMATION TYPE: FULL-STACK STACK ---
    // Three isometric layers: Database, Backend, Frontend
    const drawStackLayer = (ctx, cx, cy, w, h, offset, color, text) => {
      ctx.save();
      ctx.translate(cx, cy + offset);
      
      // Draw isometric rhombus
      ctx.beginPath();
      ctx.moveTo(0, -h / 2);
      ctx.lineTo(w / 2, 0);
      ctx.lineTo(0, h / 2);
      ctx.lineTo(-w / 2, 0);
      ctx.closePath();

      // Glass style fill
      ctx.fillStyle = 'rgba(20, 20, 20, 0.7)';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = color;
      ctx.stroke();

      // Inner details (grid lines to represent architecture)
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.beginPath();
      ctx.moveTo(-w / 4, -h / 8);
      ctx.lineTo(w / 4, h / 8);
      ctx.moveTo(-w / 4, h / 8);
      ctx.lineTo(w / 4, -h / 8);
      ctx.stroke();

      // Text label inside isometric slice
      ctx.fillStyle = '#fff';
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(text, 0, 3);
      ctx.restore();
    };

    // Draw loop
    const draw = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);
      time += 0.01;

      // Update rotation based on hover & mouse position
      if (isHovered.current) {
        const targetX = (mousePos.current.y / h - 0.5) * 0.5;
        const targetY = (mousePos.current.x / w - 0.5) * 0.5;
        rotation.x += (targetX - rotation.x) * 0.1;
        rotation.y += (targetY - rotation.y) * 0.1;
        rotation.y += 0.015; // keep rotating
      } else {
        rotation.x += (0 - rotation.x) * 0.05;
        rotation.y += 0.005;
      }

      if (type === '3d') {
        // --- RENDER 3D CUBE ---
        ctx.strokeStyle = glowColor;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = isHovered.current ? 8 : 2;

        const projected = cubeVertices.map(v => {
          let [rx, ry, rz] = rotateX(v[0], v[1], v[2], rotation.y + time);
          [rx, ry, rz] = rotateY(rx, ry, rz, rotation.y * 1.5);
          return project(rx, ry, rz, w, h);
        });

        // Draw edges
        ctx.lineWidth = 1.5;
        cubeEdges.forEach(edge => {
          const p1 = projected[edge[0]];
          const p2 = projected[edge[1]];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });

        // Draw vertex points
        ctx.fillStyle = '#fff';
        projected.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3 * p.scale, 0, Math.PI * 2);
          ctx.fill();
        });
      } 
      
      else if (type === 'ai') {
        // --- RENDER NEURAL NETWORK ---
        const projectedNodes = neuralNodes.map(node => {
          let [rx, ry, rz] = rotateX(node.x, node.y, node.z, rotation.y + time * 0.5);
          [rx, ry, rz] = rotateY(rx, ry, rz, rotation.y * 0.8);
          return {
            ...project(rx, ry, rz, w, h),
            size: node.size,
            isCenter: node.x === 0
          };
        });

        // Connections
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        projectedNodes.forEach((node, idx) => {
          if (idx > 0) {
            ctx.beginPath();
            ctx.moveTo(projectedNodes[0].x, projectedNodes[0].y);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
          }
        });

        // Inter-node connection circle ring
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = 'rgba(112, 0, 255, 0.2)';
        for (let i = 1; i < projectedNodes.length; i++) {
          const next = i === projectedNodes.length - 1 ? 1 : i + 1;
          ctx.moveTo(projectedNodes[i].x, projectedNodes[i].y);
          ctx.lineTo(projectedNodes[next].x, projectedNodes[next].y);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Packets
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = isHovered.current ? 8 : 2;
        neuralPackets.forEach(p => {
          p.progress += p.speed;
          if (p.progress >= 1) {
            p.progress = 0;
            p.speed = 0.01 + Math.random() * 0.015;
          }
          const fromNode = projectedNodes[p.from];
          const toNode = projectedNodes[p.to];
          const px = fromNode.x + (toNode.x - fromNode.x) * p.progress;
          const py = fromNode.y + (toNode.y - fromNode.y) * p.progress;

          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw nodes
        projectedNodes.forEach(node => {
          ctx.fillStyle = node.isCenter ? '#fff' : glowColor;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * node.scale, 0, Math.PI * 2);
          ctx.fill();
        });
      } 
      
      else if (type === 'stack') {
        // --- RENDER FLOATING LAYERS (STACK) ---
        const cx = w / 2;
        const cy = h / 2;
        const widthVal = 100;
        const heightVal = 50;

        // Hover animates vertical separation
        const hoverOffset = isHovered.current ? 25 : 12;
        
        ctx.shadowBlur = isHovered.current ? 6 : 0;
        ctx.shadowColor = glowColor;

        // Connections linking stacked slices
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy - hoverOffset);
        ctx.lineTo(cx, cy + hoverOffset);
        ctx.moveTo(cx - 30, cy - hoverOffset / 2);
        ctx.lineTo(cx - 30, cy + hoverOffset / 2);
        ctx.moveTo(cx + 30, cy - hoverOffset / 2);
        ctx.lineTo(cx + 30, cy + hoverOffset / 2);
        ctx.stroke();

        // 3. Database Layer (Bottom)
        drawStackLayer(ctx, cx, cy, widthVal, heightVal, hoverOffset, 'rgba(255, 255, 255, 0.2)', 'DATABASE (Supabase)');
        // 2. API / Backend Layer (Middle)
        drawStackLayer(ctx, cx, cy, widthVal, heightVal, 0, glowColor, 'BACKEND (Django/Node)');
        // 1. Frontend Layer (Top)
        drawStackLayer(ctx, cx, cy, widthVal, heightVal, -hoverOffset, 'rgba(0, 243, 255, 0.8)', 'FRONTEND (React/Next)');
      }

      ctx.shadowBlur = 0; // reset
      animationId = requestAnimationFrame(draw);
    };

    draw();

    // Event listeners for window resize
    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [type, glowColor]);

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
  };

  return (
    <div 
      ref={containerRef} 
      className="gig-canvas-container"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

const Gigs = () => {
  return (
    <section id="gigs" style={{ background: '#050505', paddingTop: '100px', paddingBottom: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Available Gigs
        </span>
        <h2 style={{ fontSize: '3.2rem', marginTop: '10px', marginBottom: '15px' }}>
          Select Your <span className="text-gradient">Service</span>
        </h2>
        <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.6' }}>
          Book a specialized gig directly. Each package delivers premium engineering, production-ready code, and custom visual polish.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        {gigs.map((gig, index) => (
          <div 
            key={index} 
            className="glass offering-card" 
            style={{ 
              padding: '40px 30px', 
              background: gig.color, 
              borderColor: gig.borderColor,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <span className="card-number">{gig.num}</span>
              
              {/* Interactive 3D Canvas visualizer for each service */}
              <GigVisualizer type={gig.type} glowColor={gig.glowColor} />

              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px' }}>{gig.title}</h3>
                </div>
                <p style={{ color: 'var(--accent-color)', fontSize: '1.15rem', fontWeight: '700', marginBottom: '8px' }}>
                  {gig.price}
                </p>
                <p style={{ color: '#aaa', fontSize: '0.9rem', fontWeight: '600', lineHeight: '1.4' }}>
                  {gig.subtitle}
                </p>
              </div>
              
              <p style={{ color: '#777', lineHeight: '1.6', marginBottom: '30px', fontSize: '0.92rem' }}>
                {gig.desc}
              </p>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '25px', marginBottom: '30px' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#888', letterSpacing: '1px', marginBottom: '15px' }}>What You Get:</p>
                <ul style={{ paddingLeft: '15px', color: '#bbb', fontSize: '0.88rem', listStyleType: 'square' }}>
                  {gig.deliverables.map((item, i) => (
                    <li key={i} style={{ marginBottom: '10px', lineHeight: '1.5' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div style={{ marginBottom: '25px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {gig.tags.map(tag => (
                  <span key={tag} className="badge" style={{ margin: 0 }}>{tag}</span>
                ))}
              </div>

              <Link 
                to="/collab/brief" 
                className="btn-primary" 
                style={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px',
                  boxShadow: `0 10px 20px ${gig.glowColor}1a`
                }}
              >
                Book This Gig <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gigs;
