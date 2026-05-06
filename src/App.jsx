import React from 'react';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Contact from './components/Contact';

function App() {
  return (
    <div className="app-container">
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
      
      <footer style={{ padding: '40px', textAlign: 'center', color: '#444', fontSize: '0.8rem', borderTop: '1px solid #111' }}>
        &copy; 2026 PathAI Systems. Built with Autonomous Precision.
      </footer>
    </div>
  );
}

export default App;
