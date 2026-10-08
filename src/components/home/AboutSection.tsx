import Image from "next/image";
import Link from "next/link";
import data from "@/data/data.json";

export default function AboutSection() {
  const { about } = data;

  return (
    <section id="about" className="bg-bg px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="space-y-6 lg:col-span-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
                {about.title}{" "}
                <span className="text-primary">— Who We Are</span>
              </h2>
              <p className="mt-2 text-base font-semibold text-primary">
                {about.tagline}
              </p>
            </div>

            <div className="space-y-3.5 text-base leading-relaxed text-text-light">
              {about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {about.coreValues.map((val) => (
                <span
                  key={val}
                  className="rounded-full border border-border/80 bg-bg-alt px-3.5 py-1 text-xs font-semibold text-text-light"
                >
                  {val}
                </span>
              ))}
            </div>

            <div>
              <Link
                href="/about"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition-all duration-200 hover:bg-primary-dark active:scale-[0.98]"
              >
                Learn More About Us
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <div className="group relative h-72 sm:h-88 w-full overflow-hidden rounded-3xl border border-border/60 shadow-sm transition-all duration-300 hover:shadow-md">
              <Image
                src="/posts/emp1.jpeg"
                alt="Community members participating in empowerment session"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="group relative mt-6 sm:mt-10 h-72 sm:h-88 w-full overflow-hidden rounded-3xl border border-border/60 shadow-sm transition-all duration-300 hover:shadow-md">
              <Image
                src="/posts/cfs_activities.jpeg"
                alt="Children in protective learning space"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
