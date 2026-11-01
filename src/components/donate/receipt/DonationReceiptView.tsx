"use client";

import { useDonationReceipt } from "@/hooks/useDonationReceipt";
import { ReceiptSuccessCard } from "./ReceiptSuccessCard";
import { ReceiptPendingCard } from "./ReceiptPendingCard";
import { ReceiptFailedCard } from "./ReceiptFailedCard";

export function DonationReceiptView() {
  const { donation, loading, error, refresh } = useDonationReceipt();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-3 border-primary border-t-transparent" />
        <p className="mt-4 text-sm text-text-light font-medium">Verifying donation status...</p>
      </div>
    );
  }

  if (error || !donation) {
    return <ReceiptFailedCard message={error || "Transaction not found."} />;
  }

  if (donation.status === "successful") {
    return <ReceiptSuccessCard donation={donation} />;
  }

  if (donation.status === "pending") {
    return <ReceiptPendingCard donation={donation} onRefresh={refresh} />;
  }

  return (
    <ReceiptFailedCard
      message={
        donation.status === "expired"
          ? "This payment session expired before authorization."
          : "Payment was not successful. No funds were debited."
      }
    />
  );
}

