interface SendInquiryEmailParams {
  name: string;
  email: string;
  message: string;
  category?: string;
}

export async function sendInquiryEmail({
  name,
  email,
  message,
  category = "general",
}: SendInquiryEmailParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_EMAIL_FROM || "NIMO Inquiries <onboarding@resend.dev>",
        to: [process.env.CONTACT_EMAIL_TO || "contact@nimo.africa"],
        reply_to: email,
        subject: `New Inquiry from ${name} [${category}] - NIMO`,
        text: `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <div style="margin-bottom: 20px; border-bottom: 2px solid #742581; padding-bottom: 12px;">
              <h2 style="color: #742581; margin: 0; font-size: 20px;">NIMO — New Website Inquiry</h2>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr><td style="padding: 6px 0; color: #64748b; width: 90px;"><strong>Name:</strong></td><td style="color: #0f172a;">${name}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;"><strong>Email:</strong></td><td style="color: #0f172a;"><a href="mailto:${email}" style="color: #742581;">${email}</a></td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;"><strong>Category:</strong></td><td style="color: #0f172a;"><span style="background-color: #f3e8f5; color: #742581; padding: 2px 8px; border-radius: 4px; font-weight: 600; font-size: 12px;">${category}</span></td></tr>
            </table>
            <div style="background-color: #f8fafc; border-left: 4px solid #742581; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
              <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="font-size: 12px; color: #94a3b8; margin: 0; border-top: 1px solid #f1f5f9; padding-top: 12px;">
              To reply directly to ${name}, click "Reply" in your email client.
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("[EmailService] Resend API error:", res.status, errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[EmailService] Network or parsing error:", error);
    return false;
  }
}
