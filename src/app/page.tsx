import { ArrowIcon } from "@/components/ArrowIcon";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectEnquiry } from "@/components/ProjectEnquiry";
import { featuredProjects } from "@/data/projects";
import { needs } from "@/data/services";

function BrandMark() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M13 49 27 16h18c8.2 0 13 4.1 13 10.9 0 8.7-6.5 14.1-16.4 14.1H29.8L26.3 49H13Zm19.9-20.1h10.4c2.4 0 4-1.1 4-3 0-1.8-1.2-2.7-3.7-2.7h-8.4l-2.3 5.7Z"
        fill="currentColor"
      />
      <path d="m37.5 51 8.8-15.2h7.9L45.5 51h-8Z" className="brand-accent" />
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
            <a className="nav-link" href="#build">What we build</a>
            <a className="nav-link" href="#studio">Studio</a>
            <a className="button nav-cta" href="#enquiry">
              Start a project <ArrowIcon size={15} />
            </a>
          </div>
        </nav>

        <section className="hero" id="top">
          <h1>
            We design and build <span>MVPs, websites, web apps &amp; mobile apps</span> for brands and companies.
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
          <div className="section-head">
            <span className="eyebrow">Selected work</span>
          </div>

          <div className="work-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
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
