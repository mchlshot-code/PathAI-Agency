import type { Metadata } from "next";
import { ProjectEnquiry } from "@/components/ProjectEnquiry";
import { StudioNav, StudioFooter } from "@/components/StudioNav";
import { enquiryTypes } from "@/data/services";
import { getConceptName, getWebsitePackage } from "@/data/packages";

export const metadata: Metadata = {
  title: "Start a project — PaTH Digital Studio",
  description: "Tell PaTH Digital Studio about your next website, app or AI workflow."
};
type Params = { concept?: string | string[]; package?: string | string[]; service?: string | string[] };
export default async function Contact({ searchParams }: { searchParams: Promise<Params> }) {
  const query = await searchParams;
  const packageId = getWebsitePackage(typeof query.package === "string" ? query.package : undefined)?.id;
  const concept = typeof query.concept === "string" && getConceptName(query.concept) ? query.concept : undefined;
  const service = typeof query.service === "string" && enquiryTypes.some(type => type === query.service) ? query.service : undefined;
  return <main className="site-shell contact-shell"><div className="wrap">
    <StudioNav current="contact" />
    <section className="contact-content" aria-labelledby="contact-title">
      <div className="contact-intro"><span className="eyebrow">Start a project</span><h1 id="contact-title">Let&apos;s make<br /><em>something good.</em></h1><p>Tell us a little about your idea.<br />We&apos;ll reply by email.</p><a className="contact-email" href="mailto:adewalemchel@gmail.com">adewalemchel@gmail.com ↗</a></div>
      <ProjectEnquiry key={`${packageId || ""}:${service || ""}:${concept || ""}`} packageId={packageId} service={service} concept={concept} />
    </section><StudioFooter />
  </div></main>;
}
