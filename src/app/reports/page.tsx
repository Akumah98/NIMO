import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ReportsHeader } from "@/components/reports/ReportsHeader";
import { ReportsDirectory } from "@/components/reports/ReportsDirectory";
import fallbackReports from "@/data/reportsData.json";
import type { Report } from "@/types";

export const metadata: Metadata = {
  title: "Resources & Reports",
  description: "Explore NIMO's research publications, policy briefs, and annual reports online.",
};

export const revalidate = 60;

interface ReportsPageProps {
  searchParams: Promise<{ view?: string }>;
}

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  const { view } = await searchParams;
  let reports: Report[] = fallbackReports as Report[];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("published", true)
      .order("published_date", { ascending: false });

    if (!error && data && data.length > 0) {
      reports = data as Report[];
    }
  } catch {
    // Falls back to static reportsData.json
  }

  return (
    <main className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ReportsHeader />
        <ReportsDirectory reports={reports} initialViewId={view} />
      </div>
    </main>
  );
}
