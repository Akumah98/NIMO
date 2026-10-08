"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface TestimonialFormProps {
  initialQuote?: string;
  initialAuthor?: string;
  editingId?: string | null;
  onSave: (quote: string, author: string, editingId?: string | null) => Promise<void>;
  onCancel: () => void;
}

export default function TestimonialForm({
  initialQuote = "",
  initialAuthor = "Community Member",
  editingId,
  onSave,
  onCancel,
}: TestimonialFormProps) {
  const [quote, setQuote] = useState(initialQuote);
  const [authorName, setAuthorName] = useState(initialAuthor);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave(quote, authorName, editingId);
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 rounded-lg border border-border p-4">
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">Quote</label>
          <textarea
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            required
            rows={3}
            className="rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">Author Name</label>
          <input
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Update" : "Add"}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
