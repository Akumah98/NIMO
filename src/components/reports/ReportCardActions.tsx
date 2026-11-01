"use client";

import { ReportShareButton } from "./ReportShareButton";

interface ReportCardActionsProps {
  reportId: string;
  title: string;
  onView: () => void;
}

export function ReportCardActions({
  reportId,
  title,
  onView,
}: ReportCardActionsProps) {
  return (
    <div className="mt-5 flex items-center justify-between gap-2 border-t border-border/70 pt-4">
      <button
        type="button"
        onClick={onView}
        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark cursor-pointer"
        aria-label={`View ${title} in reader`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span>View Report</span>
      </button>

      <ReportShareButton title={title} url={`/reports?view=${reportId}`} />
    </div>
  );
}
