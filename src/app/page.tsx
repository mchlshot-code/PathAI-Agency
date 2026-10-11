import { ArrowIcon } from "@/components/ArrowIcon";
import { ProjectCard } from "@/components/ProjectCard";
import { HorizontalGallery } from "@/components/HorizontalGallery";
import { HeroMotion } from "@/components/HeroMotion";
import { ServiceExhibit } from "@/components/ServiceExhibit";
import { ConceptPortal } from "@/components/ConceptPortal";
import { featuredProjects } from "@/data/projects";
import Link from "next/link";
import { StudioNav, StudioFooter } from "@/components/StudioNav";
import { formatNaira, websitePackages } from "@/data/packages";

const businessConcepts = [
  { slug: "kitchen", name: "Kitchen Concept", category: "Food & restaurants", image: "/concepts/owan/jollof.webp", alt: "Jollof rice and grilled chicken from the Kitchen Concept" },
  { slug: "salon", name: "Salon Concept", category: "Beauty & wellness", image: "/concepts/salon/portrait.webp", alt: "Sculpted hairstyle from the Salon Concept" },
  { slug: "fashion", name: "Fashion Concept", category: "Fashion & retail", image: "/concepts/fashion/shirt-sand.webp", alt: "Natural linen shirt from the Fashion Concept" },
  { slug: "clinic", name: "Clinic Concept", category: "Health & appointments", image: "/concepts/clinic/reception.webp", alt: "Illustrative reception space for a fictional clinic" },
  { slug: "property", name: "Property Concept", category: "Homes & listings", image: "/concepts/property/interior.webp", alt: "Illustrative apartment interior for a fictional property business" }
];

