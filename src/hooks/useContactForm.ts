"use client";

import { useState } from "react";

export type ContactFormStatus = "idle" | "sending" | "success" | "error";

export interface ContactData {
  name: string;
  email: string;
  category: string;
  message: string;
}

export function useContactForm() {
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [lastSubmission, setLastSubmission] = useState<ContactData | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: ContactData = {
      name: (formData.get("name") as string) || "",
      email: (formData.get("email") as string) || "",
      category: (formData.get("category") as string) || "general",
      message: (formData.get("message") as string) || "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");
      setLastSubmission(data);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return { status, lastSubmission, handleSubmit };
}
