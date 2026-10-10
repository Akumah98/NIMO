import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendInquiryEmail } from "@/lib/services/emailService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, category } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("inquiries").insert({
      name,
      email,
      message,
      category: category || "general",
    });

    if (error) {
      return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
    }

    // Attempt to dispatch email notification
    await sendInquiryEmail({ name, email, message, category });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
