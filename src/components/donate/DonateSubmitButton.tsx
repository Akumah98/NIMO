"use client";

import type { PaymentMethod } from "@/types/donation";

interface DonateSubmitButtonProps {
  paymentMethod: PaymentMethod;
  loading: boolean;
  amount: number;
}

export function DonateSubmitButton({ paymentMethod, loading, amount }: DonateSubmitButtonProps) {
  if (!paymentMethod) return null;

  const isCard = paymentMethod === "card";
  const label = isCard
    ? "Request Card / Wire Transfer Info"
    : `Donate ${amount > 0 ? `${amount.toLocaleString()} XAF` : "Now"}`;

  return (
    <button
      type="submit"
      disabled={loading || (!isCard && amount < 500)}
      className="min-h-11 w-full rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-xs transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Sending prompt to phone...</span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}

