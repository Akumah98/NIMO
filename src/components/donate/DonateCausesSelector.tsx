"use client";

interface DonateCausesSelectorProps {
  causes: string[];
  selectedCause: string;
  onSelectCause: (cause: string) => void;
}

export function DonateCausesSelector({
  causes,
  selectedCause,
  onSelectCause,
}: DonateCausesSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-text">
        Direct Your Impact
      </label>
      <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
        {causes.map((cause) => {
          const isSelected = selectedCause === cause;
          return (
            <button
              key={cause}
              type="button"
              onClick={() => onSelectCause(cause)}
              className={`min-h-11 rounded-lg px-4 py-3 text-left text-sm font-medium transition-all ${
                isSelected
                  ? "border-2 border-primary bg-primary-light text-primary font-semibold"
                  : "border border-border bg-bg text-text-light hover:border-primary hover:text-text"
              }`}
            >
              {cause}
            </button>
          );
        })}
      </div>
    </div>
  );
}

