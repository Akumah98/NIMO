"use client";

interface ReportViewerPaginationProps {
  currentPage: number;
  numPages: number;
  scale: number;
  onPrev: () => void;
  onNext: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function ReportViewerPagination({
  currentPage,
  numPages,
  scale,
  onPrev,
  onNext,
  onZoomIn,
  onZoomOut,
}: ReportViewerPaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-bg px-4 py-3 sm:px-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={onPrev}
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-text disabled:opacity-40 hover:border-primary cursor-pointer transition-colors"
        >
          &larr; Prev
        </button>

        <span className="text-xs font-semibold text-text-light px-2">
          Page {currentPage} of {numPages || 1}
        </span>

        <button
          type="button"
          disabled={currentPage >= numPages}
          onClick={onNext}
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-text disabled:opacity-40 hover:border-primary cursor-pointer transition-colors"
        >
          Next &rarr;
        </button>
      </div>

      <div className="flex items-center gap-1.5 text-xs font-medium text-text-light">
        <button
          type="button"
          onClick={onZoomOut}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-bg text-text hover:border-primary cursor-pointer transition-colors"
          title="Zoom out"
          aria-label="Zoom out"
        >
          -
        </button>
        <span className="px-2 text-xs font-mono">{Math.round(scale * 100)}%</span>
        <button
          type="button"
          onClick={onZoomIn}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-bg text-text hover:border-primary cursor-pointer transition-colors"
          title="Zoom in"
          aria-label="Zoom in"
        >
          +
        </button>
      </div>
    </div>
  );
}
