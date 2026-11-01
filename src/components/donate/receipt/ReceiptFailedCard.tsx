import Link from "next/link";
import Card from "@/components/ui/Card";

interface ReceiptFailedCardProps {
  message?: string;
}

export function ReceiptFailedCard({ message }: ReceiptFailedCardProps) {
  return (
    <Card className="text-center p-8 sm:p-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h1 className="mt-6 text-2xl font-bold text-text">
        Payment Incomplete
      </h1>
      <p className="mt-2 text-sm text-text-light max-w-md mx-auto">
        {message || "The payment transaction could not be completed or was cancelled."}
      </p>

      <div className="mt-6 rounded-lg bg-bg-alt border border-border p-4 text-xs text-text-light text-left max-w-md mx-auto">
        <p className="font-semibold text-text mb-1">Common reasons:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Mobile Money prompt was cancelled or expired</li>
          <li>Insufficient funds in your account</li>
          <li>Network timeout from operator</li>
        </ul>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/donate"
          className="min-h-11 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Try Again
        </Link>
      </div>
    </Card>
  );
}

