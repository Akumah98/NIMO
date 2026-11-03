"use client";

import { useState } from "react";
import { InsertImageModal } from "./InsertImageModal";
import { InsertCollageModal } from "./InsertCollageModal";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  availableImages?: string[];
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  availableImages = [],
}: RichTextEditorProps) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showCollageModal, setShowCollageModal] = useState(false);

  const insertSnippet = (snippet: string) => onChange(`${value}\n${snippet}\n`);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-lg border border-b-0 border-border bg-bg-alt px-3 py-2">
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={() => insertSnippet("## Heading 2")} className="rounded px-2 py-1 text-xs font-bold text-text hover:bg-bg">H2</button>
          <button type="button" onClick={() => insertSnippet("### Heading 3")} className="rounded px-2 py-1 text-xs font-bold text-text hover:bg-bg">H3</button>
          <button type="button" onClick={() => insertSnippet("> Important highlight")} className="rounded px-2 py-1 text-xs font-medium text-text hover:bg-bg">Quote</button>
          <button type="button" onClick={() => insertSnippet("- Bullet item")} className="rounded px-2 py-1 text-xs font-medium text-text hover:bg-bg">List</button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowImageModal(true)}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-md bg-bg px-2.5 py-1 text-xs font-semibold text-primary border border-border hover:border-primary"
          >
            + Single Photo
          </button>
          <button
            type="button"
            onClick={() => setShowCollageModal(true)}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-md bg-primary-light px-2.5 py-1 text-xs font-bold text-primary border border-primary/20 hover:bg-primary hover:text-white"
          >
            + 2–3 Photo Collage
          </button>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Write your event story in markdown..."}
        rows={14}
        className="rounded-b-lg border border-border px-4 py-3 font-mono text-sm text-text placeholder:text-text-light focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
      />

      <InsertImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        availableImages={availableImages}
        onInsert={insertSnippet}
      />

      <InsertCollageModal
        isOpen={showCollageModal}
        onClose={() => setShowCollageModal(false)}
        availableImages={availableImages}
        onInsert={insertSnippet}
      />
    </div>
  );
}
