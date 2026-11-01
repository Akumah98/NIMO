"use client";

import { useState, type FormEvent } from "react";
import type { DonationFrequency } from "@/types/donation";

interface UseDonateFormProps {
  initialCause: string;
}

export function useDonateForm({ initialCause }: UseDonateFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [cause, setCause] = useState<string>(initialCause);
  const [frequency, setFrequency] = useState<DonationFrequency>("one-time");
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [donorPhone, setDonorPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const numericAmount = Number(amount) || 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (numericAmount < 500) {
      setError("Please enter a donation amount of at least 500 XAF.");
      return;
    }
    if (!donorName.trim() || !donorEmail.trim()) {
      setError("Please provide your full name and email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/donations/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: numericAmount,
          donorName: donorName.trim(),
          donorEmail: donorEmail.trim(),
          donorPhone: donorPhone.trim() || undefined,
          cause,
          frequency,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.link) {
        throw new Error(data.error || "Failed to initiate payment");
      }

      // Redirect donor to Fapshi hosted gateway
      window.location.href = data.link;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      setLoading(false);
    }
  };

  return {
    amount,
    numericAmount,
    cause,
    frequency,
    donorName,
    donorEmail,
    donorPhone,
    loading,
    error,
    setAmount,
    setCause,
    setFrequency,
    setDonorName,
    setDonorEmail,
    setDonorPhone,
    handleSubmit,
  };
}

