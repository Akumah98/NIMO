"use client";

import Image from "next/image";
import type { MediaItem } from "@/types";

interface MediaCardProps {
  item: MediaItem;
  copiedId: string | null;
  onCopyUrl: (url: string, id: string) => void;
  onDelete?: (item: MediaItem) => void;
  onSelect?: (url: string) => void;
}

function formatBytes(bytes?: number) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

export function MediaCard({ item, copiedId, onCopyUrl, onDelete, onSelect }: MediaCardProps) {
  const isCopied = copiedId === item.id;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-bg-alt shadow-sm transition hover:shadow-md">
      <div
        className={`relative aspect-square w-full cursor-pointer overflow-hidden bg-bg ${onSelect ? "hover:opacity-90" : ""}`}
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

      <div className="flex flex-1 flex-col justify-between p-3">
        <div className="mb-2">
          <p className="truncate text-xs font-semibold text-text" title={item.name}>
            {item.name}
          </p>
          <p className="text-[11px] text-text-light">{formatBytes(item.file_size)}</p>
        </div>

        <div className="flex items-center gap-1.5 border-t border-border pt-2">
          {onSelect ? (
            <button
              type="button"
              onClick={() => onSelect(item.file_url)}
              className="flex h-11 flex-1 items-center justify-center rounded-lg bg-primary text-xs font-medium text-white hover:bg-primary-dark"
            >
              Select
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onCopyUrl(item.file_url, item.id)}
              className="flex h-11 flex-1 items-center justify-center gap-1 rounded-lg border border-border bg-bg text-xs font-medium text-text transition hover:border-primary hover:text-primary"
              aria-label="Copy image link"
            >
              {isCopied ? "Copied!" : "Copy URL"}
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(item)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border text-text-light transition hover:border-red-500 hover:text-red-500"
              aria-label="Delete image"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
