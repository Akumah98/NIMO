"use client";

import { useSearch } from "@/hooks/useSearch";
import SearchResultsDropdown from "./SearchResultsDropdown";

export default function CollapsibleSearch() {
  const {
    isOpen,
    query,
    results,
    loading,
    containerRef,
    inputRef,
    setQuery,
    toggleOpen,
    closeSearch,
    submitSearch,
  } = useSearch();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeSearch();
    if (e.key === "Enter") submitSearch();
  };

  return (
    <div ref={containerRef} className="relative flex items-center">
      {/* Search Trigger Icon Button */}
      <button
        type="button"
        onClick={toggleOpen}
        aria-label="Open search"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-slate-800 border border-gray-200 shadow-sm hover:bg-gray-50 hover:text-primary transition-all focus:outline-none shrink-0"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Floating Absolute Search Bar */}
      {isOpen && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-50 w-72 sm:w-80 md:w-96 rounded-full border border-gray-200 bg-white px-4 py-2 sm:py-2.5 shadow-2xl flex items-center gap-2.5 animate-fadeIn">
          <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search NIMO..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 placeholder-gray-400 focus:outline-none"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-xs text-gray-500 hover:text-gray-800 shrink-0"
            >
              Clear
            </button>
          )}

          <button
            type="button"
            onClick={closeSearch}
            aria-label="Close search"
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors shrink-0"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <SearchResultsDropdown
            results={results}
            loading={loading}
            query={query}
            onSelect={closeSearch}
            onSubmit={submitSearch}
            className="right-0 top-full mt-3 w-full border-gray-200 bg-white text-slate-900 shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
