"use client";

import Button from "@/components/ui/Button";
import { useContactForm } from "@/hooks/useContactForm";

export default function ContactForm() {
  const { status, lastSubmission, handleSubmit } = useContactForm();

  const mailtoUrl = lastSubmission
    ? `mailto:contact@nimo.africa?subject=${encodeURIComponent(
        `Inquiry from ${lastSubmission.name} [${lastSubmission.category}] - NIMO`
      )}&body=${encodeURIComponent(
        `Name: ${lastSubmission.name}\nEmail: ${lastSubmission.email}\nCategory: ${lastSubmission.category}\n\nMessage:\n${lastSubmission.message}`
      )}`
    : "mailto:contact@nimo.africa";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-border/80 bg-bg p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-semibold text-text">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          required
          placeholder="e.g. Jane Doe"
          className="min-h-11 rounded-xl border border-border bg-bg-alt/40 px-4 py-2.5 text-sm text-text placeholder:text-text-light/60 focus:border-primary focus:outline-hidden"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-semibold text-text">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="jane@example.com"
          className="min-h-11 rounded-xl border border-border bg-bg-alt/40 px-4 py-2.5 text-sm text-text placeholder:text-text-light/60 focus:border-primary focus:outline-hidden"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="category" className="text-sm font-semibold text-text">
          Inquiry Category
        </label>
        <select
          id="category"
          name="category"
          className="min-h-11 rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-text focus:border-primary focus:outline-hidden"
        >
          <option value="general">General Inquiry</option>
          <option value="partnership">Institutional Partnership</option>
          <option value="media">Media &amp; Communications</option>
          <option value="volunteering">Field Volunteering</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold text-text">
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="How can we assist you or collaborate?"
          className="rounded-xl border border-border bg-bg-alt/40 px-4 py-2.5 text-sm text-text placeholder:text-text-light/60 focus:border-primary focus:outline-hidden"
        />
      </div>

      <Button type="submit" disabled={status === "sending"} className="w-full">
        {status === "sending" ? "Sending..." : "Submit Inquiry"}
      </Button>

      {status === "success" && (
        <div className="rounded-xl border border-secondary/30 bg-secondary-light/40 p-4 text-center">
          <p className="text-xs font-semibold text-secondary">
            Thank you! Your message has been received and registered.
          </p>
          <a
            href={mailtoUrl}
            className="mt-2 inline-flex min-h-11 items-center justify-center rounded-lg bg-secondary px-4 py-2 text-xs font-bold text-white transition hover:bg-green-700"
          >
            Open in Email Client ✉️
          </a>
        </div>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-red-500">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
