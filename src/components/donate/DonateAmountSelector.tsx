"use client";

interface DonateAmountSelectorProps {
  amounts: number[];
  amount: number | null;
  customAmount: string;
  onSelectAmount: (val: number) => void;
  onCustomAmountChange: (val: string) => void;
}

export function DonateAmountSelector({
  amounts,
  amount,
  customAmount,
  onSelectAmount,
  onCustomAmountChange,
}: DonateAmountSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-text">Amount (XAF)</h3>
      <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
        {amounts.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => onSelectAmount(a)}
            className={`min-h-11 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              amount === a
                ? "bg-primary text-white"
                : "border border-border text-text-light hover:border-primary"
            }`}
          >
            {a.toLocaleString()}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <input
          type="number"
          placeholder="Custom amount"
          value={customAmount}
          onChange={(e) => onCustomAmountChange(e.target.value)}
          className="min-h-11 w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
}
