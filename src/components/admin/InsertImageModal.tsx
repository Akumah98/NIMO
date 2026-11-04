"use client";

import { useState } from "react";
import { InsertImageOptions } from "./InsertImageOptions";
import { InsertImagePhotoPicker } from "./InsertImagePhotoPicker";
import { MediaModalPicker } from "./media/MediaModalPicker";

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
  const [showMediaPicker, setShowMediaPicker] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!selectedUrl) return;
    const cleanCap = caption.trim();
    onInsert(`\n![${cleanCap}](${selectedUrl} "placement:${placement};aspect:${aspect}")\n`);
    setSelectedUrl("");
    setCaption("");
    onClose();
  };

  const imagesToShow = Array.from(new Set([selectedUrl, ...availableImages].filter(Boolean)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-bg border border-border p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-base font-bold text-text">Insert Inline Image</h3>
          <button type="button" onClick={onClose} className="text-text-light hover:text-text">&times;</button>
        </div>

        <InsertImagePhotoPicker
          imagesToShow={imagesToShow}
          selectedUrl={selectedUrl}
          onSelectUrl={setSelectedUrl}
          onOpenMediaPicker={() => setShowMediaPicker(true)}
        />

        <InsertImageOptions
          placement={placement}
          aspect={aspect}
          caption={caption}
          onPlacementChange={setPlacement}
          onAspectChange={setAspect}
          onCaptionChange={setCaption}
        />

        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <button type="button" onClick={onClose} className="min-h-11 px-4 text-xs font-semibold text-text-light">
            Cancel
          </button>
          <button
            type="button"
            disabled={!selectedUrl}
            onClick={handleConfirm}
            className="min-h-11 rounded-lg bg-green-600 px-5 text-xs font-bold text-white shadow-xs hover:bg-green-700 disabled:opacity-40"
          >
            ✓ Insert Photo
          </button>
        </div>

        <MediaModalPicker
          isOpen={showMediaPicker}
          onClose={() => setShowMediaPicker(false)}
          onSelectImage={(url) => {
            setSelectedUrl(url);
            setShowMediaPicker(false);
          }}
        />
      </div>
    </div>
  );
}
