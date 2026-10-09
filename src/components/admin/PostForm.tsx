"use client";

import ImageUploader from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";
import { FormActionButtons } from "./FormActionButtons";
import { PublishToggle } from "./PublishToggle";
import { PostMetaFields } from "./PostMetaFields";
import { usePostForm } from "@/hooks/usePostForm";
import type { Post } from "@/types";

interface PostFormProps {
  post?: Post;
}

export default function PostForm({ post }: PostFormProps) {
  const {
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
  } = usePostForm(post);

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="min-h-11 rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-hidden"
        />
      </div>

      <PostMetaFields
        author={author}
        onAuthorChange={setAuthor}
        tags={tags}
        onTagsChange={setTags}
        excerpt={excerpt}
        onExcerptChange={setExcerpt}
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Cover Image</label>
        <ImageUploader bucket="posts" currentImage={coverImage} onUpload={setCoverImage} />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Content</label>
        <RichTextEditor value={body} onChange={setBody} />
      </div>

      <PublishToggle published={published} onChange={setPublished} />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <FormActionButtons
        saving={saving}
        isEditing={isEditing}
        cancelHref="/admin/posts"
        createLabel="Publish Post"
        updateLabel="Update Post"
      />
    </form>
  );
}
