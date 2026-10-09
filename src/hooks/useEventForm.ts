"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import type { Event } from "@/types";

export function useEventForm(event?: Event) {
  const router = useRouter();
  const isEditing = !!event;

  const [title, setTitle] = useState(event?.title || "");
  const [excerpt, setExcerpt] = useState(event?.excerpt || "");
  const [body, setBody] = useState(event?.body || "");
  const [category, setCategory] = useState<string>(event?.category || "outreach");
  const [eventDate, setEventDate] = useState(event?.event_date || "");
  const [coverImage, setCoverImage] = useState(event?.cover_image || "");
  const [published, setPublished] = useState(event?.published ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const supabase = createClient();
    const slug = slugify(title);

    const payload = {
      title,
      slug,
      excerpt: excerpt || null,
      body,
      category,
      event_date: eventDate || null,
      cover_image: coverImage || null,
      published,
      updated_at: new Date().toISOString(),
    };

    const result = isEditing
      ? await supabase.from("events").update(payload).eq("id", event.id)
      : await supabase.from("events").insert(payload);

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/events");
    router.refresh();
  }

  return {
    isEditing,
    title,
    setTitle,
    excerpt,
    setExcerpt,
    body,
    setBody,
    category,
    setCategory,
    eventDate,
    setEventDate,
    coverImage,
    setCoverImage,
    published,
    setPublished,
    saving,
    error,
    handleSubmit,
  };
}
