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
      }),
    });

    return res.ok;
  } catch {
    return false;
  }
}
