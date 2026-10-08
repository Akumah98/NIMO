"use client";

import { useEffect, useRef, useState } from "react";
import { Partner } from "@/types";
import PartnerSlideCard from "./PartnerSlideCard";

interface Props {
  partners: Partner[];
}

export default function PartnersSlideshow({ partners }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: "prev" | "next") => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth > 640 ? 460 : clientWidth * 0.9;

    if (direction === "next") {
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    } else {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => scroll("next"), 3800);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="relative mt-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {partners.map((partner, idx) => (
          <PartnerSlideCard key={idx} partner={partner} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scroll("prev")}
          aria-label="Previous partners"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-bg text-text shadow-2xs transition-all hover:border-primary hover:text-primary active:scale-95"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scroll("next")}
          aria-label="Next partners"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-bg text-text shadow-2xs transition-all hover:border-primary hover:text-primary active:scale-95"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
