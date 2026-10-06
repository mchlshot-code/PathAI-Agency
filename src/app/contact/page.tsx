import type { Metadata } from "next";
import Link from "next/link";
import { ProjectEnquiry } from "@/components/ProjectEnquiry";

export const metadata: Metadata = {
  title: "Start a project — PaTH Digital Studio",
  description: "Tell PaTH Digital Studio about your next website, app or AI workflow."
};

export default async function Contact({ searchParams }: { searchParams: Promise<{ concept?: string | string[] }> }) {
  const { concept } = await searchParams;
  return (
    <main className="site-shell contact-shell">
      <div className="wrap">
        <header className="contact-header">
          <Link className="text-link" href="/">← Back to the studio</Link>
          <span className="eyebrow">PaTH Digital Studio</span>
        </header>
        <section className="contact-content" aria-labelledby="contact-title">
          <div className="contact-intro">
            <span className="eyebrow">Start a project</span>
            <h1 id="contact-title">Let&apos;s make<br /><em>something good.</em></h1>
            <p>Tell us a little about your idea.<br />We&apos;ll reply by email.</p>
            <a className="contact-email" href="mailto:adewalemchel@gmail.com">adewalemchel@gmail.com ↗</a>
          </div>
          <ProjectEnquiry concept={typeof concept === "string" ? concept : undefined} />
        </section>
        <footer className="footer"><span>© 2026 PaTH Digital Studio</span><Link className="text-link" href="/">Back to the studio ↗</Link></footer>
      </div>
    </main>
  );
}
