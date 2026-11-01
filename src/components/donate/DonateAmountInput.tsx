"use client";

interface DonateAmountInputProps {
  amount: string;
  onChange: (val: string) => void;
  error?: string | null;
}

export function DonateAmountInput({
  amount,
  onChange,
  error,
}: DonateAmountInputProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor="donation-amount" className="text-sm font-semibold text-text">
          Donation Amount
        </label>
        <span className="text-xs text-text-light">Min. 500 XAF</span>
      </div>

      <div className="relative mt-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <span className="text-sm font-bold text-primary">XAF</span>
        </div>
        <input
          id="donation-amount"
          type="number"
          min={500}
          step={100}
          placeholder="e.g. 5000"
          value={amount}
          onChange={(e) => onChange(e.target.value)}
          required
          className="min-h-11 w-full rounded-lg border border-border bg-bg pl-16 pr-4 py-2.5 text-base font-semibold text-text transition-colors placeholder:text-text-light/50 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>
      ) : (
        <p className="mt-1.5 text-xs text-text-light">
          Enter any amount you wish to contribute in Central African Francs (XAF).
        </p>
      )}
    </div>
  );
}

