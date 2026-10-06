"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useConceptNavigation } from "./useConceptNavigation";

const sections = ["salon-home", "salon-services", "salon-book"] as const;
const services = [
  { id: "silk", name: "Wash & silk press", category: "Hair", time: "90 min", price: 18000, description: "A fresh wash, deep care and a soft, polished finish.", mark: "01" },
  { id: "braids", name: "Knotless braids", category: "Hair", time: "3 hours", price: 35000, description: "Lightweight, beautifully parted and made for you.", mark: "02" },
  { id: "nails", name: "The gel manicure", category: "Nails", time: "60 min", price: 12000, description: "Careful shaping. Your colour. A little shine.", mark: "03" },
  { id: "care", name: "Scalp & hair ritual", category: "Care", time: "45 min", price: 15000, description: "A gentle reset for your scalp and natural hair.", mark: "04" }
];
const money = (value: number) => `₦${value.toLocaleString("en-NG")}`;
const times = ["10:00", "11:30", "13:00", "14:30", "16:00"];
const enquiry = "/contact?concept=salon-concept";

function Flower() {
  return <svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.5">{[0, 60, 120, 180, 240, 300].map(angle => <ellipse key={angle} cx="50" cy="30" rx="12" ry="24" transform={`rotate(${angle} 50 50)`} />)}<circle cx="50" cy="50" r="7" /></g></svg>;
}

