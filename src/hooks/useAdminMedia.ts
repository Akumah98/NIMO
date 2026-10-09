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

  async function loadMedia(cat = category) {
    setLoading(true);
    setError("");
    const items = await fetchMediaItems(cat);
    setMedia(items);
    setLoading(false);
  }

  useEffect(() => {
    let isMounted = true;
    const fetchInitial = async () => {
      const items = await fetchMediaItems("all");
      if (isMounted) {
        setMedia(items);
        setLoading(false);
      }
    };
    fetchInitial();
    return () => {
      isMounted = false;
    };
  }, []);

  async function uploadFiles(files: FileList | File[]) {
    setUploading(true);
    setError("");
    try {
      const fileList = Array.from(files);
      for (const file of fileList) {
        const item = await uploadMediaFile(file, category === "all" ? "general" : category);
        setMedia((prev) => [item, ...prev]);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload file");
    } finally {
      setUploading(false);
    }
  }

  async function deleteItem(item: MediaItem) {
    if (!confirm(`Delete image "${item.name}"?`)) return;
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
    const matchesCat = category === "all" || item.category === category;
    return matchesSearch && matchesCat;
  });

  return {
    media: filteredMedia,
    loading,
    uploading,
    error,
    category,
    setCategory: (cat: string) => {
      startTransition(() => {
        setCategory(cat);
      });
    },
    search,
    setSearch,
    copiedId,
    uploadFiles,
    deleteItem,
    copyUrl,
    reload: loadMedia,
  };
}
