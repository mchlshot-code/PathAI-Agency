import type { Metadata } from "next";
import { PropertyConcept } from "@/components/concepts/PropertyConcept";
import "../business-demo.css";

export const metadata: Metadata = { title: "Property Concept — PaTH Studio", description: "Explore fictional property listings, filters and a viewing enquiry preview.", alternates: { canonical: "https://pathai.name.ng/concepts/property-concept" } };
export default function PropertyPage() { return <PropertyConcept />; }
