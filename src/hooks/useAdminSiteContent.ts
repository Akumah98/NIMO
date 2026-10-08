"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SiteContent } from "@/types";

export function useAdminSiteContent() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchContent = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("site_content").select("*");
      if (isMounted) {
        const map: Record<string, string> = {};
        (data || []).forEach((item: SiteContent) => {
          map[item.key] = item.value;
        });
        setContent(map);
        setLoading(false);
      }
    };
    fetchContent();
    return () => {
      isMounted = false;
    };
  }, []);

  function updateField(key: string, value: string) {
    setContent((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function saveContent(keys: { key: string }[]) {
    setSaving(true);
    const supabase = createClient();

    for (const { key } of keys) {
      const value = content[key];
      if (value === undefined) continue;

      await supabase.from("site_content").upsert(
        { key, value, updated_at: new Date().toISOString() },
        { onConflict: "key" }
      );
    }

    setSaving(false);
    setSaved(true);
  }

  return { content, loading, saving, saved, updateField, saveContent };
}
