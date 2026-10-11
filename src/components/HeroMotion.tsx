import type { ReactNode } from "react";

export function HeroMotion({ children }: { children: ReactNode }) {
  return <div className="hero-chapter">{children}</div>;
}
