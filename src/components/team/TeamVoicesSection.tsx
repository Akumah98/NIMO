import Image from "next/image";
import { TeamVoiceQuote } from "@/types/team";

interface Props {
  voices: TeamVoiceQuote[];
}

export default function TeamVoicesSection({ voices }: Props) {
  return (
    <section className="py-14 sm:py-20 bg-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
            Voices from the Field{" "}
            <span className="inline-block text-primary">— Frontline Perspective</span>
          </h2>
          <p className="mt-2.5 text-sm text-text-light">
            Reflections from our facilitators, protection caseworkers, and field researchers on the ground:
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {voices.map((voice, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-primary/20 bg-primary-light p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="relative">
                <div className="text-3xl font-serif text-primary/40 leading-none select-none">
                  &ldquo;
                </div>
                <p className="mt-1 text-sm italic leading-relaxed text-text">
                  {voice.quote}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3.5 border-t border-primary/20 pt-4">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-xs">
                  <Image
                    src={voice.image}
                    alt={voice.author}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text">{voice.author}</h4>
                  <p className="text-xs font-semibold text-text/80">{voice.role}</p>
                  <p className="text-[11px] text-text-light">{voice.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
