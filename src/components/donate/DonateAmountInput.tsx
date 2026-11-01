"use client";

import type { SupportedCurrency, CurrencyOption } from "@/types/donation";

interface DonateAmountInputProps {
  amount: string;
  currency: SupportedCurrency;
  currencies: CurrencyOption[];
  activeCurrency: CurrencyOption;
  approximateXaf: number;
  onAmountChange: (val: string) => void;
  onCurrencyChange: (curr: SupportedCurrency) => void;
  error?: string | null;
}

export function DonateAmountInput({
  amount,
  currency,
  currencies,
  activeCurrency,
  approximateXaf,
  onAmountChange,
  onCurrencyChange,
  error,
}: DonateAmountInputProps) {
  const numAmount = Number(amount) || 0;

  return (
    <div>
      <label htmlFor="donation-amount" className="block text-sm font-semibold text-text">
        Donation Amount & Currency
      </label>

      <div className="mt-2 flex rounded-lg border border-border bg-bg transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <div className="relative">
          <select
            id="donation-currency"
            aria-label="Currency"
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="min-h-11 cursor-pointer appearance-none rounded-l-lg border-r border-border bg-bg-alt/70 px-3.5 pr-8 py-2.5 text-sm font-bold text-primary focus:outline-hidden"
          >
            {currencies.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.code} ({curr.symbol})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-text-light">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <input
          id="donation-amount"
          type="number"
          min={1}
          step="any"
          placeholder={`e.g. ${activeCurrency.placeholder}`}
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          required
          className="min-h-11 w-full rounded-r-lg bg-transparent px-3.5 py-2.5 text-base font-semibold text-text placeholder:text-text-light/50 focus:outline-hidden"
        />
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>
      ) : currency !== "XAF" && numAmount > 0 ? (
        <p className="mt-1.5 text-xs text-text-light">
          ≈ <strong className="text-text">{approximateXaf.toLocaleString()} XAF</strong> (estimated conversion for local settlement)
        </p>
      ) : (
        <p className="mt-1.5 text-xs text-text-light">
          Give whatever amount you wish to contribute in your chosen currency.
        </p>
      )}
    </div>
  );
}
