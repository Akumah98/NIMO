"use client";

interface MediaPickerFooterProps {
  selectedUrl: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function MediaPickerFooter({
  selectedUrl,
  onCancel,
  onConfirm,
}: MediaPickerFooterProps) {
  return (
    <div className="flex items-center justify-between border-t border-border bg-bg-alt px-5 py-3">
      <span className="text-xs font-medium text-text-light">
        {selectedUrl ? "1 photo selected (tap again or click Insert)" : "Click any photo to select"}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="min-h-11 rounded-lg px-4 py-2 text-xs font-semibold text-text-light hover:text-text"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!selectedUrl}
          onClick={onConfirm}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-green-600 px-5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-green-700 disabled:opacity-40"
        >
          ✓ Insert Selected Photo
        </button>
      </div>
    </div>
  );
}
