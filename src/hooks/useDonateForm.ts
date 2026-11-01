"use client";

import { useState, type FormEvent } from "react";
import type { DonationFrequency, PaymentMethod } from "@/types/donation";
import { useDirectPayModal } from "./useDirectPayModal";

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

  const modal = useDirectPayModal();
  const numericAmount = Number(amount) || 0;

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    if (numericAmount < 500) {
      setError("Please enter a donation amount of at least 500 XAF.");
      return;
    }
    if (!paymentMethod) {
      setError("Please select a payment method above to continue.");
      return;
    }
    if (!donorName.trim() || !donorEmail.trim()) {
      setError("Please provide your full name and email address.");
      return;
    }
    if (paymentMethod === "card") {
      window.location.href = "/contact?subject=International+Card+Donation";
      return;
    }
    if (!donorPhone.trim()) {
      setError("Please enter your mobile phone number to receive the prompt.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/donations/direct-pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: numericAmount,
          donorName: donorName.trim(),
          donorEmail: donorEmail.trim(),
          phone: donorPhone.trim(),
          medium: paymentMethod,
          cause,
          frequency,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.externalId) {
        throw new Error(data.error || "Failed to trigger payment prompt");
      }

      modal.startPrompting(data.externalId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    amount,
    numericAmount,
    cause,
    frequency,
    paymentMethod,
    donorName,
    donorEmail,
    donorPhone,
    loading,
    error,
    modal,
    setAmount,
    setCause,
    setFrequency,
    setPaymentMethod,
    setDonorName,
    setDonorEmail,
    setDonorPhone,
    handleSubmit,
  };
}
