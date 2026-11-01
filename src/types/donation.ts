export type DonationFrequency = "one-time" | "monthly";
export type DonationStatus = "pending" | "successful" | "failed" | "expired";
export type PaymentMethod = "mobile money" | "orange money" | "card" | "";
export type SupportedCurrency = string;

export interface CurrencyOption {
  code: string;
  symbol: string;
  label: string;
  step: number;
  placeholder: string;
}

export interface Donation {
  id: string;
  external_id: string;
  trans_id?: string | null;
  donor_name: string;
  donor_email: string;
  donor_phone?: string | null;
  amount: number;
  currency: string;
  cause: string;
  frequency: DonationFrequency;
  status: DonationStatus;
  payment_medium?: string | null;
  financial_trans_id?: string | null;
  created_at: string;
  completed_at?: string | null;
}

export interface DirectDonationPayload {
  amount: number;
  currency?: SupportedCurrency;
  donorName: string;
  donorEmail: string;
  phone: string;
  medium?: "mobile money" | "orange money";
  cause: string;
  frequency?: DonationFrequency;
}

export interface DirectDonationResponse {
  success: boolean;
  transId?: string;
  externalId?: string;
  error?: string;
}

export interface InitiateDonationPayload {
  amount: number;
  currency?: SupportedCurrency;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  cause: string;
  frequency?: DonationFrequency;
}

export interface InitiateDonationResponse {
  success: boolean;
  link?: string;
  transId?: string;
  externalId?: string;
  error?: string;
}
