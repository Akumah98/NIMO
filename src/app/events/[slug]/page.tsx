import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase
    .from("events")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!event) return { title: "Event Not Found" };

  return {
    title: event.title,
    description: event.excerpt || undefined,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!event) notFound();

  return (
    <article className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3">
          <Badge variant="primary">{event.category}</Badge>
          {event.event_date && (
            <time className="text-sm text-text-light">
              {formatDate(event.event_date)}
            </time>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-bold text-text sm:text-4xl">{event.title}</h1>

        {event.cover_image && (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
            <Image
              src={event.cover_image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        <div className="prose mt-8 max-w-none text-text-light">
          {event.body.split("\n").map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {event.images && event.images.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-text">Gallery</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {event.images.map((img: string, idx: number) => (
                <div key={idx} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={img}
                    alt={`${event.title} - Photo ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 250px"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
