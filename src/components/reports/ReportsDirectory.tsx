"use client";

import { useState } from "react";
import type { Report } from "@/types";
import { ReportCard } from "./ReportCard";
import { ReportViewerModal } from "./viewer/ReportViewerModal";

interface ReportsDirectoryProps {
  reports: Report[];
  initialViewId?: string;
}

export function ReportsDirectory({ reports, initialViewId }: ReportsDirectoryProps) {
  const [activeReport, setActiveReport] = useState<Report | null>(() => {
    if (!initialViewId) return null;
    return reports.find((r) => r.id === initialViewId) || null;
  });

  if (reports.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-bg-alt p-12 text-center">
        <p className="text-sm text-text-light">
          No reports or publications found at this moment. Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onView={() => setActiveReport(report)}
          />
        ))}
      </div>

      {activeReport && (
        <ReportViewerModal
          report={activeReport}
          onClose={() => setActiveReport(null)}
        />
      )}
    </>
  );
}
