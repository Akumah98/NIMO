import Link from "next/link";
import Image from "next/image";
import { ProgramItem } from "@/types/programs";

interface Props {
  programs: ProgramItem[];
}

export function ProgramsOverviewGrid({ programs }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <span className="inline-block rounded-full bg-primary-light px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
          Strategic Focus Areas
        </span>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-text sm:text-3xl">
          Core Humanitarian &amp; Development Pillars
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-text-light sm:text-base">
          Select an intervention below to examine our detailed field methodology, operational objectives, and community outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((prog) => (
          <div
            key={prog.id}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-bg shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl"
          >
            <div>
              <div className="relative aspect-video w-full overflow-hidden bg-bg-alt">
                <Image
                  src={prog.heroImage || prog.activities[0]?.image || "/hero1-bg.jpg"}
                  alt={prog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-xs">
                  {prog.badge}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-text transition-colors group-hover:text-primary">
                  {prog.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-text-light line-clamp-3">
                  {prog.overview}
                </p>

                <div className="mt-4 border-t border-border/60 pt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-text-light">
                    Key Objectives:
                  </p>
                  <ul className="mt-2 space-y-1.5 text-xs text-text">
                    {prog.objectives.slice(0, 2).map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                        <span className="line-clamp-1">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/programs?id=${prog.id}`}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-primary-dark"
              >
                <span>Explore Full Program</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
