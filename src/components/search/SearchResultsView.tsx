"use client";

import { useState } from "react";
import { SearchCategory, SearchResultItem } from "@/types/search";
import SearchFilterTabs from "./SearchFilterTabs";
import SearchResultCard from "./SearchResultCard";

interface Props {
  query: string;
  results: SearchResultItem[];
}

export default function SearchResultsView({ query, results }: Props) {
  const [activeCategory, setActiveCategory] = useState<SearchCategory>("all");

  const counts: Record<SearchCategory, number> = {
    all: results.length,
    program: results.filter((r) => r.category === "program").length,
    event: results.filter((r) => r.category === "event").length,
    team: results.filter((r) => r.category === "team").length,
    report: results.filter((r) => r.category === "report").length,
    article: results.filter((r) => r.category === "article").length,
  };

  const filteredResults =
    activeCategory === "all"
      ? results
      : results.filter((r) => r.category === activeCategory);

  return (
    <div>
      <SearchFilterTabs
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        counts={counts}
      />

      {filteredResults.length === 0 ? (
        <div className="py-12 text-center text-text-light rounded-xl border border-dashed border-border p-8">
          No items found under this category for &quot;{query}&quot;.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResults.map((item) => (
            <SearchResultCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
