"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

export function HorizontalGallery({ label, className, children }: { label: string; className: string; children: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () => {
      const distance = Math.max(0, element.scrollWidth - element.clientWidth);
      const start = element.scrollLeft <= 6;
      const end = element.scrollLeft >= distance - 6;
      setEdges(previous => previous.start === start && previous.end === end ? previous : { start, end });
      if (progress.current) progress.current.style.transform = `scaleX(${distance ? Math.max(0.12, Math.min(1, element.scrollLeft / distance)) : 1})`;
    };
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
      <div><span className="eyebrow">{className === "work-grid" ? "01 / A few things we've made" : "02 / Find your starting point"}</span><h2 className="gallery-title">{label}</h2></div>
    </div>
    <div ref={rail} id={`${className}-rail`} className={`horizontal-rail ${className}`} role="region" aria-label={label} tabIndex={0} onKeyDown={event => {
      if (event.target === event.currentTarget && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
    }}>{children}</div>
    <div className="gallery-footer">
      <span>{Children.count(children)} {className === "work-grid" ? "projects" : "concepts"}</span>
      <div className="gallery-progress" aria-hidden="true"><span ref={progress} /></div>
      {!(edges.start && edges.end) && <div className="gallery-controls">
        <button type="button" aria-label={`Previous ${label.toLowerCase()}`} aria-controls={`${className}-rail`} disabled={edges.start} onClick={() => move(-1)}>←</button>
        <button type="button" aria-label={`Next ${label.toLowerCase()}`} aria-controls={`${className}-rail`} disabled={edges.end} onClick={() => move(1)}>→</button>
      </div>}
    </div>
  </>;
}
