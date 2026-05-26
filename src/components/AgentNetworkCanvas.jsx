import { useEffect, useRef, useState } from 'react';

// Node configurations
const NODES = [
  { id: 'core', label: 'MA Core', sub: 'Orchestrator Hub', tier: 1, size: 25, pos: [0, 0, 0], connections: 5 },
  // Tier 1
  { id: 'brain', label: 'AI Brain', sub: 'Language Model Layer', tier: 2, size: 16, pos: [100, 50, 40], connections: 3 },
  { id: 'deploy', label: 'Deploy Engine', sub: 'CI/CD Pipeline', tier: 2, size: 16, pos: [-100, -50, -40], connections: 2 },
  { id: 'router', label: 'Edge Router', sub: 'Request Routing', tier: 2, size: 16, pos: [60, -100, 60], connections: 3 },
  { id: 'vault', label: 'Vault', sub: 'Auth & Security', tier: 2, size: 16, pos: [-60, 100, -60], connections: 2 },
  { id: 'analytics', label: 'Analytics', sub: 'Live Metrics', tier: 2, size: 16, pos: [80, 80, -80], connections: 2 },
  // Tier 2
  { id: 'lead', label: 'Lead Agent', sub: 'AI Lead Capture', tier: 3, size: 10, pos: [160, -40, 20], connections: 3 },
  { id: 'support', label: 'Support Bot', sub: '24/7 Chat Agent', tier: 3, size: 10, pos: [-160, 40, -20], connections: 1 },
  { id: 'store', label: 'Data Store', sub: 'Edge Database', tier: 3, size: 10, pos: [40, 160, 80], connections: 1 },
  { id: 'cdn', label: 'CDN Layer', sub: 'Global Delivery', tier: 3, size: 10, pos: [-40, -160, -80], connections: 1 },
  // Tier 3
  { id: 'webhooks', label: 'Webhooks', sub: 'Event Bus', tier: 4, size: 6, pos: [200, 80, 40], connections: 2 },
  { id: 'inference', label: 'LLM Inference', sub: 'Model Serving', tier: 4, size: 6, pos: [-200, -80, -40], connections: 1 },
];

const CONNECTIONS = [
  ['core', 'brain'], ['core', 'deploy'], ['core', 'router'], ['core', 'vault'], ['core', 'analytics'],
  ['brain', 'lead'], ['router', 'support'], ['vault', 'store'], ['deploy', 'cdn'],
  ['lead', 'webhooks'], ['brain', 'inference'],
  ['analytics', 'webhooks'], ['router', 'lead']
];

const AgentNetworkCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // 3D rotation state
  const rotation = useRef({ x: 0, y: 0 });
  const autoRotation = useRef({ x: 0, y: 0.002 });
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Packets state
  const packets = useRef([]);
  const ambientParticles = useRef([]);
  const bursts = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.ref || canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Initialize ambient particles
    ambientParticles.current = Array.from({ length: 60 }, () => ({
      x: (Math.random() - 0.5) * 1000,
      y: (Math.random() - 0.5) * 1000,
      z: (Math.random() - 0.5) * 1000,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      vz: (Math.random() - 0.5) * 0.2,
    }));

    // Initialize packets
    const createPacket = () => {
      const conn = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
      return {
        from: conn[0],
        to: conn[1],
        progress: 0,
        speed: 0.005 + Math.random() * 0.01
      };
    };
    packets.current = Array.from({ length: 8 }, createPacket);

    const resize = () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(containerRef.current);
    resize();

    // 3D Math
    const rotate3D = (point, rot) => {
      let [x, y, z] = point;
      
      // Y axis rotation
      const cosY = Math.cos(rot.y);
      const sinY = Math.sin(rot.y);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      
      // X axis rotation
      const cosX = Math.cos(rot.x);
      const sinX = Math.sin(rot.x);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      
      return [x1, y2, z2];
    };

    const project = (point, w, h) => {
      const [x, y, z] = point;
      const fov = 800;
      const perspective = fov / (fov + z);
      return {
        x: x * perspective + w / 2,
        y: y * perspective + h / 2,
        z: z,
        scale: perspective
      };
    };

    const draw = (time) => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      // Auto rotation logic
      if (!isDragging) {
        rotation.current.y += autoRotation.current.y;
        rotation.current.x += (0 - rotation.current.x) * 0.05; // Snap back X
      }

      // Update ambient particles
      ambientParticles.current.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.z += p.vz;
        if (Math.abs(p.x) > 500) p.vx *= -1;
        if (Math.abs(p.y) > 500) p.vy *= -1;
        if (Math.abs(p.z) > 500) p.vz *= -1;
      });

      // Update Bursts
      bursts.current = bursts.current.filter(b => b.life > 0);
      bursts.current.forEach(b => b.life -= 1);

      // Project all elements
      const projectedNodes = NODES.map(node => {
        const rotated = rotate3D(node.pos, rotation.current);
        const projected = project(rotated, width, height);
        return { ...node, ...projected, rotated };
      });

      const projectedAmbient = ambientParticles.current.map(p => {
        const rotated = rotate3D([p.x, p.y, p.z], rotation.current);
        return project(rotated, width, height);
      });

      // Depth sorting
      const allElements = [
        ...projectedNodes.map(n => ({ type: 'node', data: n, z: n.z })),
        ...CONNECTIONS.map(c => {
          const n1 = projectedNodes.find(n => n.id === c[0]);
          const n2 = projectedNodes.find(n => n.id === c[1]);
          return { type: 'connection', data: { n1, n2 }, z: (n1.z + n2.z) / 2 };
        }),
        ...packets.current.map(p => {
          const n1 = projectedNodes.find(n => n.id === p.from);
          const n2 = projectedNodes.find(n => n.id === p.to);
          // Simple linear interpolation for z-sorting packets
          const pZ = n1.z + (n2.z - n1.z) * p.progress;
          return { type: 'packet', data: { p, n1, n2 }, z: pZ };
        })
      ].sort((a, b) => b.z - a.z);

      // Draw Connection Lines and Ambient Particles
      ctx.globalAlpha = 0.2;
      projectedAmbient.forEach(p => {
        if (p.scale > 0) {
          ctx.fillStyle = '#00f3ff';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1 * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;

      // Painter's algorithm loop
      allElements.forEach(el => {
        if (el.type === 'connection') {
          const { n1, n2 } = el.data;
          const isHighlighted = (hoveredNode === n1.id || hoveredNode === n2.id);
          
          ctx.beginPath();
          ctx.setLineDash([5, 5]);
          ctx.strokeStyle = isHighlighted ? 'rgba(0, 243, 255, 0.8)' : `rgba(0, 243, 255, ${0.1 * n1.scale})`;
          ctx.lineWidth = 1;
          
          // Curved line (quadratic bezier)
          const midX = (n1.x + n2.x) / 2;
          const midY = (n1.y + n2.y) / 2 - 50 * n1.scale;
          ctx.moveTo(n1.x, n1.y);
          ctx.quadraticCurveTo(midX, midY, n2.x, n2.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        if (el.type === 'packet') {
          const { p, n1, n2 } = el.data;
          p.progress += p.speed;
          if (p.progress >= 1) {
            bursts.current.push({ x: n2.x, y: n2.y, life: 20, scale: n2.scale });
            const next = createPacket();
            p.from = next.from;
            p.to = next.to;
            p.progress = 0;
          }

          const midX = (n1.x + n2.x) / 2;
          const midY = (n1.y + n2.y) / 2 - 50 * n1.scale;
          
          // Bezier interpolation
          const t = p.progress;
          const cx = (1 - t) * (1 - t) * n1.x + 2 * (1 - t) * t * midX + t * t * n2.x;
          const cy = (1 - t) * (1 - t) * n1.y + 2 * (1 - t) * t * midY + t * t * n2.y;

          ctx.fillStyle = '#fff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00f3ff';
          ctx.beginPath();
          ctx.arc(cx, cy, 2 * n1.scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        if (el.type === 'node') {
          const n = el.data;
          const isHovered = hoveredNode === n.id;
          const size = (isHovered ? n.size * 1.3 : n.size) * n.scale;
          
          // Glow/Halo
          const pulse = Math.sin(time * 0.002 + n.pos[0]) * 0.2 + 0.8;
          const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, size * 2.5);
          gradient.addColorStop(0, `rgba(0, 243, 255, ${0.3 * pulse * n.scale})`);
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(n.x, n.y, size * 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Node Circle
          ctx.fillStyle = isHovered ? '#fff' : '#00f3ff';
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#00f3ff';
          ctx.beginPath();
          ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Labels
          if (n.scale > 0.6) {
            ctx.fillStyle = isHovered ? '#fff' : `rgba(255, 255, 255, ${0.6 * n.scale})`;
            ctx.font = `${10 * n.scale}px monospace`;
            ctx.textAlign = 'center';
            ctx.fillText(n.label, n.x, n.y + size + 15);
            
            if (isHovered) {
              ctx.fillStyle = 'rgba(0, 243, 255, 0.8)';
              ctx.font = `${8 * n.scale}px monospace`;
              ctx.fillText(n.sub, n.x, n.y + size + 28);
            }
          }
        }
      });

      // Draw Bursts
      bursts.current.forEach(b => {
        ctx.strokeStyle = `rgba(0, 243, 255, ${b.life / 20})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, (20 - b.life) * 2 * b.scale, 0, Math.PI * 2);
        ctx.stroke();
      });

      // HUD Overlays
      ctx.fillStyle = 'rgba(0, 243, 255, 0.4)';
      ctx.font = '10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('MICHAEL ADEWALE // AGENT NETWORK // LIVE', 20, 30);
      
      ctx.textAlign = 'right';
      const opPulse = Math.sin(time * 0.005) > 0;
      ctx.fillStyle = opPulse ? '#0f0' : '#060';
      ctx.beginPath(); ctx.arc(width - 100, 26, 3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(0, 243, 255, 0.4)';
      ctx.fillText('OPERATIONAL', width - 20, 30);

      ctx.textAlign = 'center';
      ctx.fillText('DRAG TO ROTATE · CLICK NODES TO INSPECT', width / 2, height - 20);

      // Effects: Vignette & Scanlines
      const vignette = ctx.createRadialGradient(width / 2, height / 2, width / 4, width / 2, height / 2, width / 1.2);
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(1, 'rgba(0,0,0,0.5)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(0, 243, 255, 0.03)';
      const scanlinePos = (time * 0.05) % height;
      ctx.fillRect(0, scanlinePos, width, 2);

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [isDragging, hoveredNode]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    const rect = canvasRef.current.getBoundingClientRect();
    lastMousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDragging) {
      const dx = x - lastMousePos.current.x;
      const dy = y - lastMousePos.current.y;
      rotation.current.y += dx * 0.01;
      rotation.current.x += dy * 0.01;
      lastMousePos.current = { x, y };
    }

    // Hover detection
    const w = rect.width;
    const h = rect.height;
    
    // Project nodes current positions to find hover
    const projected = NODES.map(node => {
      const rotated = (point, rot) => {
        let [x, y, z] = point;
        const cosY = Math.cos(rot.y); const sinY = Math.sin(rot.y);
        const x1 = x * cosY - z * sinY; const z1 = x * sinY + z * cosY;
        const cosX = Math.cos(rot.x); const sinX = Math.sin(rot.x);
        const y2 = y * cosX - z1 * sinX; const z2 = y * sinX + z1 * cosX;
        return [x1, y2, z2];
      };
      const rot = rotated(node.pos, rotation.current);
      const fov = 800; const p = fov / (fov + rot[2]);
      return { id: node.id, x: rot[0] * p + w / 2, y: rot[1] * p + h / 2, size: node.size * p };
    });

    const found = projected.find(n => {
      const dist = Math.hypot(n.x - x, n.y - y);
      return dist < n.size + 10;
    });

    setHoveredNode(found ? found.id : null);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (hoveredNode) {
      const node = NODES.find(n => n.id === hoveredNode);
      setSelectedNode(node);
    } else {
      setSelectedNode(null);
    }
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', background: '#050505' }}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClick={handleClick}
        style={{ cursor: hoveredNode ? 'pointer' : isDragging ? 'grabbing' : 'grab' }}
      />
      
      {selectedNode && (
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(0, 10, 20, 0.9)',
          border: '1px solid #00f3ff',
          padding: '20px',
          borderRadius: '10px',
          color: '#fff',
          width: '200px',
          zIndex: 10,
          backdropFilter: 'blur(10px)',
          pointerEvents: 'none'
        }}>
          <h4 style={{ color: '#00f3ff', marginBottom: '5px' }}>{selectedNode.label}</h4>
          <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '10px' }}>{selectedNode.sub}</p>
          <div style={{ fontSize: '0.7rem' }}>
            <span style={{ color: '#00f3ff' }}>CONNECTIONS:</span> {selectedNode.connections}
          </div>
          <div style={{ fontSize: '0.7rem', marginTop: '5px' }}>
            <span style={{ color: '#00f3ff' }}>STATUS:</span> NOMINAL
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentNetworkCanvas;
