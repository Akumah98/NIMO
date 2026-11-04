"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import eventCategories from "@/data/eventCategories.json";

interface CategoryFilterProps {
  basePath: string;
}

export default function CategoryFilter({ basePath }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || "";

  const allCategories = [
    { label: "All Events", value: "" },
    ...eventCategories.map((c) => ({ label: c.label, value: c.id })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {allCategories.map((cat) => (
        <Link
          key={cat.value}
          href={cat.value ? `${basePath}?category=${cat.value}` : basePath}
          className={`inline-flex min-h-11 items-center justify-center rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
            active.toLowerCase() === cat.value.toLowerCase()
              ? "bg-primary text-white shadow-xs"
              : "border border-border bg-bg-alt text-text-light hover:border-primary hover:text-primary"
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
}
