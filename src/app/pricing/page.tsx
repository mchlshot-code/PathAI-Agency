import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { StudioNav, StudioFooter } from "@/components/StudioNav";
import { websitePackages, formatNaira } from "@/data/packages";

export const metadata: Metadata = {
  title: "Website pricing — PaTH Digital Studio",
  description: "Business websites from ₦65,000. Compare Starter, Business and Business Plus, or request a custom software quote."
};
const faqs = [
  ["How do payments work?", "For straightforward websites, pay 50% to begin and 50% before launch. Starter’s deposit is ₦32,500. Larger custom projects use agreed payment milestones. Your written quote confirms the final scope and price."],
  ["What counts as a revision?", "One round is one consolidated list of changes within the agreed brief. Starter includes one round; Business and Business Plus include two. Extra pages or features are quoted separately, with any delivery impact agreed before work starts."],
  ["When does delivery start?", "After the deposit and all required text, images and branding arrive. Starter targets 5–7 working days; Business targets 10–15. Business Plus and custom timelines are agreed after scoping. Delayed materials or approvals can move the launch date."],
  ["Are the domain and hosting included?", "They are separate from the build price. We confirm the initial and renewal costs in your quote before you commit. Where possible, the domain is registered in your account. Hosting is chosen to suit your website and commercial use."],
  ["Who owns my website?", "After full payment, we hand over the agreed website files, access and documentation. Your domain and content belong to you. Third-party software, fonts and services remain subject to their own licences and ongoing costs."],
  ["Do you offer maintenance?", "Maintenance is optional and quoted separately with an agreed scope and allowance. It is separate from domain and hosting renewals. You can manage the website yourself or choose another provider; without a maintenance plan, ongoing changes are not included."]
];
export default function Pricing() {
  return <main className="site-shell pricing-shell"><div className="wrap">
    <StudioNav current="pricing" />
    <section className="pricing-intro" aria-labelledby="pricing-title">
      <span className="eyebrow">Website packages</span>
      <h1 id="pricing-title">A clear place<br /><em>to start.</em></h1>
      <div className="pricing-intro-bottom"><p>Choose a website for your business.<br />Have something bigger in mind? We&apos;ll quote it.</p><a className="text-link" href="#custom">Explore custom projects <ArrowIcon size={15} /></a></div>
    </section>
    <section aria-label="Compare website packages">
      <div className="pricing-grid">{websitePackages.map((item, index) => <article className={`package-panel ${index === 0 ? "package-starter" : ""}`} key={item.id}>
        <div className="package-heading"><h2>{item.name}</h2><span className="package-number">0{index + 1}</span></div>
        <p className="package-purpose">{item.purpose}</p>
        <div className="package-price"><span>{item.from ? "From" : "Fixed price"}</span><strong>{formatNaira(item.price)}</strong><small>50% deposit to begin</small></div>
        <ul className="package-features"><li className="package-pages">{item.pages}</li>{item.features.map(feature => <li key={feature}>{feature}</li>)}<li>{item.revisions}</li></ul>
        <p className="package-delivery">{item.delivery}</p>
        <Link className={index === 0 ? "button" : "button button-outline"} href={`/contact?package=${item.id}`}>Enquire about {item.name}<ArrowIcon size={16} /></Link>
        <details className="package-details"><summary>Scope details <span aria-hidden="true">+</span></summary><p>{item.extra} Basic SEO covers titles, descriptions, headings and a sitemap.</p></details>
      </article>)}</div>
      <div className="pricing-conditions"><p>Domain, hosting and ongoing maintenance are separate.</p><p>These packages cover informational websites. Payments, accounts and live booking systems need a custom quote.</p></div>
    </section>
    <section className="custom-project" id="custom" aria-labelledby="custom-title">
      <div><span className="eyebrow">Beyond a business website</span><h2 id="custom-title">A different brief.<br /><em>A custom build.</em></h2><p>Online stores, booking systems, MVPs, web and mobile apps, dashboards and AI workflows.</p></div>
      <div className="custom-action"><span className="custom-quote">Custom quote</span><p>Scope, timeline and ongoing costs agreed before we begin.</p><Link className="button button-outline" href="/contact?service=custom">Tell us what you need <ArrowIcon size={16} /></Link></div>
    </section>
    <section className="pricing-faq" aria-labelledby="faq-title"><div><span className="eyebrow">Before we begin</span><h2 id="faq-title">Good questions.</h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <StudioFooter />
  </div></main>;
}
