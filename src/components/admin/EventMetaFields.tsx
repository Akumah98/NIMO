"use client";

import eventCategories from "@/data/eventCategories.json";

interface EventMetaFieldsProps {
  categories: string[];
  onToggleCategory: (catId: string) => void;
  eventDate: string;
  onEventDateChange: (date: string) => void;
  excerpt: string;
  onExcerptChange: (excerpt: string) => void;
}

export function EventMetaFields({
  categories,
  onToggleCategory,
  eventDate,
  onEventDateChange,
  excerpt,
  onExcerptChange,
}: EventMetaFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-text">Categories</label>
          <span className="text-2xs text-text-light">Select all that apply ({categories.length} selected)</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {eventCategories.map((cat) => {
            const isSelected = categories.includes(cat.id.toLowerCase());
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onToggleCategory(cat.id.toLowerCase())}
                className={`inline-flex min-h-11 items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                  isSelected
                    ? "border-primary bg-primary text-white shadow-xs"
                    : "border-border bg-bg-alt text-text-light hover:border-primary hover:text-primary"
                }`}
              >
                <span>{isSelected ? "✓" : "+"}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">Event Date</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => onEventDateChange(e.target.value)}
            className="min-h-11 rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-text focus:border-primary focus:outline-hidden"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">Excerpt (Summary)</label>
          <textarea
            value={excerpt}
            onChange={(e) => onExcerptChange(e.target.value)}
            rows={2}
            placeholder="Short teaser for cards & search..."
            className="rounded-lg border border-border bg-bg px-4 py-2 text-sm text-text focus:border-primary focus:outline-hidden"
          />
        </div>
      </div>
    </div>
  );
}
