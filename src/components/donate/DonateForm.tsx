"use client";

import Card from "@/components/ui/Card";
import donationData from "@/data/donationOptions.json";
import { useDonateForm } from "@/hooks/useDonateForm";
import { DonateAmountInput } from "./DonateAmountInput";
import { DonateFrequencySelector } from "./DonateFrequencySelector";
import { DonateCausesSelector } from "./DonateCausesSelector";
import { DonateDonorFields } from "./DonateDonorFields";
import { DonatePaymentBadges } from "./DonatePaymentBadges";
import { DonateSummary } from "./DonateSummary";

const { causes } = donationData;

export default function DonateForm() {
  const form = useDonateForm({ initialCause: causes[0] });

  return (
    <Card className="mt-8">
      <form onSubmit={form.handleSubmit} className="space-y-6">
        <DonateFrequencySelector
          frequency={form.frequency}
          onChange={form.setFrequency}
        />

        <DonateAmountInput
          amount={form.amount}
          onChange={form.setAmount}
        />

        <DonateCausesSelector
          causes={causes}
          selectedCause={form.cause}
          onSelectCause={form.setCause}
        />

        <DonateDonorFields
          donorName={form.donorName}
          donorEmail={form.donorEmail}
          donorPhone={form.donorPhone}
          onNameChange={form.setDonorName}
          onEmailChange={form.setDonorEmail}
          onPhoneChange={form.setDonorPhone}
        />

        <DonateSummary
          amount={form.numericAmount}
          cause={form.cause}
          frequency={form.frequency}
        />

        <DonatePaymentBadges />

        {form.error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3.5 text-xs text-red-700">
            {form.error}
          </div>
        )}

        <button
          type="submit"
          disabled={form.loading || form.numericAmount < 500}
          className="min-h-11 w-full rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-xs transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {form.loading ? (
            <>
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Connecting to Fapshi Gateway...</span>
            </>
          ) : (
            <span>Proceed to Secure Payment</span>
          )}
        </button>
      </form>
    </Card>
  );
}
