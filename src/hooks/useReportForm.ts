"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadMediaFile } from "@/lib/services/mediaService";
import { slugify } from "@/lib/utils";

export function useReportForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("research");
  const [publishedDate, setPublishedDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file && !selectedFileUrl) {
      setError("Please select or upload a document file.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      let finalUrl = selectedFileUrl;

      if (file) {
        const item = await uploadMediaFile(file, "reports");
        finalUrl = item.file_url;
      }

      const supabase = createClient();
      const { error: insertError } = await supabase.from("reports").insert({
        title,
        slug: slugify(title),
        description: description || null,
        file_url: finalUrl,
        category,
        published_date: publishedDate || null,
        published: true,
      });

      if (insertError) {
        setError(insertError.message);
        setSaving(false);
        return;
      }

      router.push("/admin/reports");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload report file");
      setSaving(false);
    }
  }

  return {
    title,
    setTitle,
    description,
    setDescription,
    category,
    setCategory,
    publishedDate,
    setPublishedDate,
    file,
    setFile,
    selectedFileUrl,
    setSelectedFileUrl,
    saving,
    error,
    handleSubmit,
  };
}
