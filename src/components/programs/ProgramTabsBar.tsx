"use client";

import Link from "next/link";
import { ProgramItem } from "@/types/programs";

interface Props {
  programs: ProgramItem[];
  activeId: string | null;
}

export function ProgramTabsBar({ programs, activeId }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-border/80 bg-bg-alt/50 p-2">
        <Link
          href="/programs"
          className={`inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            !activeId
              ? "bg-primary text-white shadow-xs"
              : "text-text-light hover:bg-bg hover:text-text"
          }`}
        >
          All Programs Overview
        </Link>

        {programs.map((p) => {
          const isActive = activeId === p.id;
          return (
            <Link
              key={p.id}
              href={`/programs?id=${p.id}`}
              className={`inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-xs"
                  : "text-text-light hover:bg-bg hover:text-text"
              }`}
            >
              {p.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
