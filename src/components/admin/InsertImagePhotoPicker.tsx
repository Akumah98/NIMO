"use client";

import Image from "next/image";

interface InsertImagePhotoPickerProps {
  imagesToShow: string[];
  selectedUrl: string;
  onSelectUrl: (url: string) => void;
  onOpenMediaPicker: () => void;
}

export function InsertImagePhotoPicker({
  imagesToShow,
  selectedUrl,
  onSelectUrl,
  onOpenMediaPicker,
}: InsertImagePhotoPickerProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-text">Choose Photo</label>
        <button
          type="button"
          onClick={onOpenMediaPicker}
          className="rounded-md bg-primary-light px-2.5 py-1 text-2xs font-bold text-primary hover:bg-primary hover:text-white"
        >
          📁 Browse Media
        </button>
      </div>

      {imagesToShow.length > 0 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {imagesToShow.map((url, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSelectUrl(url)}
              className={`relative h-16 w-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                selectedUrl === url ? "border-green-600 ring-2 ring-green-600/30" : "border-border"
              }`}
            >
              <Image src={url} alt="Option" fill unoptimized className="object-cover" />
            </button>
          ))}
        </div>
      ) : (
        <input
          type="url"
          placeholder="Paste image URL or click Browse Media above"
          value={selectedUrl}
          onChange={(e) => onSelectUrl(e.target.value)}
          className="min-h-11 w-full rounded-lg border border-border px-3.5 py-2 text-sm text-text"
        />
      )}
    </div>
  );
}
