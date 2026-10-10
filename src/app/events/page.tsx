import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import EventCard from "@/components/events/EventCard";
import EventsHero from "@/components/events/EventsHero";
import CategoryFilter from "@/components/events/CategoryFilter";
import Pagination from "@/components/ui/Pagination";
import { EVENTS_PER_PAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Events",
  description: "Your guide to what's happening — community outreach and programs by NIMO.",
};

export const revalidate = 60;

interface Props {
  searchParams: Promise<{ category?: string; page?: string }>;
}

export default async function EventsPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category || "";
  const page = Number(params.page) || 1;
  const offset = (page - 1) * EVENTS_PER_PAGE;

  const supabase = await createClient();

  let query = supabase
    .from("events")
    .select("*", { count: "exact" })
    .eq("published", true)
    .order("event_date", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data: events, count } = await query.range(offset, offset + EVENTS_PER_PAGE - 1);
  const totalPages = Math.ceil((count || 0) / EVENTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-bg">
      <EventsHero />

      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CategoryFilter basePath="/events" />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events && events.length > 0 ? (
              events.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <p className="col-span-full py-12 text-center text-text-light">
                No events found.
              </p>
            )}
          </div>

          <div className="mt-12">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/events"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
