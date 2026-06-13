import React from 'react';

const StelvioFooter = () => {
  return (
    <footer className="bg-stelvio-dark text-stelvio-gray font-mono px-6 md:px-12 lg:px-24 py-20 pb-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 mb-32">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stelvio-white leading-tight mb-6">
            Available for freelance<br />
            projects, now<br />
            booking for December.
          </h2>
          <p className="text-sm max-w-md">
            If you would like to chat about a potential collaboration, please get in touch.
          </p>
        </div>
        
        <a 
          href="mailto:markostelvio@hey.com" 
          className="bg-stelvio-card border border-stelvio-border hover:bg-[#222] transition-colors rounded-full px-8 py-6 flex items-center justify-center min-w-[280px]"
        >
          <span className="text-stelvio-white font-bold tracking-tight">markostelvio@hey.com →</span>
        </a>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs pt-8 border-t border-stelvio-border">
        <div>
          © 2024 All rights reserved. Built in Framer by Peter Konti.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-stelvio-white transition-colors">YouTube →</a>
          <a href="#" className="hover:text-stelvio-white transition-colors">Twitter →</a>
        </div>
      </div>
    </footer>
  );
};

export default StelvioFooter;
