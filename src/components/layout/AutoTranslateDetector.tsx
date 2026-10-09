"use client";

import { useEffect } from "react";

export default function AutoTranslateDetector() {
  useEffect(() => {
    const rawLang =
      navigator.language ||
      (navigator.languages && navigator.languages[0]) ||
      "";
    const userLang = rawLang.split("-")[0].toLowerCase();

    if (userLang && userLang !== "en") {
      const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
      const currentTrans = match ? match[1] : null;

      if (currentTrans !== userLang) {
        const domain = window.location.hostname;
        document.cookie = `googtrans=/en/${userLang}; path=/;`;
        document.cookie = `googtrans=/en/${userLang}; path=/; domain=${domain};`;

        const select =
          document.querySelector<HTMLSelectElement>(".goog-te-combo");
        if (select) {
          select.value = userLang;
          select.dispatchEvent(new Event("change"));
        }
      }
    }
  }, []);

  return null;
}
