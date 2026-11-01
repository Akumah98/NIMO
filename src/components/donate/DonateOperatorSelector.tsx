"use client";

interface DonateOperatorSelectorProps {
  selected: "mobile money" | "orange money";
  onSelect: (op: "mobile money" | "orange money") => void;
}

export function DonateOperatorSelector({ selected, onSelect }: DonateOperatorSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-text mb-2">
        Select Payment Network
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onSelect("mobile money")}
          className={`min-h-11 rounded-lg border p-3 text-left transition-all flex items-center justify-between ${
            selected === "mobile money"
              ? "border-primary bg-primary-light/70 ring-2 ring-primary/20"
              : "border-border bg-bg hover:border-primary/50"
          }`}
        >
          <div>
            <p className="text-xs font-bold text-text">MTN MoMo</p>
            <p className="text-2xs text-text-light">67, 650-654, 68</p>
          </div>
          <span className="h-3 w-3 rounded-full border border-primary flex items-center justify-center">
            {selected === "mobile money" && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSelect("orange money")}
          className={`min-h-11 rounded-lg border p-3 text-left transition-all flex items-center justify-between ${
            selected === "orange money"
              ? "border-primary bg-primary-light/70 ring-2 ring-primary/20"
              : "border-border bg-bg hover:border-primary/50"
          }`}
        >
          <div>
            <p className="text-xs font-bold text-text">Orange Money</p>
            <p className="text-2xs text-text-light">69, 655-659</p>
          </div>
          <span className="h-3 w-3 rounded-full border border-primary flex items-center justify-center">
            {selected === "orange money" && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
          </span>
        </button>
      </div>
    </div>
  );
}
