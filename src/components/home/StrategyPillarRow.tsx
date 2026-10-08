"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Pillar {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
}

interface Props {
  pillar: Pillar;
  index: number;
}

export default function StrategyPillarRow({ pillar, index }: Props) {
  const isReversed = index % 2 !== 0;
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <div ref={ref} className="grid gap-10 lg:grid-cols-12 lg:items-center">
      {/* Content Column */}
      <div
        className={`space-y-5 lg:col-span-6 transition-all duration-700 ${
          isReversed ? "lg:order-2" : "lg:order-1"
        } ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-light font-mono text-sm font-black text-primary shadow-xs">
            {pillar.step}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            {pillar.subtitle}
          </span>
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
          {pillar.title}
        </h3>

        <p className="text-base leading-relaxed text-text-light">
          {pillar.description}
        </p>

        <ul className="space-y-2.5 pt-2">
          {pillar.highlights.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-text">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="leading-relaxed font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Photography Column */}
      <div
        className={`lg:col-span-6 transition-all duration-700 delay-150 ${
          isReversed ? "lg:order-1" : "lg:order-2"
        } ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="group relative h-80 sm:h-96 w-full overflow-hidden rounded-3xl border border-border/70 bg-bg shadow-sm transition-all duration-300 hover:shadow-lg">
          <Image
            src={pillar.image}
            alt={pillar.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
