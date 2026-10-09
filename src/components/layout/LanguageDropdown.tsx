"use client";

import { useEffect, useRef } from "react";
import type { LanguageItem } from "@/types";

interface LanguageDropdownProps {
  languages: LanguageItem[];
  currentLang: string;
  onSelect: (code: string) => void;
  onClose: () => void;
}

export default function LanguageDropdown({
  languages,
  currentLang,
  onSelect,
  onClose,
}: LanguageDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="menu"
      className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-border bg-bg p-1.5 shadow-lg z-50 animate-scale-in"
    >
      <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-text-light">
        Select Language
      </div>
      <div className="max-h-64 overflow-y-auto space-y-0.5">
        {languages.map((lang) => {
          const isSelected = currentLang === lang.code;
          return (
            <button
              key={lang.code}
              role="menuitem"
              onClick={() => onSelect(lang.code)}
              className={`min-h-[38px] w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-left transition-colors ${
                isSelected
                  ? "bg-primary-light font-bold text-primary"
                  : "text-text hover:bg-bg-alt hover:text-primary"
              }`}
            >
              <span>{lang.nativeName}</span>
              {isSelected && (
                <span className="text-xs text-primary font-bold">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
