import Image from "next/image";

interface Props {
  images?: string[];
  title: string;
}

export default function ProgramPhotoGallery({ images, title }: Props) {
  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
        <h3 className="text-xl font-bold tracking-tight text-text sm:text-2xl">
          Fieldwork &amp; Ground Realities
        </h3>
      </div>
      <p className="text-sm text-text-light">
        Real moments from our facilitators, volunteers, and participants in {title}:
      </p>

      {/* Swipe snap on mobile, 2-col responsive grid on desktop */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="group min-w-[78vw] sm:min-w-0 shrink-0 snap-center relative h-64 sm:h-72 w-full overflow-hidden rounded-3xl border border-border/70 bg-bg-alt shadow-xs transition-all duration-300 hover:shadow-md"
          >
            <Image
              src={src}
              alt={`${title} fieldwork photo ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 78vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
