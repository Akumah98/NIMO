"use client";

import { useState } from "react";
import Image from "next/image";
import { InsertImageOptions } from "./InsertImageOptions";

interface InsertImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableImages: string[];
  onInsert: (snippet: string) => void;
}

export function InsertImageModal({
  isOpen,
  onClose,
  availableImages,
  onInsert,
}: InsertImageModalProps) {
  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const [placement, setPlacement] = useState<"full" | "left" | "right">("full");
  const [aspect, setAspect] = useState<"video" | "square" | "standard" | "natural">("video");
  const [caption, setCaption] = useState<string>("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!selectedUrl) return;
    const cleanCap = caption.trim() || "Event photo";
    const snippet = `\n![${cleanCap}](${selectedUrl} "placement:${placement};aspect:${aspect}")\n`;
    onInsert(snippet);
    setSelectedUrl("");
    setCaption("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-bg border border-border p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-base font-bold text-text">Insert Inline Image</h3>
          <button type="button" onClick={onClose} className="text-text-light hover:text-text">&times;</button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text mb-1.5">Choose Photo</label>
          {availableImages.length > 0 ? (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {availableImages.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedUrl(url)}
                  className={`relative h-16 w-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedUrl === url ? "border-primary ring-2 ring-primary/20" : "border-border"
                  }`}
                >
                  <Image src={url} alt="Option" fill unoptimized className="object-cover" />
                </button>
              ))}
            </div>
          ) : (
            <input
              type="url"
              placeholder="Paste image URL here..."
              value={selectedUrl}
              onChange={(e) => setSelectedUrl(e.target.value)}
              className="min-h-11 w-full rounded-lg border border-border px-3.5 py-2 text-sm text-text"
            />
          )}
        </div>

        <InsertImageOptions
          placement={placement}
          aspect={aspect}
          caption={caption}
          onPlacementChange={setPlacement}
          onAspectChange={setAspect}
          onCaptionChange={setCaption}
        />

        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <button type="button" onClick={onClose} className="min-h-11 px-4 text-xs font-semibold text-text-light">Cancel</button>
          <button type="button" disabled={!selectedUrl} onClick={handleConfirm} className="min-h-11 rounded-lg bg-primary px-5 text-xs font-bold text-white disabled:opacity-50">
            Insert Photo
          </button>
        </div>
      </div>
    </div>
  );
}
