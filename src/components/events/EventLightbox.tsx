"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { GalleryPhoto } from "@/lib/utils/galleryUtils";

interface EventLightboxProps {
  photos: GalleryPhoto[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function EventLightbox({ photos, currentIndex, onClose, onNavigate }: EventLightboxProps) {
  useEffect(() => {
    if (currentIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % photos.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, photos.length, onClose, onNavigate]);

  if (currentIndex === null || !photos[currentIndex]) return null;
  const currentPhoto = photos[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md p-4 sm:p-6">
      <div className="flex items-center justify-between z-10 w-full max-w-5xl mx-auto">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
          {currentIndex + 1} / {photos.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Close viewer"
        >
          <span className="text-2xl leading-none">&times;</span>
        </button>
      </div>

      <div className="relative flex-1 w-full max-w-5xl mx-auto my-2 flex items-center justify-center">
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onNavigate((currentIndex - 1 + photos.length) % photos.length)}
              className="absolute left-2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors shadow-lg"
              aria-label="Previous image"
            >
              &#8592;
            </button>
            <button
              type="button"
              onClick={() => onNavigate((currentIndex + 1) % photos.length)}
              className="absolute right-2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors shadow-lg"
              aria-label="Next image"
            >
              &#8594;
            </button>
          </>
        )}

        <div className="relative h-full w-full max-h-[68vh]">
          <Image
            src={currentPhoto.url}
            alt={currentPhoto.caption || `Photo ${currentIndex + 1}`}
            fill
            unoptimized
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
        </div>
      </div>

      {currentPhoto.caption && (
        <div className="z-10 w-full max-w-3xl mx-auto rounded-xl bg-white/10 backdrop-blur-md px-5 py-3 border border-white/10 text-center">
          <p className="text-sm font-medium text-white/95 leading-snug">
            <span className="mr-1.5 opacity-80">💬</span>
            {currentPhoto.caption}
          </p>
        </div>
      )}
    </div>
  );
}
