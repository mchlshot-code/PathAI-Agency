"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (from: number, to: number, value: number) => {
  const progress = clamp((value - from) / (to - from));
  return progress * progress * (3 - 2 * progress);
};

export function HeroMotion({ children }: { children: ReactNode }) {
  const chapter = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = chapter.current;
    if (!element) return;

    const query = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fashion = element.querySelector<HTMLElement>(".showcase-fashion");
    const product = element.querySelector<HTMLElement>(".showcase-product");
    const orbit = element.querySelector<HTMLElement>(".showcase-orbit");
    const stamp = element.querySelector<HTMLElement>(".showcase-stamp");
    const copy = element.querySelector<HTMLElement>(".hero-copy");
    if (!fashion || !product || !orbit || !stamp || !copy) return;

    let frame = 0;
    const reset = () => {
      element.classList.remove("hero-chapter-motion");
      element.classList.remove("hero-chapter-mobile-motion");
      for (const item of [fashion, product, orbit, stamp, copy]) {
        item.style.removeProperty("transform");
        item.style.removeProperty("opacity");
      }
    };

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) return;
      const top = element.getBoundingClientRect().top;
      if (!query.matches) {
        const progress = clamp((76 - top) / Math.max(1, element.offsetHeight * 0.75));
        fashion.style.transform = `translate3d(0, ${-20 * progress}px, 0) rotate(${6 - 3 * progress}deg) scale(${1 + 0.08 * progress})`;
        product.style.transform = `translate3d(0, ${14 * progress}px, 0) rotate(${-6 - 3 * progress}deg)`;
        orbit.style.transform = `translate3d(0, ${-12 * progress}px, 0)`;
        return;
      }
      const range = Math.max(1, element.offsetHeight - (window.innerHeight - 88));
      const progress = clamp((88 - top) / range);
      const approach = ease(0.12, 0.76, progress);
      const focus = ease(0.3, 0.96, progress);

      fashion.style.transform = `translate3d(${-Math.min(230, window.innerWidth * 0.18) * focus}px, ${62 * focus}px, 0) rotate(${6 * (1 - focus)}deg) scale(${1 + 1.72 * focus})`;
      product.style.transform = `translate3d(${-72 * approach}px, ${115 * approach}px, 0) rotate(${-6 - 8 * approach}deg) scale(${1 - 0.17 * approach})`;
      product.style.opacity = String(1 - ease(0.42, 0.77, progress));
      orbit.style.transform = `translate3d(${22 * approach}px, ${-30 * approach}px, 0) scale(${1 + 0.28 * approach})`;
      orbit.style.opacity = String(1 - 0.82 * approach);
      stamp.style.opacity = String(1 - ease(0.28, 0.64, progress));
      copy.style.transform = `translate3d(0, ${-28 * approach}px, 0)`;
      copy.style.opacity = String(1 - 0.72 * ease(0.34, 0.82, progress));
    };

    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const configure = () => {
      reset();
      if (!reducedMotion.matches) {
        element.classList.add(query.matches ? "hero-chapter-motion" : "hero-chapter-mobile-motion");
        schedule();
      }
    };

    query.addEventListener("change", configure);
    reducedMotion.addEventListener("change", configure);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", configure);
    configure();
    return () => {
      cancelAnimationFrame(frame);
      query.removeEventListener("change", configure);
      reducedMotion.removeEventListener("change", configure);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", configure);
      reset();
    };
  }, []);

  return <div className="hero-chapter" ref={chapter}>{children}</div>;
}
