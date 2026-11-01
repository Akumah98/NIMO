"use client";

import { useState, useMemo } from "react";
import donationOptions from "@/data/donationOptions.json";
import type { SupportedCurrency, CurrencyOption } from "@/types/donation";

const currencies = donationOptions.currencies as CurrencyOption[];
const rates = donationOptions.exchangeRatesToXaf as Record<string, number>;

export function useDonationCurrency(initialCurrency: SupportedCurrency = "XAF") {
  const [currency, setCurrency] = useState<SupportedCurrency>(initialCurrency);

  const activeCurrency = useMemo(
    () => currencies.find((c) => c.code === currency) || currencies[0],
    [currency]
  );

  const rateToXaf = rates[currency] || 1;

  const calculateXafEquivalent = (amt: number) => Math.round(amt * rateToXaf);

  return {
    currency,
    setCurrency,
    currencies,
    activeCurrency,
    rateToXaf,
    calculateXafEquivalent,
  };
}

