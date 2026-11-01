import { NextResponse } from "next/server";
import { getDonationByExternalId, updateDonationOutcome } from "@/lib/services/donationDbService";
import { getPaymentStatus } from "@/lib/services/fapshiService";
import { sendDonationReceiptEmail } from "@/lib/services/donationEmailService";
import type { DonationStatus } from "@/types/donation";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const externalId = searchParams.get("externalId");

    if (!externalId) {
      return NextResponse.json({ error: "Missing externalId" }, { status: 400 });
    }

    let donation = await getDonationByExternalId(externalId);
    if (!donation) {
      return NextResponse.json({ error: "Donation record not found" }, { status: 404 });
    }

    // If still pending, query gateway to sync directly
    if (donation.status === "pending" && donation.trans_id) {
      const liveStatus = await getPaymentStatus(donation.trans_id);
      if (liveStatus?.status) {
        const raw = String(liveStatus.status).toLowerCase();
        const nextStatus: DonationStatus =
          raw === "successful" ? "successful" :
          raw === "failed" ? "failed" :
          raw === "expired" ? "expired" : "pending";

        if (nextStatus !== "pending") {
          const { data: updated } = await updateDonationOutcome(
            { externalId },
            {
              status: nextStatus,
              paymentMedium: liveStatus.medium,
              financialTransId: liveStatus.financialTransId,
            }
          );
          if (updated) {
            donation = updated;
            if (nextStatus === "successful") {
              await sendDonationReceiptEmail({
                donorName: updated.donor_name,
                donorEmail: updated.donor_email,
                amount: updated.amount,
                cause: updated.cause,
                transId: updated.trans_id || undefined,
              });
            }
          }
        }
      }
    }

    return NextResponse.json({ donation });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Status error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
