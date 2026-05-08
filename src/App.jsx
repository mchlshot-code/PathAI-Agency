import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Trust from './components/Trust';
import Contact from './components/Contact';
import DiscoveryGuide from './components/DiscoveryGuide';
import ClientBriefForm from './components/ClientBriefForm';

function MainSite() {
  return (
    <>
      <Hero />
      <Services />
      <Trust />
      <Portfolio />
      <Contact />
      
      <footer style={{ padding: '40px', textAlign: 'center', color: '#444', fontSize: '0.8rem', borderTop: '1px solid #111' }}>
        &copy; 2026 PathAI Systems. Built with Autonomous Precision.
      </footer>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/onboarding/guide" element={<DiscoveryGuide />} />
          <Route path="/onboarding/brief" element={<ClientBriefForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
