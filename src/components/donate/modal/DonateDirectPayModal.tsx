"use client";

import type { Donation } from "@/types/donation";
import type { DirectPayModalStatus } from "@/hooks/useDirectPayModal";
import { DirectPayPrompting } from "./DirectPayPrompting";
import { DirectPayApproved } from "./DirectPayApproved";
import { DirectPayFailed } from "./DirectPayFailed";

interface DonateDirectPayModalProps {
  status: DirectPayModalStatus;
  amount: number;
  phone: string;
  donation: Donation | null;
  errorMessage: string | null;
  onRetry: () => void;
  onClose: () => void;
}

export function DonateDirectPayModal({
  status,
  amount,
  phone,
  donation,
  errorMessage,
  onRetry,
  onClose,
}: DonateDirectPayModalProps) {
  if (status === "idle") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl bg-bg border border-border p-6 shadow-2xl">
        {status === "prompting" && (
          <DirectPayPrompting
            amount={amount}
            phone={phone}
            onCancel={onClose}
          />
        )}

        {status === "approved" && donation && (
          <DirectPayApproved
            donation={donation}
            onClose={onClose}
          />
        )}

        {status === "failed" && (
          <DirectPayFailed
            message={errorMessage || undefined}
            onRetry={onRetry}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

