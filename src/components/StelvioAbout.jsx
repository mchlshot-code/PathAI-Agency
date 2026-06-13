import React from 'react';
import profileImg from '../assets/michael-adewale-profile.jpg';

const StelvioAbout = () => {
  return (
    <section className="bg-stelvio-dark text-stelvio-gray font-mono px-6 md:px-12 lg:px-24 py-20 border-b border-stelvio-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-stelvio-white mb-12">About me:</h2>
        
        <div className="w-full aspect-[2/1] md:aspect-[3/1] bg-stelvio-card rounded-lg overflow-hidden mb-12 border border-stelvio-border">
          <img 
            src={profileImg} 
            alt="Michael Adewale Portrait" 
            className="w-full h-full object-cover object-top grayscale opacity-80"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-stelvio-white mb-6">Not Just a Developer. A Technical Force Multiplier.</h3>
            <p className="text-sm leading-relaxed mb-6">
              I am a Full-Stack Engineer and AI Architect based in Lagos, Nigeria. I specialize in bridging the gap between advanced agentic AI networks and immersive web frontend interfaces.
            </p>
            <p className="text-sm leading-relaxed">
              Obsessed with performance and speed, I build custom 3D web applications and automate complex operational workflows. Whether developing clinical ecosystems for digital health or optimizing fintech rails, I design software that delivers measurable growth.
            </p>
          </div>
          <div className="md:pt-[3.25rem]">
            <p className="text-sm leading-relaxed mb-6">
              I'm also a Digital Health Innovation Winner for designing and building AudiologyLink, and a selected fellow of the 3 Million Technical Talent (3MTT) Program, with a Bachelor of Audiology from the Federal University of Health Sciences, Ila Orangun.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StelvioAbout;
