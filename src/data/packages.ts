export const websitePackages = [
  {
    id: "starter", name: "Starter", price: 65000, from: false,
    purpose: "A simple home for your business.", pages: "Up to 3 pages",
    delivery: "5–7 working days", revisions: "1 revision round",
    features: ["Mobile-friendly design", "WhatsApp enquiry link", "Basic SEO setup"],
    extra: "You supply approved text, images and branding."
  },
  {
    id: "business", name: "Business", price: 150000, from: true,
    purpose: "More room for your services and story.", pages: "Up to 6 pages",
    delivery: "10–15 working days", revisions: "2 revision rounds",
    features: ["Everything in Starter", "Service and gallery sections", "Project enquiry form"],
    extra: "For an established business with more to show."
  },
  {
    id: "business-plus", name: "Business Plus", price: 250000, from: true,
    purpose: "A website you can keep up to date.", pages: "Up to 10 pages",
    delivery: "Timeline agreed after scoping", revisions: "2 revision rounds",
    features: ["Everything in Business", "Editor for agreed content", "Initial setup and handover"],
    extra: "Editing is scoped to content such as articles or projects."
  }
] as const;
export function getWebsitePackage(value?: string) {
  return websitePackages.find((item) => item.id === value);
}
export function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}
export const budgetOptions = ["Under ₦100k", "₦100k–under ₦300k", "₦300k–under ₦700k", "₦700k+", "Not sure"] as const;
export const conceptNames: Record<string, string> = {
  "kitchen-concept": "Kitchen Concept", "path-kitchen": "Kitchen Concept", "owan-kitchen": "Kitchen Concept",
  "salon-concept": "Salon Concept", "fashion-concept": "Fashion Concept"
};

export function getConceptName(value?: string): string | undefined {
  return value && Object.prototype.hasOwnProperty.call(conceptNames, value) ? conceptNames[value] : undefined;
}
