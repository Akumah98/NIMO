import Link from "next/link";
import { SearchResultItem } from "@/types/search";

interface Props {
  item: SearchResultItem;
}

export default function SearchResultCard({ item }: Props) {
  return (
    <div className="rounded-xl border border-border bg-bg p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          {item.category}
        </span>
        {item.date && <span className="text-xs text-text-light">{item.date}</span>}
      </div>
      <h3 className="text-lg font-bold text-text hover:text-primary transition-colors">
        <Link href={item.url}>{item.title}</Link>
      </h3>
      <p className="mt-2 text-sm text-text-light line-clamp-2">{item.snippet}</p>
      <div className="mt-4 flex items-center justify-between text-xs font-medium text-primary">
        <Link href={item.url} className="inline-flex items-center gap-1 hover:underline">
          View details &rarr;
        </Link>
      </div>
    </div>
  );
}
