import data from "@/data/data.json";

export default function TestimonialsSection() {
  const { testimonials } = data;

  return (
    <section className="bg-bg-alt px-4 py-20 sm:px-6 lg:px-8 border-t border-border/60">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary-light px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Community Voices
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Voices from the Grassroots
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-text-light">
            Real stories and reflections from community members, educators, and leaders partnering with NIMO.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-3xl border border-border/70 bg-bg p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <svg
                  className="h-8 w-8 text-primary/30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>
                <p className="mt-5 text-base italic leading-relaxed text-text">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 border-t border-border/40 pt-4">
                <p className="text-sm font-bold text-text">
                  {item.author}
                </p>
                <p className="text-xs text-text-light">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
