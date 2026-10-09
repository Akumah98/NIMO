"use client";

import { useAdminMedia } from "@/hooks/useAdminMedia";
import { MediaUploadZone, MediaCategoryFilter, MediaGrid } from "@/components/admin/media";

export default function AdminMediaPage() {
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
    deleteItem,
    copyUrl,
  } = useAdminMedia();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Media Library</h1>
          <p className="text-sm text-text-light">
            Upload, manage, and retrieve website images for posts, events, and background banners.
          </p>
        </div>
        <div className="text-xs text-text-light">
          {media.length} {media.length === 1 ? "asset" : "assets"} available
        </div>
      </div>

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
        onDelete={deleteItem}
      />
    </div>
  );
}
