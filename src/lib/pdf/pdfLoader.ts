export interface PdfDocumentProxy {
  numPages: number;
  getPage: (pageNumber: number) => Promise<{
    getViewport: (options: { scale: number }) => { width: number; height: number };
    render: (params: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => {
      promise: Promise<void>;
      cancel: () => void;
    };
  }>;
}

export interface PdfJsLib {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (url: string) => { promise: Promise<PdfDocumentProxy> };
}

export function loadPdfScript(): Promise<PdfJsLib> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("SSR"));
    const win = window as unknown as { pdfjsLib?: PdfJsLib };
    if (win.pdfjsLib) {
      return resolve(win.pdfjsLib);
    }
    const existing = document.querySelector('script[src="/vendor/pdfjs/pdf.min.js"]');
    if (existing) {
      existing.addEventListener("load", () => {
        const readyLib = (window as unknown as { pdfjsLib?: PdfJsLib }).pdfjsLib;
        if (readyLib) resolve(readyLib);
      });
      return;
    }
    const script = document.createElement("script");
    script.src = "/vendor/pdfjs/pdf.min.js";
    script.async = true;
    script.onload = () => {
      const lib = (window as unknown as { pdfjsLib?: PdfJsLib }).pdfjsLib;
      if (lib) {
        lib.GlobalWorkerOptions.workerSrc = "/vendor/pdfjs/pdf.worker.min.js";
        resolve(lib);
      } else {
        reject(new Error("PDF engine failed to initialize"));
      }
    };
    script.onerror = () => reject(new Error("Failed to load PDF viewer engine"));
    document.head.appendChild(script);
  });
}

