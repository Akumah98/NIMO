"use client";

const PAYMENT_METHODS = [
  { name: "MTN MoMo", badge: "bg-accent/15 text-accent border-accent/30" },
  { name: "Orange Money", badge: "bg-orange-500/15 text-orange-600 border-orange-500/30" },
  { name: "Visa", badge: "bg-blue-600/15 text-blue-700 border-blue-600/30" },
  { name: "Mastercard", badge: "bg-red-600/15 text-red-700 border-red-600/30" },
];

export function DonatePaymentBadges() {
  return (
    <div className="rounded-lg border border-border bg-bg-alt/50 p-4">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <span className="text-xs font-semibold text-text uppercase tracking-wider">
          Accepted Payment Methods
        </span>
        <div className="flex items-center gap-1.5 text-xs text-text-light">
          <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secured by Fapshi</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {PAYMENT_METHODS.map((m) => (
          <span
            key={m.name}
            className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${m.badge}`}
          >
            {m.name}
          </span>
        ))}
      </div>
    </div>
  );
}

