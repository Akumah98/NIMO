export type SearchCategory = "all" | "program" | "event" | "team" | "report" | "article";

export interface SearchResultItem {
  id: string;
  title: string;
  snippet: string;
  category: SearchCategory;
  url: string;
  date?: string;
  image?: string;
}

export interface SearchGroup {
  category: SearchCategory;
  label: string;
  items: SearchResultItem[];
}
