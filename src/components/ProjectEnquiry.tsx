"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { enquiryTypes } from "@/data/services";
import { websitePackages, getWebsitePackage, formatNaira, budgetOptions, getConceptName } from "@/data/packages";
import { ArrowIcon } from "./ArrowIcon";

type Status = "idle" | "sending" | "success" | "error";
export function ProjectEnquiry({ concept, packageId, service }: { concept?: string; packageId?: string; service?: string }) {
  const initialPackage = getWebsitePackage(packageId);
  const initialType = initialPackage ? "Website" : service || (concept === "fashion-concept" ? "E-commerce" : concept ? "Website" : "Not sure yet");
  const initialMessage = concept ? `I'd like a website inspired by the ${getConceptName(concept)}, tailored to my business. Features and final scope to be agreed.` : "";
  const [status, setStatus] = useState<Status>("idle");
  const [type, setType] = useState(initialType);
  const [selectedPackage, setSelectedPackage] = useState(initialPackage?.id || "");
  const [message, setMessage] = useState(initialMessage);
  const [budget, setBudget] = useState("");
  const sending = useRef(false);
  const activePackage = type === "Website" ? getWebsitePackage(selectedPackage) : undefined;

  function changeType(value: string) {
    setType(value);
    if (value !== "Website") setSelectedPackage("");
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setStatus("sending");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      projectType: type, packageId: activePackage?.id || "", budget, concept: concept || "",
      name: String(form.get("name") || ""), email: String(form.get("email") || ""),
      company: String(form.get("company") || ""), message
    };
    try {
      const response = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Submission failed");
      formElement.reset();
      setMessage("");
      setBudget("");
      setStatus("success");
    } catch { setStatus("error"); }
    finally { sending.current = false; }
  }
  if (status === "success") return <div className="enquiry-success" role="status"><span className="eyebrow">Successful</span><h3>We have your project brief.</h3><p>We&apos;ll reply to the email address you provided.</p><button className="text-button" type="button" onClick={() => setStatus("idle")}>Send another enquiry <ArrowIcon size={15} /></button></div>;
  return <form className="enquiry-form" onSubmit={handleSubmit} aria-busy={status === "sending"}>
    {concept ? <p className="enquiry-context">Inspired by {getConceptName(concept)}. Features are scoped separately.</p> : null}
    <fieldset className="enquiry-types" disabled={status === "sending"}><legend>What do you need?</legend><div className="type-options">{enquiryTypes.map(option => <button className={type === option ? "type-option active" : "type-option"} type="button" key={option} onClick={() => changeType(option)} aria-pressed={type === option}>{option === "Website" ? "Business website" : option === "E-commerce" ? "Store / booking system" : option === "AI workflow" ? "AI automation" : option}</button>)}</div></fieldset>
    {type === "Website" ? <div className="package-selection"><label><span>Website package <em>optional</em></span><select name="packageId" value={selectedPackage} onChange={event => setSelectedPackage(event.target.value)} disabled={status === "sending"}><option value="">Help me choose / custom scope</option>{websitePackages.map(item => <option key={item.id} value={item.id}>{item.name} — {item.from ? "from " : ""}{formatNaira(item.price)}</option>)}</select></label>{activePackage ? <div className="selected-package"><strong>{activePackage.name} · {activePackage.from ? "from " : ""}{formatNaira(activePackage.price)}</strong><p>{activePackage.pages} · {activePackage.delivery}<br />50% deposit. Domain and hosting separate.</p><Link className="text-link" href="/pricing">Review what&apos;s included <ArrowIcon size={14} /></Link></div> : null}</div> : null}
    <div className="field-grid"><label><span>Name</span><input name="name" autoComplete="name" required maxLength={120} disabled={status === "sending"} /></label><label><span>Email</span><input name="email" type="email" autoComplete="email" required maxLength={180} disabled={status === "sending"} /></label></div>
    <label><span>Business name <em>optional</em></span><input name="company" autoComplete="organization" maxLength={180} disabled={status === "sending"} /></label>
    <label><span>Estimated budget <em>optional</em></span><select name="budget" value={budget} onChange={event => setBudget(event.target.value)} disabled={status === "sending"}><option value="">Choose a range</option>{budgetOptions.map(option => <option key={option}>{option}</option>)}</select></label>
    <label><span>Tell us about the project</span><textarea name="message" rows={5} required maxLength={5000} value={message} onChange={event => setMessage(event.target.value)} disabled={status === "sending"} /></label>
    <div className="enquiry-actions"><button className="button button-large" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send project enquiry"}{status !== "sending" ? <ArrowIcon size={17} /> : null}</button>{status === "error" ? <p className="form-error" role="alert">Couldn&apos;t send it. Your answers are still here. Please try again.</p> : null}</div>
  </form>;
}
