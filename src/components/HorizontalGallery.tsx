"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

export function HorizontalGallery({ label, className, children }: { label: string; className: string; children: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ start: true, end: true, index: 1 });
  const count = Children.count(children);
  const work = className === "work-grid";

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = Math.max(0, element.scrollWidth - element.clientWidth);
      const bounds = element.getBoundingClientRect();
      const cards = Array.from(element.children) as HTMLElement[];
      let closest = Infinity;
      let index = 1;
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const delta = Math.abs(rect.left - bounds.left);
        if (delta < closest) { closest = delta; index = i + 1; }
        const pan = query.matches || document.documentElement.dataset.studioMotion === "off" ? 0 : Math.max(-1, Math.min(1, (rect.left + rect.width / 2 - bounds.left - bounds.width / 2) / bounds.width)) * 12;
        card.style.setProperty("--gallery-pan", `${pan}px`);
      });
      const start = element.scrollLeft <= 6;
      const end = element.scrollLeft >= distance - 6;
      if (end && distance > 0) index = count;
      setPosition(previous => previous.start === start && previous.end === end && previous.index === index ? previous : { start, end, index });
      if (progress.current) progress.current.style.transform = `scaleX(${distance ? Math.max(1 / count, Math.min(1, (element.scrollLeft + element.clientWidth / count) / distance)) : 1})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(element);
    element.addEventListener("scroll", schedule, { passive: true });
    query.addEventListener("change", schedule);
    window.addEventListener("studio-motion-change", schedule);
    update();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); element.removeEventListener("scroll", schedule); query.removeEventListener("change", schedule); window.removeEventListener("studio-motion-change", schedule); };
  }, [count]);

  function move(direction: number) {
    const element = rail.current;
    if (!element) return;
    const cards = Array.from(element.children) as HTMLElement[];
    const left = element.getBoundingClientRect().left;
    const current = cards.reduce((best, card, index) => Math.abs(card.getBoundingClientRect().left - left) < Math.abs(cards[best].getBoundingClientRect().left - left) ? index : best, 0);
    const target = cards[Math.max(0, Math.min(cards.length - 1, current + direction))];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.studioMotion === "off";
    element.scrollTo({ left: element.scrollLeft + target.getBoundingClientRect().left - left, behavior: reduced ? "instant" : "smooth" });
  }

  return <>
    <div className="section-head gallery-heading">
      <div><span className="eyebrow">{work ? "01 / Selected projects" : "02 / Interactive concepts"}</span><h2 className="gallery-title" data-scene-title>{work ? <>Selected<br /><em>work.</em></> : <>Your business.<br /><em>In a new light.</em></>}</h2></div>
      <a className="gallery-jump text-link" href={work ? "#concepts" : "/contact"}>{work ? "Try our concepts" : "Discuss your business"}<span aria-hidden="true">↗</span></a>
    </div>
    <div ref={rail} id={`${className}-rail`} className={`horizontal-rail ${className}`} role="region" aria-label={label} tabIndex={0} onKeyDown={event => {
      if (event.target === event.currentTarget && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
    }}>{children}</div>
    <div className="gallery-footer">
      <span className="gallery-index"><b>{String(position.index).padStart(2, "0")}</b> / {String(count).padStart(2, "0")}</span>
      <span className="gallery-hint">Swipe or use the arrows</span>
      <div className="gallery-progress" aria-hidden="true"><span ref={progress} /></div>
      {!(position.start && position.end) && <div className="gallery-controls">
        <button type="button" aria-label={`Previous ${label.toLowerCase()}`} aria-controls={`${className}-rail`} disabled={position.start} onClick={() => move(-1)}>←</button>
        <button type="button" aria-label={`Next ${label.toLowerCase()}`} aria-controls={`${className}-rail`} disabled={position.end} onClick={() => move(1)}>→</button>
      </div>}
    </div>
  </>;
}
