"use client";

import { useEffect, useState, useTransition } from "react";
import { fetchMediaItems, uploadMediaFile, deleteMediaItem } from "@/lib/services/mediaService";
import type { MediaItem } from "@/types";

export function useAdminMedia() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    let active = true;
    fetchMediaItems("all").then((items) => {
      if (active) {
        setMedia(items);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  async function uploadFiles(files: FileList | File[]) {
    setUploading(true);
    setError("");
    try {
      for (const file of Array.from(files)) {
        const uploadCat = category === "all" || category === "files" ? "general" : category;
        const item = await uploadMediaFile(file, uploadCat);
        setMedia((prev) => [item, ...prev]);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload file");
    } finally {
      setUploading(false);
    }
  }

  async function deleteItem(item: MediaItem) {
    if (!confirm(`Delete asset "${item.name}"?`)) return;
    try {
      await deleteMediaItem(item.id, item.file_path);
      setMedia((prev) => prev.filter((m) => m.id !== item.id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete item");
    }
  }

  function copyUrl(url: string, id: string) {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const isDoc = item.category === "reports" || item.category === "resources" ||
      item.mime_type?.includes("pdf") || /\.(pdf|docx?|xlsx?)$/i.test(item.file_url || item.name);

    if (category === "all") return matchesSearch;
    if (category === "files") return matchesSearch && isDoc;
    return matchesSearch && item.category === category;
  });

  return {
    media: filteredMedia,
    loading,
    uploading,
    error,
    category,
    setCategory: (cat: string) => startTransition(() => setCategory(cat)),
    search,
    setSearch,
    copiedId,
    uploadFiles,
    deleteItem,
    copyUrl,
  };
}
