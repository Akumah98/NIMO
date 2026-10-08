"use client";

import Link from "next/link";
import { SearchResultItem } from "@/types/search";

interface Props {
  results: SearchResultItem[];
  loading: boolean;
  query: string;
  onSelect: () => void;
  onSubmit: () => void;
  className?: string;
}

export default function SearchResultsDropdown({ results, loading, query, onSelect, onSubmit, className }: Props) {
  if (!query.trim()) return null;

  return (
    <div className={`absolute top-full mt-2 rounded-xl border border-border bg-bg shadow-xl z-50 overflow-hidden text-left transition-all animate-fadeIn ${className || "right-0 w-80 sm:w-96"}`}>
      {loading ? (
        <div className="p-4 text-center text-xs text-text-light">Searching NIMO site...</div>
      ) : results.length === 0 ? (
        <div className="p-4 text-center text-xs text-text-light">No results found for &quot;{query}&quot;</div>
      ) : (
        <div className="max-h-80 overflow-y-auto divide-y divide-border/40">
          {results.slice(0, 5).map((item) => (
            <Link
              key={item.id}
              href={item.url}
              onClick={onSelect}
              className="block p-3 hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {item.category}
                </span>
                {item.date && <span className="text-[10px] text-text-light">{item.date}</span>}
              </div>
              <p className="text-xs font-semibold text-text truncate">{item.title}</p>
              <p className="text-[11px] text-text-light line-clamp-1 mt-0.5">{item.snippet}</p>
            </Link>
          ))}

          <button
            onClick={onSubmit}
            className="w-full bg-primary/5 p-2.5 text-center text-xs font-medium text-primary hover:bg-primary/10 transition-colors flex items-center justify-center gap-1"
          >
            View all results for &quot;{query}&quot; &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
