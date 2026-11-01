"use client";

import { useEffect } from "react";
import type { Report } from "@/types";
import { useReportViewer } from "@/hooks/useReportViewer";
import { ReportViewerToolbar } from "./ReportViewerToolbar";
import { ReportViewerCanvas } from "./ReportViewerCanvas";
import { ReportViewerPagination } from "./ReportViewerPagination";

interface ReportViewerModalProps {
  report: Report;
  onClose: () => void;
}

export function ReportViewerModal({ report, onClose }: ReportViewerModalProps) {
  const documentUrl = `/api/reports/${report.id}/view`;
  const {
    pdfDoc,
    currentPage,
    numPages,
    scale,
    loading,
    error,
    nextPage,
    prevPage,
    zoomIn,
    zoomOut,
  } = useReportViewer(documentUrl);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={report.title}
      onContextMenu={(e) => e.preventDefault()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-3 sm:p-6 animate-fadeIn select-none"
    >
      <div className="relative flex flex-col w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl">
        <ReportViewerToolbar report={report} onClose={onClose} />

        <ReportViewerCanvas
          pdfDoc={pdfDoc}
          currentPage={currentPage}
          scale={scale}
          loading={loading}
          error={error}
        />

        <ReportViewerPagination
          currentPage={currentPage}
          numPages={numPages}
          scale={scale}
          onPrev={prevPage}
          onNext={nextPage}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
        />
      </div>
    </div>
  );
}
