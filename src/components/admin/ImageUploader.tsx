"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { MediaModalPicker } from "./media/MediaModalPicker";

interface ImageUploaderProps {
  bucket: string;
  currentImage?: string | null;
  onUpload: (url: string) => void;
}

export default function ImageUploader({ bucket, currentImage, onUpload }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [showPicker, setShowPicker] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const supabase = createClient();
    const fileExt = file.name.split(".").pop();
    const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { error } = await supabase.storage.from(bucket).upload(filePath, file);

    if (error) {
      alert("Upload failed: " + error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    setPreview(data.publicUrl);
    onUpload(data.publicUrl);
    setUploading(false);
  }

  function handleSelectFromMedia(url: string) {
    setPreview(url);
    onUpload(url);
    setShowPicker(false);
  }

  return (
    <div className="flex flex-col gap-3">
      {preview && (
        <div className="relative aspect-video w-full max-w-xs overflow-hidden rounded-lg border border-border">
          <Image src={preview} alt="Preview" fill unoptimized className="object-cover" />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-light transition-colors hover:border-primary hover:text-primary">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {uploading ? "Uploading..." : "Upload New Image"}
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="hidden" />
        </label>

        <button
          type="button"
          onClick={() => setShowPicker(true)}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-light px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Media Library
        </button>
      </div>

      <MediaModalPicker
        isOpen={showPicker}
        onClose={() => setShowPicker(false)}
        onSelectImage={handleSelectFromMedia}
      />
    </div>
  );
}
