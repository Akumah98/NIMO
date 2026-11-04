"use client";

import eventCategories from "@/data/eventCategories.json";

interface EventMetaFieldsProps {
  category: string;
  onCategoryChange: (cat: string) => void;
  eventDate: string;
  onEventDateChange: (date: string) => void;
  excerpt: string;
  onExcerptChange: (excerpt: string) => void;
}

export function EventMetaFields({
  category,
  onCategoryChange,
  eventDate,
  onEventDateChange,
  excerpt,
  onExcerptChange,
}: EventMetaFieldsProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">Category</label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="min-h-11 rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-text focus:border-primary focus:outline-hidden"
          >
            {eventCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">Event Date</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => onEventDateChange(e.target.value)}
            className="min-h-11 rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-text focus:border-primary focus:outline-hidden"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => onExcerptChange(e.target.value)}
          rows={2}
          placeholder="Short summary for preview cards & search..."
          className="rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-text focus:border-primary focus:outline-hidden"
        />
      </div>
    </>
  );
}
