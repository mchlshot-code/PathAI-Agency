import projectData from "./projects.json";

export type ProjectTheme = "forest" | "violet" | "paper" | "ink" | "sky";

export type Project = {
  slug: string;
  name: string;
  category: string;
  url: string;
  image: string;
  featured: boolean;
  order: number;
  theme: ProjectTheme;
};

export const projects = projectData as Project[];

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => a.order - b.order);
