import type { Metadata } from "next";
import { SalonConcept } from "@/components/concepts/SalonConcept";
import "./salon.css";

export const metadata: Metadata = {
  title: "Salon Concept — Beauty & wellness demo by PaTH",
  description: "Explore a beauty salon website concept. Find a service, choose a sample time and preview an appointment.",
  alternates: { canonical: "https://pathai.name.ng/concepts/salon-concept" },
  openGraph: { title: "Salon Concept — A PaTH demo", description: "Your time. Your glow. A beauty salon and booking concept.", url: "https://pathai.name.ng/concepts/salon-concept", images: [{ url: "https://pathai.name.ng/concepts/salon/portrait.webp" }] }
};

export default function SalonPage() { return <SalonConcept />; }
