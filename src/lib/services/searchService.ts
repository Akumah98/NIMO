import { createClient } from "@/lib/supabase/client";
import { SearchResultItem } from "@/types/search";
import fallbackData from "@/data/searchFallbackData.json";

export async function searchSite(query: string): Promise<SearchResultItem[]> {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const results: SearchResultItem[] = [];

  try {
    const supabase = createClient();
    const [eventsRes, postsRes, reportsRes] = await Promise.all([
      supabase.from("events").select("id, title, excerpt, slug, event_date").ilike("title", `%${trimmed}%`),
      supabase.from("posts").select("id, title, excerpt, slug, created_at").ilike("title", `%${trimmed}%`),
      supabase.from("reports").select("id, title, description, slug, published_date").ilike("title", `%${trimmed}%`),
    ]);

    eventsRes.data?.forEach((item) => {
      results.push({
        id: `db-event-${item.id}`,
        title: item.title,
        snippet: item.excerpt || "Community event by NIMO",
        category: "event",
        url: `/events`,
        date: item.event_date || undefined,
      });
    });

    postsRes.data?.forEach((item) => {
      results.push({
        id: `db-post-${item.id}`,
        title: item.title,
        snippet: item.excerpt || "Article by NIMO team",
        category: "article",
        url: `/blog`,
        date: item.created_at || undefined,
      });
    });

    reportsRes.data?.forEach((item) => {
      results.push({
        id: `db-report-${item.id}`,
        title: item.title,
        snippet: item.description || "Resource & research report",
        category: "report",
        url: `/reports`,
        date: item.published_date || undefined,
      });
    });
  } catch (err) {
    console.warn("Supabase search unavailable, falling back to local dataset:", err);
  }

  const localMatches = (fallbackData as SearchResultItem[]).filter(
    (item) =>
      item.title.toLowerCase().includes(trimmed) ||
      item.snippet.toLowerCase().includes(trimmed) ||
      item.category.toLowerCase().includes(trimmed)
  );

  const existingTitles = new Set(results.map((r) => r.title.toLowerCase()));
  localMatches.forEach((match) => {
    if (!existingTitles.has(match.title.toLowerCase())) {
      results.push(match);
    }
  });

  return results;
}
