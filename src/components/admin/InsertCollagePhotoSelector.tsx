"use client";

import { useState } from "react";
import Image from "next/image";
import { MediaModalPicker } from "./media/MediaModalPicker";

interface InsertCollagePhotoSelectorProps {
  availableImages: string[];
  selectedUrls: string[];
  onToggleUrl: (url: string) => void;
  onSelectFromMedia: (urls: string[]) => void;
}

export function InsertCollagePhotoSelector({
  availableImages,
  selectedUrls,
  onToggleUrl,
  onSelectFromMedia,
}: InsertCollagePhotoSelectorProps) {
  const [showMediaModal, setShowMediaModal] = useState(false);
  const combinedImages = Array.from(new Set([...selectedUrls, ...availableImages]));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-text">Choose 2 or 3 Photos</label>
        <div className="flex items-center gap-2">
          <span className="text-2xs font-bold text-primary">{selectedUrls.length} / 3 chosen</span>
          <button
            type="button"
            onClick={() => setShowMediaModal(true)}
            className="rounded-md bg-primary-light px-2.5 py-1 text-2xs font-bold text-primary transition hover:bg-primary hover:text-white"
          >
            📁 Browse Media
          </button>
        </div>
      </div>

      {combinedImages.length > 0 ? (
        <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1">
          {combinedImages.map((url, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onToggleUrl(url)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedUrls.includes(url) ? "border-green-600 ring-2 ring-green-600/30" : "border-border"
              }`}
            >
              <Image src={url} alt="Option" fill unoptimized className="object-cover" />
              {selectedUrls.includes(url) && (
                <div className="absolute inset-0 bg-green-600/30 flex items-center justify-center text-white font-bold text-base">✓</div>
              )}
            </button>
          ))}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowMediaModal(true)}
          className="flex min-h-16 w-full items-center justify-center rounded-lg border border-dashed border-border bg-bg-alt text-xs font-semibold text-primary hover:border-primary"
        >
          + Click to Choose Photos from Media Library
        </button>
      )}

      <MediaModalPicker
        isOpen={showMediaModal}
        onClose={() => setShowMediaModal(false)}
        multiple
        onSelectImages={(urls) => {
          onSelectFromMedia(urls.slice(0, 3));
          setShowMediaModal(false);
        }}
      />
    </div>
  );
}

