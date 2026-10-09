"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";

export function useReportForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("research");
  const [publishedDate, setPublishedDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Please select a PDF file to upload.");
      return;
    }

    setSaving(true);
    setError("");

    const supabase = createClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${slugify(title)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage.from("reports").upload(fileName, file);

    if (uploadError) {
      setError("File upload failed: " + uploadError.message);
      setSaving(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("reports").getPublicUrl(fileName);

    const { error: insertError } = await supabase.from("reports").insert({
      title,
      slug: slugify(title),
      description: description || null,
      file_url: urlData.publicUrl,
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
    saving,
    error,
    handleSubmit,
  };
}
