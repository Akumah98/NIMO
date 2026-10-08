import Image from "next/image";

interface Props {
  title: string;
  subtitle: string;
}

export default function TeamHero({ title, subtitle }: Props) {
  return (
    <section className="relative px-4 py-44 sm:py-60 lg:py-72 overflow-hidden min-h-[80dvh] sm:min-h-[85dvh] lg:min-h-[844px] flex items-center justify-center">
      <Image
        src="/posts/gender_transformative_approaches_training.jpeg"
        alt="NIMO Dedicated Team and Community Leaders in Buea"
        fill
        priority
        className="object-cover object-center scale-105 transition-transform duration-1000"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/60 to-slate-950/85 backdrop-blur-[2px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-sm leading-tight">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-gray-200 leading-relaxed drop-shadow-xs">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
