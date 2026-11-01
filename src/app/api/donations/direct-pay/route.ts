import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import donationOptions from "@/data/donationOptions.json";
import { sendDirectPay, sanitizeCameroonPhone, detectMedium } from "@/lib/services/fapshiDirectPay";
import { createPendingDonation, attachTransId } from "@/lib/services/donationDbService";

const rates = donationOptions.exchangeRatesToXaf as Record<string, number>;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = "XAF", donorName, donorEmail, phone, medium, cause, frequency } = body;

    const parsedAmount = Number(amount);
    const rate = rates[currency] || 1;
    const chargeXaf = Math.round(parsedAmount * rate);

    if (!parsedAmount || chargeXaf < 500) {
      return NextResponse.json({ error: "Minimum donation is 500 XAF equivalent" }, { status: 400 });
    }
    if (!donorName?.trim() || !donorEmail?.trim()) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const cleanPhone = sanitizeCameroonPhone(phone || "");
    if (!/^6[\d]{8}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Please enter a valid 9-digit Cameroon phone number (e.g. 670000000)" },
        { status: 400 }
      );
    }

    const externalId = `NIMO-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;
    const selectedMedium = medium || detectMedium(cleanPhone);

    const { error: dbError } = await createPendingDonation({
      externalId,
      donorName: donorName.trim(),
      donorEmail: donorEmail.trim(),
      donorPhone: cleanPhone,
      amount: parsedAmount,
      currency,
      cause: cause || "General Support",
      frequency: frequency || "one-time",
    });

    if (dbError) {
      return NextResponse.json({ error: "Failed to record donation" }, { status: 500 });
    }

    const payResult = await sendDirectPay({
      amount: chargeXaf,
      phone: cleanPhone,
      medium: selectedMedium,
      email: donorEmail.trim(),
      externalId,
      message: `Donation to NIMO - ${cause || "General Support"}`,
    });

    if (!payResult.success || !payResult.transId) {
      return NextResponse.json({ error: payResult.error || "Payment prompt failed" }, { status: 502 });
    }

    await attachTransId(externalId, payResult.transId);

    return NextResponse.json({
      success: true,
      transId: payResult.transId,
      externalId,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
