"use client";

interface MediaPickerHeaderProps {
  title: string;
  subtitle: string;
  onClose: () => void;
}

export function MediaPickerHeader({
  title,
  subtitle,
  onClose,
}: MediaPickerHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-border p-4">
      <div>
        <h3 className="text-base font-bold text-text">{title}</h3>
        <p className="text-xs text-text-light">{subtitle}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="flex h-11 w-11 items-center justify-center rounded-lg text-text-light hover:bg-bg-alt hover:text-text"
        aria-label="Close modal"
      >
        <span className="text-2xl leading-none">&times;</span>
      </button>
    </div>
  );
}
