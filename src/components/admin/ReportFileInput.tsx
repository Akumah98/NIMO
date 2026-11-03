"use client";

import { useState } from "react";
import { MediaModalPicker } from "./media/MediaModalPicker";

interface ReportFileInputProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  selectedUrl: string;
  onSelectUrl: (url: string) => void;
}

export function ReportFileInput({
  file,
  onFileChange,
  selectedUrl,
  onSelectUrl,
}: ReportFileInputProps) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-text">Resource / Report File</label>

      {selectedUrl && !file ? (
        <div className="flex items-center justify-between rounded-xl border border-secondary/40 bg-secondary-light/40 p-3">
          <div className="flex items-center gap-2 truncate">
            <span className="rounded bg-secondary px-2 py-0.5 text-xs font-bold text-white">SELECTED</span>
            <span className="truncate text-xs text-text font-medium">{selectedUrl}</span>
          </div>
          <button
            type="button"
            onClick={() => onSelectUrl("")}
            className="text-xs text-red-600 hover:underline px-2 py-1 font-semibold"
          >
            Change
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            onChange={(e) => {
              onFileChange(e.target.files?.[0] || null);
              if (e.target.files?.[0]) onSelectUrl("");
            }}
            className="min-h-11 flex-1 rounded-lg border border-border px-4 py-2 text-sm file:mr-4 file:rounded file:border-0 file:bg-primary-light file:px-3 file:py-1 file:text-sm file:font-medium file:text-primary"
          />

          <button
            type="button"
            onClick={() => setShowPicker(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-light px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <span>📁 Select from Files Library</span>
          </button>
        </div>
      )}

      <MediaModalPicker
        isOpen={showPicker}
        onClose={() => setShowPicker(false)}
        defaultCategory="files"
        title="Select Resource or Report File"
        subtitle="Choose from existing PDF documents or upload a new one"
        onSelectImage={(url) => {
          onSelectUrl(url);
          onFileChange(null);
          setShowPicker(false);
        }}
      />
    </div>
  );
}

