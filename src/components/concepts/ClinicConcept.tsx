"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useConceptNavigation } from "./useConceptNavigation";

const sections = ["clinic-home", "clinic-care", "clinic-visit"] as const;
const care = [
  { name: "General consultation", group: "Everyday care", detail: "A first conversation about your health and next steps.", duration: "30 minutes" },
  { name: "Health screening", group: "Prevention", detail: "Routine checks and a clear explanation of your results.", duration: "45 minutes" },
  { name: "Women's health", group: "Specialist care", detail: "A private consultation for questions and ongoing care.", duration: "40 minutes" },
  { name: "Child wellness", group: "Family care", detail: "A calm visit to discuss your child's health and development.", duration: "30 minutes" }
];

export function ClinicConcept() {
  const { section, navigate } = useConceptNavigation(sections);
  const [selected, setSelected] = useState(care[0].name);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  function request(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }
  function choose(service: string) { setSelected(service); setSubmitted(false); navigate("clinic-visit"); }
  return <div className="demo-page clinic-demo-page">
    <div className="demo-banner"><Link href="/">← Back to studio</Link><span>Clinic concept · Interactive preview</span><Link href="/contact?concept=clinic-concept">Build something similar ↗</Link></div>
    <div className="demo-container">
      <header className="demo-header"><button className="clinic-brand" onClick={() => navigate("clinic-home")} aria-label="Clinic concept home">well<span>.</span><small>CLINIC CONCEPT</small></button><nav aria-label="Clinic concept pages">{[["clinic-home","Home"],["clinic-care","Services"],["clinic-visit","Visit"]].map(([id,label])=><a key={id} href={`#${id}`} aria-current={section===id?"page":undefined} onClick={e=>{e.preventDefault();navigate(id)}}>{label}</a>)}</nav><button className="demo-primary demo-nav-action" onClick={() => navigate("clinic-visit")}>Request a visit ↗</button></header>
      <main>
        <section id="clinic-home" hidden={section!=="clinic-home"} className="clinic-hero" aria-labelledby="clinic-heading"><div className="clinic-intro"><span className="demo-kicker">Care, made clearer</span><h1 id="clinic-heading">Feel at ease.<br /><em>Find your care.</em></h1><p>See what we offer, plan your visit and find the information you need in one calm place.</p><div className="demo-actions"><button className="demo-primary" onClick={()=>navigate("clinic-care")}>Explore services ↗</button><button className="demo-quiet" onClick={()=>navigate("clinic-visit")}>Plan a visit →</button></div><div className="clinic-hours"><span>OPENING HOURS</span><strong>Mon–Fri · 8:00–17:00</strong><span>Saturday · 9:00–14:00</span></div></div><div className="clinic-visual"><Image src="/concepts/clinic/reception.webp" alt="Illustrative reception for the fictional clinic" fill priority sizes="(max-width: 760px) 100vw, 50vw" /><div className="clinic-visual-note"><span>01 / FIND YOUR WAY</span><strong>Better information.<br />A calmer visit.</strong></div></div></section>
        <section id="clinic-care" hidden={section!=="clinic-care"} className="demo-section" aria-labelledby="care-heading"><span className="demo-kicker">The care you need</span><h2 id="care-heading">Start with the right service.</h2><p className="demo-lead">Explore a few sample services, then try the visit request.</p><div className="clinic-service-list">{care.map((item,i)=><article key={item.name}><span className="clinic-service-number">0{i+1}</span><div><span className="demo-kicker">{item.group}</span><h3>{item.name}</h3><p>{item.detail}</p></div><div className="clinic-service-end"><small>{item.duration}</small><button onClick={()=>choose(item.name)}>Request this service ↗</button></div></article>)}</div></section>
        <section id="clinic-visit" hidden={section!=="clinic-visit"} className="demo-section clinic-visit" aria-labelledby="visit-heading"><div><span className="demo-kicker">Plan a visit</span><h2 id="visit-heading">A simple first step.</h2><p className="demo-lead">Choose a service and see how an enquiry could work. This is a preview; no message is sent.</p><div className="clinic-contact-info"><span>Sample location</span><strong>Lagos, Nigeria</strong><span>Opening hours</span><strong>Mon–Fri 8:00–17:00 · Sat 9:00–14:00</strong></div></div><form className="demo-form" onSubmit={request}>{submitted?<div role="status" className="demo-success"><span>✓</span><h3>Preview complete.</h3><p>{name}, your sample request for {selected} is ready. No appointment was made and no details were sent.</p><button type="button" className="demo-primary" onClick={()=>{setSubmitted(false);setName("");setContact("")}}>Try another enquiry ↗</button></div>:<><span className="demo-kicker">Visit request preview</span><h3>Tell us what you need.</h3><label>Service<select value={selected} onChange={e=>setSelected(e.target.value)}>{care.map(item=><option key={item.name}>{item.name}</option>)}</select></label><label>Your name<input required maxLength={80} autoComplete="off" placeholder="Use a sample name" value={name} onChange={e=>setName(e.target.value)} /></label><label>Contact preference<select value={contact} onChange={e=>setContact(e.target.value)} required><option value="">Choose one</option><option>Phone call</option><option>Email</option></select></label><p className="demo-form-note">Do not enter medical or personal contact details. This demo does not send information.</p><button className="demo-primary" type="submit">Preview request ↗</button></>}</form></section>
      </main><footer className="demo-footer"><span>Fictional clinic · Concept imagery · No real appointments</span><Link href="/contact?concept=clinic-concept">Discuss your clinic website ↗</Link></footer>
    </div>
  </div>;
}
