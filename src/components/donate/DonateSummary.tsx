"use client";

import type { DonationFrequency, SupportedCurrency } from "@/types/donation";

interface DonateSummaryProps {
  amount: number;
  currency: SupportedCurrency;
  cause: string;
  frequency: DonationFrequency;
  approximateXaf?: number;
}

export function DonateSummary({
  amount,
  currency,
  cause,
  frequency,
  approximateXaf,
}: DonateSummaryProps) {
  if (amount <= 0) return null;

  return (
    <div className="rounded-lg bg-primary-light/60 border border-primary/20 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-text-light uppercase tracking-wider">
            Your Contribution
          </p>
          <p className="text-lg font-bold text-primary mt-0.5">
            {amount.toLocaleString()} {currency}
            {currency !== "XAF" && approximateXaf ? (
              <span className="text-xs font-normal text-text-light ml-1.5">
                (≈ {approximateXaf.toLocaleString()} XAF)
              </span>
            ) : null}
            {frequency === "monthly" && <span className="text-xs font-normal text-text-light"> / month</span>}
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary border border-primary/20 shadow-2xs">
          {frequency === "monthly" ? "Monthly" : "One-Time"}
        </span>
      </div>
      <p className="mt-2 text-xs text-text-light border-t border-primary/10 pt-2">
        Designated for: <strong className="text-text font-semibold">{cause}</strong>
      </p>
    </div>
  );
}
