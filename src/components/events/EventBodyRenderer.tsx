"use client";

import Image from "next/image";
import { parseEventBody, type ContentBlock } from "@/lib/services/eventContentParser";
import { EventCollageRow } from "./EventCollageRow";
import type { GalleryPhoto } from "@/lib/utils/galleryUtils";

interface EventBodyRendererProps {
  body: string;
  onImageClick: (photo: GalleryPhoto) => void;
}

export function EventBodyRenderer({ body, onImageClick }: EventBodyRendererProps) {
  const blocks = parseEventBody(body);

  return (
    <div className="prose mt-8 max-w-none text-text-light clear-both">
      {blocks.map((block: ContentBlock, idx: number) => {
        if (block.type === "heading") {
          return block.level === 2 ? (
            <h2 key={idx} className="text-2xl font-bold text-text mt-8 mb-3 clear-both">{block.text}</h2>
          ) : (
            <h3 key={idx} className="text-xl font-bold text-text mt-6 mb-2 clear-both">{block.text}</h3>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote key={idx} className="border-l-4 border-primary pl-4 py-2 italic text-text my-4 bg-primary-light/20 rounded-r-lg clear-both">
              {block.text}
            </blockquote>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={idx} className="list-disc list-inside space-y-1.5 my-3 text-text-light">
              {block.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          );
        }
        if (block.type === "collage") {
          return (
            <EventCollageRow
              key={idx}
              items={block.items}
              cols={block.cols}
              aspect={block.aspect}
              caption={block.caption}
              onImageClick={(url, caption) => onImageClick({ url, caption: caption || "" })}
            />
          );
        }
        if (block.type === "image") {
          const isLeft = block.placement === "left";
          const isRight = block.placement === "right";
          const wrapClass = isLeft ? "my-4 sm:float-left sm:mr-6 sm:mb-4 w-full sm:max-w-xs" :
                            isRight ? "my-4 sm:float-right sm:ml-6 sm:mb-4 w-full sm:max-w-xs" :
                            "my-6 w-full clear-both";

          const aspectClass = block.aspect === "square" ? "aspect-square" :
                              block.aspect === "standard" ? "aspect-[4/3]" : "aspect-video";

          return (
            <figure key={idx} className={wrapClass}>
              <div
                onClick={() => onImageClick({ url: block.url, caption: block.caption })}
                className={`group relative ${aspectClass} w-full cursor-pointer overflow-hidden rounded-xl bg-bg-alt border border-border shadow-2xs hover:border-primary/40`}
              >
                <Image
                  src={block.url}
                  alt={block.caption || "Event image"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 rounded-full bg-black/60 p-2 text-white text-xs">🔍 Click to zoom</span>
                </div>
              </div>
              {block.caption && !/^event photo$/i.test(block.caption.trim()) && (
                <figcaption className="mt-2 text-center text-xs font-medium italic text-text-light px-4">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }
        return <p key={idx} className="leading-relaxed text-text-light my-3">{block.text}</p>;
      })}
    </div>
  );
}
