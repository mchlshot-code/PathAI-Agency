import React from 'react';

const experiences = [
  {
    role: 'Framer developer',
    company: 'Circles Design',
    years: '2022-2024',
    icon: '⊚',
  },
  {
    role: 'Web Designer',
    company: 'Highflier Agency',
    years: '2020-2022',
    icon: '◈',
  },
  {
    role: 'Web Designer',
    company: 'Southside',
    years: '2015-2020',
    icon: '⊡',
  },
];

const StelvioExperience = () => {
  return (
    <section className="bg-stelvio-dark text-stelvio-gray font-mono px-6 md:px-12 lg:px-24 py-20 border-b border-stelvio-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-stelvio-white mb-12">Experience:</h2>
        
        <div className="flex flex-col gap-4">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="bg-stelvio-card border border-stelvio-border p-6 md:p-8 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#222] transition-colors"
            >
              <div className="flex items-center gap-6">
                <span className="text-2xl text-stelvio-gray">{exp.icon}</span>
                <div>
                  <h3 className="text-stelvio-white font-bold text-lg">{exp.role}</h3>
                  <p className="text-sm mt-1">{exp.company}</p>
                </div>
              </div>
              <div className="text-sm text-stelvio-gray">
                {exp.years}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StelvioExperience;
