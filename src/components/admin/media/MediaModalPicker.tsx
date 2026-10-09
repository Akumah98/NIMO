"use client";

import { useAdminMedia } from "@/hooks/useAdminMedia";
import { MediaCategoryFilter } from "./MediaCategoryFilter";
import { MediaGrid } from "./MediaGrid";
import { MediaUploadZone } from "./MediaUploadZone";

interface MediaModalPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (url: string) => void;
}

export function MediaModalPicker({ isOpen, onClose, onSelectImage }: MediaModalPickerProps) {
  const {
    media,
    loading,
    uploading,
    error,
    category,
    setCategory,
    search,
    setSearch,
    copiedId,
    uploadFiles,
    copyUrl,
  } = useAdminMedia();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-4">
          <div>
            <h3 className="text-base font-bold text-text">Choose from Media Library</h3>
            <p className="text-xs text-text-light">Select an existing image or upload a new one</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-text-light hover:bg-bg-alt hover:text-text"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
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
            onSelect={(url) => {
              onSelectImage(url);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
