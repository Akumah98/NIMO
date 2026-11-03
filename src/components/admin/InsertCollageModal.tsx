"use client";

import { useState } from "react";
import Image from "next/image";
import { InsertCollageControls } from "./InsertCollageControls";

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

  if (!isOpen) return null;

  const toggleUrl = (url: string) => {
    setSelectedUrls((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : prev.length < 3 ? [...prev, url] : prev
    );
  };

  const handleConfirm = () => {
    if (selectedUrls.length < 2) return;
    const items = selectedUrls.map((url, i) => `![Collage photo ${i + 1}](${url})`).join("\n");
    onInsert(`\n:::collage cols="${cols}" aspect="${aspect}"\n${items}\n:::\n`);
    setSelectedUrls([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-bg border border-border p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-base font-bold text-text">Insert Image Collage (2–3 Photos)</h3>
          <button type="button" onClick={onClose} className="text-text-light hover:text-text">&times;</button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-text">Select 2 or 3 Photos</label>
            <span className="text-2xs text-primary font-bold">{selectedUrls.length} / 3 selected</span>
          </div>
          {availableImages.length > 0 ? (
            <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1">
              {availableImages.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleUrl(url)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedUrls.includes(url) ? "border-primary ring-2 ring-primary/30" : "border-border"
                  }`}
                >
                  <Image src={url} alt="Option" fill unoptimized className="object-cover" />
                  {selectedUrls.includes(url) && (
                    <div className="absolute inset-0 bg-primary/30 flex items-center justify-center text-white font-bold">✓</div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs text-text-light">Upload photos in the Gallery section above first.</p>
          )}
        </div>

        <InsertCollageControls
          cols={cols}
          onColsChange={setCols}
          aspect={aspect}
          onAspectChange={setAspect}
        />

        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <button type="button" onClick={onClose} className="min-h-11 px-4 text-xs font-semibold text-text-light">Cancel</button>
          <button type="button" disabled={selectedUrls.length < 2} onClick={handleConfirm} className="min-h-11 rounded-lg bg-primary px-5 text-xs font-bold text-white disabled:opacity-50">
            Insert Collage ({selectedUrls.length})
          </button>
        </div>
      </div>
    </div>
  );
}
