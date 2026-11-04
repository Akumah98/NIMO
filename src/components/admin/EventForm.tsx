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
    categories,
    toggleCategory,
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
        categories={categories}
        onToggleCategory={toggleCategory}
        eventDate={eventDate}
        onEventDateChange={setEventDate}
        excerpt={excerpt}
        onExcerptChange={setExcerpt}
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Outer Cover Image (Card & Banner)</label>
        <ImageUploader bucket="events" currentImage={coverImage} onUpload={setCoverImage} />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Event Story & Write-up</label>
        <RichTextEditor value={body} onChange={setBody} availableImages={[coverImage].filter(Boolean)} />
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
