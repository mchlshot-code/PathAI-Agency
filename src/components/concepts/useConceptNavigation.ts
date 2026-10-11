"use client";

import { useEffect, useState } from "react";

export function useConceptNavigation(sections: readonly string[]) {
  const [section, setSection] = useState(sections[0]);

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.slice(1);
      setSection(sections.includes(hash) ? hash : sections[0]);
    };
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => { window.removeEventListener("hashchange", sync); window.removeEventListener("popstate", sync); };
  }, [sections]);

  useEffect(() => {
    const panel = document.getElementById(section);
    if (!panel || matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.studioMotion === "off") return;
    // Each short demo view keeps its controls stable after this one transition.
    const animation = panel.animate([{ opacity: .45, transform: "translate3d(0,16px,0)" }, { opacity: 1, transform: "translate3d(0,0,0)" }], { duration: 400, easing: "cubic-bezier(.2,.7,.2,1)" });
    const stop = () => animation.cancel();
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    query.addEventListener("change", stop);
    window.addEventListener("studio-motion-change", stop);
    return () => { animation.cancel(); query.removeEventListener("change", stop); window.removeEventListener("studio-motion-change", stop); };
  }, [section]);

  function navigate(next: string) {
    if (!sections.includes(next)) return;
    if (window.location.hash !== `#${next}`) window.history.pushState(null, "", `#${next}`);
    setSection(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return { section, navigate };
}
