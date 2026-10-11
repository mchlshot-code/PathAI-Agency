"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useConceptNavigation } from "./useConceptNavigation";

const sections = ["property-home", "property-homes", "property-viewing"] as const;
const homes = [
  { id: "oak", title: "The Oak Apartment", area: "Lekki Phase 1", kind: "Apartment", rooms: 2, size: "118 m²", price: "₦4.8m / year", image: "/concepts/property/interior.webp", description: "An airy living space with warm details and room to settle in." },
  { id: "cove", title: "Cove Residence", area: "Victoria Island", kind: "Apartment", rooms: 3, size: "164 m²", price: "₦7.2m / year", image: "/concepts/property/dining.webp", description: "Open dining, natural light and a central city location." },
  { id: "fern", title: "Fern Townhouse", area: "Ikoyi", kind: "Townhouse", rooms: 3, size: "208 m²", price: "₦10.5m / year", image: "/concepts/property/bedroom.webp", description: "Quiet interiors and extra space for everyday living." }
];

export function PropertyConcept() {
  const { section, navigate } = useConceptNavigation(sections);
  const [area, setArea] = useState("All locations");
  const [kind, setKind] = useState("All homes");
  const [selectedId, setSelectedId] = useState(homes[0].id);
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const shown = homes.filter(home => (area === "All locations" || home.area === area) && (kind === "All homes" || home.kind === kind));
  const selected = homes.find(home => home.id === selectedId) ?? homes[0];
  function seeHome(id: string) { setSelectedId(id); setSent(false); navigate("property-viewing"); }
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  return <div className="demo-page property-demo-page">
    <div className="demo-banner"><Link href="/">← Back to studio</Link><span>Property concept · Interactive preview</span><Link href="/contact?concept=property-concept">Build something similar ↗</Link></div>
    <div className="demo-container"><header className="demo-header"><button className="property-brand" onClick={()=>navigate("property-home")}>dwell<span>.</span><small>PROPERTY CONCEPT</small></button><nav aria-label="Property concept pages">{[["property-home","Home"],["property-homes","Homes"],["property-viewing","Viewing"]].map(([id,label])=><a key={id} href={`#${id}`} aria-current={section===id?"page":undefined} onClick={e=>{e.preventDefault();navigate(id)}}>{label}</a>)}</nav><button className="demo-primary demo-nav-action" onClick={()=>navigate("property-homes")}>Explore homes ↗</button></header>
    <main>
      <section id="property-home" hidden={section!=="property-home"} className="property-hero" aria-labelledby="property-heading"><div className="property-hero-image"><Image src="/concepts/property/interior.webp" alt="Illustrative furnished apartment interior" fill priority sizes="100vw" /><div className="property-hero-shade" /></div><div className="property-hero-copy"><span className="demo-kicker">A place to call your own</span><h1 id="property-heading">Find room for<br /><em>what comes next.</em></h1><p>Explore homes with the details you need before arranging a visit.</p><button className="demo-primary" onClick={()=>navigate("property-homes")}>Browse homes ↗</button></div><div className="property-hero-count">03 <span>sample homes</span></div></section>
      <section id="property-homes" hidden={section!=="property-homes"} className="demo-section" aria-labelledby="homes-heading"><span className="demo-kicker">The collection</span><h2 id="homes-heading">A home for your next chapter.</h2><div className="property-filters"><label>Location<select value={area} onChange={e=>setArea(e.target.value)}><option>All locations</option><option>Lekki Phase 1</option><option>Victoria Island</option><option>Ikoyi</option></select></label><label>Home type<select value={kind} onChange={e=>setKind(e.target.value)}><option>All homes</option><option>Apartment</option><option>Townhouse</option></select></label><span aria-live="polite">{shown.length} {shown.length === 1 ? "home" : "homes"}</span></div><div className="property-grid">{shown.map(home=><article key={home.id} className="property-card"><button className="property-card-image" onClick={()=>seeHome(home.id)} aria-label={`Explore ${home.title}`}><Image src={home.image} alt={`Illustrative interior for ${home.title}`} fill sizes="(max-width: 760px) 90vw, 33vw" /></button><div className="property-card-body"><span className="demo-kicker">{home.area} · {home.kind}</span><h3>{home.title}</h3><p>{home.rooms} bedrooms · {home.size}</p><div><strong>{home.price}</strong><button onClick={()=>seeHome(home.id)}>View details ↗</button></div></div></article>)}</div>{shown.length===0&&<div className="property-empty">No sample homes match these filters. <button onClick={()=>{setArea("All locations");setKind("All homes")}}>Show all homes</button></div>}</section>
      <section id="property-viewing" hidden={section!=="property-viewing"} className="demo-section property-detail" aria-labelledby="property-detail-heading"><div><button className="demo-quiet" onClick={()=>navigate("property-homes")}>← Back to homes</button><div className="property-detail-image"><Image src={selected.image} alt={`Illustrative interior for ${selected.title}`} fill sizes="(max-width: 760px) 100vw, 50vw" /></div></div><div><span className="demo-kicker">{selected.area} · {selected.kind}</span><h2 id="property-detail-heading">{selected.title}</h2><p className="demo-lead">{selected.description}</p><dl className="property-facts"><div><dt>Bedrooms</dt><dd>{selected.rooms}</dd></div><div><dt>Size</dt><dd>{selected.size}</dd></div><div><dt>Sample rent</dt><dd>{selected.price}</dd></div></dl>{sent?<div className="demo-success" role="status"><span>✓</span><h3>Viewing preview ready.</h3><p>{name}, this is how an enquiry for {selected.title} could look. No request was sent.</p><button className="demo-quiet" onClick={()=>{setSent(false);setName("")}}>Try again ↗</button></div>:<form className="demo-form" onSubmit={submit}><h3>Arrange a viewing</h3><label>Your name<input required maxLength={80} placeholder="Use a sample name" autoComplete="off" value={name} onChange={e=>setName(e.target.value)} /></label><p className="demo-form-note">Preview only. No viewing is booked and no information is sent.</p><button className="demo-primary" type="submit">Preview enquiry ↗</button></form>}</div></section>
    </main><footer className="demo-footer"><span>Fictional homes · Illustrative imagery and prices · No real listings</span><Link href="/contact?concept=property-concept">Discuss your property website ↗</Link></footer></div>
  </div>;
}
