"use client";

interface MediaPickerFooterProps {
  selectedUrls: string[];
  multiple?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function MediaPickerFooter({
  selectedUrls,
  multiple,
  onCancel,
  onConfirm,
}: MediaPickerFooterProps) {
  const count = selectedUrls.length;
  const statusText =
    count === 0
      ? multiple
        ? "Tap photos to select multiple"
        : "Click any photo to select"
      : count === 1
      ? multiple
        ? "1 photo selected"
        : "1 photo selected (tap again or click Insert)"
      : `${count} photos selected`;

  const buttonLabel =
    count > 1
      ? `✓ Insert Selected (${count} Photos)`
      : "✓ Insert Selected Photo";

  return (
    <div className="flex items-center justify-between border-t border-border bg-bg-alt px-5 py-3">
      <span className="text-xs font-medium text-text-light">{statusText}</span>
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
          disabled={count === 0}
          onClick={onConfirm}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-green-600 px-5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-green-700 disabled:opacity-40"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
