"use client";

import Image from "next/image";
import data from "@/data/data.json";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ImpactCounterItem from "./ImpactCounterItem";

export default function ImpactSection() {
  const { impactMetrics } = data;
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="impact"
      ref={ref}
      className="relative overflow-hidden border-y border-slate-800/80 bg-slate-950 px-4 py-24 sm:px-6 lg:px-8"
    >
      <Image
        src="/hero1-bg.jpg"
        alt="NIMO community impact and outreach"
        fill
        className="object-cover object-center opacity-25"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1px]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-light">
            Measurable Footprint
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Our Impact in Numbers
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-300 leading-relaxed">
            Through research, community mobilization, and targeted initiatives, we measure our success in real lives touched and empowered.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {impactMetrics.map((item, idx) => (
            <ImpactCounterItem
              key={item.id}
              value={item.value}
              label={item.label}
              description={item.description}
              startTrigger={isVisible}
              delayIndex={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
