import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { formatEventCategory, parseEventCategories } from "@/lib/utils/categoryUtils";
import type { Event } from "@/types";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const categories = parseEventCategories(event.category);

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block rounded-xl border border-border bg-bg p-6 transition-shadow hover:shadow-md"
    >
      {event.cover_image && (
        <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-bg-alt">
          <Image
            src={event.cover_image}
            alt={event.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        {categories.map((cat) => (
          <Badge key={cat} variant="primary">
            {formatEventCategory(cat)}
          </Badge>
        ))}
        {event.event_date && (
          <span className="text-xs text-text-light ml-auto">
            {formatDate(event.event_date)}
          </span>
        )}
      </div>

      <h3 className="mt-3 text-lg font-semibold text-text group-hover:text-primary">
        {event.title}
      </h3>

      {event.excerpt && (
        <p className="mt-2 line-clamp-2 text-sm text-text-light">
          {event.excerpt}
        </p>
      )}
    </Link>
  );
}
