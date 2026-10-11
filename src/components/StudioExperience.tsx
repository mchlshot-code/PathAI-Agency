"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function StudioExperience() {
  const pathname = usePathname();
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    try { document.documentElement.dataset.studioMotion = localStorage.getItem("path-studio-motion") === "off" ? "off" : "on"; } catch { /* Storage is optional. */ }
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      let media = gsap.matchMedia();
      const configure = (event?: Event) => {
        const anchor = event ? [...document.querySelectorAll<HTMLElement>(".site-shell section[id]")].reverse().find(section => section.getBoundingClientRect().top <= innerHeight * .45) : undefined;
        const previousTop = anchor?.getBoundingClientRect().top;
        media.revert();
        document.body.classList.remove("motion-running");
        if (document.documentElement.dataset.studioMotion === "off") {
          if (anchor && previousTop !== undefined) window.scrollBy({ top: anchor.getBoundingClientRect().top - previousTop, behavior: "instant" });
          return;
        }
        media = gsap.matchMedia();
        media.add({ all: "all", desktop: "(min-width: 900px)", reduce: "(prefers-reduced-motion: reduce)" }, context => {
          if (context.conditions?.reduce) return;
          const desktop = context.conditions?.desktop;
          document.body.classList.add("motion-running");
          const shell = document.querySelector(".site-shell");
          const chapter = shell?.querySelector<HTMLElement>(".hero-chapter");
          const removeFocusListeners: (() => void)[] = [];
          if (chapter && desktop) {
            const tl = gsap.timeline({ scrollTrigger: { trigger: chapter, start: "top 88px", end: "bottom bottom", scrub: .5, invalidateOnRefresh: true } });
            tl.to(".showcase-fashion", { x: () => -Math.min(260, innerWidth * .17), y: 42, z: 120, scale: 1.48, rotation: 0, duration: .7, ease: "power1.inOut" }, 0)
              .to(".showcase-product", { x: -50, y: 130, rotation: -14, scale: .86, opacity: 0, duration: .65 }, 0)
              .to(".showcase-orbit", { scale: 1.25, rotation: 18, opacity: 0, duration: .8 }, 0)
              .to(".hero-copy", { y: -65, opacity: 0, duration: .55 }, .2)
              .to(".showcase-stamp, .showcase-note, .showcase-caption, .hero-foot", { opacity: 0, duration: .3 }, .15)
              .to(".showcase-fashion", { opacity: 0, y: -35, duration: .25 }, .75);
            const focusLayers = [...chapter.querySelectorAll<HTMLElement>(".hero-copy, .showcase-fashion, .showcase-product, .showcase-stamp")];
            tl.eventCallback("onUpdate", () => {
              focusLayers.forEach(layer => { layer.inert = Number(gsap.getProperty(layer, "opacity")) < .1 && !layer.contains(document.activeElement); });
            });
            // Focus returns the visitor to the readable start of the chapter.
            const focusScene = () => {
              if (tl.progress() > .12) window.scrollTo({ top: chapter.offsetTop - 88, behavior: "instant" });
            };
            chapter.addEventListener("focusin", focusScene);
            removeFocusListeners.push(() => chapter.removeEventListener("focusin", focusScene));
            removeFocusListeners.push(() => focusLayers.forEach(layer => { layer.inert = false; }));
          } else if (chapter) {
            gsap.to(".showcase-fashion", { y: -24, rotation: 2, ease: "none", scrollTrigger: { trigger: chapter, start: "top top", end: "bottom top", scrub: true } });
            gsap.to(".showcase-product", { y: 16, rotation: -9, ease: "none", scrollTrigger: { trigger: chapter, start: "top top", end: "bottom top", scrub: true } });
          }
          if (shell) {
            shell.querySelectorAll<HTMLElement>("[data-scene]").forEach(scene => {
              const title = scene.querySelector("[data-scene-title]");
              if (title) gsap.from(title, { y: desktop ? 48 : 18, duration: .9, ease: "power3.out", scrollTrigger: { trigger: scene, start: "top 85%", once: true } });
              scene.querySelectorAll<HTMLElement>("[data-depth]").forEach((layer, index) => {
                gsap.fromTo(layer, { y: desktop ? 42 + index * 12 : 12 }, { y: desktop ? -36 : -10, ease: "none", scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: .7 } });
              });
            });
            if (!chapter) gsap.from(shell.querySelectorAll(".pricing-intro, .contact-intro, .package-panel"), { y: 24, opacity: .35, stagger: .09, duration: .65, ease: "power2.out" });
          }
          ScrollTrigger.refresh();
          return () => { removeFocusListeners.forEach(remove => remove()); document.body.classList.remove("motion-running"); };
        });
        if (anchor && previousTop !== undefined) window.scrollBy({ top: anchor.getBoundingClientRect().top - previousTop, behavior: "instant" });
      };
      configure();
      window.addEventListener("studio-motion-change", configure);
      window.dispatchEvent(new Event("studio-motion-ready"));
      cleanup = () => { window.removeEventListener("studio-motion-change", configure); media.revert(); document.body.classList.remove("motion-running"); };
    }).catch(() => { /* Readable, interactive layouts are the fallback. */ });
    return () => { disposed = true; cleanup(); };
  }, [pathname]);
  return null;
}
