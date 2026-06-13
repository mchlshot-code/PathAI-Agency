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
    <div style={{ padding: '40px 5% 100px', maxWidth: '1000px', margin: '0 auto', color: '#fff', fontFamily: 'var(--font-body)' }}>
      <div style={{ marginBottom: '40px' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#888', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-color)'} onMouseLeave={e => e.currentTarget.style.color = '#888'}>
          <ArrowLeft size={18} /> Back to main site
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Freelance Toolkit
          </span>
          <h1 style={{ fontSize: '2.5rem', marginTop: '5px', marginBottom: '10px' }}>Collab Discovery Guide</h1>
          <p style={{ color: '#666', fontSize: '1rem' }}>Interactive note-taking and client qualification framework during consultation calls.</p>
        </div>
        
        <div className="glass" style={{ display: 'flex', alignItems: 'center', padding: '15px 25px', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontFamily: 'monospace', fontWeight: 'bold' }}>
            <Clock size={24} color="var(--accent-color)" />
            {formatTime(secondsElapsed)}
          </div>
          <button 
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            style={{ 
              background: isTimerRunning ? '#ff3366' : 'var(--accent-color)', 
              color: '#000', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '50px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {isTimerRunning ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Start Call</>}
          </button>
        </div>
      </div>

      <div className="discovery-grid" style={{ gap: '40px' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Questions Checklist</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {questions.map((q, idx) => (
              <div key={idx} className="glass" style={{ padding: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', cursor: 'pointer', marginBottom: '15px' }}>
                  <div style={{ marginTop: '2px', color: 'var(--accent-color)' }}>
                    {notes[idx] ? <CheckSquare /> : <Square />}
                  </div>
                  <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>{q}</span>
                </label>
                <textarea
                  placeholder="Notes..."
                  value={notes[idx] || ''}
                  onChange={(e) => handleNoteChange(idx, e.target.value)}
                  style={{
                    width: '100%',
                    background: '#111',
                    border: '1px solid #333',
                    padding: '15px',
                    borderRadius: '10px',
                    color: '#fff',
                    fontFamily: 'var(--font-body)',
                    minHeight: '80px',
                    resize: 'vertical',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                  onBlur={(e) => e.target.style.borderColor = '#333'}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="glass" style={{ padding: '25px', marginBottom: '30px', borderColor: 'rgba(255, 51, 102, 0.3)' }}>
            <h3 style={{ color: '#ff3366', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '1.3rem' }}>
              <AlertTriangle /> Red Flags
            </h3>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '15px', color: '#ddd' }}>
              {redFlags.map((flag, idx) => (
                <li key={idx} style={{ lineHeight: '1.5', fontSize: '0.92rem' }}>{flag}</li>
              ))}
            </ul>
          </div>

          <div className="glass" style={{ padding: '25px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '1.3rem' }}>
              <MessageSquare /> General Notes
            </h3>
            <textarea
              placeholder="Additional context, action items, or initial tech stack thoughts..."
              value={generalNotes}
              onChange={(e) => setGeneralNotes(e.target.value)}
              style={{
                width: '100%',
                background: '#111',
                border: '1px solid #333',
                padding: '15px',
                borderRadius: '10px',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                minHeight: '300px',
                resize: 'vertical',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
              onBlur={(e) => e.target.style.borderColor = '#333'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollabGuide;
