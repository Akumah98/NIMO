"use client";

import type { DonationFrequency } from "@/types/donation";

interface DonateFrequencySelectorProps {
  frequency: DonationFrequency;
  onChange: (freq: DonationFrequency) => void;
}

const FREQUENCIES: { value: DonationFrequency; label: string }[] = [
  { value: "one-time", label: "One-Time Gift" },
  { value: "monthly", label: "Monthly Support" },
];

export function DonateFrequencySelector({
  frequency,
  onChange,
}: DonateFrequencySelectorProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-text">
        Frequency
      </label>
      <div className="mt-2 grid grid-cols-2 gap-3">
        {FREQUENCIES.map(({ value, label }) => {
          const isActive = frequency === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onChange(value)}
              className={`min-h-11 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-xs"
                  : "border border-border bg-bg text-text-light hover:border-primary hover:text-text"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

