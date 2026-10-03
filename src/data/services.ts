export const needs = [
  { prompt: "I have an idea", service: "Build an MVP", type: "MVP" },
  { prompt: "My business needs a website", service: "Build a website", type: "Website" },
  { prompt: "We need software for our business", service: "Build a web app", type: "Web app" },
  { prompt: "I already have a website", service: "Turn it into an app", type: "Mobile app" },
  { prompt: "We repeat the same work every day", service: "Automate it with AI", type: "AI workflow" }
] as const;

export const enquiryTypes = [
  "MVP",
  "Website",
  "Web app",
  "Mobile app",
  "AI workflow",
  "E-commerce",
  "Not sure yet"
] as const;
