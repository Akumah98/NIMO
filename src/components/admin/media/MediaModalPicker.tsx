"use client";

import { useState } from "react";
import { useAdminMedia } from "@/hooks/useAdminMedia";
import { MediaCategoryFilter } from "./MediaCategoryFilter";
import { MediaGrid } from "./MediaGrid";
import { MediaUploadZone } from "./MediaUploadZone";
import { MediaPickerFooter } from "./MediaPickerFooter";

interface MediaModalPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (url: string) => void;
  title?: string;
  subtitle?: string;
}

export function MediaModalPicker({
  isOpen,
  onClose,
  onSelectImage,
  title = "Media & Files Library",
  subtitle = "Choose an existing photo or upload a new one",
}: MediaModalPickerProps) {
  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const {
    media, loading, uploading, error,
    category, setCategory, search, setSearch,
    copiedId, uploadFiles, copyUrl,
  } = useAdminMedia();

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedUrl) {
      onSelectImage(selectedUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-4">
          <div>
            <h3 className="text-base font-bold text-text">{title}</h3>
            <p className="text-xs text-text-light">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-text-light hover:bg-bg-alt hover:text-text"
            aria-label="Close modal"
          >
            <span className="text-2xl leading-none">&times;</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <MediaUploadZone uploading={uploading} error={error} onUpload={uploadFiles} />
          <MediaCategoryFilter
            currentCategory={category}
            onSelectCategory={setCategory}
            search={search}
            onSearchChange={setSearch}
          />
          <MediaGrid
            media={media}
            loading={loading}
            copiedId={copiedId}
            onCopyUrl={copyUrl}
            selectedUrl={selectedUrl}
            onSelect={(url) => {
              if (selectedUrl === url) handleConfirm();
              else setSelectedUrl(url);
            }}
          />
        </div>

        <MediaPickerFooter
          selectedUrl={selectedUrl}
          onCancel={onClose}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}
