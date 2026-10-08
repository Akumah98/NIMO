"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "Recent", value: "recent" },
  { label: "Outreach", value: "outreach" },
  { label: "Other", value: "other" },
];

interface CategoryFilterProps {
  basePath: string;
}

export default function CategoryFilter({ basePath }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || "";

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.value}
          href={cat.value ? `${basePath}?category=${cat.value}` : basePath}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            active === cat.value
              ? "bg-primary text-white"
              : "bg-bg-alt text-text-light hover:bg-primary-light hover:text-primary"
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
}
