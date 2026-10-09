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
            className="min-h-11 rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-hidden"
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
            onChange={(e) => onEventDateChange(e.target.value)}
            className="min-h-11 rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-hidden"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => onExcerptChange(e.target.value)}
          rows={2}
          placeholder="Short summary..."
          className="rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-hidden"
        />
      </div>
    </>
  );
}
