"use client";

import { useState } from "react";
import { useAdminMedia } from "@/hooks/useAdminMedia";
import { MediaCategoryFilter } from "./MediaCategoryFilter";
import { MediaGrid } from "./MediaGrid";
import { MediaUploadZone } from "./MediaUploadZone";
import { MediaPickerHeader } from "./MediaPickerHeader";
import { MediaPickerFooter } from "./MediaPickerFooter";

interface MediaModalPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage?: (url: string) => void;
  onSelectImages?: (urls: string[]) => void;
  multiple?: boolean;
  title?: string;
  subtitle?: string;
}

export function MediaModalPicker({
  isOpen,
  onClose,
  onSelectImage,
  onSelectImages,
  multiple = false,
  title = "Media & Files Library",
  subtitle = "Choose existing assets or upload new ones",
}: MediaModalPickerProps) {
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const {
    media, loading, uploading, error,
    category, setCategory, search, setSearch,
    copiedId, uploadFiles, copyUrl,
  } = useAdminMedia();

  if (!isOpen) return null;

  const handleSelect = (url: string) => {
    if (multiple) {
      setSelectedUrls((prev) =>
        prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
      );
    } else {
      if (selectedUrls.includes(url)) {
        onSelectImage?.(url);
        onClose();
      } else {
        setSelectedUrls([url]);
      }
    }
  };

  const handleConfirm = () => {
    if (selectedUrls.length === 0) return;
    if (multiple && onSelectImages) onSelectImages(selectedUrls);
    else if (onSelectImage) onSelectImage(selectedUrls[0]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl">
        <MediaPickerHeader title={title} subtitle={subtitle} onClose={onClose} />

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
            selectedUrls={selectedUrls}
            onSelect={handleSelect}
          />
        </div>

        <MediaPickerFooter
          selectedUrls={selectedUrls}
          multiple={multiple}
          onCancel={onClose}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}
