"use client";

interface MediaCategoryFilterProps {
  currentCategory: string;
  onSelectCategory: (category: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
}

const CATEGORIES = [
  { id: "all", label: "All Media" },
  { id: "general", label: "General" },
  { id: "background", label: "Backgrounds" },
  { id: "posts", label: "Posts & News" },
  { id: "events", label: "Events" },
  { id: "reports", label: "Reports" },
];

export function MediaCategoryFilter({
  currentCategory,
  onSelectCategory,
  search,
  onSearchChange,
}: MediaCategoryFilterProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => {
          const isActive = currentCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`min-h-11 rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                isActive
                  ? "bg-primary text-white"
                  : "border border-border bg-bg-alt text-text-light hover:text-text"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="relative w-full sm:w-64">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by file name..."
          className="min-h-11 w-full rounded-xl border border-border bg-bg-alt px-3.5 py-2 pl-9 text-xs text-text placeholder-text-light focus:border-primary focus:outline-hidden"
        />
        <svg
          className="absolute left-3 top-3 h-4 w-4 text-text-light"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}
