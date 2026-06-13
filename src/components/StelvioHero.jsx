import React from 'react';
import AgentNetworkCanvas from './AgentNetworkCanvas';

const StelvioHero = () => {
  return (
    <section className="bg-stelvio-dark text-stelvio-gray font-mono min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 border-b border-stelvio-border relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <AgentNetworkCanvas />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
            MA
          </div>
          <span className="text-stelvio-white font-bold tracking-tight">Michael Adewale</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stelvio-white leading-tight mb-6 max-w-3xl">
          Building AI-powered 3D Web Experiences & Products.
        </h1>

        <p className="text-lg md:text-xl max-w-xl mb-12">
          I help founders and modern businesses ship high‑performance web products, interactive 3D experiences, and autonomous AI agents.
          <br />
          <span className="mt-2 block text-stelvio-accent">📍 Remote-first</span>
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a href="#gigs" className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#222] border border-stelvio-border text-stelvio-white rounded-full transition-colors flex items-center gap-2">
            Explore My Gigs <span className="text-xl">→</span>
          </a>
          <a href="#contact" className="px-6 py-3 bg-transparent hover:text-stelvio-white text-stelvio-gray transition-colors flex items-center gap-2">
            Get in Touch <span className="text-xl">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default StelvioHero;
