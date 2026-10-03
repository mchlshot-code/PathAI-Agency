import { ArrowIcon } from "@/components/ArrowIcon";
import { ProjectCard } from "@/components/ProjectCard";
import { featuredProjects } from "@/data/projects";
import { services } from "@/data/services";

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span>P</span>
      <span className="brand-path">/</span>
    </span>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <div className="wrap">
        <nav className="nav" aria-label="Main navigation">
          <a href="#top" className="brand" aria-label="PaTH Digital Studio home">
            <BrandMark />
            <span>PaTH Digital Studio</span>
          </a>

          <div className="nav-right">
            <a className="nav-link" href="#work">Work</a>
            <a className="nav-link" href="#build">What we build</a>
            <a className="nav-link" href="#studio">Studio</a>
            <a className="button" href="mailto:adewalemchel@gmail.com?subject=Project%20Enquiry%20%E2%80%94%20PaTH%20Digital%20Studio">
              Start a project <ArrowIcon size={15} />
            </a>
          </div>
        </nav>

        <section className="hero" id="top">
          <h1>
            We design and build <span>MVPs, websites, web apps &amp; mobile apps</span> for brands and companies.
          </h1>

          <div className="hero-footer">
            <a className="conversion-link" href="mailto:adewalemchel@gmail.com?subject=Project%20Enquiry%20%E2%80%94%20PaTH%20Digital%20Studio">
              <span className="phone-glyph" aria-hidden="true">▯</span>
              <strong>Turn your website into a mobile app.</strong>
              <span className="round-link"><ArrowIcon size={16} /></span>
            </a>
            <span className="hero-index">Digital products / 2026</span>
          </div>
        </section>

        <section className="section" id="work">
          <div className="section-head">
            <span className="eyebrow">Selected work</span>
            <span className="section-note">Built products. Live on the web.</span>
          </div>

          <div className="work-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className="section" id="build">
          <div className="section-head compact-head">
            <span className="eyebrow">What we build</span>
          </div>

          <div className="service-grid">
            {services.map((service, index) => (
              <div className="service-card" key={service}>
                <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                <strong>{service}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="section philosophy" id="studio">
          <div>
            <span className="eyebrow">Studio</span>
            <h2>We work closely with founders and businesses to turn complex ideas into simple, useful software.</h2>
          </div>
          <div className="studio-mark" aria-hidden="true">
            <span>PaTH</span>
            <span>Ideas → Products</span>
          </div>
        </section>

        <section className="cta" id="contact">
          <div>
            <span className="eyebrow">Let&apos;s build</span>
            <h2>Have something to build?</h2>
          </div>
          <a className="button button-large" href="mailto:adewalemchel@gmail.com?subject=Project%20Enquiry%20%E2%80%94%20PaTH%20Digital%20Studio">
            Start a project <ArrowIcon size={17} />
          </a>
        </section>

        <footer className="footer">
          <span>© 2026 PaTH Digital Studio</span>
          <div className="footer-links">
            <a href="#work">Work</a>
            <a href="#build">Services</a>
            <a href="mailto:adewalemchel@gmail.com?subject=Project%20Enquiry%20%E2%80%94%20PaTH%20Digital%20Studio">Contact</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
