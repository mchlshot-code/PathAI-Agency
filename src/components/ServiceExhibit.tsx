"use client";

import { useState } from "react";
import Link from "next/link";
import { needs } from "@/data/services";
import { featuredProjects } from "@/data/projects";
import { ArrowIcon } from "./ArrowIcon";

const examples = [featuredProjects[1], featuredProjects[4], featuredProjects[3], featuredProjects[2], featuredProjects[0]];

export function ServiceExhibit() {
  const [active, setActive] = useState(0);
  const example = examples[active];
  return <section className="section services-scene" id="build" data-scene aria-labelledby="services-title">
    <div className="services-intro">
      <span className="eyebrow">04 / Design meets development</span>
      <h2 id="services-title" data-scene-title>What<br />we <em>make.</em></h2>
      <div className="service-exhibit" data-depth aria-hidden="true">
        {examples.map((project, index) => <img key={`${project.slug}-${index}`} className={index === active ? "active" : ""} src={project.image} alt="" loading="lazy" />)}
        <span>{example.name}<span>{example.category}</span></span>
      </div>
    </div>
    <div className="needs-grid">
      {needs.map((need, index) => <Link className={`need-card ${active === index ? "need-active" : ""}`} key={need.service}
        onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} href={`/contact?service=${encodeURIComponent(need.type)}`}>
        <span className="need-index">{String(index + 1).padStart(2, "0")}</span>
        <strong>{need.service}<small className="service-quote">{need.type === "Website" ? "From ₦65,000" : "Custom quote"}</small></strong>
        <span className="need-prompt">{need.prompt}</span><ArrowIcon size={22} />
      </Link>)}
    </div>
  </section>;
}
