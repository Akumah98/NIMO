"use client";

import { useState } from "react";

interface MediaUploadZoneProps {
  uploading: boolean;
  error?: string;
  onUpload: (files: FileList | File[]) => void;
}

export function MediaUploadZone({ uploading, error, onUpload }: MediaUploadZoneProps) {
  const [dragOver, setDragOver] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition ${
          dragOver
            ? "border-primary bg-primary-light/50"
            : "border-border bg-bg-alt hover:border-primary/50"
        }`}
      >
        <div className="mb-3 rounded-full bg-primary-light p-3 text-primary">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>

        <p className="text-sm font-semibold text-text">
          {uploading ? "Uploading images to storage..." : "Drag & drop your images here"}
        </p>
        <p className="mt-1 text-xs text-text-light">PNG, JPG, WebP, or SVG up to 10MB</p>

        <label className="mt-4 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-dark">
          {uploading ? "Uploading..." : "Browse Local Files"}
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={uploading}
            onChange={(e) => e.target.files && onUpload(e.target.files)}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
