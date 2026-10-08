"use client";

import { SearchCategory } from "@/types/search";

interface Props {
  activeCategory: SearchCategory;
  onSelectCategory: (cat: SearchCategory) => void;
  counts: Record<SearchCategory, number>;
}

const CATEGORIES: { id: SearchCategory; label: string }[] = [
  { id: "all", label: "All Results" },
  { id: "program", label: "Programs" },
  { id: "event", label: "Events" },
  { id: "team", label: "Team" },
  { id: "report", label: "Reports" },
  { id: "article", label: "Articles" },
];

export default function SearchFilterTabs({ activeCategory, onSelectCategory, counts }: Props) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-border pb-4 mb-6">
      {CATEGORIES.map((cat) => {
        const count = counts[cat.id] || 0;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              isActive
                ? "bg-primary text-white shadow-sm"
                : "bg-bg-alt text-text-light hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {cat.label} ({count})
          </button>
        );
      })}
    </div>
  );
}
