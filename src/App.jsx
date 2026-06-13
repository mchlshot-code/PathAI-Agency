import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CollabGuide from './components/CollabGuide';
import GigBriefForm from './components/GigBriefForm';
import StelvioLayout from './components/StelvioLayout';

function MainSite() {
  return (
    <StelvioLayout />
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
