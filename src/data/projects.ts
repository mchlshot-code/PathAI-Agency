import projectData from "./projects.json";

export type ProjectSize = "hero" | "large" | "standard" | "small";

export type Project = {
  slug: string;
  name: string;
  category: string;
  url: string;
  image: string;
  featured: boolean;
  order: number;
  size: ProjectSize;
  capabilities: string[];
};

export const projects = projectData as Project[];

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => a.order - b.order);
