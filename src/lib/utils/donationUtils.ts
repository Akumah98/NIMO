import type { PaymentMethod } from "@/types/donation";

interface ValidationParams {
  numericAmount: number;
  paymentMethod: PaymentMethod;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  xafEquivalent: number;
}

export function validateDonationInput(params: ValidationParams): string | null {
  if (params.numericAmount <= 0) return "Please enter a donation amount.";
  if (!params.paymentMethod) return "Please select a payment method above to continue.";
  if (!params.donorName.trim() || !params.donorEmail.trim()) {
    return "Please provide your full name and email address.";
  }
  if (params.paymentMethod !== "card") {
    if (params.xafEquivalent < 100) {
      return "Mobile Money prompts require an amount equivalent to at least 100 XAF.";
    }
    if (!params.donorPhone.trim()) {
      return "Please enter your mobile phone number to receive the prompt.";
    }
  }
  return null;
}

