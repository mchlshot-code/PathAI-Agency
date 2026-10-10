import Link from "next/link";

export function StudioNav({ current }: { current?: "pricing" | "contact" }) {
  return (
    <nav className="nav studio-nav" aria-label="Main navigation">
      <Link href="/" className="brand" aria-label="PaTH Digital Studio home">
        <svg className="brand-mark" viewBox="0 0 72 52" aria-hidden="true" focusable="false">
          <path d="M6 42.5 20.2 9.5h26.3c7.6 0 12.5 4 12.5 10.8 0 9.5-7.1 15.2-18 15.2H29.5l-3 7H6Zm27.7-19.2h9.5c3.3 0 5.3-1.2 5.3-3.4 0-1.8-1.5-2.8-4.6-2.8H36.4l-2.7 6.2Z" fill="currentColor" />
          <path d="M45.8 42.5 55.3 26h10.2L56 42.5H45.8Z" className="brand-accent" />
        </svg>
        <span className="brand-wordmark">PaTH<span>Digital Studio</span></span>
      </Link>
      <div className="nav-right">
        <Link className="nav-link" href="/#work">Work</Link>
        <Link className="nav-link" href="/#build">Services</Link>
        <Link className="nav-link" href="/pricing" aria-current={current === "pricing" ? "page" : undefined}>Pricing</Link>
        <Link className="nav-link nav-contact" href="/contact" aria-current={current === "contact" ? "page" : undefined}>Contact</Link>
      </div>
    </nav>
  );
}
export function StudioFooter() {
  return <footer className="footer"><span>© 2026 PaTH Digital Studio</span><div className="footer-links"><Link href="/#work">Work</Link><Link href="/#build">Services</Link><Link href="/pricing">Pricing</Link><Link href="/contact">Contact</Link></div></footer>;
}
