"use client";

import Link from "next/link";
import aboutData from "@/data/aboutData.json";
import { StaffCapacity } from "@/types/about";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import StaffCapacityItem from "./StaffCapacityItem";

export default function StaffCapacities() {
  const capacities = (aboutData.staffCapacities || []) as StaffCapacity[];
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <div ref={ref} className="mt-14 sm:mt-16">
      {/* Header Row: Title & Subtitle on left, "View all" on right */}
      <div
        className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-5 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
            Our Multidisciplinary Team
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-text-light">
            Dedicated field professionals and technical specialists powering sustainable development:
          </p>
        </div>

        <Link
          href="/team"
          className="group inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors self-start sm:self-auto shrink-0"
        >
          <span>View all team</span>
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Grid: 4 columns matching the reference layout with staggered entrance */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {capacities.map((item, idx) => (
          <StaffCapacityItem
            key={item.id}
            capacity={item}
            startTrigger={isVisible}
            delayIndex={idx}
          />
        ))}
      </div>
    </div>
  );
}
