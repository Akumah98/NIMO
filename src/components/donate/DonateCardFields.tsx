"use client";

import Link from "next/link";

interface DonateCardFieldsProps {
  donorName: string;
  donorEmail: string;
  onNameChange: (val: string) => void;
  onEmailChange: (val: string) => void;
}

const CARD_NETWORKS = ["Visa", "Mastercard", "American Express", "Apple Pay", "Google Pay"];

export function DonateCardFields({
  donorName,
  donorEmail,
  onNameChange,
  onEmailChange,
}: DonateCardFieldsProps) {
  return (
    <div className="space-y-4 rounded-xl border border-blue-500/20 bg-blue-50/40 p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-blue-500/15 pb-2">
        <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
          International Card Payment
        </h4>
        <span className="rounded-full bg-white px-2 py-0.5 text-2xs font-semibold text-blue-800 border border-blue-200">
          Stripe Powered
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {CARD_NETWORKS.map((network) => (
          <span
            key={network}
            className="rounded bg-white px-2 py-0.5 text-2xs font-medium text-slate-700 border border-slate-200 shadow-2xs"
          >
            {network}
          </span>
        ))}
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="card-donor-name" className="block text-xs font-medium text-text-light mb-1">
            Cardholder Full Name *
          </label>
          <input
            id="card-donor-name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            value={donorName}
            onChange={(e) => onNameChange(e.target.value)}
            className="min-h-11 w-full rounded-lg border border-border bg-bg px-3.5 py-2 text-sm text-text placeholder:text-text-light/50 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label htmlFor="card-donor-email" className="block text-xs font-medium text-text-light mb-1">
            Email Address * (For Receipt)
          </label>
          <input
            id="card-donor-email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@example.com"
            value={donorEmail}
            onChange={(e) => onEmailChange(e.target.value)}
            className="min-h-11 w-full rounded-lg border border-border bg-bg px-3.5 py-2 text-sm text-text placeholder:text-text-light/50 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="rounded-lg bg-white/80 border border-blue-200 p-3.5 text-xs text-slate-700 space-y-1.5">
        <p className="font-semibold text-blue-900 flex items-center gap-1.5">
          <span>🌍 International Donors (USA, Europe & Diaspora)</span>
        </p>
        <p className="text-2xs text-slate-600 leading-relaxed">
          Stripe card processing is currently completing merchant activation. You can also send directly from your US/EU debit card via remittance apps (<strong>TapTap Send</strong> or <strong>WorldRemit</strong>) straight to NIMO&apos;s Mobile Money line, or contact us for direct bank wire details.
        </p>
        <Link
          href="/contact"
          className="inline-block text-2xs font-semibold text-primary hover:underline pt-1"
        >
          Request Bank Wire & Remittance Details →
        </Link>
      </div>
    </div>
  );
}

