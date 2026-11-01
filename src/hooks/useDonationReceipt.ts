"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import type { Donation } from "@/types/donation";

export function useDonationReceipt() {
  const searchParams = useSearchParams();
  const externalId = searchParams.get("externalId");

  const [donation, setDonation] = useState<Donation | null>(null);
  const [loading, setLoading] = useState<boolean>(() => Boolean(externalId));
  const [error, setError] = useState<string | null>(() =>
    externalId ? null : "No transaction reference provided."
  );

  const fetchStatus = useCallback(async () => {
    if (!externalId) return;
    const currentId = externalId;
    try {
      const res = await fetch(`/api/donations/status?externalId=${encodeURIComponent(currentId)}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to load donation details");
      }
      setDonation(data.donation);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading status");
    } finally {
      setLoading(false);
    }
  }, [externalId]);

  useEffect(() => {
    if (!externalId) return;
    const currentId = externalId;
    let active = true;

    async function load() {
      try {
        const res = await fetch(`/api/donations/status?externalId=${encodeURIComponent(currentId)}`);
        const data = await res.json();
        if (active) {
          if (!res.ok) throw new Error(data.error || "Failed to load donation details");
          setDonation(data.donation);
        }
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : "Error loading status");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [externalId]);

  useEffect(() => {
    if (!donation || donation.status !== "pending") return;
    const interval = setInterval(() => {
      fetchStatus();
    }, 4000);
    return () => clearInterval(interval);
  }, [donation, fetchStatus]);

  return { donation, loading, error, refresh: fetchStatus };
}
