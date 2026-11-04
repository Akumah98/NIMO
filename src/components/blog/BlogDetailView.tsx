"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { parseEventBody } from "@/lib/services/eventContentParser";
import { EventBodyRenderer } from "@/components/events/EventBodyRenderer";
import { EventLightbox } from "@/components/events/EventLightbox";
import type { GalleryPhoto } from "@/lib/utils/galleryUtils";
import type { Post } from "@/types";

interface BlogDetailViewProps {
  post: Post;
}

export function BlogDetailView({ post }: BlogDetailViewProps) {
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const storyPhotos: GalleryPhoto[] = [];
  const blocks = parseEventBody(post.body);
  for (const b of blocks) {
    if (b.type === "image") {
      storyPhotos.push({ url: b.url, caption: b.caption || post.title });
    } else if (b.type === "collage") {
      for (const item of b.items) {
        storyPhotos.push({ url: item.url, caption: item.caption || b.caption || post.title });
      }
    }
  }

  const allPhotos: GalleryPhoto[] = [
    ...(post.cover_image ? [{ url: post.cover_image, caption: post.title }] : []),
    ...storyPhotos,
  ];

  const activeIndex = activePhoto
    ? allPhotos.findIndex((p) => p.url === activePhoto.url)
    : null;

  return (
    <article className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          &larr; Back to News
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          {post.tags.map((tag: string) => (
            <Badge key={tag} variant="primary">{tag}</Badge>
          ))}
        </div>

        <h1 className="mt-4 text-3xl font-bold text-text sm:text-4xl">{post.title}</h1>

        <div className="mt-4 flex items-center gap-3 text-sm text-text-light">
          <span>By {post.author}</span>
          <span>&middot;</span>
          <time>{formatDate(post.created_at)}</time>
        </div>

        {post.cover_image && (
          <div
            onClick={() => setActivePhoto({ url: post.cover_image!, caption: post.title })}
            className="group relative mt-8 aspect-video overflow-hidden rounded-2xl border border-border shadow-md cursor-pointer"
          >
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 rounded-full bg-black/60 px-3 py-1.5 text-white text-xs font-semibold backdrop-blur-xs">
                🔍 Click to Expand
              </span>
            </div>
          </div>
        )}

        <EventBodyRenderer body={post.body} onImageClick={setActivePhoto} />

        <EventLightbox
          photos={allPhotos}
          currentIndex={activeIndex !== -1 ? activeIndex : null}
          onClose={() => setActivePhoto(null)}
          onNavigate={(idx) => setActivePhoto(allPhotos[idx] || null)}
        />
      </div>
    </article>
  );
}
