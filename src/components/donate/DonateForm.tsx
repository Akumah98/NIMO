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
  const equivXaf = form.currencyState.calculateXafEquivalent(form.numericAmount);

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
            currency={form.currencyState.currency}
            currencies={form.currencyState.currencies}
            activeCurrency={form.currencyState.activeCurrency}
            approximateXaf={equivXaf}
            onAmountChange={form.setAmount}
            onCurrencyChange={form.currencyState.setCurrency}
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
                currency={form.currencyState.currency}
                cause={form.cause}
                frequency={form.frequency}
                approximateXaf={equivXaf}
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
                currency={form.currencyState.currency}
                isValidAmount={form.isValidAmount}
              />
            </>
          )}
        </form>
      </Card>

      <DonateDirectPayModal
        status={form.modal.status}
        amount={equivXaf}
        phone={form.donorPhone}
        donation={form.modal.donation}
        errorMessage={form.modal.errorMessage}
        onRetry={() => form.handleSubmit()}
        onClose={form.modal.reset}
      />
    </>
  );
}
