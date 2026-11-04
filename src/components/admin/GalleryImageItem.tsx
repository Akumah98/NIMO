"use client";

import Image from "next/image";
import { parseGalleryPhoto } from "@/lib/utils/galleryUtils";

interface GalleryImageItemProps {
  imageStr: string;
  index: number;
  onRemove: (index: number) => void;
  onUpdateCaption?: (index: number, caption: string) => void;
}

export function GalleryImageItem({
  imageStr,
  index,
  onRemove,
  onUpdateCaption,
}: GalleryImageItemProps) {
  const photo = parseGalleryPhoto(imageStr);

  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-border bg-bg-alt p-2 shadow-2xs">
      <div className="group relative aspect-square w-full overflow-hidden rounded-lg bg-bg">
        <Image
          src={photo.url}
          alt={photo.caption || `Gallery ${index + 1}`}
          fill
          unoptimized
          className="object-cover"
        />
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="absolute top-1.5 right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-red-600/90 text-white shadow-xs transition hover:bg-red-700"
          title="Remove photo"
          aria-label="Remove photo"
        >
          &times;
        </button>
      </div>

      <input
        type="text"
        value={photo.caption}
        onChange={(e) => onUpdateCaption?.(index, e.target.value)}
        placeholder="Add caption / notes..."
        className="w-full rounded-md border border-border bg-bg px-2 py-1 text-xs text-text placeholder-text-light focus:border-primary focus:outline-hidden"
      />
    </div>
  );
}
