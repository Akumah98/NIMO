"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import type { Post } from "@/types";

export function usePostForm(post?: Post) {
  const router = useRouter();
  const isEditing = !!post;

  const [title, setTitle] = useState(post?.title || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [body, setBody] = useState(post?.body || "");
  const [tags, setTags] = useState(post?.tags.join(", ") || "");
  const [author, setAuthor] = useState(post?.author || "NIMO Care");
  const [coverImage, setCoverImage] = useState(post?.cover_image || "");
  const [published, setPublished] = useState(post?.published ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const supabase = createClient();
    const slug = slugify(title);

    const payload = {
      title,
      slug,
      excerpt: excerpt || null,
      body,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      author,
      cover_image: coverImage || null,
      published,
      updated_at: new Date().toISOString(),
    };

    const result = isEditing
      ? await supabase.from("posts").update(payload).eq("id", post.id)
      : await supabase.from("posts").insert(payload);

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/posts");
    router.refresh();
  }

  return {
    isEditing,
    title,
    setTitle,
    excerpt,
    setExcerpt,
    body,
    setBody,
    tags,
    setTags,
    author,
    setAuthor,
    coverImage,
    setCoverImage,
    published,
    setPublished,
    saving,
    error,
    handleSubmit,
  };
}
