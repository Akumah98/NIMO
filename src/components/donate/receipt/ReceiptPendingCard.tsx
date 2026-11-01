import Card from "@/components/ui/Card";
import type { Donation } from "@/types/donation";

interface ReceiptPendingCardProps {
  donation?: Donation | null;
  onRefresh: () => void;
}

export function ReceiptPendingCard({ donation, onRefresh }: ReceiptPendingCardProps) {
  return (
    <Card className="text-center p-8 sm:p-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-light">
        <svg className="h-8 w-8 text-accent animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>

      <h1 className="mt-6 text-2xl font-bold text-text">
        Confirming Your Payment
      </h1>
      <p className="mt-2 text-sm text-text-light max-w-md mx-auto">
        We are waiting for final confirmation from your Mobile Money or card provider. This typically takes just a few seconds.
      </p>

      {donation && (
        <div className="mt-6 rounded-xl bg-bg-alt border border-border p-4 text-xs text-text-light">
          Reference: <span className="font-mono font-semibold text-text">{donation.external_id}</span>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onRefresh}
          className="min-h-11 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Check Status Now
        </button>
      </div>
    </Card>
  );
}

