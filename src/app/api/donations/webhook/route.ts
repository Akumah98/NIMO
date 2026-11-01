import { NextResponse } from "next/server";
import { verifyWebhookSecret } from "@/lib/services/fapshiService";
import { updateDonationOutcome } from "@/lib/services/donationDbService";
import { sendDonationReceiptEmail } from "@/lib/services/donationEmailService";
import type { DonationStatus } from "@/types/donation";

export async function POST(request: Request) {
  try {
    const incomingSecret = request.headers.get("x-wh-secret");
    if (!verifyWebhookSecret(incomingSecret)) {
      return NextResponse.json({ error: "Unauthorized webhook" }, { status: 401 });
    }

    const payload = await request.json();
    const { transId, externalId, status, medium, financialTransId } = payload;

    if (!transId && !externalId) {
      return NextResponse.json({ error: "Missing identifier" }, { status: 400 });
    }

    const normalizedStatus = (status || "").toLowerCase();
    const donationStatus: DonationStatus =
      normalizedStatus === "successful" ? "successful" :
      normalizedStatus === "failed" ? "failed" :
      normalizedStatus === "expired" ? "expired" : "pending";

    const { data: updatedDonation } = await updateDonationOutcome(
      { externalId, transId },
      {
        status: donationStatus,
        paymentMedium: medium,
        financialTransId,
      }
    );

    if (donationStatus === "successful" && updatedDonation) {
      await sendDonationReceiptEmail({
        donorName: updatedDonation.donor_name,
        donorEmail: updatedDonation.donor_email,
        amount: updatedDonation.amount,
        cause: updatedDonation.cause,
        transId: updatedDonation.trans_id || transId,
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

