"use client";

import { FormEvent, useEffect, useState } from "react";
import { enquiryTypes } from "@/data/services";
import { ArrowIcon } from "./ArrowIcon";

type Status = "idle" | "sending" | "success" | "error";

export function ProjectEnquiry() {
  const [status, setStatus] = useState<Status>("idle");
  const [type, setType] = useState<string>("MVP");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("concept") === "owan-kitchen") {
      setType("Website");
      setMessage("I'd like a food and restaurant website like the Owan Kitchen demo, tailored to my business.");
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      projectType: type,
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),
      message: String(form.get("message") || "")
    };

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      formElement.reset();
      setMessage("");
      setType("MVP");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="enquiry-success" role="status">
        <span className="eyebrow">Successful</span>
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
        <textarea name="message" rows={6} required value={message} onChange={(event) => setMessage(event.target.value)} />
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
