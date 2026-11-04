"use client";

import { useState } from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { formatEventCategory } from "@/lib/utils/categoryUtils";
import { parseGalleryPhoto, type GalleryPhoto } from "@/lib/utils/galleryUtils";
import type { Event } from "@/types";
import { EventBodyRenderer } from "./EventBodyRenderer";
import { EventGallery } from "./EventGallery";
import { EventLightbox } from "./EventLightbox";

interface EventDetailViewProps {
  event: Event;
}

export function EventDetailView({ event }: EventDetailViewProps) {
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const galleryPhotos: GalleryPhoto[] = (event.images || []).map((img) =>
    parseGalleryPhoto(img, event.title)
  );

  const allPhotos: GalleryPhoto[] = [
    ...(event.cover_image ? [{ url: event.cover_image, caption: `${event.title} (Cover Photo)` }] : []),
    ...galleryPhotos,
  ];

  const activeIndex = activePhoto
    ? allPhotos.findIndex((p) => p.url === activePhoto.url)
    : null;

  return (
    <article className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3">
          <Badge variant="primary">{formatEventCategory(event.category)}</Badge>
          {event.event_date && (
            <time className="text-sm text-text-light">{formatDate(event.event_date)}</time>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-bold text-text sm:text-4xl">{event.title}</h1>

        {event.cover_image && (
          <div
            onClick={() => setActivePhoto({ url: event.cover_image!, caption: event.title })}
            className="group relative mt-8 aspect-video overflow-hidden rounded-2xl border border-border shadow-md cursor-pointer"
          >
            <Image
              src={event.cover_image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 rounded-full bg-black/60 px-3 py-1.5 text-white text-xs font-semibold backdrop-blur-xs">
                🔍 Click to Expand
              </span>
            </div>
          </div>
        )}

        <EventBodyRenderer body={event.body} onImageClick={setActivePhoto} />

        <EventGallery images={event.images} title={event.title} onImageClick={setActivePhoto} />

        <EventLightbox
          photos={allPhotos}
          currentIndex={activeIndex !== -1 ? activeIndex : null}
          onClose={() => setActivePhoto(null)}
          onNavigate={(idx) => setActivePhoto(allPhotos[idx] || null)}
        />
      </div>
    </article>
  );
}