export default function Home() {
  return <main className="site-shell exhibition-shell"><div className="wrap">
    <StudioNav />
    <HeroMotion><section className="hero" id="main-content" tabIndex={-1} aria-labelledby="hero-title">
      <div className="hero-copy">
        <span className="eyebrow hero-eyebrow">Independent studio / Design × Development</span>
        <h1 className="hero-title" id="hero-title"><span className="hero-line">Good ideas.</span><span className="hero-line hero-accent">Made great.</span></h1>
        <div className="hero-detail"><p>Websites. Apps. Useful technology.</p><div className="hero-actions">
          <Link className="button button-large" href="/contact">Let&apos;s build something <ArrowIcon size={17} /></Link>
          <a className="text-link" href="#work">Explore our work <ArrowIcon size={16} /></a>
        </div></div>
      </div>
      <div className="hero-showcase" aria-label="A selection of our websites and interactive concepts">
        <div className="showcase-orbit" aria-hidden="true"><span>Ideas take shape.</span></div>
        <span className="showcase-note eyebrow">Digital experiences / Built by PaTH</span>
        <Link className="showcase-fashion" href="/concepts/fashion-concept" aria-label="Try the Fashion Concept demo">
          <div className="showcase-browser"><span className="browser-dots" aria-hidden="true"><i /><i /><i /></span><span>fashion — concept store</span><ArrowIcon size={12} /></div>
          <div className="showcase-fashion-content"><span className="showcase-fashion-brand">fashion<span>*</span></span><span className="showcase-fashion-headline">Your style.<br /><em>Your rules.</em></span><img src="/concepts/fashion/shirt-sand.webp" alt="Natural linen shirt in our Fashion Concept storefront" fetchPriority="high" /><span className="showcase-shop">Discover the collection <ArrowIcon size={13} /></span></div>
        </Link>
        <a className="showcase-product" href={featuredProjects[1].url} target="_blank" rel="noreferrer" aria-label="Open Tevo ticketing platform"><div className="showcase-browser"><span className="browser-dots" aria-hidden="true"><i /><i /><i /></span><span>tevo — tickets & experiences</span><ArrowIcon size={12} /></div><img src={featuredProjects[1].image} alt="Tevo ticketing website designed and built by PaTH" /></a>
        <Link className="showcase-stamp" href="#concepts" aria-label="Explore our interactive business concepts"><ArrowIcon size={27} /><span>Try it.<br />Feel it.</span></Link>
        <span className="showcase-caption"><span>Real projects.</span><span>Every detail considered.</span></span>
      </div>
      <div className="hero-foot"><span>Design with intent. Built to work.</span><a href="#work" aria-label="Scroll to Selected Work">Scroll to explore <span aria-hidden="true">↓</span></a></div>
    </section></HeroMotion>

    <section className="section work-section" id="work" data-scene>
      <HorizontalGallery label="Selected work" className="work-grid">{featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</HorizontalGallery>
    </section>

    <section className="section concept-section" id="concepts" data-scene>
      <HorizontalGallery label="Explore by business" className="concept-rail">{businessConcepts.map((concept, index) => <div className={`business-concept concept-${concept.slug}`} key={concept.slug}>
        <ConceptPortal href={`/concepts/${concept.slug}-concept`} label={`Explore the ${concept.name} demo`}>
          <div className="concept-art"><img src={concept.image} alt={concept.alt} loading="lazy" /><span className="concept-number">0{index + 1} / Concept</span><span className="concept-wordmark" aria-hidden="true">{concept.slug}.</span><span className="concept-open" aria-hidden="true"><ArrowIcon size={24} /></span></div>
          <div className="business-concept-info"><div><h3>{concept.name}</h3><span>{concept.category}</span></div><span className="concept-try">Try demo ↗</span></div>
        </ConceptPortal>
        <Link className="text-link concept-enquire" href={`/contact?concept=${concept.slug}-concept`}>Make it your own <ArrowIcon size={14} /></Link>
      </div>)}</HorizontalGallery>
    </section>

    <section className="section starter-section" data-scene aria-labelledby="starter-title">
      <div className="starter-offer">
        <div className="starter-copy"><span className="eyebrow">03 / A simple place to start</span><h2 id="starter-title" data-scene-title>A website.<br /><em>Your next chapter.</em></h2>
          <ul className="starter-inclusions"><li>Up to 3 pages</li><li>Mobile-ready</li><li>WhatsApp enquiries</li><li>Basic SEO</li></ul><Link className="text-link" href="/pricing">Compare packages <ArrowIcon size={15} /></Link>
        </div>
        <div className="starter-buy"><span className="eyebrow">Starter website</span><strong>{formatNaira(websitePackages[0].price)}</strong><p>{formatNaira(websitePackages[0].price / 2)} deposit · 5–7 working days</p><Link className="button" href="/contact?package=starter">Start your website <ArrowIcon size={16} /></Link><small>After deposit and supplied content.<br />Domain and hosting quoted separately.</small></div>
        <span className="starter-watermark" aria-hidden="true">↗</span>
      </div>
    </section>

    <ServiceExhibit />

    <section className="section philosophy" id="studio" data-scene aria-labelledby="studio-title">
      <div className="studio-symbol" data-depth aria-hidden="true"><svg viewBox="0 0 72 52"><path d="M6 42.5 20.2 9.5h26.3c7.6 0 12.5 4 12.5 10.8 0 9.5-7.1 15.2-18 15.2H29.5l-3 7H6Zm27.7-19.2h9.5c3.3 0 5.3-1.2 5.3-3.4 0-1.8-1.5-2.8-4.6-2.8H36.4l-2.7 6.2Z" fill="currentColor" /><path d="M45.8 42.5 55.3 26h10.2L56 42.5H45.8Z" fill="currentColor" /></svg><span>Design / Develop / Deliver</span></div>
      <div className="studio-copy"><span className="eyebrow">05 / PaTH Digital Studio</span><h2 id="studio-title" data-scene-title>Small studio.<br /><em>Big perspective.</em></h2><p>Design and engineering, together.<br />From your first idea to the final detail.</p><Link className="closing-link" href="/contact">Your project could be next.<ArrowIcon size={38} /></Link></div>
    </section>
    <StudioFooter />
  </div></main>;
}
