"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ImageUploader from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";
import type { Event } from "@/types";

interface EventFormProps {
  event?: Event;
}

export default function EventForm({ event }: EventFormProps) {
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

    let result;
    if (isEditing) {
      result = await supabase.from("events").update(payload).eq("id", event.id);
    } else {
      result = await supabase.from("events").insert(payload);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/events");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="recent">Recent</option>
            <option value="outreach">Outreach</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">Event Date</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="Short summary..."
          className="rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Cover Image</label>
        <ImageUploader bucket="events" currentImage={coverImage} onUpload={setCoverImage} />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Content</label>
        <RichTextEditor value={body} onChange={setBody} />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
        />
        <label htmlFor="published" className="text-sm text-text">Published</label>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : isEditing ? "Update Event" : "Create Event"}
        </Button>
        <Button variant="outline" href="/admin/events">
          Cancel
        </Button>
      </div>
    </form>
  );
}
