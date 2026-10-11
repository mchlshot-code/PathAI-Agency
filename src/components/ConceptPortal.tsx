"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ConceptPortal({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const router = useRouter();
  const link = useRef<HTMLAnchorElement>(null);
  const overlay = useRef<HTMLDivElement | null>(null);
  const pending = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => { overlay.current?.remove(); clearTimeout(timer.current); }, []);

  async function enter() {
    if (pending.current) return;
    const image = link.current?.querySelector("img");
    if (!image || matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.studioMotion === "off") { router.push(href); return; }
    pending.current = true;
    try {
      const { gsap } = await import("gsap");
      if (!link.current) return;
      const rect = image.getBoundingClientRect();
      const frame = document.createElement("div");
      frame.className = "concept-portal";
      frame.setAttribute("aria-hidden", "true");
      Object.assign(frame.style, { left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` });
      frame.appendChild(image.cloneNode());
      document.body.appendChild(frame);
      overlay.current = frame;
      const scale = Math.max(innerWidth / rect.width, innerHeight / rect.height);
      gsap.to(frame, { x: innerWidth / 2 - rect.left - rect.width / 2, y: innerHeight / 2 - rect.top - rect.height / 2, scale, duration: .38, ease: "power3.inOut", onComplete: () => {
        router.push(href);
        // Route unmount removes the bridge; this handles failed navigation too.
        timer.current = setTimeout(() => { frame.remove(); pending.current = false; }, 1500);
      } });
    } catch { pending.current = false; router.push(href); }
  }

  return <Link ref={link} className="concept-demo" href={href} aria-label={label} onNavigate={event => { event.preventDefault(); void enter(); }}>{children}</Link>;
}
