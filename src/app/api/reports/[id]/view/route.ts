import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import fallbackReports from "@/data/reportsData.json";
import type { Report } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let report: Report | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("reports")
      .select("*")
      .eq("id", id)
      .single();
    if (data) report = data as Report;
  } catch {
    // Fall back to local records
  }

  if (!report) {
    report = (fallbackReports as Report[]).find((r) => r.id === id) || null;
  }

  if (!report || !report.file_url) {
    return new NextResponse("Report not found", { status: 404 });
  }

  try {
    const fileUrl = report.file_url.startsWith("http")
      ? report.file_url
      : `${new URL(request.url).origin}${report.file_url}`;

    const res = await fetch(fileUrl);
    if (!res.ok) {
      return new NextResponse("Document unavailable", { status: 404 });
    }

    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
        "Cache-Control": "private, no-store, no-cache, must-revalidate",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return new NextResponse(message, { status: 500 });
  }
}
