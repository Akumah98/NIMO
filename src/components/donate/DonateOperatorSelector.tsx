"use client";

interface DonateOperatorSelectorProps {
  selected: "mobile money" | "orange money";
  onSelect: (op: "mobile money" | "orange money") => void;
}

export function DonateOperatorSelector({ selected, onSelect }: DonateOperatorSelectorProps) {
  return (
    <div>
      <label htmlFor="payment-method-select" className="block text-sm font-semibold text-text mb-1.5">
        Payment Method
      </label>
      <div className="relative">
        <select
          id="payment-method-select"
          value={selected}
          onChange={(e) => onSelect(e.target.value as "mobile money" | "orange money")}
          className="min-h-11 w-full appearance-none rounded-lg border border-border bg-bg px-3.5 py-2.5 pr-10 text-sm font-medium text-text transition-colors focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
        >
          <option value="mobile money">MTN Mobile Money (MoMo)</option>
          <option value="orange money">Orange Money</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-text-light">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <p className="mt-1 text-2xs text-text-light">
        {selected === "mobile money"
          ? "Supports numbers starting with 67, 650–654, 68."
          : "Supports numbers starting with 69, 655–659."}
      </p>
    </div>
  );
}
