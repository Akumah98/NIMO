"use client";

import Link from "next/link";
import CollapsibleSearch from "./CollapsibleSearch";

export default function HeaderActions() {
  return (
    <div className="hidden items-center gap-3 md:flex shrink-0">
      <Link
        href="/donate"
        className="min-h-[44px] inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm lg:text-base font-semibold text-white shadow-xs transition-all duration-200 hover:bg-primary-dark active:scale-95"
      >
        Donate
      </Link>
      <CollapsibleSearch />
    </div>
  );
}
