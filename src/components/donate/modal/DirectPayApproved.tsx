"use client";

import Link from "next/link";
import type { Donation } from "@/types/donation";

interface DirectPayApprovedProps {
  donation: Donation;
  onClose: () => void;
}

export function DirectPayApproved({ donation, onClose }: DirectPayApprovedProps) {
  return (
    <div className="text-center py-4">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary-light">
        <svg className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h3 className="mt-4 text-xl font-bold text-text">
        Payment Successful!
      </h3>
      <p className="mt-1 text-xs text-text-light">
        Thank you for your generous gift of <strong>{Number(donation.amount).toLocaleString()} XAF</strong>.
      </p>

      <div className="mt-4 rounded-lg bg-bg-alt p-3.5 border border-border text-left space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-text-light">Designated for:</span>
          <span className="font-semibold text-text">{donation.cause}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-light">Reference:</span>
          <span className="font-mono text-text">{donation.trans_id || donation.external_id}</span>
        </div>
      </div>

      <p className="mt-3 text-xs text-text-light">
        A receipt has been sent to <strong>{donation.donor_email}</strong>.
      </p>

      <div className="mt-6 flex flex-col gap-2">
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Done
        </button>
        <Link
          href="/reports"
          onClick={onClose}
          className="min-h-11 inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-xs font-semibold text-text transition-colors hover:border-primary"
        >
          View Field Impact
        </Link>
      </div>
    </div>
  );
}

