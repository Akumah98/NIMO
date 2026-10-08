"use client";

import Badge from "@/components/ui/Badge";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  onEdit: (t: Testimonial) => void;
  onToggleVisibility: (t: Testimonial) => void;
  onDelete: (id: string) => void;
}

export default function TestimonialCard({
  testimonial: t,
  onEdit,
  onToggleVisibility,
  onDelete,
}: TestimonialCardProps) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        t.visible ? "border-border" : "border-border bg-bg-alt opacity-60"
      }`}
    >
      <p className="text-sm italic text-text-light">&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-text">— {t.author_name}</span>
          <Badge variant={t.visible ? "secondary" : "default"}>
            {t.visible ? "Visible" : "Hidden"}
          </Badge>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(t)}
            className="text-xs font-medium text-primary hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => onToggleVisibility(t)}
            className="text-xs font-medium text-text-light hover:underline"
          >
            {t.visible ? "Hide" : "Show"}
          </button>
          <button
            onClick={() => onDelete(t.id)}
            className="text-xs font-medium text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
