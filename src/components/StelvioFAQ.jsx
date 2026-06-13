import React, { useState } from 'react';

const faqs = [
  {
    question: 'What do you specialize in?',
    answer: 'I specialize in creating clean, modern, and highly functional websites and web applications with a focus on intuitive user experiences and premium aesthetics.',
  },
  {
    question: 'How much does a typical website cost?',
    answer: 'Project costs vary depending on the scope and complexity. Please get in touch for a detailed quote tailored to your specific needs.',
  },
  {
    question: 'How long does it take to complete a website?',
    answer: 'A standard landing page can take up to 1 month, while a full functional site may take 2-3 months from discovery to launch.',
  },
  {
    question: 'Do you offer website maintenance services?',
    answer: 'Yes, I offer ongoing maintenance and support packages to ensure your website remains secure, updated, and performing optimally.',
  },
  {
    question: 'Can you help with branding and logo design as well?',
    answer: 'Absolutely. I often collaborate with clients to establish their visual identity from scratch before designing the digital experience.',
  },
  {
    question: 'How do we get started, and what\'s your process?',
    answer: 'We begin with a discovery call to understand your goals. Then we move through strategy, design mockups, development, and final launch.',
  },
];

const StelvioFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-stelvio-dark text-stelvio-gray font-mono px-6 md:px-12 lg:px-24 py-20 border-b border-stelvio-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-stelvio-white mb-12">Questions and Answers:</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-stelvio-card border border-stelvio-border p-6 rounded-lg cursor-pointer hover:bg-[#222] transition-colors h-min"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-stelvio-white font-bold pr-8">{faq.question}</h3>
                <span className="text-xl leading-none">{openIndex === index ? '−' : '+'}</span>
              </div>
              
              {openIndex === index && (
                <div className="mt-4 text-sm text-stelvio-gray">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StelvioFAQ;
