"use client";

import type { MediaItem } from "@/types";
import { MediaCard } from "./MediaCard";

interface MediaGridProps {
  media: MediaItem[];
  loading: boolean;
  copiedId: string | null;
  onCopyUrl: (url: string, id: string) => void;
  onDelete?: (item: MediaItem) => void;
  onSelect?: (url: string) => void;
}

export function MediaGrid({
  media,
  loading,
  copiedId,
  onCopyUrl,
  onDelete,
  onSelect,
}: MediaGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex aspect-square animate-pulse flex-col rounded-xl border border-border bg-bg-alt"
          />
        ))}
      </div>
    );
  }

  if (media.length === 0) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-bg-alt p-8 text-center">
        <div className="mb-3 rounded-full bg-primary-light p-3 text-primary">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-text">No media found</p>
        <p className="mt-1 text-xs text-text-light">Upload images above to build your media library</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {media.map((item) => (
        <MediaCard
          key={item.id}
          item={item}
          copiedId={copiedId}
          onCopyUrl={onCopyUrl}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
