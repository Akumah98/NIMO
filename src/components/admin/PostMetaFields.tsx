interface PostMetaFieldsProps {
  author: string;
  onAuthorChange: (author: string) => void;
  tags: string;
  onTagsChange: (tags: string) => void;
  excerpt: string;
  onExcerptChange: (excerpt: string) => void;
}

export function PostMetaFields({
  author,
  onAuthorChange,
  tags,
  onTagsChange,
  excerpt,
  onExcerptChange,
}: PostMetaFieldsProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">Author</label>
          <input
            value={author}
            onChange={(e) => onAuthorChange(e.target.value)}
            className="min-h-11 rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-hidden"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">Tags (comma separated)</label>
          <input
            value={tags}
            onChange={(e) => onTagsChange(e.target.value)}
            placeholder="GBV, Education, Water"
            className="min-h-11 rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-hidden"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => onExcerptChange(e.target.value)}
          rows={2}
          placeholder="Short summary..."
          className="rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-hidden"
        />
      </div>
    </>
  );
}
