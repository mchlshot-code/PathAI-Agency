import { useState } from 'react';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

const ClientBriefForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Business Info
    businessName: '',
    tagline: '',
    email: '',
    phone: '',
    address: '',
    socialHandles: '',
    industry: '',
    audience: '',
    
    // Step 2: Website Requirements
    pagesNeeded: '',
    primaryGoal: '',
    domain: '',
    registrar: '',
    competitors: '',
    modules: [],
    
    // Step 3: Branding
    logoFile: null,
    brandColors: '',
    fonts: '',
    brandTone: '',
    designExamples: '',
    
    // Step 4: Content
    homepageHeadline: '',
    aboutText: '',
    servicesList: '',
    teamBios: '',
    photosReady: false
  });

  const modulesList = [
    "Product listing and shop",
    "Service pages",
    "Online booking / appointment form",
    "Blog or articles section",
    "Team members page",
    "Webinars or events",
    "Customer login / dashboard",
    "Online payments",
    "Newsletter signup",
    "Contact form",
    "FAQ section"
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
      return formData.pagesNeeded && formData.primaryGoal && formData.domain && formData.competitors;
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
        const response = await fetch('/api/send-brief', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
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
      <div style={{ padding: '150px 5%', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div className="glass" style={{ padding: '50px' }}>
          <CheckCircle2 size={64} color="var(--accent-color)" style={{ margin: '0 auto 20px' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Brief Received</h2>
          <p style={{ color: '#aaa', fontSize: '1.2rem', lineHeight: '1.6' }}>
            Thank you for submitting your project brief. We have received your information and will be in touch within 24 hours to discuss the next steps.
          </p>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line
  const InputField = ({ label, name, type="text", required=false, placeholder="" }) => (
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

  return (
    <div style={{ padding: '100px 5%', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '15px' }} className="text-gradient">Client Project Brief</h1>
        <p style={{ color: '#aaa', fontSize: '1.1rem' }}>Please complete this brief to provide the necessary information for your project.</p>
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
          {step === 1 && "Section A — Business Information"}
          {step === 2 && "Section B — Website Requirements"}
          {step === 3 && "Section C — Branding"}
          {step === 4 && "Section D — Content"}
        </h2>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <InputField label="Business Name" name="businessName" required />
              <InputField label="Business Tagline or Slogan" name="tagline" />
              <InputField label="Business Email" name="email" type="email" required />
              <InputField label="Business Phone" name="phone" />
            </div>
            <InputField label="Business Address" name="address" />
            <InputField label="Social Media Handles" name="socialHandles" placeholder="Instagram, LinkedIn, X, Facebook, TikTok" />
            <InputField label="Industry / Niche" name="industry" required />
            <InputField label="Target Audience Description" name="audience" type="textarea" placeholder="Who do you serve? Age range, location, etc." required />
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <InputField label="List of Pages Needed" name="pagesNeeded" type="textarea" placeholder="Home, About, Services, Contact, etc." required />
            <InputField label="Primary Goal of the Website" name="primaryGoal" placeholder="Bookings, sales, leads, awareness" required />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <InputField label="Domain Name" name="domain" placeholder="Existing or new domain" required />
              <InputField label="Preferred Domain Registrar" name="registrar" placeholder="Namecheap, GoDaddy, etc." />
            </div>
            <InputField label="3 Competitor or Inspiration Websites" name="competitors" type="textarea" placeholder="Links to 3 websites you like or compete with" required />
            
            <div style={{ marginTop: '30px' }}>
              <label style={{ display: 'block', marginBottom: '15px', fontWeight: '600', color: '#fff' }}>Module Checklist (Tick what applies)</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
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
                Note: If you have no branding at all, please note this in the 'Design Examples' section. Branding is a separate deliverable.
              </p>
            </div>
            <InputField label="Brand Colors" name="brandColors" placeholder="Hex codes preferred, e.g., #FFFFFF, #000000" required />
            <InputField label="Preferred Fonts" name="fonts" placeholder="If none, we will select appropriate fonts" />
            <InputField label="Brand Tone" name="brandTone" placeholder="Professional, friendly, bold, minimal, luxury, etc." required />
            <InputField label="Examples of design you like" name="designExamples" type="textarea" placeholder="Screenshots, links, references..." required />
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div>
            <div style={{ marginBottom: '25px', padding: '15px', background: 'rgba(255, 51, 102, 0.05)', borderRadius: '8px', border: '1px solid rgba(255, 51, 102, 0.2)' }}>
              <p style={{ fontSize: '0.9rem', color: '#ff3366', lineHeight: '1.5', fontWeight: 'bold' }}>
                Content is the client's responsibility. Work will not begin on any section until that section's content has been received.
              </p>
            </div>
            
            <InputField label="Homepage Headline and Text" name="homepageHeadline" type="textarea" required />
            <InputField label="About Page Text" name="aboutText" type="textarea" required />
            <InputField label="Services or Products List (Names, descriptions, prices)" name="servicesList" type="textarea" required />
            <InputField label="Team Member Names and Bios (If applicable)" name="teamBios" type="textarea" />
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', marginTop: '20px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
              <input 
                type="checkbox" 
                name="photosReady"
                checked={formData.photosReady}
                onChange={handleInputChange}
                style={{ accentColor: 'var(--accent-color)', width: '24px', height: '24px' }}
              />
              <span style={{ fontSize: '1.05rem', fontWeight: '600' }}>I confirm I have high-quality photos ready (Minimum: logo, 1 hero image, product/service images) *</span>
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

export default ClientBriefForm;
