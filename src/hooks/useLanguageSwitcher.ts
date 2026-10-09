"use client";

import { useEffect, useState, useTransition } from "react";
import languagesData from "@/data/languages.json";
import type { LanguageItem } from "@/types";

const ALL_LANGUAGES = languagesData as LanguageItem[];

export function useLanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<string>("en");
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
      const saved = match ? match[1] : localStorage.getItem("preferred_lang");

      if (saved && ALL_LANGUAGES.some((l) => l.code === saved)) {
        setCurrentLang(saved);
      } else {
        const browserLang = (navigator.language || "").split("-")[0];
        if (browserLang && browserLang !== "en" && ALL_LANGUAGES.some((l) => l.code === browserLang)) {
          changeLanguage(browserLang);
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  function changeLanguage(code: string) {
    startTransition(() => {
      setCurrentLang(code);
      setIsOpen(false);
    });

    localStorage.setItem("preferred_lang", code);
    const domain = window.location.hostname;
    document.cookie = `googtrans=/en/${code}; path=/;`;
    document.cookie = `googtrans=/en/${code}; path=/; domain=${domain};`;

    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  }

  const primaryLanguages = ALL_LANGUAGES.filter((l) => l.isPrimary);
  const otherLanguages = ALL_LANGUAGES.filter((l) => !l.isPrimary);

  return {
    currentLang,
    changeLanguage,
    primaryLanguages,
    otherLanguages,
    allLanguages: ALL_LANGUAGES,
    isOpen,
    setIsOpen,
  };
}
