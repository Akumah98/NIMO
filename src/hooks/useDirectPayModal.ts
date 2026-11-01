"use client";

import { useState, useEffect, useCallback } from "react";
import type { Donation } from "@/types/donation";

export type DirectPayModalStatus = "idle" | "prompting" | "approved" | "failed";

export function useDirectPayModal() {
  const [status, setStatus] = useState<DirectPayModalStatus>("idle");
  const [externalId, setExternalId] = useState<string | null>(null);
  const [donation, setDonation] = useState<Donation | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startPrompting = useCallback((id: string) => {
    setExternalId(id);
    setDonation(null);
    setErrorMessage(null);
    setStatus("prompting");
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setExternalId(null);
    setDonation(null);
    setErrorMessage(null);
  }, []);

  useEffect(() => {
    if (status !== "prompting" || !externalId) return;

    let attempts = 0;
    const maxAttempts = 36; // ~90 seconds
    const interval = setInterval(async () => {
      attempts++;
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        setStatus("failed");
        setErrorMessage("Payment prompt timed out. Please try again.");
        return;
      }

      try {
        const res = await fetch(`/api/donations/status?externalId=${encodeURIComponent(externalId)}`);
        const data = await res.json();
        if (data?.donation) {
          if (data.donation.status === "successful") {
            clearInterval(interval);
            setDonation(data.donation);
            setStatus("approved");
          } else if (data.donation.status === "failed" || data.donation.status === "expired") {
            clearInterval(interval);
            setStatus("failed");
            setErrorMessage("Payment was declined or cancelled on your device.");
          }
        }
      } catch {
        // Continue polling quietly
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [status, externalId]);

  return {
    status,
    donation,
    errorMessage,
    startPrompting,
    reset,
  };
}

