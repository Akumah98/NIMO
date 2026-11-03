"use client";

import Image from "next/image";
import type { MediaItem } from "@/types";

interface MediaImagePreviewProps {
  item: MediaItem;
  onSelect?: (url: string) => void;
}

export function MediaImagePreview({ item, onSelect }: MediaImagePreviewProps) {
  return (
    <div
      className={`relative aspect-square w-full cursor-pointer overflow-hidden bg-bg ${
        onSelect ? "hover:opacity-90" : ""
      }`}
      onClick={() => onSelect && onSelect(item.file_url)}
    >
      <Image
        src={item.file_url}
        alt={item.name}
        fill
        unoptimized
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {item.category && (
        <span className="absolute left-2 top-2 rounded-full bg-primary/80 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-xs">
          {item.category}
        </span>
      )}
    </div>
  );
}

