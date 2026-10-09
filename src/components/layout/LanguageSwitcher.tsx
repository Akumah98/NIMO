"use client";

import { useLanguageSwitcher } from "@/hooks/useLanguageSwitcher";
import LanguageDropdown from "./LanguageDropdown";

export default function LanguageSwitcher() {
  const {
    currentLang,
    changeLanguage,
    primaryLanguages,
    otherLanguages,
    isOpen,
    setIsOpen,
  } = useLanguageSwitcher();

  const isOtherSelected = otherLanguages.some((l) => l.code === currentLang);

  return (
    <div className="relative inline-flex items-center">
      <div className="inline-flex min-h-[44px] items-center rounded-full border border-border bg-bg-alt/80 p-1 backdrop-blur-xs">
        {primaryLanguages.map((lang) => {
          const isActive = currentLang === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => changeLanguage(lang.code)}
              aria-label={`Switch to ${lang.name}`}
              className={`min-h-[36px] px-2.5 inline-flex items-center gap-1 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-xs"
                  : "text-text-light hover:text-text"
              }`}
            >
              <span className="text-sm">{lang.flag}</span>
              <span>{lang.code.toUpperCase()}</span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="More languages"
          className={`min-h-[36px] px-2 inline-flex items-center gap-1 rounded-full text-xs font-semibold transition-all ${
            isOtherSelected
              ? "bg-primary text-white shadow-xs"
              : "text-text-light hover:text-text"
          }`}
        >
          <span>🌐</span>
          <svg
            className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <LanguageDropdown
          languages={otherLanguages}
          currentLang={currentLang}
          onSelect={changeLanguage}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
