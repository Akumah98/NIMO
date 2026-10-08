"use client";

import Link from "next/link";
import data from "@/data/data.json";

export default function QuickAnchorBar() {
  const { quickNav } = data;

  return (
    <section className="relative z-20 -mt-6 sm:-mt-7 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex justify-center">
        <nav
          className="flex max-w-full items-center gap-1 sm:gap-1.5 overflow-x-auto rounded-full border border-border/80 bg-bg/95 p-1.5 shadow-xl backdrop-blur-xl scrollbar-none"
          aria-label="Quick page navigation"
        >
          {quickNav.map((nav) => (
            <Link
              key={nav.href}
              href={nav.href}
              className="min-h-[40px] shrink-0 inline-flex items-center rounded-full px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-bold text-text-light transition-all duration-200 hover:bg-primary-light hover:text-primary active:scale-95"
            >
              {nav.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
