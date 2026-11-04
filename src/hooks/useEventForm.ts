"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import { parseEventCategories } from "@/lib/utils/categoryUtils";
import type { Event } from "@/types";

export function useEventForm(event?: Event) {
  const router = useRouter();
  const isEditing = !!event;

  const [title, setTitle] = useState(event?.title || "");
  const [excerpt, setExcerpt] = useState(event?.excerpt || "");
  const [body, setBody] = useState(event?.body || "");
  const [categories, setCategories] = useState<string[]>(
    parseEventCategories(event?.category)
  );
  const [eventDate, setEventDate] = useState(event?.event_date || "");
  const [coverImage, setCoverImage] = useState(event?.cover_image || "");
  const [images, setImages] = useState<string[]>(event?.images || []);
  const [published, setPublished] = useState(event?.published ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const toggleCategory = (catId: string) => {
    setCategories((prev) => {
      const normalized = catId.toLowerCase();
      if (prev.includes(normalized)) {
        if (prev.length === 1) return prev;
        return prev.filter((c) => c !== normalized);
      }
      return [...prev, normalized];
    });
  };

  const addImage = (url: string) => setImages((prev) => [...prev, url]);
  const removeImage = (idx: number) => setImages((prev) => prev.filter((_, i) => i !== idx));
  const updateCaption = (idx: number, caption: string) => {
    setImages((prev) =>
      prev.map((item, i) => {
        if (i !== idx) return item;
        const cleanUrl = item.includes("|") ? item.split("|")[0] : item;
        return caption.trim() ? `${cleanUrl}|${caption.trim()}` : cleanUrl;
      })
    );
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const supabase = createClient();
    const payload = {
      title,
      slug: slugify(title),
      excerpt: excerpt || null,
      body,
      category: categories.join(","),
      event_date: eventDate || null,
      cover_image: coverImage || null,
      images,
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
    isEditing, title, setTitle, excerpt, setExcerpt, body, setBody,
    categories, toggleCategory, eventDate, setEventDate, coverImage, setCoverImage,
    images, setImages, addImage, removeImage, updateCaption,
    published, setPublished, saving, error, handleSubmit,
  };
}
