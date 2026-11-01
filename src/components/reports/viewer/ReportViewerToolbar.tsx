"use client";

import Badge from "@/components/ui/Badge";
import type { Report } from "@/types";
import { ReportShareButton } from "../ReportShareButton";

interface ReportViewerToolbarProps {
  report: Report;
  onClose: () => void;
}

export function ReportViewerToolbar({ report, onClose }: ReportViewerToolbarProps) {
  return (
    <div className="flex items-center justify-between border-b border-border bg-bg px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3 min-w-0 pr-4">
        {report.category && <Badge variant="primary">{report.category}</Badge>}
        <h2 className="text-sm sm:text-base font-bold text-text truncate">
          {report.title}
        </h2>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <ReportShareButton
          title={report.title}
          url={`/reports?view=${report.id}`}
        />

        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border bg-bg text-text-light hover:text-text hover:border-primary transition-colors cursor-pointer"
          aria-label="Close document viewer"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
