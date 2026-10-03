import type { Project } from "@/data/projects";
import { ArrowIcon } from "./ArrowIcon";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      className={`project-card project-${project.theme}`}
      href={project.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.name}`}
    >
      <div className="project-meta">
        <div>
          <strong>{project.name}</strong>
          <span>{project.category}</span>
        </div>
        <span className="round-link" aria-hidden="true">
          <ArrowIcon size={16} />
        </span>
      </div>

      <div className="project-preview">
        <div className="browser-chrome" aria-hidden="true">
          <span />
          <span />
          <span />
          <span className="address-bar">{project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
        </div>
        <img
          className="project-homepage"
          src={project.image}
          alt={`${project.name} homepage`}
          loading="lazy"
        />
      </div>
    </a>
  );
}
