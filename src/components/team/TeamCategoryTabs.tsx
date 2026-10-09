"use client";

import { useState, useRef, useEffect } from "react";
import { TeamCategory, TeamDepartment } from "@/types/team";
import { getCategoryIcon } from "./teamCategoryIcons";
import { TeamCategoryDropdownMenu } from "./TeamCategoryDropdownMenu";

interface Props {
  categories: TeamCategory[];
  activeCategory: TeamDepartment;
  onSelectCategory: (id: TeamDepartment) => void;
}

export default function TeamCategoryTabs({
  categories,
  activeCategory,
  onSelectCategory,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected =
    categories.find((c) => c.id === activeCategory) || categories[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-start">
      <div ref={dropdownRef} className="relative inline-block text-left">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="flex min-h-11 w-auto cursor-pointer items-center justify-between gap-3 rounded-xl border border-border/80 bg-bg px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-text shadow-2xs hover:border-primary/40 hover:shadow-xs transition-all"
        >
          <div className="flex items-center gap-2 truncate">
            <svg className="h-3.5 w-3.5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {getCategoryIcon(selected.id)}
            </svg>
            <span className="truncate">{selected.label}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {typeof selected.count === "number" && (
              <span className="rounded-full bg-primary-light px-2 py-0.5 text-[11px] font-bold text-primary">
                {selected.count}
              </span>
            )}
            <svg
              className={`h-3.5 w-3.5 text-text-light transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {isOpen && (
          <TeamCategoryDropdownMenu
            categories={categories}
            activeCategory={activeCategory}
            onSelect={(id) => {
              onSelectCategory(id);
              setIsOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
