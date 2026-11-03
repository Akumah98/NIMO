"use client";

import Image from "next/image";

interface EventGalleryProps {
  images: string[];
  title: string;
  onImageClick: (url: string) => void;
}

export function EventGallery({ images, title, onImageClick }: EventGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="mt-12 border-t border-border pt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-text">Event Photo Gallery</h2>
          <p className="text-xs text-text-light">Moments and field highlights from this outreach</p>
        </div>
        <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-primary">
          {images.length} {images.length === 1 ? "Photo" : "Photos"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => onImageClick(img)}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-border bg-bg-alt shadow-2xs transition-all hover:border-primary/40"
          >
            <Image
              src={img}
              alt={`${title} - Photo ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 rounded-full bg-black/60 p-2 text-white transition-opacity text-xs">
                🔍 View
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

