import type { Project } from "@/data/projects";
import { ArrowIcon } from "./ArrowIcon";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <a
      className={`project-card project-${project.size}`}
      data-project={project.slug}
      href={project.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.name}`}
    >
      <div className="project-shot">
        <span className="project-label"><span>0{index + 1} / {project.name}</span><span className="project-visit">View live <ArrowIcon size={12} /></span></span>
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
      <div className="project-capabilities">{project.capabilities.map(capability => <span key={capability}>{capability}</span>)}</div>
    </a>
  );
}
