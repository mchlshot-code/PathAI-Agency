import type { Metadata } from "next";
import { FashionConcept } from "@/components/concepts/FashionConcept";
import "./fashion.css";

export const metadata: Metadata = {
  title: "Fashion Concept — Retail demo by PaTH",
  description: "Explore a fashion store concept. Browse the everyday edit, choose your colour and size, and try a checkout preview.",
  alternates: { canonical: "https://pathai.name.ng/concepts/fashion-concept" },
  openGraph: { title: "Fashion Concept — A PaTH demo", description: "Your style. Your rules. An interactive fashion store concept.", url: "https://pathai.name.ng/concepts/fashion-concept", images: [{ url: "https://pathai.name.ng/concepts/fashion/shirt-sand.webp" }] }
};
export default function FashionPage() { return <FashionConcept />; }
