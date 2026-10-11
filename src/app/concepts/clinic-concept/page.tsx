import type { Metadata } from "next";
import { ClinicConcept } from "@/components/concepts/ClinicConcept";
import "../business-demo.css";

export const metadata: Metadata = { title: "Clinic Concept — PaTH Studio", description: "Explore a fictional clinic website with services and a visit request preview.", alternates: { canonical: "https://pathai.name.ng/concepts/clinic-concept" } };
export default function ClinicPage() { return <ClinicConcept />; }
