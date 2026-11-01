"use client";

import type { PaymentMethod } from "@/types/donation";
import { DonateMoMoFields } from "./DonateMoMoFields";
import { DonateCardFields } from "./DonateCardFields";

interface DonateMethodFieldsProps {
  paymentMethod: PaymentMethod;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  onNameChange: (val: string) => void;
  onEmailChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
}

export function DonateMethodFields({
  paymentMethod,
  donorName,
  donorEmail,
  donorPhone,
  onNameChange,
  onEmailChange,
  onPhoneChange,
}: DonateMethodFieldsProps) {
  if (!paymentMethod) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-bg-alt/40 p-5 text-center text-xs text-text-light">
        👆 Please select a payment method above to complete your contribution.
      </div>
    );
  }

  if (paymentMethod === "card") {
    return (
      <DonateCardFields
        donorName={donorName}
        donorEmail={donorEmail}
        onNameChange={onNameChange}
        onEmailChange={onEmailChange}
      />
    );
  }

  return (
    <DonateMoMoFields
      operator={paymentMethod}
      donorName={donorName}
      donorEmail={donorEmail}
      donorPhone={donorPhone}
      onNameChange={onNameChange}
      onEmailChange={onEmailChange}
      onPhoneChange={onPhoneChange}
    />
  );
}

