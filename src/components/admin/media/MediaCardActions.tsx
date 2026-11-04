"use client";

import type { MediaItem } from "@/types";

interface MediaCardActionsProps {
  item: MediaItem;
  isCopied: boolean;
  onCopyUrl: (url: string, id: string) => void;
  onDelete?: (item: MediaItem) => void;
  onSelect?: (url: string) => void;
}

export function MediaCardActions({
  item,
  isCopied,
  onCopyUrl,
  onDelete,
  onSelect,
}: MediaCardActionsProps) {
  // In selection/picker mode, card selection is handled via the top green checkbox
  if (onSelect) return null;

  return (
    <div className="flex items-center gap-1.5 border-t border-border pt-2">
      <button
        type="button"
        onClick={() => onCopyUrl(item.file_url, item.id)}
        className="flex h-11 flex-1 items-center justify-center gap-1 rounded-lg border border-border bg-bg text-xs font-medium text-text transition hover:border-primary hover:text-primary"
        aria-label="Copy asset link"
      >
        {isCopied ? "Copied!" : "Copy Link"}
      </button>

      {onDelete && (
        <button
          type="button"
          onClick={() => onDelete(item)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border text-text-light transition hover:border-red-500 hover:text-red-500"
          aria-label="Delete asset"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
