import { useState, useEffect } from 'react';
import { Play, Pause, AlertTriangle, CheckSquare, Square, MessageSquare, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CollabGuide = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [notes, setNotes] = useState({});
  const [generalNotes, setGeneralNotes] = useState('');

  const questions = [
    "What does your business/product do, and who is your target customer?",
    "What primary bottleneck does this project solve? (No web presence, slow load, bad UI, zero automations?)",
    "If you have a website/system currently, what are the biggest pain points?",
    "What is the single most important action you want visitors to take?",
    "Which gig path fits your needs? (3D Experience, AI Agent Pipeline, Full-Stack App, or Custom Collab?)",
    "What specific integrations or APIs are required? (Stripe, n8n, specific LLM, custom database?)",
    "Do you have brand guidelines, copywriting, and design assets ready?",
    "When is your target launch date?",
    "What is your budget range for this scope?"
  ];

  const redFlags = [
    "Cannot define target audience or primary conversion action.",
    "Unwilling to state budget range ('just tell me what it costs').",
    "Wants a complex full-stack app or customized AI agent with a micro-budget.",
    "Demands delivery in under 10 days with no assets or content prepared."
  ];

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNoteChange = (index, value) => {
    setNotes(prev => ({ ...prev, [index]: value }));
  };

  return (
    <div className="bg-stelvio-dark min-h-screen font-mono text-stelvio-gray px-6 md:px-12 lg:px-24 py-20 selection:bg-stelvio-white selection:text-stelvio-dark">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-stelvio-gray hover:text-stelvio-white transition-colors font-bold">
            <ArrowLeft size={18} /> Back to main site
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
          <div>
            <span className="text-xs font-bold text-stelvio-gray uppercase tracking-widest block mb-2">
              Freelance Toolkit
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stelvio-white mb-4">Collab Discovery Guide</h1>
            <p className="text-sm max-w-xl">Interactive note-taking and client qualification framework during consultation calls.</p>
          </div>
          
          <div className="bg-stelvio-card border border-stelvio-border rounded-lg flex items-center p-4 gap-6 w-full lg:w-auto">
            <div className="flex items-center gap-3 text-xl font-bold text-stelvio-white">
              <Clock size={24} className="text-stelvio-gray" />
              {formatTime(secondsElapsed)}
            </div>
            <button 
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-colors ml-auto ${
                isTimerRunning 
                  ? 'bg-red-500 text-white hover:bg-red-600 border border-red-500' 
                  : 'bg-stelvio-white text-stelvio-dark hover:bg-gray-200 border border-stelvio-white'
              }`}
            >
              {isTimerRunning ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Start Call</>}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-xl md:text-2xl font-bold text-stelvio-white mb-8 pb-4 border-b border-stelvio-border">Questions Checklist</h2>
            <div className="flex flex-col gap-6">
              {questions.map((q, idx) => (
                <div key={idx} className="bg-stelvio-card border border-stelvio-border rounded-lg p-6 hover:bg-[#222] transition-colors">
                  <label className="flex items-start gap-4 cursor-pointer mb-6">
                    <div className="mt-1 text-stelvio-white">
                      {notes[idx] ? <CheckSquare size={20} /> : <Square size={20} />}
                    </div>
                    <span className="text-lg font-bold text-stelvio-white leading-tight">{q}</span>
                  </label>
                  <textarea
                    placeholder="Notes..."
                    value={notes[idx] || ''}
                    onChange={(e) => handleNoteChange(idx, e.target.value)}
                    className="w-full bg-[#111] border border-stelvio-border rounded-lg p-4 text-stelvio-white font-mono min-h-[100px] outline-none focus:border-stelvio-gray transition-colors resize-y"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-8">
            <div className="bg-stelvio-card border border-red-900/50 rounded-lg p-6">
              <h3 className="text-red-500 flex items-center gap-3 mb-6 text-lg font-bold">
                <AlertTriangle /> Red Flags
              </h3>
              <ul className="flex flex-col gap-4 text-sm">
                {redFlags.map((flag, idx) => (
                  <li key={idx} className="leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-red-500 before:rounded-full">
                    {flag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-stelvio-card border border-stelvio-border rounded-lg p-6">
              <h3 className="text-stelvio-white flex items-center gap-3 mb-6 text-lg font-bold">
                <MessageSquare /> General Notes
              </h3>
              <textarea
                placeholder="Additional context, action items, or initial tech stack thoughts..."
                value={generalNotes}
                onChange={(e) => setGeneralNotes(e.target.value)}
                className="w-full bg-[#111] border border-stelvio-border rounded-lg p-4 text-stelvio-white font-mono min-h-[300px] outline-none focus:border-stelvio-gray transition-colors resize-y text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollabGuide;
