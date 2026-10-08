import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Reports & Documents",
  description: "Download NIMO's research publications, policy briefs, and annual reports.",
};

export const revalidate = 60;

export default async function ReportsPage() {
  const supabase = await createClient();
  const { data: reports } = await supabase
    .from("reports")
    .select("*")
    .eq("published", true)
    .order("published_date", { ascending: false });

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text sm:text-4xl">
            Reports & Documents
          </h1>
          <p className="mt-2 text-text-light">
            Download our research publications, policy briefs, and annual reports.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reports && reports.length > 0 ? (
            reports.map((report) => (
              <Card key={report.id}>
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {report.category && (
                    <Badge>{report.category}</Badge>
                  )}
                </div>

                <h3 className="mt-4 font-semibold text-text">{report.title}</h3>

                {report.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-text-light">
                    {report.description}
                  </p>
                )}

                {report.published_date && (
                  <p className="mt-3 text-xs text-text-light">
                    Published: {formatDate(report.published_date)}
                  </p>
                )}

                <a
                  href={report.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </a>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-text-light">
              No reports available yet. Check back soon!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