export function SalonConcept() {
  const { section, navigate } = useConceptNavigation(sections);
  const [filter, setFilter] = useState("All");
  const [serviceId, setServiceId] = useState("");
  const [step, setStep] = useState(0);
  const [date, setDate] = useState("");
  const [today, setToday] = useState("");
  const [time, setTime] = useState("");
  const [stylist, setStylist] = useState("Any stylist");
  const [name, setName] = useState("");
  const service = services.find(item => item.id === serviceId);

  useEffect(() => {
    const now = new Date();
    setToday(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`);
  }, []);

  function choose(id: string) { setServiceId(id); setStep(1); navigate("salon-book"); }
  function details(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (time && service) setStep(2); }
  function reset() { setStep(0); setServiceId(""); setDate(""); setTime(""); setName(""); setStylist("Any stylist"); }

  return <div className="salon">
    <div className="salon-demo"><Link href="/">← PaTH Digital Studio</Link><span>Beauty & wellness · Concept demo</span><Link href={enquiry}>Build something like this ↗</Link></div>
    <div className="salon-wrap">
      <nav className="salon-nav" aria-label="Salon Concept navigation">
        <a href="#salon-home" className="salon-logo" aria-label="Salon Concept home" onClick={event => { event.preventDefault(); navigate("salon-home"); }}>salon<span>.</span><small>CONCEPT</small></a>
        <div className="salon-pages">{[["salon-home", "Home"], ["salon-services", "Services"], ["salon-book", "Book"]].map(([id, label]) => <a key={id} href={`#${id}`} aria-current={section === id ? "page" : undefined} onClick={event => { event.preventDefault(); navigate(id); }}>{label}</a>)}</div>
        <button className="salon-button salon-nav-book" onClick={() => navigate("salon-book")}>Make time for you <span>↗</span></button>
      </nav>
      <main>
        <section className="salon-hero" id="salon-home" hidden={section !== "salon-home"} aria-labelledby="salon-title">
          <div className="salon-hero-copy"><span className="salon-eyebrow">A little care. A beautiful feeling.</span><h1 id="salon-title">Your time.<br /><em>Your glow.</em></h1><p>Hair, nails and a little me-time.<br />Come as you are. Leave feeling like you.</p><div className="salon-hero-actions"><button className="salon-button" onClick={() => navigate("salon-book")}>Find your moment <span>↗</span></button><a href="#salon-services" onClick={event => { event.preventDefault(); navigate("salon-services"); }}>Explore services →</a></div><div className="salon-hero-note"><Flower /><span>Good care.<br /><strong>At your pace.</strong></span></div></div>
          <div className="salon-hero-visual"><div className="salon-photo"><Image src="/concepts/salon/portrait.webp" alt="Sleek, sculpted hair against a warm golden background" fill priority sizes="(max-width: 760px) 55vw, 42vw" /></div><div className="salon-stamp"><Flower /><span>A little<br />me-time.</span></div><div className="salon-caption"><span>THE FEEL-GOOD EDIT</span><b>Beautiful starts with you.</b><button aria-label="Explore hair services" onClick={() => { setFilter("Hair"); navigate("salon-services"); }}>↗</button></div></div>
        </section>
        <section className="salon-services" id="salon-services" hidden={section !== "salon-services"} aria-labelledby="salon-services-title">
          <div className="salon-section-top"><div><span className="salon-eyebrow">Find your feel-good</span><h2 id="salon-services-title">A little something for you.</h2></div><span className="salon-price-note">Sample services & prices</span></div>
          <div className="salon-filters" aria-label="Filter services">{["All", "Hair", "Nails", "Care"].map(value => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}</div>
          <div className="salon-service-grid">{services.filter(item => filter === "All" || item.category === filter).map(item => <article className={`salon-service salon-service-${item.id}`} key={item.id}><div className="salon-service-top"><span>{item.category} / {item.mark}</span><Flower /></div><h3>{item.name}</h3><p>{item.description}</p><div className="salon-service-bottom"><span><b>{money(item.price)}</b><small>{item.time}</small></span><button aria-label={`Choose ${item.name}`} onClick={() => choose(item.id)}>Book this ↗</button></div></article>)}</div>
        </section>
        <section className="salon-book" id="salon-book" hidden={section !== "salon-book"} aria-labelledby="salon-book-title">
          <div className="salon-book-heading"><span className="salon-eyebrow">Booking preview</span><h2 id="salon-book-title">{step === 3 ? "Your preview is ready." : step === 0 ? "What would feel good?" : step === 1 ? "When is your me-time?" : "All about you."}</h2></div>
          <div className="salon-book-layout">
            <aside className="salon-book-summary"><span className="salon-eyebrow">Your little me-time</span><Flower /><h3>{service?.name ?? "Good care starts here."}</h3><p>{service ? `${service.time} · ${money(service.price)}` : "Choose your service, then a time that suits you."}</p>{service && <dl><div><dt>Stylist</dt><dd>{stylist}</dd></div>{date && <div><dt>Date</dt><dd>{new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</dd></div>}{time && <div><dt>Time</dt><dd>{time}</dd></div>}</dl>}<span className="salon-sample">Booking preview · No real appointment</span></aside>
            <div className="salon-book-panel">
              {step < 3 && <ol className="salon-steps" aria-label="Booking progress">{["Service", "Time", "Review"].map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined} className={step >= index ? "reached" : ""}><span>{index + 1}</span>{label}</li>)}</ol>}
              {step === 0 && <div><fieldset className="salon-service-options"><legend className="salon-sr">Choose a service</legend>{services.map(item => <label key={item.id}><input type="radio" name="service" checked={serviceId === item.id} onChange={() => setServiceId(item.id)} /><span><b>{item.name}</b><small>{item.time}</small></span><strong>{money(item.price)}</strong></label>)}</fieldset><button className="salon-button salon-next" disabled={!service} onClick={() => setStep(1)}>Choose a time <span>→</span></button></div>}
              {step === 1 && <form onSubmit={details}><button type="button" className="salon-back" onClick={() => setStep(0)}>← Change service</button><div className="salon-fields"><label>Date<input type="date" name="date" required min={today || undefined} value={date} onChange={event => { setDate(event.target.value); setTime(""); }} /></label><label>Stylist<select aria-label="Stylist" value={stylist} onChange={event => setStylist(event.target.value)}><option>Any stylist</option><option>Ada — sample stylist</option><option>Zainab — sample stylist</option></select></label></div><fieldset className="salon-time-options"><legend>Sample times</legend>{times.map(value => <label key={value}><input type="radio" name="time" required value={value} checked={time === value} onChange={() => setTime(value)} /><span>{value}</span></label>)}</fieldset><label className="salon-name">Name<input name="guest" autoComplete="off" required maxLength={80} placeholder="Use a sample name" value={name} onChange={event => setName(event.target.value)} /></label><button type="button" className="salon-fill" onClick={() => { setDate(today); setTime("10:00"); setName("Demo guest"); }}>Use sample details ↗</button><button className="salon-button salon-next" type="submit">Review your moment <span>→</span></button></form>}
              {step === 2 && service && <div><button className="salon-back" onClick={() => setStep(1)}>← Edit details</button><dl className="salon-review"><div><dt>Guest</dt><dd>{name}</dd></div><div><dt>Service</dt><dd>{service.name}</dd></div><div><dt>Duration</dt><dd>{service.time}</dd></div><div><dt>Date & time</dt><dd>{new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} · {time}</dd></div><div><dt>Stylist</dt><dd>{stylist}</dd></div><div><dt>Total</dt><dd>{money(service.price)}</dd></div></dl><p className="salon-review-note">Try the booking experience with sample details.</p><button className="salon-button salon-next" onClick={() => setStep(3)}>Preview appointment <span>↗</span></button></div>}
              {step === 3 && <div className="salon-complete" role="status"><div className="salon-complete-mark">✓</div><h3>A little moment, just for you.</h3><p>Your sample appointment is complete. No booking was sent and no payment was taken.</p><button className="salon-button" onClick={reset}>Try another service <span>↗</span></button><Link className="salon-build-link" href={enquiry}>Build a salon website like this →</Link></div>}
            </div>
          </div>
        </section>
      </main>
      <footer className="salon-footer"><span>A salon concept by <Link href="/">PaTH Digital Studio ↗</Link></span><details><summary>Photo credit</summary><p><a href="https://unsplash.com/photos/QS9ZX5UnS14" target="_blank" rel="noreferrer">Jessica Felicio / Unsplash</a>. Editorial imagery; no salon affiliation.</p></details></footer>
    </div>
  </div>;
}
