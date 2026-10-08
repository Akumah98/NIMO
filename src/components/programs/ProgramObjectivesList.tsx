import Image from "next/image";

interface Props {
  objectives: string[];
}

export default function ProgramObjectivesList({ objectives }: Props) {
  return (
    <section className="relative overflow-hidden border-y border-slate-800/80 bg-slate-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Image
        src="/hero1-bg.jpg"
        alt="Program Objectives Background"
        fill
        className="object-cover object-center opacity-25"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Program Objectives
        </h3>
        <p className="mt-2 text-sm text-gray-300 sm:text-base">
          Strategic milestones and outcomes targeted by this intervention:
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {objectives.map((obj, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-2 transition-all hover:translate-x-1"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary font-mono text-xs font-bold text-white shadow-xs">
                {idx + 1}
              </span>
              <p className="text-sm sm:text-base leading-relaxed text-gray-200">
                {obj}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
