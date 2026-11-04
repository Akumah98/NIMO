import eventCategories from "@/data/eventCategories.json";

export function formatEventCategory(category?: string | null): string {
  if (!category) return "Outreach";
  const match = eventCategories.find(
    (c) => c.id.toLowerCase() === category.toLowerCase() || c.label.toLowerCase() === category.toLowerCase()
  );
  if (match) return match.label;
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function parseEventCategories(categoryStr?: string | null): string[] {
  if (!categoryStr || !categoryStr.trim()) return ["outreach"];
  return categoryStr
    .split(",")
    .map((c) => c.trim().toLowerCase())
    .filter(Boolean);
}
