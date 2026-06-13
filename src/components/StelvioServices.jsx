import React from 'react';

const services = [
  {
    title: 'Hyper-Speed Landing Pages',
    description: 'Visually stunning, mobile-first landing pages engineered for sub-second performance and maximum lead conversion.',
    timeline: 'up to 1 month',
    icon: '❖',
  },
  {
    title: 'Custom Web Applications',
    description: 'Scalable, high-performance web applications built with React to solve complex business challenges.',
    timeline: 'up to 2 months',
    icon: '✜',
  },
  {
    title: 'Autonomous AI Agents',
    description: 'Custom AI agents that automate your lead generation, customer support, and outreach workflows 24/7.',
    timeline: 'up to 3 months',
    icon: '⧉',
  },
];

const StelvioServices = () => {
  return (
    <section className="bg-stelvio-dark text-stelvio-gray font-mono px-6 md:px-12 lg:px-24 py-20 border-b border-stelvio-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-stelvio-white mb-12">My Core Edge (Services):</h2>
        
        <div className="flex flex-col gap-4">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-stelvio-card border border-stelvio-border p-6 md:p-8 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#222] transition-colors"
            >
              <div className="flex items-start md:items-center gap-6">
                <span className="text-2xl text-stelvio-gray mt-1 md:mt-0">{service.icon}</span>
                <div>
                  <h3 className="text-stelvio-white font-bold text-lg">{service.title}</h3>
                  <p className="text-sm mt-1 max-w-xl">{service.description}</p>
                </div>
              </div>
              <div className="text-sm border border-stelvio-border px-4 py-2 rounded-full whitespace-nowrap self-start md:self-auto">
                {service.timeline}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StelvioServices;
