"use client";

import type { MediaItem } from "@/types";
import { MediaImagePreview } from "./MediaImagePreview";
import { MediaFilePreview } from "./MediaFilePreview";
import { MediaCardActions } from "./MediaCardActions";

interface MediaCardProps {
  item: MediaItem;
  copiedId: string | null;
  onCopyUrl: (url: string, id: string) => void;
  onDelete?: (item: MediaItem) => void;
  onSelect?: (url: string) => void;
  selectedUrl?: string;
}

function formatBytes(bytes?: number) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

export function MediaCard({
  item,
  copiedId,
  onCopyUrl,
  onDelete,
  onSelect,
  selectedUrl,
}: MediaCardProps) {
  const isSelected = !!selectedUrl && selectedUrl === item.file_url;
  const isDoc =
    item.mime_type?.includes("pdf") ||
    item.mime_type?.includes("document") ||
    item.category === "reports" ||
    item.category === "resources" ||
    /\.(pdf|docx?|xlsx?|pptx?)$/i.test(item.file_url || item.name);

  return (
    <div
      onClick={() => onSelect?.(item.file_url)}
      className={`group relative flex flex-col overflow-hidden rounded-xl border bg-bg-alt shadow-xs transition ${
        isSelected
          ? "border-green-600 ring-2 ring-green-600/40 shadow-md"
          : "border-border hover:shadow-md hover:border-primary/40"
      } ${onSelect ? "cursor-pointer" : ""}`}
    >
      <div className="relative">
        {isDoc ? (
          <MediaFilePreview item={item} onSelect={onSelect} />
        ) : (
          <MediaImagePreview item={item} onSelect={onSelect} />
        )}

        {onSelect && (
          <div className="absolute top-2.5 right-2.5 z-10">
            {isSelected ? (
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-white shadow-md ring-2 ring-white">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/80 bg-black/30 backdrop-blur-xs transition group-hover:border-white group-hover:bg-black/50" />
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <p className="truncate text-xs font-semibold text-text" title={item.name}>
            {item.name}
          </p>
          <p className="text-[11px] text-text-light">{formatBytes(item.file_size)}</p>
        </div>

        <MediaCardActions
          item={item}
          isCopied={copiedId === item.id}
          onCopyUrl={onCopyUrl}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}
