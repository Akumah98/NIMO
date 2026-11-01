import Link from "next/link";
import Card from "@/components/ui/Card";
import type { Donation } from "@/types/donation";

interface ReceiptSuccessCardProps {
  donation: Donation;
}

export function ReceiptSuccessCard({ donation }: ReceiptSuccessCardProps) {
  return (
    <Card className="text-center p-8 sm:p-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary-light">
        <svg className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="mt-6 text-2xl font-bold text-text sm:text-3xl">
        Thank You for Your Generosity!
      </h1>
      <p className="mt-2 text-sm text-text-light max-w-md mx-auto">
        Your payment was processed successfully. A confirmation receipt has been sent to <strong>{donation.donor_email}</strong>.
      </p>

      <div className="mt-8 rounded-xl bg-bg-alt/80 border border-border p-6 text-left space-y-3">
        <div className="flex justify-between border-b border-border/60 pb-3">
          <span className="text-xs text-text-light font-medium">Amount Donated</span>
          <span className="text-base font-bold text-primary">
            {Number(donation.amount).toLocaleString()} {donation.currency}
          </span>
        </div>
        <div className="flex justify-between border-b border-border/60 pb-3">
          <span className="text-xs text-text-light font-medium">Cause Supported</span>
          <span className="text-sm font-semibold text-text">{donation.cause}</span>
        </div>
        <div className="flex justify-between border-b border-border/60 pb-3">
          <span className="text-xs text-text-light font-medium">Donor Name</span>
          <span className="text-sm font-medium text-text">{donation.donor_name}</span>
        </div>
        <div className="flex justify-between items-center pt-1">
          <span className="text-xs text-text-light font-medium">Transaction ID</span>
          <span className="text-xs font-mono font-medium text-text bg-white px-2 py-0.5 rounded border border-border">
            {donation.trans_id || donation.external_id}
          </span>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="min-h-11 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Return to Home
        </Link>
        <Link
          href="/reports"
          className="min-h-11 inline-flex items-center justify-center rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
        >
          See Our Impact
        </Link>
      </div>
    </Card>
  );
}

