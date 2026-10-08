import Image from "next/image";
import { ProgramItem } from "@/types/programs";

interface Props {
  program: ProgramItem;
}

export default function ProgramHeaderCard({ program }: Props) {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl border border-border bg-bg-alt shadow-xs">
        {program.heroImage && (
          <div className="relative h-64 w-full sm:h-80 lg:h-96">
            <Image
              src={program.heroImage}
              alt={program.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary px-3.5 py-1 text-xs font-semibold text-white shadow-xs">
                {program.badge}
              </span>
              {program.pillars && (
                <span className="rounded-full bg-white/90 px-3.5 py-1 text-xs font-semibold text-slate-900 shadow-xs backdrop-blur-xs">
                  {program.pillars}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl lg:text-4xl">
            {program.title}
          </h2>
          <p className="mt-2 text-base font-semibold text-primary sm:text-lg">
            {program.subtitle}
          </p>

          <p className="mt-5 text-base leading-relaxed text-text-light sm:text-lg">
            {program.overview}
          </p>

          {/* Goal Callout - Indented Format */}
          <div className="mt-8 border-l-4 border-primary pl-5 sm:pl-6 py-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
              Our Program Goal
            </h3>
            <p className="mt-2 text-base sm:text-lg font-medium italic leading-relaxed text-text">
              {program.goal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
