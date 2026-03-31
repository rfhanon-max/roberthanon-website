"use client";

import { useState } from "react";

type ContactFormProps = {
  email: string;
};

export function ContactForm({ email }: ContactFormProps) {
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [plan, setPlan] = useState("Buying");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = `${plan} inquiry from ${name || "Website visitor"}`;
    const body = [
      `Name: ${name || "-"}`,
      `Email: ${senderEmail || "-"}`,
      `Planning: ${plan}`,
      "",
      "Message:",
      message || "-",
    ].join("\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
      <label className="grid gap-2 text-sm text-muted">
        Name
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-2xl border border-line bg-paper px-4 py-3 text-navy outline-none transition focus:border-navy"
        />
      </label>

      <label className="grid gap-2 text-sm text-muted">
        Email
        <input
          type="email"
          placeholder="you@example.com"
          value={senderEmail}
          onChange={(event) => setSenderEmail(event.target.value)}
          className="rounded-2xl border border-line bg-paper px-4 py-3 text-navy outline-none transition focus:border-navy"
        />
      </label>

      <label className="grid gap-2 text-sm text-muted">
        What are you planning?
        <select
          value={plan}
          onChange={(event) => setPlan(event.target.value)}
          className="rounded-2xl border border-line bg-paper px-4 py-3 text-navy outline-none transition focus:border-navy"
        >
          <option>Buying</option>
          <option>Selling</option>
          <option>Buying and selling</option>
          <option>Just starting to explore</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm text-muted">
        Message
        <textarea
          rows={6}
          placeholder="Share a little about your timeline, area, or questions."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="rounded-[1.5rem] border border-line bg-paper px-4 py-3 text-navy outline-none transition focus:border-navy"
        />
      </label>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-sm text-white transition hover:bg-accent"
        style={{ color: "#f8f5ef" }}
      >
        Send Inquiry
      </button>
    </form>
  );
}
