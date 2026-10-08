import Image from "next/image";
import data from "@/data/data.json";

export default function AreasOfIntervention() {
  const { areasOfIntervention } = data;

  return (
    <section id="pillars" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary-light px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Key Pillars
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Areas of Intervention
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-text-light leading-relaxed">
            With community growth as our core, we cover a wide range of intervention areas. We are dedicated to fostering community growth through targeted efforts in education, protection, and research.
          </p>
        </div>

        {/* Swipe-snap on mobile, 3-col responsive grid on desktop */}
        <div className="mt-12 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible">
          {areasOfIntervention.map((area) => (
            <div
              key={area.id}
              className="group min-w-[75vw] sm:min-w-0 shrink-0 snap-center flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-bg shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-primary/30"
            >
              <div className="relative h-56 w-full overflow-hidden bg-bg-alt">
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors">
                  {area.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-text-light">
                  {area.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
