import React from 'react';
import StelvioHero from './StelvioHero';
import StelvioCaseStudies from './StelvioCaseStudies';
import StelvioServices from './StelvioServices';
import StelvioExperience from './StelvioExperience';
import StelvioFAQ from './StelvioFAQ';
import StelvioAbout from './StelvioAbout';
import StelvioFooter from './StelvioFooter';

const StelvioLayout = () => {
  return (
    <div className="bg-stelvio-dark min-h-screen selection:bg-stelvio-white selection:text-stelvio-dark font-mono antialiased">
      <StelvioHero />
      <StelvioCaseStudies />
      <StelvioServices />
      <StelvioExperience />
      <StelvioFAQ />
      <StelvioAbout />
      <StelvioFooter />
    </div>
  );
};

export default StelvioLayout;
