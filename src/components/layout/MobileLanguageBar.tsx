"use client";

import { useLanguageSwitcher } from "@/hooks/useLanguageSwitcher";

export default function MobileLanguageBar() {
  const { currentLang, changeLanguage, allLanguages } = useLanguageSwitcher();

  return (
    <div className="rounded-2xl border border-border/70 bg-bg-alt/70 p-3">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-text-light">
        <span>Language / Langue</span>
        <span>🌐</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <button
          type="button"
          onClick={() => changeLanguage("en")}
          className={`min-h-[44px] flex items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all active:scale-95 ${
            currentLang === "en"
              ? "bg-primary text-white shadow-sm"
              : "border border-border bg-bg text-text hover:bg-primary-light"
          }`}
        >
          <span>🇬🇧</span>
          <span>English</span>
        </button>

        <button
          type="button"
          onClick={() => changeLanguage("fr")}
          className={`min-h-[44px] flex items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all active:scale-95 ${
            currentLang === "fr"
              ? "bg-primary text-white shadow-sm"
              : "border border-border bg-bg text-text hover:bg-primary-light"
          }`}
        >
          <span>🇫🇷</span>
          <span>Français</span>
        </button>
      </div>

      <select
        value={currentLang}
        onChange={(e) => changeLanguage(e.target.value)}
        className="min-h-[44px] w-full rounded-xl border border-border bg-bg px-3 py-2 text-xs font-medium text-text focus:border-primary focus:outline-hidden"
        aria-label="Select more languages"
      >
        <option value="" disabled>
          More Languages...
        </option>
        {allLanguages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.flag} {l.name} ({l.nativeName})
          </option>
        ))}
      </select>
    </div>
  );
}
