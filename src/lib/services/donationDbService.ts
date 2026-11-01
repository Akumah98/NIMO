import { createAdminClient } from "@/lib/supabase/admin";
import type { Donation, DonationStatus } from "@/types/donation";

export interface InsertDonationParams {
  externalId: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  amount: number;
  cause: string;
  frequency?: string;
}

export async function createPendingDonation(params: InsertDonationParams) {
  const supabase = createAdminClient();
  return await supabase.from("donations").insert({
    external_id: params.externalId,
    donor_name: params.donorName,
    donor_email: params.donorEmail,
    donor_phone: params.donorPhone || null,
    amount: params.amount,
    currency: "XAF",
    cause: params.cause,
    frequency: params.frequency || "one-time",
    status: "pending",
  });
}

export async function attachTransId(externalId: string, transId: string) {
  const supabase = createAdminClient();
  return await supabase
    .from("donations")
    .update({ trans_id: transId })
    .eq("external_id", externalId);
}

export async function updateDonationOutcome(
  identifier: { externalId?: string; transId?: string },
  outcome: {
    status: DonationStatus;
    paymentMedium?: string;
    financialTransId?: string;
  }
) {
  const supabase = createAdminClient();
  let query = supabase.from("donations").update({
    status: outcome.status,
    payment_medium: outcome.paymentMedium || null,
    financial_trans_id: outcome.financialTransId || null,
    completed_at: outcome.status === "successful" ? new Date().toISOString() : null,
  });

  if (identifier.externalId) {
    query = query.eq("external_id", identifier.externalId);
  } else if (identifier.transId) {
    query = query.eq("trans_id", identifier.transId);
  }
  const result = await query.select().single();
  return { data: result.data as Donation | null, error: result.error };
}

export async function getDonationByExternalId(externalId: string): Promise<Donation | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("donations")
    .select("*")
    .eq("external_id", externalId)
    .single();
  return (data as Donation) || null;
}
