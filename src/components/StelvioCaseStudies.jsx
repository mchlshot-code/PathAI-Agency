import React from 'react';

const projects = [
  {
    title: 'RemitAI',
    role: 'Founder & Full‑Stack Developer',
    description: 'A sophisticated real-time comparison assistant for cross-border payments, using AI to scan and optimize global remittance rates.',
    link: 'https://remitaiapp.com',
  },
  {
    title: 'Nigerian Academy of Audiology Portal',
    role: 'Lead Full‑Stack Developer',
    description: 'National professional portal featuring secure membership management, dynamic Django form builders, and automated CPD credits tracking.',
    link: 'https://naaudiology.org.ng',
  },
  {
    title: 'AudiologyLink',
    role: 'Founder & Developer',
    description: 'Connected health care dashboard connecting audiology professionals with patients, featuring custom test analysis modules.',
    link: 'https://audiology-link.vercel.app',
  }
];

const StelvioCaseStudies = () => {
  return (
    <section className="bg-stelvio-dark text-stelvio-gray font-mono px-6 md:px-12 lg:px-24 py-20 border-b border-stelvio-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-stelvio-white mb-12">Case Studies & Proven Innovations:</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project, index) => (
            <a href={project.link} target="_blank" rel="noreferrer" key={index} className="group cursor-pointer block">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-stelvio-card border border-stelvio-border mb-6 flex items-center justify-center p-8 group-hover:border-stelvio-accent transition-all duration-500">
                 <div className="text-center">
                   <h3 className="text-2xl font-bold text-stelvio-white mb-4">{project.title}</h3>
                   <p className="text-sm text-stelvio-gray opacity-80 group-hover:opacity-100 transition-opacity">
                     {project.description}
                   </p>
                 </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-stelvio-white font-bold">{project.title}</h3>
                  <span className="text-xs text-stelvio-gray uppercase mt-1 block">{project.role}</span>
                </div>
                <span className="text-stelvio-gray group-hover:text-stelvio-white transition-colors text-xl">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StelvioCaseStudies;
