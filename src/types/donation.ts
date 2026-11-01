export type DonationFrequency = "one-time" | "monthly";
export type DonationStatus = "pending" | "successful" | "failed" | "expired";

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

export interface InitiateDonationPayload {
  amount: number;
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

