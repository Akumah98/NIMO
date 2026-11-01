"use client";

import Card from "@/components/ui/Card";
import donationData from "@/data/donationOptions.json";
import { useDonateForm } from "@/hooks/useDonateForm";
import { DonateAmountInput } from "./DonateAmountInput";
import { DonateFrequencySelector } from "./DonateFrequencySelector";
import { DonateCausesSelector } from "./DonateCausesSelector";
import { DonateOperatorSelector } from "./DonateOperatorSelector";
import { DonateMethodFields } from "./DonateMethodFields";
import { DonateSummary } from "./DonateSummary";
import { DonateSubmitButton } from "./DonateSubmitButton";
import { DonateDirectPayModal } from "./modal/DonateDirectPayModal";

const { causes } = donationData;

export default function DonateForm() {
  const form = useDonateForm({ initialCause: causes[0] });

  return (
    <>
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

          <DonateOperatorSelector
            selected={form.paymentMethod}
            onSelect={form.setPaymentMethod}
          />

          {/* Progressive Disclosure: Only revealed when a payment method is chosen */}
          {form.paymentMethod && (
            <>
              <DonateMethodFields
                paymentMethod={form.paymentMethod}
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

              {form.error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3.5 text-xs text-red-700">
                  {form.error}
                </div>
              )}

              <DonateSubmitButton
                paymentMethod={form.paymentMethod}
                loading={form.loading}
                amount={form.numericAmount}
              />
            </>
          )}
        </form>
      </Card>

      <DonateDirectPayModal
        status={form.modal.status}
        amount={form.numericAmount}
        phone={form.donorPhone}
        donation={form.modal.donation}
        errorMessage={form.modal.errorMessage}
        onRetry={() => form.handleSubmit()}
        onClose={form.modal.reset}
      />
    </>
  );
}
