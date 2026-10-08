"use client";

import { useState, useRef, useEffect } from "react";
import { TeamCategory, TeamDepartment } from "@/types/team";
import { getCategoryIcon } from "./teamCategoryIcons";

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
          className="flex min-h-[40px] w-auto cursor-pointer items-center justify-between gap-3 rounded-xl border border-border/80 bg-bg px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-text shadow-2xs hover:border-primary/40 hover:shadow-xs transition-all"
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
          <div className="absolute left-0 top-full z-30 mt-1.5 w-60 overflow-hidden rounded-xl border border-border/80 bg-bg/95 p-1 shadow-xl backdrop-blur-xl animate-fadeIn">
            <div className="flex flex-col gap-0.5 max-h-64 overflow-y-auto">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setIsOpen(false);
                    }}
                    className={`flex min-h-[38px] cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-white shadow-xs"
                        : "text-text hover:bg-bg-alt hover:text-primary"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <svg className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-white" : "text-primary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {getCategoryIcon(cat.id)}
                      </svg>
                      <span className="truncate">{cat.label}</span>
                    </div>

                    {typeof cat.count === "number" && (
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-bg-alt border border-border/70 text-text-light"
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
        )}
      </div>
    </div>
  );
}
