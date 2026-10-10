import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative px-4 py-36 sm:px-6 sm:py-48 lg:px-8 lg:py-56 overflow-hidden min-h-[75dvh] sm:min-h-[85dvh] lg:min-h-[844px] flex items-center justify-center">
      <Image
        src="/posts/humanitarian Day 1.jpeg"
        alt="About NIMO - Community Outreach in South West Cameroon"
        fill
        priority
        className="object-cover object-center scale-105 transition-transform duration-1000"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/60 to-slate-950/85 backdrop-blur-[2px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="text-base sm:text-lg lg:text-xl font-bold uppercase tracking-widest text-primary-light drop-shadow-sm">
          Care With Wisdom
        </p>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-sm leading-tight">
          About NIMO
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-gray-200 leading-relaxed drop-shadow-xs">
          Development, Research and Cooperation for Better Communities. A community-anchored,
          people-centered organization dedicated to sustainable empowerment and human dignity across Cameroon.
        </p>
      </div>
    </section>
  );
}
