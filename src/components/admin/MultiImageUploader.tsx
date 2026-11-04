"use client";

import { useState } from "react";
import { uploadMediaFile } from "@/lib/services/mediaService";
import { MediaModalPicker } from "./media/MediaModalPicker";
import { GalleryImageItem } from "./GalleryImageItem";

interface MultiImageUploaderProps {
  bucket: string;
  images: string[];
  onAddImage: (url: string) => void;
  onRemoveImage: (index: number) => void;
  onUpdateCaption?: (index: number, caption: string) => void;
}

export default function MultiImageUploader({
  bucket,
  images,
  onAddImage,
  onRemoveImage,
  onUpdateCaption,
}: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(fileList)) {
        const item = await uploadMediaFile(file, bucket || "events");
        onAddImage(item.file_url);
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((imgStr, idx) => (
            <GalleryImageItem
              key={idx}
              imageStr={imgStr}
              index={idx}
              onRemove={onRemoveImage}
              onUpdateCaption={onUpdateCaption}
            />
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-light transition-colors hover:border-primary hover:text-primary">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {uploading ? "Uploading photos..." : "Upload Multiple Photos"}
          <input type="file" accept="image/*" multiple onChange={handleFiles} disabled={uploading} className="hidden" />
        </label>

        <button
          type="button"
          onClick={() => setShowPicker(true)}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-light px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
        >
          Add from Media Library
        </button>
      </div>

      <MediaModalPicker
        isOpen={showPicker}
        onClose={() => setShowPicker(false)}
        defaultCategory={bucket || "events"}
        onSelectImage={(url) => {
          onAddImage(url);
          setShowPicker(false);
        }}
      />
    </div>
  );
}
