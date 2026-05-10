import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Offerings from './components/Offerings';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';

import Contact from './components/Contact';
import Footer from './components/Footer';
import DiscoveryGuide from './components/DiscoveryGuide';
import ClientBriefForm from './components/ClientBriefForm';

function MainSite() {
  return (
    <>
      <Navbar />
      <Hero />
      <Offerings />
      <About />
      <Services />
      <Process />

      <Portfolio />
      <Contact />
      <Footer />
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
