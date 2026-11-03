"use client";

import { useState, type FormEvent } from "react";
import type { DonationFrequency, PaymentMethod } from "@/types/donation";
import { useDonationCurrency } from "./useDonationCurrency";
import { useDirectPayModal } from "./useDirectPayModal";
import { validateDonationInput } from "@/lib/utils/donationUtils";

interface UseDonateFormProps {
  initialCause: string;
}

export function useDonateForm({ initialCause }: UseDonateFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [cause, setCause] = useState<string>(initialCause);
  const [frequency, setFrequency] = useState<DonationFrequency>("one-time");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("");
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [donorPhone, setDonorPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const currencyState = useDonationCurrency();
  const modal = useDirectPayModal();
  const numericAmount = Number(amount) || 0;

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    const validationError = validateDonationInput({
      numericAmount,
      paymentMethod,
      donorName,
      donorEmail,
      donorPhone,
      xafEquivalent: currencyState.calculateXafEquivalent(numericAmount),
    });
    if (validationError) return setError(validationError);

    if (paymentMethod === "card") {
      window.location.href = `/contact?subject=International+Card+Donation+(${currencyState.currency})`;
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/donations/direct-pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: numericAmount,
          currency: currencyState.currency,
          donorName: donorName.trim(),
          donorEmail: donorEmail.trim(),
          phone: donorPhone.trim(),
          medium: paymentMethod,
          cause,
          frequency,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.externalId) throw new Error(data.error || "Failed to trigger payment prompt");
      modal.startPrompting(data.externalId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    amount, numericAmount, isValidAmount: numericAmount > 0,
    cause, frequency, paymentMethod, donorName, donorEmail, donorPhone,
    loading, error, modal, currencyState,
    setAmount, setCause, setFrequency, setPaymentMethod,
    setDonorName, setDonorEmail, setDonorPhone, handleSubmit,
  };
}
