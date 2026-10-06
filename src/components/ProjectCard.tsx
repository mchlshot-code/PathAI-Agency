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
        <div className="project-window">
          <div className="project-browser" aria-hidden="true"><span /><span /><span /></div>
          <img
            src={project.image}
            alt={`${project.name} product preview`}
            loading={project.size === "hero" ? "eager" : "lazy"}
          />
        </div>
      </div>

      <div className="project-info">
        <div>
          <h3>{project.name}</h3>
          <p>{project.category}</p>
        </div>
        <ArrowIcon size={20} />
      </div>
    </a>
  );
}
