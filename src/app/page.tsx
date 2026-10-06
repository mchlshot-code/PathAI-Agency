import { ArrowIcon } from "@/components/ArrowIcon";
import { ProjectCard } from "@/components/ProjectCard";
import { HorizontalGallery } from "@/components/HorizontalGallery";
import { featuredProjects } from "@/data/projects";
import { needs } from "@/data/services";
import Link from "next/link";

const businessConcepts = [
  { slug: "kitchen", name: "Kitchen Concept", category: "Food & restaurants", image: "/concepts/owan/jollof.webp", alt: "Jollof rice and grilled chicken from the Kitchen Concept" },
  { slug: "salon", name: "Salon Concept", category: "Beauty & wellness", image: "/concepts/salon/portrait.webp", alt: "Sculpted hairstyle from the Salon Concept" },
  { slug: "fashion", name: "Fashion Concept", category: "Fashion & retail", image: "/concepts/fashion/shirt-sand.webp", alt: "Natural linen shirt from the Fashion Concept" }
];

function BrandMark() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 72 52"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6 42.5 20.2 9.5h26.3c7.6 0 12.5 4 12.5 10.8 0 9.5-7.1 15.2-18 15.2H29.5l-3 7H6Zm27.7-19.2h9.5c3.3 0 5.3-1.2 5.3-3.4 0-1.8-1.5-2.8-4.6-2.8H36.4l-2.7 6.2Z"
        fill="currentColor"
      />
      <path
        d="M45.8 42.5 55.3 26h10.2L56 42.5H45.8Z"
        className="brand-accent"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <div className="wrap">
        <nav className="nav" aria-label="Main navigation">
          <a href="#top" className="brand" aria-label="PaTH Digital Studio home">
            <BrandMark /><span className="brand-wordmark">PaTH<span>Digital Studio</span></span>
          </a>

          <div className="nav-right">
            <a className="nav-link" href="#work">Work</a>
            <a className="nav-link" href="#concepts">Demos</a>
            <a className="nav-link" href="#build">What we build</a>
            <a className="nav-link" href="#studio">Studio</a>
            <a className="text-link nav-contact" href="/contact">
              Contact <ArrowIcon size={15} />
            </a>
          </div>
        </nav>

        <section className="hero" id="top">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">Independent studio · Design &amp; technology</span>
            <h1 className="hero-title">
              <span className="hero-line">Good ideas.</span>
              <span className="hero-line hero-accent">Made great.</span>
            </h1>
            <div className="hero-detail">
            <p>Thoughtful design. Useful technology.<br /><span>We turn your next idea into a digital experience worth coming back to.</span></p>
            <div className="hero-actions">
              <a className="button button-large" href="/contact">
                Let&apos;s build something <ArrowIcon size={17} />
              </a>
              <a className="text-link" href="#work">
                See our work <ArrowIcon size={15} />
              </a>
            </div>
            </div>
          </div>
          <div className="hero-showcase" aria-label="A selection of our websites and interactive concepts">
            <div className="showcase-orbit" aria-hidden="true" />
            <span className="showcase-note eyebrow">From first idea to final detail</span>
            <Link className="showcase-fashion" href="/concepts/fashion-concept" aria-label="Try the Fashion Concept demo">
              <div className="showcase-browser"><span className="browser-dots" aria-hidden="true"><i /><i /><i /></span><span>fashion — concept store</span><ArrowIcon size={12} /></div>
              <div className="showcase-fashion-content">
                <span className="showcase-fashion-brand">fashion<span>*</span></span>
                <span className="showcase-fashion-headline">Your style.<br /><em>Your rules.</em></span>
                <img src="/concepts/fashion/shirt-sand.webp" alt="Natural linen shirt in our Fashion Concept storefront" fetchPriority="high" />
                <span className="showcase-shop">Discover the collection <ArrowIcon size={13} /></span>
              </div>
            </Link>
            <a className="showcase-product" href={featuredProjects[1].url} target="_blank" rel="noreferrer" aria-label="Open Tevo ticketing platform">
              <div className="showcase-browser"><span className="browser-dots" aria-hidden="true"><i /><i /><i /></span><span>tevo — tickets &amp; experiences</span><ArrowIcon size={12} /></div>
              <img src={featuredProjects[1].image} alt="Tevo ticketing website designed and built by PaTH" />
            </a>
            <Link className="showcase-stamp" href="#concepts" aria-label="Explore our interactive business concepts"><span>Ideas you<br />can interact with.</span><ArrowIcon size={23} /></Link>
            <span className="showcase-caption"><span>Design that feels right.</span><span>Built to work beautifully.</span></span>
          </div>
        </section>

        <section className="section work-section" id="work">
          <HorizontalGallery label="Selected work" className="work-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </HorizontalGallery>
        </section>

        <section className="section concept-section" id="concepts">
          <HorizontalGallery label="Explore by business" className="concept-rail">
            {businessConcepts.map((concept) => (
              <Link className={`business-concept concept-${concept.slug}`} href={`/concepts/${concept.slug}-concept`} key={concept.slug} aria-label={`Explore the ${concept.name} demo`}>
                <div className="concept-art">
                  <img src={concept.image} alt={concept.alt} loading="lazy" />
                  <span className="concept-wordmark" aria-hidden="true">{concept.slug}.</span>
                </div>
                <div className="business-concept-info">
                  <div><h3>{concept.name}</h3><span>{concept.category}</span></div>
                  <ArrowIcon size={20} />
                </div>
              </Link>
            ))}
          </HorizontalGallery>
        </section>

        <section className="section" id="build">
          <div className="section-head">
            <span className="eyebrow">03 / What we do</span>
            <h2 className="gallery-title">Your next move.<br /><em>Our kind of work.</em></h2>
          </div>

          <div className="needs-grid">
            {needs.map((need, index) => (
              <div className="need-card" key={need.service}>
                <span className="need-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="need-prompt">{need.prompt}</span>
                <strong>{need.service}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="section philosophy" id="studio">
          <span className="eyebrow">PaTH Digital Studio</span>
          <div><h2>Small team.<br />A bigger <em>perspective.</em></h2><p>Design and engineering, working together to make your next idea real.</p></div>
        </section>

        <footer className="footer">
          <span>© 2026 PaTH Digital Studio</span>
          <div className="footer-links">
            <a href="#work">Work</a>
            <a href="#build">Services</a>
            <Link href="/contact">Contact</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
