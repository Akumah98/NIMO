"use client";

import { TeamCategory, TeamDepartment } from "@/types/team";
import { getCategoryIcon } from "./teamCategoryIcons";

interface TeamCategoryDropdownMenuProps {
  categories: TeamCategory[];
  activeCategory: TeamDepartment;
  onSelect: (id: TeamDepartment) => void;
}

export function TeamCategoryDropdownMenu({
  categories,
  activeCategory,
  onSelect,
}: TeamCategoryDropdownMenuProps) {
  return (
    <div className="absolute left-0 top-full z-30 mt-1.5 w-60 overflow-hidden rounded-xl border border-border/80 bg-bg/95 p-1 shadow-xl backdrop-blur-xl animate-fadeIn">
      <div className="flex flex-col gap-0.5 max-h-64 overflow-y-auto">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(cat.id)}
              className={`flex min-h-11 cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white shadow-xs"
                  : "text-text hover:bg-bg-alt hover:text-primary"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <svg
                  className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-white" : "text-primary"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {getCategoryIcon(cat.id)}
                </svg>
                <span className="truncate">{cat.label}</span>
              </div>

              {typeof cat.count === "number" && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-bg-alt border border-border/70 text-text-light"
                  }`}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
