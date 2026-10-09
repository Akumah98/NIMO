import Image from "next/image";

interface FootprintImageCardProps {
  image: string;
}

export function FootprintImageCard({ image }: FootprintImageCardProps) {
  return (
    <div className="relative min-h-[360px] sm:min-h-[440px] lg:col-span-5 w-full overflow-hidden rounded-3xl border border-border/70 shadow-lg">
      <Image
        src={image}
        alt="NIMO Field Operations Hub"
        fill
        className="object-cover object-center transition-transform duration-700 hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 40vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-white backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
          </span>
          <p className="text-xs font-bold uppercase tracking-wider text-secondary-light">
            Active Operations Hub
          </p>
        </div>
        <p className="mt-1 text-sm font-bold text-white sm:text-base">Mile 18 Junction, Buea</p>
        <p className="mt-0.5 text-xs text-gray-300">
          Coordinating field teams across 35+ communities in South West &amp; North West Cameroon.
        </p>
      </div>
    </div>
  );
}
