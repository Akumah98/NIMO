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
}

function formatBytes(bytes?: number) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

export function MediaCard({ item, copiedId, onCopyUrl, onDelete, onSelect }: MediaCardProps) {
  const isDoc =
    item.mime_type?.includes("pdf") ||
    item.mime_type?.includes("document") ||
    item.category === "reports" ||
    item.category === "resources" ||
    /\.(pdf|docx?|xlsx?|pptx?)$/i.test(item.file_url || item.name);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-bg-alt shadow-xs transition hover:shadow-md">
      {isDoc ? (
        <MediaFilePreview item={item} onSelect={onSelect} />
      ) : (
        <MediaImagePreview item={item} onSelect={onSelect} />
      )}

      <div className="flex flex-1 flex-col justify-between p-3">
        <div className="mb-2">
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
