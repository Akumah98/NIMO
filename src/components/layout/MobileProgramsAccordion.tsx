"use client";

import { useState } from "react";
import Link from "next/link";
import programsNavData from "@/data/programsNavigation.json";
import { ProgramNavItem } from "@/types";

interface Props {
  onClose: () => void;
}

export default function MobileProgramsAccordion({ onClose }: Props) {
  const [expanded, setExpanded] = useState(false);
  const items = programsNavData as ProgramNavItem[];

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between rounded-xl px-4 py-2.5 transition-all hover:bg-primary-light">
        <Link
          href="/programs"
          onClick={onClose}
          className="flex-1 text-base font-semibold text-text hover:text-primary transition-colors"
        >
          Programs
        </Link>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="min-h-[44px] min-w-[44px] -mr-2 flex items-center justify-center rounded-lg text-text-light hover:text-primary transition-colors"
          aria-expanded={expanded}
          aria-label="Toggle programs menu"
        >
          <svg
            className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
              expanded ? "rotate-90 text-primary" : "text-text-light"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l-2 border-primary/20 pl-3 transition-all duration-300">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className="flex min-h-[44px] items-center rounded-lg px-3 py-2 text-sm font-semibold text-text transition-colors hover:bg-primary-light/70 hover:text-primary active:scale-[0.98]"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
