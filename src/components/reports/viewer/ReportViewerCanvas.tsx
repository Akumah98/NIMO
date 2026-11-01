"use client";

import { useEffect, useRef } from "react";
import type { PdfDocumentProxy } from "@/hooks/useReportViewer";

interface ReportViewerCanvasProps {
  pdfDoc: PdfDocumentProxy | null;
  currentPage: number;
  scale: number;
  loading: boolean;
  error: string | null;
}

export function ReportViewerCanvas({
  pdfDoc,
  currentPage,
  scale,
  loading,
  error,
}: ReportViewerCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    let cancelRender: (() => void) | null = null;

    pdfDoc.getPage(currentPage).then((page) => {
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderTask = page.render({ canvasContext: context, viewport });
      cancelRender = () => renderTask.cancel();
    }).catch(() => {});

    return () => {
      if (cancelRender) cancelRender();
    };
  }, [pdfDoc, currentPage, scale]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-text-light">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="mt-3 text-xs font-medium">Securing and rendering document...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-border bg-bg-alt p-8 text-center text-sm text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4 overflow-auto max-h-[70vh]">
      <canvas
        ref={canvasRef}
        className="rounded-lg shadow-xl border border-border max-w-full select-none pointer-events-none"
      />
    </div>
  );
}
