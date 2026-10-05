import { ArrowIcon } from "@/components/ArrowIcon";
import { ProjectCard } from "@/components/ProjectCard";
import { HorizontalGallery } from "@/components/HorizontalGallery";
import { ProjectEnquiry } from "@/components/ProjectEnquiry";
import { featuredProjects } from "@/data/projects";
import { needs } from "@/data/services";
import Link from "next/link";

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
            <BrandMark />
          </a>

          <div className="nav-right">
            <a className="nav-link" href="#work">Work</a>
            <a className="nav-link" href="#concepts">Demos</a>
            <a className="nav-link" href="#build">What we build</a>
            <a className="nav-link" href="#studio">Studio</a>
            <a className="button nav-cta" href="#enquiry">
              Start a project <ArrowIcon size={15} />
            </a>
          </div>
        </nav>

        <section className="hero" id="top">
          <h1 className="hero-title">
            <span className="hero-line hero-primary">We design and build</span>
            <span className="hero-line hero-feature hero-feature-one">
              MVPs, websites, web &amp; mobile apps,
            </span>
            <span className="hero-line hero-feature hero-feature-two">
              AI workflows &amp; automations
            </span>
            <span className="hero-line hero-primary">for brands and companies.</span>
          </h1>

          <div className="hero-actions">
            <a className="button button-large" href="#enquiry">
              Start a project <ArrowIcon size={17} />
            </a>
            <a className="text-link" href="#work">
              See our work <ArrowIcon size={15} />
            </a>
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
          <div className="business-concept">
            <Link href="/concepts/kitchen-concept" className="business-concept-preview" aria-label="Explore the Kitchen Concept restaurant demo">
              <span className="concept-preview-brand">kitchen.</span>
              <span className="concept-preview-title">Good food.<br /><span>Better mood.</span></span>
              <img src="/concepts/owan/jollof.webp" alt="Nigerian jollof rice and grilled chicken from the Kitchen Concept concept" loading="lazy" />
              <span className="project-open" aria-hidden="true"><ArrowIcon size={18} /></span>
            </Link>
            <div className="business-concept-info">
              <span className="eyebrow">Food &amp; restaurants · Concept demo</span>
              <h2>Kitchen Concept.</h2>
              <p>Browse the menu, make a meal your own, and try checkout.</p>
              <Link className="button" href="/concepts/kitchen-concept">Explore the demo <ArrowIcon size={16} /></Link>
              <a className="text-link" href="/?concept=kitchen-concept#enquiry">Build something like this <ArrowIcon size={15} /></a>
            </div>
          </div>
          </HorizontalGallery>
        </section>

        <section className="section" id="build">
          <div className="section-head">
            <span className="eyebrow">What do you need built?</span>
          </div>

          <div className="needs-grid">
            {needs.map((need, index) => (
              <a className="need-card" href="#enquiry" key={need.service}>
                <span className="need-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="need-prompt">{need.prompt}</span>
                <strong>{need.service}</strong>
                <span className="need-arrow"><ArrowIcon size={17} /></span>
              </a>
            ))}
          </div>
        </section>

        <section className="section philosophy" id="studio">
          <span className="eyebrow">PaTH Digital Studio</span>
          <h2>We work closely with founders and businesses to turn complex ideas into simple, useful software.</h2>
        </section>

        <section className="section enquiry-section" id="enquiry">
          <div className="enquiry-intro">
            <span className="eyebrow">Start a project</span>
            <h2>Tell us what you&apos;re building.</h2>
          </div>
          <ProjectEnquiry />
        </section>

        <footer className="footer">
          <span>© 2026 PaTH Digital Studio</span>
          <div className="footer-links">
            <a href="#work">Work</a>
            <a href="#build">Services</a>
            <a href="mailto:adewalemchel@gmail.com">Email</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
