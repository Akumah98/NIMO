import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl border border-border bg-bg p-6 transition-shadow hover:shadow-md"
    >
      {post.cover_image && (
        <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-bg-alt">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        {post.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} variant="primary">{tag}</Badge>
        ))}
        <span className="text-xs text-text-light">
          {formatDate(post.created_at)}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold text-text group-hover:text-primary">
        {post.title}
      </h3>

      {post.excerpt && (
        <p className="mt-2 line-clamp-2 text-sm text-text-light">
          {post.excerpt}
        </p>
      )}

      <p className="mt-3 text-xs text-text-light">By {post.author}</p>
    </Link>
  );
}
