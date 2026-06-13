import { useState } from 'react';
import { CheckCircle2, ArrowRight, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const InputField = ({ label, name, type="text", required=false, placeholder="", formData, handleInputChange }) => (
  <div className="mb-5">
    <label className="block mb-2 font-bold text-stelvio-white">
      {label} {required && <span className="text-stelvio-accent">*</span>}
    </label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full bg-[#111] border border-stelvio-border p-3 rounded-lg text-stelvio-white outline-none min-h-[100px] font-mono focus:border-stelvio-gray transition-colors resize-y"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full bg-[#111] border border-stelvio-border p-3 rounded-lg text-stelvio-white outline-none font-mono focus:border-stelvio-gray transition-colors"
      />
    )}
  </div>
);

const GigBriefForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '', tagline: '', email: '', phone: '', address: '', socialHandles: '', industry: '', audience: '',
    pagesNeeded: '', primaryGoal: '', domain: '', registrar: '', competitors: '', modules: [],
    brandColors: '', fonts: '', brandTone: '', designExamples: '',
    homepageHeadline: '', aboutText: '', servicesList: '', teamBios: '', photosReady: false
  });

  const modulesList = [
    "Interactive 3D Elements", "WebGL / Three.js Scene", "n8n / Make Automation Setup",
    "OpenAI / LLM Integration", "Stripe / Payment Gateway", "User Auth & Accounts",
    "Dashboard UI", "Database (PostgreSQL / Supabase)", "Contact / Booking Forms",
    "CMS (Content Management)", "API Development / Documentation"
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
    if (step === 1) return formData.businessName && formData.email && formData.industry && formData.audience;
    if (step === 2) return formData.pagesNeeded && formData.primaryGoal && formData.competitors;
    if (step === 3) return formData.brandColors && formData.brandTone && formData.designExamples;
    if (step === 4) return formData.homepageHeadline && formData.aboutText && formData.servicesList && formData.photosReady;
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
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ _subject: `New Gig Brief: ${formData.businessName} (${formData.email})`, _captcha: "false", _template: "table", ...formData })
        });
        const data = await response.json().catch(() => null);
        if (!response.ok || (data && data.success === "false")) throw new Error(data?.message || 'Failed to submit form');
        setIsSubmitted(true);
      } catch (error) {
        alert(`Error: ${error.message}.`);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Please fill in all required fields before submitting.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-stelvio-dark min-h-screen font-mono text-stelvio-gray px-6 md:px-12 lg:px-24 py-20 pb-40 text-center">
        <div className="mb-16 text-left max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-stelvio-gray hover:text-stelvio-white transition-colors font-bold">
            <Home size={18} /> Return to Home
          </Link>
        </div>
        <div className="max-w-2xl mx-auto bg-stelvio-card border border-stelvio-border rounded-lg p-12 text-center">
          <CheckCircle2 size={64} className="text-stelvio-gray mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-stelvio-white mb-6">Brief Received</h2>
          <p className="text-lg leading-relaxed text-stelvio-gray">
            Thank you for submitting your project brief. I have received your specifications and will review them. I will be in touch within 24 hours to schedule a collaboration kickoff call.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stelvio-dark min-h-screen font-mono text-stelvio-gray px-6 md:px-12 lg:px-24 py-10 pb-24 selection:bg-stelvio-white selection:text-stelvio-dark">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-stelvio-gray hover:text-stelvio-white transition-colors font-bold">
            <Home size={18} /> Return to Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="text-xs font-bold text-stelvio-gray uppercase tracking-widest block mb-2">Project Scoping</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stelvio-white mb-4">Gig Specification Brief</h1>
          <p className="text-base text-stelvio-gray max-w-xl mx-auto leading-relaxed">
            Let's map out your project details. Filling out this questionnaire gives me the technical blueprint needed to prepare your deliverables immediately.
          </p>
        </div>

        <div className="bg-stelvio-card border border-stelvio-border rounded-lg p-6 md:p-10">
          <div className="flex justify-between items-center mb-10 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stelvio-border -translate-y-1/2 z-0"></div>
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 transition-colors border-2 ${
                step >= s ? 'bg-stelvio-white text-stelvio-dark border-stelvio-white' : 'bg-[#111] text-stelvio-gray border-stelvio-border'
              }`}>
                {s}
              </div>
            ))}
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-stelvio-white mb-8 pb-4 border-b border-stelvio-border">
            {step === 1 && "Section A — Contact & General Info"}
            {step === 2 && "Section B — Project Requirements"}
            {step === 3 && "Section C — Branding & Assets"}
            {step === 4 && "Section D — Content & Copy"}
          </h2>

          {step === 1 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
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

          {step === 2 && (
            <div>
              <InputField label="List of Pages / Views Needed" name="pagesNeeded" type="textarea" formData={formData} handleInputChange={handleInputChange} placeholder="e.g. Homepage, Dashboard, User Settings, Billing" required />
              <InputField label="Primary Goal of this Build" name="primaryGoal" formData={formData} handleInputChange={handleInputChange} placeholder="e.g. Secure user registrations, showcase 3D products, automate client outreach" required />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                <InputField label="Domain Name Details" name="domain" formData={formData} handleInputChange={handleInputChange} placeholder="Do you own a domain, or need one?" />
                <InputField label="Preferred Hosting/Deployment Platforms" name="registrar" formData={formData} handleInputChange={handleInputChange} placeholder="e.g. Vercel, Render, AWS" />
              </div>
              <InputField label="Competitors & Inspiration Sites" name="competitors" type="textarea" formData={formData} handleInputChange={handleInputChange} placeholder="Links to 2-3 sites whose UI/UX or flow you like" required />
              
              <div className="mt-8">
                <label className="block mb-4 font-bold text-stelvio-white">Module Checklist (Tick what applies)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {modulesList.map((mod, idx) => (
                    <label key={idx} className="flex items-center gap-3 cursor-pointer p-3 bg-[#111] hover:border-stelvio-gray border border-transparent rounded-lg transition-colors">
                      <input 
                        type="checkbox" 
                        checked={formData.modules.includes(mod)}
                        onChange={() => handleModuleToggle(mod)}
                        className="w-4 h-4 accent-stelvio-gray"
                      />
                      <span className="text-sm">{mod}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="mb-6 p-4 bg-[#111] rounded-lg border border-stelvio-border">
                <p className="text-sm text-stelvio-gray leading-relaxed">
                  Note: If you do not have logo or color scheme ready, please note this in 'Design Examples'. I can establish a design system as part of the setup.
                </p>
              </div>
              <InputField label="Brand Colors" name="brandColors" formData={formData} handleInputChange={handleInputChange} placeholder="Hex codes or colors, e.g., #00F3FF, Dark Blue" required />
              <InputField label="Preferred Typography / Fonts" name="fonts" formData={formData} handleInputChange={handleInputChange} placeholder="e.g. Inter, Outfit, Roboto" />
              <InputField label="Brand Tone & Personality" name="brandTone" formData={formData} handleInputChange={handleInputChange} placeholder="e.g. Sleek, professional, futuristic, clean" required />
              <InputField label="Design Inspiration / Examples" name="designExamples" type="textarea" formData={formData} handleInputChange={handleInputChange} placeholder="Links to screenshots, designs, Figma boards..." required />
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="mb-6 p-4 bg-red-900/10 rounded-lg border border-red-900/30">
                <p className="text-sm text-red-400 font-bold leading-relaxed">
                  Providing ready text content accelerates development. Please supply the primary copy or blueprints below.
                </p>
              </div>
              <InputField label="Project Core Headline / Main Message" name="homepageHeadline" type="textarea" formData={formData} handleInputChange={handleInputChange} required placeholder="What is the primary text visitors will see first?" />
              <InputField label="Product / About Bio Copy" name="aboutText" type="textarea" formData={formData} handleInputChange={handleInputChange} required placeholder="Detailed description of the company, product or mission..." />
              <InputField label="Deliverables or Features List" name="servicesList" type="textarea" formData={formData} handleInputChange={handleInputChange} required placeholder="Detailed list of services, pricing structure, or SaaS features..." />
              <InputField label="Additional Notes or Role Specifications" name="teamBios" type="textarea" formData={formData} handleInputChange={handleInputChange} placeholder="Any other team bios, dashboard requirements, or specific requests..." />
              
              <label className="flex items-start gap-4 cursor-pointer mt-6 p-5 bg-[#111] rounded-lg">
                <input 
                  type="checkbox" 
                  name="photosReady"
                  checked={formData.photosReady}
                  onChange={handleInputChange}
                  className="w-5 h-5 accent-stelvio-gray mt-1"
                />
                <span className="text-base font-bold text-stelvio-white">I confirm I have project assets ready (Minimum: product screenshots, logo outline, or basic visual specs) *</span>
              </label>
            </div>
          )}

          <div className="flex justify-between items-center mt-10 pt-6 border-t border-stelvio-border">
            {step > 1 ? (
              <button onClick={handlePrev} className="px-6 py-3 border border-stelvio-border text-stelvio-white rounded-full flex items-center gap-2 font-bold hover:bg-[#222] transition-colors">
                <ArrowLeft size={18} /> Back
              </button>
            ) : <div />}
            
            {step < 4 ? (
              <button onClick={handleNext} className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#222] border border-stelvio-border text-stelvio-white rounded-full flex items-center gap-2 font-bold transition-colors">
                Next Step <ArrowRight size={18} />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={isSubmitting} className="px-8 py-3 bg-stelvio-white hover:bg-gray-200 text-stelvio-dark disabled:bg-gray-500 disabled:text-gray-300 rounded-full flex items-center gap-2 font-bold text-lg transition-colors">
                {isSubmitting ? 'Submitting...' : 'Submit Brief'} {!isSubmitting && <CheckCircle2 size={20} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigBriefForm;
