"use client";

import { useState, useEffect, useCallback } from "react";
import { loadPdfScript, type PdfDocumentProxy } from "@/lib/pdf/pdfLoader";

export type { PdfDocumentProxy };

export function useReportViewer(documentUrl: string) {
  const [pdfDoc, setPdfDoc] = useState<PdfDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadPdf() {
      setLoading(true);
      setError(null);
      try {
        const pdfjs = await loadPdfScript();
        const doc = await pdfjs.getDocument(documentUrl).promise;
        if (isMounted) {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setCurrentPage(1);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "Failed to load document";
          setError(msg);
          setLoading(false);
        }
      }
    }
    loadPdf();
    return () => {
      isMounted = false;
    };
  }, [documentUrl]);

  useEffect(() => {
    const blockShortcuts = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "p" || e.key === "u")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("keydown", blockShortcuts);
    return () => window.removeEventListener("keydown", blockShortcuts);
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage((p) => (p < numPages ? p + 1 : p));
  }, [numPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((p) => (p > 1 ? p - 1 : p));
  }, []);

  const zoomIn = useCallback(() => setScale((s) => Math.min(s + 0.2, 2.4)), []);
  const zoomOut = useCallback(() => setScale((s) => Math.max(s - 0.2, 0.7)), []);

  return {
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
  };
}
