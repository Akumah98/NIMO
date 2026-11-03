"use client";

import type { MediaItem } from "@/types";

interface MediaFilePreviewProps {
  item: MediaItem;
  onSelect?: (url: string) => void;
}

export function MediaFilePreview({ item, onSelect }: MediaFilePreviewProps) {
  const ext = (item.file_url.split(".").pop() || item.name.split(".").pop() || "FILE").toUpperCase();
  const isPdf = ext === "PDF" || item.mime_type?.includes("pdf");

  return (
    <div
      className={`relative aspect-square w-full cursor-pointer flex flex-col items-center justify-center p-4 bg-linear-to-b from-bg-alt to-bg text-center ${
        onSelect ? "hover:opacity-90" : ""
      }`}
      onClick={() => onSelect && onSelect(item.file_url)}
    >
      {item.category && (
        <span className="absolute left-2 top-2 rounded-full bg-secondary/90 px-2 py-0.5 text-xs font-semibold text-white">
          {item.category}
        </span>
      )}

      <span className={`absolute right-2 top-2 rounded-md px-1.5 py-0.5 text-[11px] font-bold text-white ${
        isPdf ? "bg-red-600" : "bg-primary"
      }`}>
        {ext}
      </span>

      <div className={`mb-2 rounded-2xl p-3.5 shadow-xs ${isPdf ? "bg-red-50 text-red-600" : "bg-primary-light text-primary"}`}>
        <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>

      <p className="line-clamp-2 text-xs font-medium text-text px-2">
        {item.name}
      </p>

      <a
        href={item.file_url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
      >
        <span>Open File</span>
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}

