"use client";

import { useEffect, useState } from "react";

export function MotionControl() {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { setReduced(query.matches); setPaused(document.documentElement.dataset.studioMotion === "off"); };
    sync();
    query.addEventListener("change", sync);
    window.addEventListener("studio-motion-change", sync);
    return () => { query.removeEventListener("change", sync); window.removeEventListener("studio-motion-change", sync); };
  }, []);
  return <button className="motion-control" type="button" disabled={reduced}
    aria-label={reduced ? "Motion reduced by your device setting" : paused ? "Enable motion" : "Reduce motion"}
    aria-pressed={paused || reduced} title={reduced ? "Your device prefers reduced motion" : paused ? "Enable motion" : "Reduce motion"}
    onClick={() => {
      document.documentElement.dataset.studioMotion = paused ? "on" : "off";
      try { localStorage.setItem("path-studio-motion", paused ? "on" : "off"); } catch { /* Storage is optional. */ }
      window.dispatchEvent(new Event("studio-motion-change"));
    }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><circle cx="12" cy="12" r="8" />{paused || reduced ? <path d="m10 8 6 4-6 4Z" /> : <path d="M10 8v8m4-8v8" />}</svg>
    <span>Motion {paused || reduced ? "off" : "on"}</span>
  </button>;
}
