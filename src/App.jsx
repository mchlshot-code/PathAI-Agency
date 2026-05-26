import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gigs from './components/Gigs';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CollabGuide from './components/CollabGuide';
import GigBriefForm from './components/GigBriefForm';

function MainSite() {
  return (
    <>
      <Navbar />
      <Hero />
      <Gigs />
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
          <Route path="/collab/guide" element={<CollabGuide />} />
          <Route path="/collab/brief" element={<GigBriefForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
