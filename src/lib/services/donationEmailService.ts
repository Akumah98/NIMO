interface SendDonationReceiptParams {
  donorName: string;
  donorEmail: string;
  amount: number;
  currency?: string;
  cause: string;
  transId?: string;
}

export async function sendDonationReceiptEmail({
  donorName,
  donorEmail,
  amount,
  currency = "XAF",
  cause,
  transId,
}: SendDonationReceiptParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const formattedAmount = `${amount.toLocaleString()} ${currency}`;
  const subject = `Thank You for Your Generous Donation — NIMO (${formattedAmount})`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_EMAIL_FROM || "NIMO Donations <onboarding@resend.dev>",
        to: [donorEmail],
        bcc: [process.env.CONTACT_EMAIL_TO || "contact@nimo.africa"],
        subject,
        text: `Dear ${donorName},\n\nThank you for supporting NIMO with your donation of ${formattedAmount} towards ${cause}.\n\nReference: ${transId || "N/A"}\n\nTogether, we are transforming lives across Cameroon and Africa.\n\nWarm regards,\nThe NIMO Team`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <div style="margin-bottom: 20px; border-bottom: 2px solid #742581; padding-bottom: 12px; text-align: center;">
              <h2 style="color: #742581; margin: 0; font-size: 22px;">Thank You for Your Support!</h2>
              <p style="color: #64748b; font-size: 14px; margin: 4px 0 0;">Noble Initiative for Minorities & Opportunities</p>
            </div>
            <p style="color: #334155; font-size: 15px; line-height: 1.6;">Dear <strong>${donorName}</strong>,</p>
            <p style="color: #334155; font-size: 14px; line-height: 1.6;">
              We have received your generous contribution. Your gift brings immediate hope, quality education, and protection to underserved children and displaced communities.
            </p>
            <div style="background-color: #f3e8f5; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 6px 0; color: #64748b;"><strong>Donation Amount:</strong></td><td style="color: #742581; font-weight: 700; font-size: 16px;">${formattedAmount}</td></tr>
                <tr><td style="padding: 6px 0; color: #64748b;"><strong>Cause / Initiative:</strong></td><td style="color: #0f172a;">${cause}</td></tr>
                ${transId ? `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Transaction ID:</strong></td><td style="color: #0f172a; font-family: monospace;">${transId}</td></tr>` : ""}
              </table>
            </div>
            <p style="color: #334155; font-size: 14px; line-height: 1.6;">
              Every franc directly finances learning kits, safe spaces, and grassroots advocacy. We will keep you updated on the measurable impact of our work.
            </p>
            <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; margin-top: 24px; text-align: center; color: #94a3b8; font-size: 12px;">
              <p style="margin: 0;">NIMO — Yaoundé, Cameroon | contact@nimo.africa</p>
            </div>
          </div>
        `,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[DonationEmailService] Error:", err);
    return false;
  }
}

