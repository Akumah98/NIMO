import type { Metadata } from "next";
import { searchSite } from "@/lib/services/searchService";
import SearchResultsView from "@/components/search/SearchResultsView";

export const metadata: Metadata = {
  title: "Search Results",
  description: "Search across NIMO programs, events, research reports, and articles.",
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q || "";
  const results = await searchSite(query);

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text sm:text-4xl">Search Results</h1>
          <p className="mt-2 text-sm text-text-light">
            {query ? (
              <>
                Showing search matches for <span className="font-semibold text-primary">&quot;{query}&quot;</span> ({results.length} results found)
              </>
            ) : (
              "Enter a term in the search box above to search NIMO."
            )}
          </p>
        </div>

        {query ? (
          <SearchResultsView query={query} results={results} />
        ) : (
          <div className="py-16 text-center text-text-light rounded-xl border border-dashed border-border p-8">
            Please type a keyword or title into the search bar in the top navigation.
          </div>
        )}
      </div>
    </div>
  );
}
