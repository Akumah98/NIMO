"use client";

import { useLanguageSwitcher } from "@/hooks/useLanguageSwitcher";
import LanguageDropdown from "./LanguageDropdown";

export default function LanguageSwitcher() {
  const {
    currentLang,
    changeLanguage,
    allLanguages,
    isOpen,
    setIsOpen,
  } = useLanguageSwitcher();

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Change language"
        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-border bg-bg-alt/80 px-3 py-1.5 text-xs font-bold text-text transition-all hover:border-primary/40 hover:bg-bg active:scale-95"
      >
        <span className="text-sm">🌐</span>
        <span>{currentLang.toUpperCase()}</span>
        <svg
          className={`h-3 w-3 text-text-light transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <LanguageDropdown
          languages={allLanguages}
          currentLang={currentLang}
          onSelect={changeLanguage}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
