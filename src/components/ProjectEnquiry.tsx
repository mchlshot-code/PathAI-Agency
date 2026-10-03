"use client";

import { FormEvent, useState } from "react";
import { enquiryTypes } from "@/data/services";
import { ArrowIcon } from "./ArrowIcon";

type Status = "idle" | "sending" | "success" | "error";

export function ProjectEnquiry() {
  const [status, setStatus] = useState<Status>("idle");
  const [type, setType] = useState<string>("MVP");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = new FormData(event.currentTarget);
    const payload = {
      _subject: `PaTH project enquiry — ${type}`,
      _captcha: "false",
      _template: "table",
      _replyto: String(form.get("email") || ""),
      source: "PaTH Digital Studio",
      project_type: type,
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),
      message: String(form.get("message") || "")
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/adewalemchel@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || data?.success === "false") {
        throw new Error("Submission failed");
      }

      event.currentTarget.reset();
      setType("MVP");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="enquiry-success" role="status">
        <span className="eyebrow">Sent</span>
        <h3>We have your project brief.</h3>
        <button className="text-button" type="button" onClick={() => setStatus("idle")}>
          Send another enquiry <ArrowIcon size={15} />
        </button>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <fieldset className="enquiry-types">
        <legend>What do you need?</legend>
        <div className="type-options">
          {enquiryTypes.map((option) => (
            <button
              className={type === option ? "type-option active" : "type-option"}
              type="button"
              key={option}
              onClick={() => setType(option)}
              aria-pressed={type === option}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="field-grid">
        <label>
          <span>Name</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>

      <label>
        <span>Company <em>optional</em></span>
        <input name="company" autoComplete="organization" />
      </label>

      <label>
        <span>Tell us about the project</span>
        <textarea name="message" rows={6} required />
      </label>

      <div className="enquiry-actions">
        <button className="button button-large" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send project enquiry"}
          {status !== "sending" ? <ArrowIcon size={17} /> : null}
        </button>

        {status === "error" ? (
          <p className="form-error">Couldn&apos;t send it. Please try again.</p>
        ) : null}
      </div>
    </form>
  );
}
