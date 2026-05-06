import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="bg-gradient" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' }}>
      <div style={{ zIndex: 1, maxWidth: '600px' }}>
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ fontSize: '5rem', lineHeight: '1.1', marginBottom: '20px' }}
        >
          Engineering the <span className="text-gradient">Future of AI</span> Web Presence
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: '1.2rem', color: '#888', marginBottom: '40px', maxWidth: '500px' }}
        >
          PathAI transforms businesses into digital powerhouses with rapid AI-driven development and autonomous systems.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#contact" className="btn-primary">Scale Your Vision</a>
        </motion.div>
      </div>

      <div style={{ width: '50%', height: '100%', position: 'absolute', right: 0, top: 0 }}>
        <Canvas>
          <Suspense fallback={null}>
            <OrbitControls enableZoom={false} />
            <ambientLight intensity={1} />
            <directionalLight position={[3, 2, 1]} />
            <Sphere args={[1, 100, 200]} scale={2.4}>
              <MeshDistortMaterial
                color="#00f3ff"
                attach="material"
                distort={0.5}
                speed={2}
                roughness={0}
              />
            </Sphere>
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;
