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

  function navigate(next: string) {
    if (!sections.includes(next)) return;
    if (window.location.hash !== `#${next}`) window.history.pushState(null, "", `#${next}`);
    setSection(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return { section, navigate };
}
