"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function HorizontalGallery({ label, className, children }: { label: string; className: string; children: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () => setEdges({ start: element.scrollLeft <= 6, end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 6 });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); element.removeEventListener("scroll", update); };
  }, []);

  function move(direction: number) {
    const element = rail.current;
    if (!element) return;
    const card = element.firstElementChild as HTMLElement | null;
    const distance = (card?.offsetWidth ?? element.clientWidth) + (parseFloat(getComputedStyle(element).gap) || 0);
    element.scrollBy({ left: direction * distance, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return <>
    <div className="section-head gallery-heading">
      <span className="eyebrow">{label}</span>
      {!(edges.start && edges.end) && <div className="gallery-controls">
        <button type="button" aria-label={`Previous ${label.toLowerCase()}`} aria-controls={`${className}-rail`} disabled={edges.start} onClick={() => move(-1)}>←</button>
        <button type="button" aria-label={`Next ${label.toLowerCase()}`} aria-controls={`${className}-rail`} disabled={edges.end} onClick={() => move(1)}>→</button>
      </div>}
    </div>
    <div ref={rail} id={`${className}-rail`} className={`horizontal-rail ${className}`} role="region" aria-label={label} tabIndex={0} onKeyDown={event => {
      if (event.target === event.currentTarget && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
    }}>{children}</div>
  </>;
}
