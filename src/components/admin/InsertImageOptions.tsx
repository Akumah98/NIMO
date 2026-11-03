"use client";

interface InsertImageOptionsProps {
  placement: "full" | "left" | "right";
  aspect: "video" | "square" | "standard" | "natural";
  caption: string;
  onPlacementChange: (val: "full" | "left" | "right") => void;
  onAspectChange: (val: "video" | "square" | "standard" | "natural") => void;
  onCaptionChange: (val: string) => void;
}

export function InsertImageOptions({
  placement,
  aspect,
  caption,
  onPlacementChange,
  onAspectChange,
  onCaptionChange,
}: InsertImageOptionsProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-text mb-1">Placement</label>
          <select
            value={placement}
            onChange={(e) => onPlacementChange(e.target.value as "full" | "left" | "right")}
            className="min-h-11 w-full rounded-lg border border-border bg-bg px-3 text-xs font-medium text-text"
          >
            <option value="full">Full Width (Center)</option>
            <option value="left">Float Left (Text Wraps)</option>
            <option value="right">Float Right (Text Wraps)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-text mb-1">Aspect Ratio</label>
          <select
            value={aspect}
            onChange={(e) => onAspectChange(e.target.value as "video" | "square" | "standard" | "natural")}
            className="min-h-11 w-full rounded-lg border border-border bg-bg px-3 text-xs font-medium text-text"
          >
            <option value="video">Landscape (16:9)</option>
            <option value="square">Square (1:1)</option>
            <option value="standard">Standard (4:3)</option>
            <option value="natural">Natural (Auto)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-text mb-1">Caption</label>
        <input
          type="text"
          placeholder="e.g. Participants at workshop"
          value={caption}
          onChange={(e) => onCaptionChange(e.target.value)}
          className="min-h-11 w-full rounded-lg border border-border px-3.5 py-2 text-sm text-text"
        />
      </div>
    </div>
  );
}

