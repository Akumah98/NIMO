"use client";

import ImageUploader from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";
import { FormActionButtons } from "./FormActionButtons";
import { PublishToggle } from "./PublishToggle";
import { EventMetaFields } from "./EventMetaFields";
import { useEventForm } from "@/hooks/useEventForm";
import type { Event } from "@/types";

interface EventFormProps {
  event?: Event;
}

export default function EventForm({ event }: EventFormProps) {
  const {
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
  } = useEventForm(event);

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="min-h-11 rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-hidden"
        />
      </div>

      <EventMetaFields
        category={category}
        onCategoryChange={setCategory}
        eventDate={eventDate}
        onEventDateChange={setEventDate}
        excerpt={excerpt}
        onExcerptChange={setExcerpt}
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Cover Image</label>
        <ImageUploader bucket="events" currentImage={coverImage} onUpload={setCoverImage} />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Content</label>
        <RichTextEditor value={body} onChange={setBody} />
      </div>

      <PublishToggle published={published} onChange={setPublished} />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <FormActionButtons
        saving={saving}
        isEditing={isEditing}
        cancelHref="/admin/events"
        createLabel="Create Event"
        updateLabel="Update Event"
      />
    </form>
  );
}
