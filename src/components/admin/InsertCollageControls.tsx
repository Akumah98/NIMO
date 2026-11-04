"use client";

interface InsertCollageControlsProps {
  cols: "3" | "2" | "asymmetric";
  onColsChange: (cols: "3" | "2" | "asymmetric") => void;
  aspect: "square" | "video" | "standard" | "compact";
  onAspectChange: (aspect: "square" | "video" | "standard" | "compact") => void;
}

export function InsertCollageControls({
  cols,
  onColsChange,
  aspect,
  onAspectChange,
}: InsertCollageControlsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-xs font-semibold text-text mb-1">Layout</label>
        <select
          value={cols}
          onChange={(e) => onColsChange(e.target.value as "3" | "2" | "asymmetric")}
          className="min-h-11 w-full rounded-lg border border-border bg-bg px-3 text-xs font-medium text-text"
        >
          <option value="3">3-Photo Row (Equal)</option>
          <option value="2">2-Photo Row (Equal)</option>
          <option value="asymmetric">Featured (1 Big Top + 2 Small Bottom)</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-text mb-1">Height / Aspect</label>
        <select
          value={aspect}
          onChange={(e) => onAspectChange(e.target.value as "square" | "video" | "standard" | "compact")}
          className="min-h-11 w-full rounded-lg border border-border bg-bg px-3 text-xs font-medium text-text"
        >
          <option value="square">Square (1:1 Uniform)</option>
          <option value="video">Landscape (16:9)</option>
          <option value="standard">Standard (4:3)</option>
          <option value="compact">Compact (Fixed Height)</option>
        </select>
      </div>
    </div>
  );
}

