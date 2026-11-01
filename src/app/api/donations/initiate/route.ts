import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { initiatePayment } from "@/lib/services/fapshiService";
import { createPendingDonation, attachTransId } from "@/lib/services/donationDbService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = "XAF", donorName, donorEmail, donorPhone, cause, frequency } = body;

    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount < 500) {
      return NextResponse.json({ error: "Minimum donation is 500 XAF" }, { status: 400 });
    }
    if (!donorName?.trim() || !donorEmail?.trim()) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const externalId = `NIMO-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "https://nimo.africa";
    const redirectUrl = `${origin}/donate/success?externalId=${encodeURIComponent(externalId)}`;

    const { error: dbError } = await createPendingDonation({
      externalId,
      donorName: donorName.trim(),
      donorEmail: donorEmail.trim(),
      donorPhone: donorPhone?.trim(),
      amount: parsedAmount,
      currency,
      cause: cause || "General Support",
      frequency: frequency || "one-time",
    });

    if (dbError) {
      return NextResponse.json({ error: "Failed to create donation record" }, { status: 500 });
    }

    const payResult = await initiatePayment({
      amount: parsedAmount,
      email: donorEmail.trim(),
      externalId,
      redirectUrl,
      message: `Donation to NIMO - ${cause || "General Support"}`,
    });

    if (!payResult.success || !payResult.link) {
      return NextResponse.json({ error: payResult.error || "Payment gateway error" }, { status: 502 });
    }

    if (payResult.transId) {
      await attachTransId(externalId, payResult.transId);
    }

    return NextResponse.json({
      success: true,
      link: payResult.link,
      transId: payResult.transId,
      externalId,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

