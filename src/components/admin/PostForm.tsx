"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ImageUploader from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";
import type { Post } from "@/types";

interface PostFormProps {
  post?: Post;
}

export default function PostForm({ post }: PostFormProps) {
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

    let result;
    if (isEditing) {
      result = await supabase.from("posts").update(payload).eq("id", post.id);
    } else {
      result = await supabase.from("posts").insert(payload);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">Author</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">Tags (comma separated)</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="GBV, Education, Water"
            className="rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="Short summary..."
          className="rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Cover Image</label>
        <ImageUploader bucket="posts" currentImage={coverImage} onUpload={setCoverImage} />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Content</label>
        <RichTextEditor value={body} onChange={setBody} />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
        />
        <label htmlFor="published" className="text-sm text-text">Published</label>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : isEditing ? "Update Post" : "Publish Post"}
        </Button>
        <Button variant="outline" href="/admin/posts">
          Cancel
        </Button>
      </div>
    </form>
  );
}
