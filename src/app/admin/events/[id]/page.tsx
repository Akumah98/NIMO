"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import EventForm from "@/components/admin/EventForm";
import type { Event } from "@/types";

export default function EditEventPage() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("id", params.id)
        .single();
      setEvent(data);
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) return <p className="text-text-light">Loading...</p>;
  if (!event) return <p className="text-red-500">Event not found.</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-text">Edit Event</h1>
      <EventForm event={event} />
    </div>
  );
}
