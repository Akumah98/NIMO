"use client";

import { useState } from "react";
import { InsertCollageControls } from "./InsertCollageControls";
import { InsertCollagePhotoSelector } from "./InsertCollagePhotoSelector";

interface InsertCollageModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableImages: string[];
  onInsert: (snippet: string) => void;
}

export function InsertCollageModal({
  isOpen,
  onClose,
  availableImages,
  onInsert,
}: InsertCollageModalProps) {
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const [cols, setCols] = useState<"3" | "2" | "asymmetric">("3");
  const [aspect, setAspect] = useState<"square" | "video" | "standard" | "compact">("square");
  const [caption, setCaption] = useState<string>("");

  if (!isOpen) return null;

  const toggleUrl = (url: string) => {
    setSelectedUrls((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : prev.length < 3 ? [...prev, url] : prev
    );
  };

  const handleConfirm = () => {
    if (selectedUrls.length < 2) return;
    const cleanCap = caption.trim();
    const items = selectedUrls
      .map((url) => (cleanCap ? `![${cleanCap}](${url})` : `![](${url})`))
      .join("\n");
    const capAttr = cleanCap ? ` caption="${cleanCap}"` : "";
    onInsert(`\n:::collage cols="${cols}" aspect="${aspect}"${capAttr}\n${items}\n:::\n`);
    setSelectedUrls([]);
    setCaption("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-bg border border-border p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-base font-bold text-text">Insert Image Collage (2–3 Photos)</h3>
          <button type="button" onClick={onClose} className="text-text-light hover:text-text">&times;</button>
        </div>

        <InsertCollagePhotoSelector
          availableImages={availableImages}
          selectedUrls={selectedUrls}
          onToggleUrl={toggleUrl}
          onSelectFromMedia={(urls) => setSelectedUrls(urls)}
        />

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-text">
            Caption / Description (One single caption for all photos)
          </label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="e.g. Field teams distributing seedlings during the outreach workshop..."
            className="min-h-11 rounded-lg border border-border bg-bg px-3 text-xs text-text focus:border-primary focus:outline-hidden"
          />
        </div>

        <InsertCollageControls
          cols={cols}
          onColsChange={setCols}
          aspect={aspect}
          onAspectChange={setAspect}
        />

        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <button type="button" onClick={onClose} className="min-h-11 px-4 text-xs font-semibold text-text-light">
            Cancel
          </button>
          <button
            type="button"
            disabled={selectedUrls.length < 2}
            onClick={handleConfirm}
            className="min-h-11 rounded-lg bg-green-600 px-5 text-xs font-bold text-white shadow-xs transition hover:bg-green-700 disabled:opacity-40"
          >
            ✓ Insert Collage ({selectedUrls.length})
          </button>
        </div>
      </div>
    </div>
  );
}
