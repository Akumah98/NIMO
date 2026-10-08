"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Event } from "@/types";

export function useAdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadEvents() {
    const supabase = createClient();
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });
    setEvents(data || []);
    setLoading(false);
  }

  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });
      if (isMounted) {
        setEvents(data || []);
        setLoading(false);
      }
    };
    fetchEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  async function deleteEvent(id: string) {
    const supabase = createClient();
    await supabase.from("events").delete().eq("id", id);
    await loadEvents();
  }

  return { events, loading, reload: loadEvents, deleteEvent };
}
