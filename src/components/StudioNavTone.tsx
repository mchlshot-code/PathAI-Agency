"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Navigation follows the surface beneath it, independently of motion settings.
export function StudioNavTone() {
  const pathname = usePathname();
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".studio-nav");
    const lightSection = document.querySelector<HTMLElement>(".concept-section");
    if (!nav || !lightSection) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = lightSection.getBoundingClientRect();
      const edge = nav.getBoundingClientRect().bottom;
      nav.classList.toggle("nav-light", section.top <= edge && section.bottom > edge);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(nav);
    observer.observe(lightSection);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("studio-motion-change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("studio-motion-change", schedule);
      nav.classList.remove("nav-light");
    };
  }, [pathname]);
  return null;
}
