import Image from "next/image";
import { AboutApproachStep } from "@/types/about";

interface Props {
  steps: AboutApproachStep[];
}

export default function AboutApproachSection({ steps }: Props) {
  return (
    <section className="relative overflow-hidden border-y border-slate-800/80 bg-slate-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Image
        src="/hero1-bg.jpg"
        alt="How We Work Background"
        fill
        className="object-cover object-center opacity-25"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          How We Work: Our 4-Stage Methodology
        </h2>
        <p className="mt-2 text-sm text-gray-300 sm:text-base">
          A disciplined, grassroots-to-sustainability cycle designed to prevent aid dependency:
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {steps.map((s, idx) => (
            <div
              key={s.step || idx}
              className="flex items-start gap-4 p-3 rounded-xl transition-all duration-300 hover:translate-x-1 hover:bg-white/[0.04]"
            >
              <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-primary font-mono text-xs font-bold text-white shadow-xs">
                {s.step || idx + 1}
              </span>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-gray-300">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
