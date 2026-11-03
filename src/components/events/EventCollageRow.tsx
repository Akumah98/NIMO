"use client";

import Image from "next/image";

export interface CollageItem {
  url: string;
  caption?: string;
}

interface EventCollageRowProps {
  items: CollageItem[];
  cols: "3" | "2" | "asymmetric";
  aspect?: "square" | "video" | "standard" | "compact";
  onImageClick: (url: string) => void;
}

export function EventCollageRow({
  items,
  cols,
  aspect = "square",
  onImageClick,
}: EventCollageRowProps) {
  const aspectClass =
    aspect === "video" ? "aspect-video" :
    aspect === "standard" ? "aspect-[4/3]" :
    aspect === "compact" ? "h-36 sm:h-56" : "aspect-square";

  const gridClass =
    cols === "2" ? "grid grid-cols-2 gap-3 my-6" :
    cols === "asymmetric" ? "grid grid-cols-1 sm:grid-cols-3 gap-3 my-6" :
    "grid grid-cols-3 gap-2 sm:gap-3.5 my-6";

  return (
    <figure className="my-6">
      <div className={gridClass}>
        {items.map((item, idx) => {
          const spanClass = cols === "asymmetric" && idx === 0 ? "sm:col-span-2" : "";
          return (
            <div
              key={idx}
              onClick={() => onImageClick(item.url)}
              className={`group relative ${aspectClass} ${spanClass} cursor-pointer overflow-hidden rounded-xl bg-bg-alt border border-border/80 shadow-2xs transition-all hover:border-primary/40`}
            >
              <Image
                src={item.url}
                alt={item.caption || `Collage photo ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 33vw, 400px"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 rounded-full bg-black/60 p-1.5 text-white transition-opacity text-xs">
                  🔍
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {items.some((i) => i.caption) && (
        <figcaption className="text-center text-xs text-text-light mt-1.5 italic">
          {items.map((i) => i.caption).filter(Boolean).join(" • ")}
        </figcaption>
      )}
    </figure>
  );
}

