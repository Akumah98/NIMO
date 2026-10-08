"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Report } from "@/types";

export function useAdminReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadReports() {
    const supabase = createClient();
    const { data } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });
    setReports(data || []);
    setLoading(false);
  }

  useEffect(() => {
    let isMounted = true;
    const fetchReports = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false });
      if (isMounted) {
        setReports(data || []);
        setLoading(false);
      }
    };
    fetchReports();
    return () => {
      isMounted = false;
    };
  }, []);

  async function deleteReport(id: string) {
    const supabase = createClient();
    await supabase.from("reports").delete().eq("id", id);
    await loadReports();
  }

  return { reports, loading, reload: loadReports, deleteReport };
}
