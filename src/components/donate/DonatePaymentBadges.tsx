"use client";

import Link from "next/link";

const PAYMENT_METHODS = [
  { name: "MTN Mobile Money", badge: "bg-accent/15 text-accent border-accent/30" },
  { name: "Orange Money", badge: "bg-orange-500/15 text-orange-600 border-orange-500/30" },
  { name: "Instant PIN Prompt", badge: "bg-secondary/15 text-secondary border-secondary/30" },
];

export function DonatePaymentBadges() {
  return (
    <div className="rounded-lg border border-border bg-bg-alt/50 p-4 space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs font-semibold text-text uppercase tracking-wider">
          Payment Network
        </span>
        <div className="flex items-center gap-1.5 text-xs text-text-light">
          <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Direct Pay by Fapshi</span>
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

      <div className="border-t border-border/60 pt-2.5 text-2xs text-text-light flex items-center justify-between flex-wrap gap-1">
        <span>🌍 Donating from USA, Europe, or the Diaspora?</span>
        <Link href="/contact" className="font-semibold text-primary hover:underline">
          Wire Transfer & Remittance Options →
        </Link>
      </div>
    </div>
  );
}
