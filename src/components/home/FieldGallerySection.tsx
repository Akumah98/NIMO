import Image from "next/image";
import data from "@/data/data.json";

export default function FieldGallerySection() {
  const { fieldGallery } = data;

  return (
    <section className="border-t border-border/60 bg-bg-alt px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary-light px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Fieldwork in Action
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Community Moments &amp; Grassroots Impact
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-text-light">
            A glimpse into our daily initiatives, community workshops, and child-safe spaces across the South West Region.
          </p>
        </div>

        {/* Responsive layout: Touch swipe snap on mobile, Bento grid on desktop */}
        <div className="mt-12 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible">
          {fieldGallery.map((item, idx) => (
            <div
              key={idx}
              className="group min-w-[75vw] sm:min-w-0 shrink-0 snap-center overflow-hidden rounded-3xl border border-border/70 bg-bg shadow-xs transition-all duration-300 hover:shadow-md"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3.5 left-3.5">
                  <span className="rounded-full bg-slate-950/70 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-sm sm:text-base font-bold text-text group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
