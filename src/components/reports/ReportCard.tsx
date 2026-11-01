import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { Report } from "@/types";
import { ReportCardActions } from "./ReportCardActions";

interface ReportCardProps {
  report: Report;
  onView: () => void;
}

export function ReportCard({ report, onView }: ReportCardProps) {
  return (
    <Card className="flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          {report.category && <Badge variant="primary">{report.category}</Badge>}
        </div>

        <h2 className="mt-4 text-base font-bold text-text sm:text-lg line-clamp-2">
          {report.title}
        </h2>

        {report.description && (
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-text-light line-clamp-3">
            {report.description}
          </p>
        )}

        {report.published_date && (
          <div className="mt-4 flex items-center text-xs text-text-light">
            <svg className="mr-1.5 h-3.5 w-3.5 text-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Published {formatDate(report.published_date)}</span>
          </div>
        )}
      </div>

      <ReportCardActions
        reportId={report.id}
        title={report.title}
        onView={onView}
      />
    </Card>
  );
}
