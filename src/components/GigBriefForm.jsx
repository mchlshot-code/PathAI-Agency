import { useState } from 'react';
import { CheckCircle2, ArrowRight, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const InputField = ({ label, name, type="text", required=false, placeholder="", formData, handleInputChange }) => (
  <div style={{ marginBottom: '20px' }}>
    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#fff' }}>
      {label} {required && <span style={{ color: 'var(--accent-color)' }}>*</span>}
    </label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        style={{ width: '100%', background: '#111', border: '1px solid #333', padding: '12px 15px', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '100px', fontFamily: 'var(--font-body)' }}
        onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
        onBlur={(e) => e.target.style.borderColor = '#333'}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        style={{ width: '100%', background: '#111', border: '1px solid #333', padding: '12px 15px', borderRadius: '8px', color: '#fff', outline: 'none', fontFamily: 'var(--font-body)' }}
        onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
        onBlur={(e) => e.target.style.borderColor = '#333'}
      />
    )}
  </div>
);

const GigBriefForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Client Info
    businessName: '',
    tagline: '',
    email: '',
    phone: '',
    address: '',
    socialHandles: '',
    industry: '',
    audience: '',
    
    // Step 2: Gig Requirements
    pagesNeeded: '',
    primaryGoal: '',
    domain: '',
    registrar: '',
    competitors: '',
    modules: [],
    
    // Step 3: Brand Assets & Style
    brandColors: '',
    fonts: '',
    brandTone: '',
    designExamples: '',
    
    // Step 4: Copywriting & Content
    homepageHeadline: '',
    aboutText: '',
    servicesList: '',
    teamBios: '',
    photosReady: false
  });

  const modulesList = [
    "Interactive 3D Elements",
    "WebGL / Three.js Scene",
    "n8n / Make Automation Setup",
    "OpenAI / LLM Integration",
    "Stripe / Payment Gateway",
    "User Auth & Accounts",
    "Dashboard UI",
    "Database (PostgreSQL / Supabase)",
    "Contact / Booking Forms",
    "CMS (Content Management)",
    "API Development / Documentation"
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleModuleToggle = (mod) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.includes(mod) 
        ? prev.modules.filter(m => m !== mod)
        : [...prev.modules, mod]
    }));
  };

  const validateStep = () => {
    if (step === 1) {
      return formData.businessName && formData.email && formData.industry && formData.audience;
    }
    if (step === 2) {
      return formData.pagesNeeded && formData.primaryGoal && formData.competitors;
    }
    if (step === 3) {
      return formData.brandColors && formData.brandTone && formData.designExamples;
    }
    if (step === 4) {
      return formData.homepageHeadline && formData.aboutText && formData.servicesList && formData.photosReady;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      alert("Please fill in all required fields to continue.");
    }
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      setIsSubmitting(true);
      try {
        const response = await fetch("https://formsubmit.co/ajax/adewalemchel@gmail.com", {
          method: "POST",
          headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              _subject: `New Gig Brief: ${formData.businessName} (${formData.email})`,
              _captcha: "false",
              _template: "table",
              ...formData
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
        
        setIsSubmitted(true);
      } catch (error) {
        console.error(error);
        alert('There was an error submitting your brief. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Please fill in all required fields before submitting.");
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ padding: '40px 5% 150px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: '60px', textAlign: 'left' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#888', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-color)'} onMouseLeave={e => e.currentTarget.style.color = '#888'}>
            <Home size={18} /> Return to Home
          </Link>
        </div>
        <div className="glass" style={{ padding: '50px' }}>
          <CheckCircle2 size={64} color="var(--accent-color)" style={{ margin: '0 auto 20px' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Brief Received</h2>
          <p style={{ color: '#aaa', fontSize: '1.2rem', lineHeight: '1.6' }}>
            Thank you for submitting your project brief. I have received your specifications and will review them. I will be in touch within 24 hours to schedule a collaboration kickoff call.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 5% 100px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#888', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-color)'} onMouseLeave={e => e.currentTarget.style.color = '#888'}>
          <Home size={18} /> Return to Home
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Project Scoping
        </span>
        <h1 style={{ fontSize: '3rem', marginTop: '5px', marginBottom: '15px', lineHeight: '1.1' }} className="text-gradient">Gig Specification Brief</h1>
        <p style={{ color: '#aaa', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Let's map out your project details. Filling out this questionnaire gives me the technical blueprint needed to prepare your deliverables immediately.
        </p>
      </div>

      <div className="glass" style={{ padding: '40px' }}>
        {/* Progress Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '2px', background: '#333', zIndex: '0', transform: 'translateY(-50%)' }}></div>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} style={{ 
              width: '40px', height: '40px', borderRadius: '50%', 
              background: step >= s ? 'var(--accent-color)' : '#111', 
              color: step >= s ? '#000' : '#666',
              border: `2px solid ${step >= s ? 'var(--accent-color)' : '#333'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: '1',
              transition: 'all 0.3s ease'
            }}>
              {s}
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '15px' }}>
          {step === 1 && "Section A — Contact & General Info"}
          {step === 2 && "Section B — Project Requirements"}
          {step === 3 && "Section C — Branding & Assets"}
          {step === 4 && "Section D — Content & Copy"}
        </h2>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <InputField label="Company or Project Name" name="businessName" formData={formData} handleInputChange={handleInputChange} required placeholder="e.g. Acme Corp or My SaaS Idea" />
              <InputField label="Project Tagline or Slogan" name="tagline" formData={formData} handleInputChange={handleInputChange} placeholder="e.g. AI-driven task manager" />
              <InputField label="Contact Email Address" name="email" type="email" formData={formData} handleInputChange={handleInputChange} required placeholder="email@example.com" />
              <InputField label="Phone Number / WhatsApp" name="phone" formData={formData} handleInputChange={handleInputChange} placeholder="+234..." />
            </div>
            <InputField label="Location / Timezone" name="address" formData={formData} handleInputChange={handleInputChange} placeholder="e.g. Lagos, Nigeria (GMT+1)" />
            <InputField label="Social Media Profiles" name="socialHandles" formData={formData} handleInputChange={handleInputChange} placeholder="LinkedIn, GitHub, X, etc." />
            <InputField label="Industry / Niche" name="industry" formData={formData} handleInputChange={handleInputChange} required placeholder="e.g. HealthTech, FinTech, E-commerce" />
            <InputField label="Target Audience Description" name="audience" type="textarea" formData={formData} handleInputChange={handleInputChange} placeholder="Who are the primary users or customers?" required />
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <InputField label="List of Pages / Views Needed" name="pagesNeeded" type="textarea" formData={formData} handleInputChange={handleInputChange} placeholder="e.g. Homepage, Dashboard, User Settings, Billing" required />
            <InputField label="Primary Goal of this Build" name="primaryGoal" formData={formData} handleInputChange={handleInputChange} placeholder="e.g. Secure user registrations, showcase 3D products, automate client outreach" required />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <InputField label="Domain Name Details" name="domain" formData={formData} handleInputChange={handleInputChange} placeholder="Do you own a domain, or need one?" />
              <InputField label="Preferred Hosting/Deployment Platforms" name="registrar" formData={formData} handleInputChange={handleInputChange} placeholder="e.g. Vercel, Render, AWS" />
            </div>
            <InputField label="Competitors & Inspiration Sites" name="competitors" type="textarea" formData={formData} handleInputChange={handleInputChange} placeholder="Links to 2-3 sites whose UI/UX or flow you like" required />
            
            <div style={{ marginTop: '30px' }}>
              <label style={{ display: 'block', marginBottom: '15px', fontWeight: '600', color: '#fff' }}>Module Checklist (Tick what applies)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                {modulesList.map((mod, idx) => (
                  <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid transparent', transition: 'border 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#333'} onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
                    <input 
                      type="checkbox" 
                      checked={formData.modules.includes(mod)}
                      onChange={() => handleModuleToggle(mod)}
                      style={{ accentColor: 'var(--accent-color)', width: '18px', height: '18px' }}
                    />
                    <span style={{ fontSize: '0.95rem' }}>{mod}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <div style={{ marginBottom: '20px', padding: '15px', background: 'rgba(0, 243, 255, 0.05)', borderRadius: '8px', border: '1px solid rgba(0, 243, 255, 0.2)' }}>
              <p style={{ fontSize: '0.9rem', color: '#aaa', lineHeight: '1.5' }}>
                Note: If you do not have logo or color scheme ready, please note this in 'Design Examples'. I can establish a design system as part of the setup.
              </p>
            </div>
            <InputField label="Brand Colors" name="brandColors" formData={formData} handleInputChange={handleInputChange} placeholder="Hex codes or colors, e.g., #00F3FF, Dark Blue" required />
            <InputField label="Preferred Typography / Fonts" name="fonts" formData={formData} handleInputChange={handleInputChange} placeholder="e.g. Inter, Outfit, Roboto" />
            <InputField label="Brand Tone & Personality" name="brandTone" formData={formData} handleInputChange={handleInputChange} placeholder="e.g. Sleek, professional, futuristic, clean" required />
            <InputField label="Design Inspiration / Examples" name="designExamples" type="textarea" formData={formData} handleInputChange={handleInputChange} placeholder="Links to screenshots, designs, Figma boards..." required />
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div>
            <div style={{ marginBottom: '25px', padding: '15px', background: 'rgba(255, 51, 102, 0.05)', borderRadius: '8px', border: '1px solid rgba(255, 51, 102, 0.2)' }}>
              <p style={{ fontSize: '0.9rem', color: '#ff3366', lineHeight: '1.5', fontWeight: 'bold' }}>
                Providing ready text content accelerates development. Please supply the primary copy or blueprints below.
              </p>
            </div>
            
            <InputField label="Project Core Headline / Main Message" name="homepageHeadline" type="textarea" formData={formData} handleInputChange={handleInputChange} required placeholder="What is the primary text visitors will see first?" />
            <InputField label="Product / About Bio Copy" name="aboutText" type="textarea" formData={formData} handleInputChange={handleInputChange} required placeholder="Detailed description of the company, product or mission..." />
            <InputField label="Deliverables or Features List (Names, details)" name="servicesList" type="textarea" formData={formData} handleInputChange={handleInputChange} required placeholder="Detailed list of services, pricing structure, or SaaS features..." />
            <InputField label="Additional Notes or Role Specifications" name="teamBios" type="textarea" formData={formData} handleInputChange={handleInputChange} placeholder="Any other team bios, dashboard requirements, or specific requests..." />
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', marginTop: '20px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
              <input 
                type="checkbox" 
                name="photosReady"
                checked={formData.photosReady}
                onChange={handleInputChange}
                style={{ accentColor: 'var(--accent-color)', width: '24px', height: '24px' }}
              />
              <span style={{ fontSize: '1.05rem', fontWeight: '600' }}>I confirm I have project assets ready (Minimum: product screenshots, logo outline, or basic visual specs) *</span>
            </label>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #333' }}>
          {step > 1 ? (
            <button onClick={handlePrev} style={{ background: 'transparent', color: '#fff', border: '1px solid #555', padding: '12px 24px', borderRadius: '50px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#222'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <ArrowLeft size={18} /> Back
            </button>
          ) : <div></div>}
          
          {step < 4 ? (
            <button onClick={handleNext} style={{ background: 'var(--accent-color)', color: '#000', border: 'none', padding: '12px 24px', borderRadius: '50px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              Next Step <ArrowRight size={18} />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={isSubmitting} style={{ background: isSubmitting ? '#555' : 'var(--accent-color)', color: isSubmitting ? '#aaa' : '#000', border: 'none', padding: '12px 30px', borderRadius: '50px', cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', fontSize: '1.1rem', transition: 'all 0.2s' }} onMouseEnter={e => { if(!isSubmitting) e.currentTarget.style.transform = 'translateY(-2px)' }} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              {isSubmitting ? 'Submitting...' : 'Submit Brief'} {!isSubmitting && <CheckCircle2 size={20} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GigBriefForm;
