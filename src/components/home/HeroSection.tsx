import Image from "next/image";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative px-4 py-36 sm:px-6 sm:py-48 lg:px-8 lg:py-56 overflow-hidden min-h-[75dvh] sm:min-h-[85dvh] flex items-center justify-center">
      <Image
        src="/hero-bg.jpg"
        alt="Development and Research for Communities Background"
        fill
        priority
        className="object-cover object-top scale-105 transition-transform duration-1000 ease-out"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/60 to-slate-950/85 backdrop-blur-[2px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="animate-fade-in-down text-base sm:text-lg lg:text-xl font-bold uppercase tracking-widest text-primary-light drop-shadow-sm">
          Care With Wisdom
        </p>

        <h1 className="animate-fade-in-up [animation-delay:150ms] mt-6 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-sm leading-tight">
          Development, Research &amp; Cooperation for Communities
        </h1>

        <p className="animate-fade-in-up [animation-delay:300ms] mx-auto mt-6 max-w-2xl text-base sm:text-lg text-gray-200 leading-relaxed drop-shadow-xs">
          A people-centered organization driven to promote sustainable empowerment,
          evidence-based interventions, and genuine community advancement across Cameroon.
        </p>

        <div className="animate-fade-in-up [animation-delay:450ms] mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact" size="lg" className="transition-transform active:scale-95 shadow-md">
            Contact Us
          </Button>
          <Button href="/programs" variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/15 transition-transform active:scale-95">
            Explore Programs
          </Button>
        </div>
      </div>
    </section>
  );
}
