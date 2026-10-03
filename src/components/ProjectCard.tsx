import type { Project } from "@/data/projects";
import { ArrowIcon } from "./ArrowIcon";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      className={`project-card project-${project.size}`}
      href={project.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.name}`}
    >
      <div className="project-shot">
        <img
          src={project.image}
          alt={`${project.name} product preview`}
          loading={project.size === "hero" ? "eager" : "lazy"}
        />
        <span className="project-open" aria-hidden="true">
          <ArrowIcon size={18} />
        </span>
      </div>

      <div className="project-info">
        <div>
          <h3>{project.name}</h3>
          <p>{project.category}</p>
        </div>
        <div className="project-tags" aria-label="Capabilities">
          {project.capabilities.map((capability) => (
            <span key={capability}>{capability}</span>
          ))}
        </div>
      </div>
    </a>
  );
}
