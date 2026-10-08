import Image from "next/image";
import { TeamActionSnapshot } from "@/types/team";

interface Props {
  snapshots: TeamActionSnapshot[];
}

export default function TeamActionGallery({ snapshots }: Props) {
  return (
    <section className="py-14 sm:py-18 bg-bg-alt/40 border-t border-border/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-text sm:text-3xl">
            Our Team &amp; Facilitators in Action
          </h2>
          <p className="mt-2 text-sm text-text-light">
            Dedicated practitioners, social workers, and trainers working daily alongside communities across the South West:
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {snapshots.map((snap, idx) => (
            <div
              key={idx}
              className="group overflow-hidden rounded-2xl border border-border/80 bg-bg shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="relative h-60 w-full overflow-hidden bg-bg-alt">
                <Image
                  src={snap.image}
                  alt={snap.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-text group-hover:text-primary transition-colors">
                  {snap.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-text-light leading-relaxed">
                  {snap.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
