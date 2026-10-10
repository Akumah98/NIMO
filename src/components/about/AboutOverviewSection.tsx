import Image from "next/image";

export default function AboutOverviewSection() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 lg:items-center">
      {/* Left Column: Bold narrative text */}
      <div className="space-y-5 lg:col-span-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary">
          Who We Are
        </h2>
        <p className="text-xl sm:text-2xl font-bold leading-snug text-text">
          NIMO Association is a people-centered organization driven by a deep
          commitment to promoting the sustainable development, empowerment,
          and well-being of local communities and their people.
        </p>
        <p className="text-base sm:text-lg font-semibold leading-relaxed text-text">
          We operate across the South West and North West Regions of Cameroon,
          leveraging local structures, frontline competencies, and continuous
          community collaboration to foster inclusive, long-term growth.
        </p>
      </div>

      {/* Right Column: Vision and Mission cards with image backgrounds */}
      <div className="space-y-5 lg:col-span-6">
        {/* Our Vision Card */}
        <div className="group relative overflow-hidden rounded-3xl border border-border/80 p-6 sm:p-7 shadow-xs">
          <Image
            src="/posts/cfs_activities.jpeg"
            alt="NIMO Vision - Holistic Community Development"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/80 to-slate-950/70 backdrop-blur-[1px]" />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5">
              <span className="rounded-full bg-primary/20 border border-primary/30 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-primary-light">
                Direction
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">Our Vision</h3>
            </div>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-200">
              To create communities where men, women, boys, and girls of all diversities experience holistic development, improved wellbeing, and enhanced quality of life.
            </p>
          </div>
        </div>

        {/* Our Mission Card */}
        <div className="group relative overflow-hidden rounded-3xl border border-border/80 p-6 sm:p-7 shadow-xs">
          <Image
            src="/posts/emp3.jpeg"
            alt="NIMO Mission - Community-Driven Growth"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/80 to-slate-950/70 backdrop-blur-[1px]" />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5">
              <span className="rounded-full bg-secondary/20 border border-secondary/30 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-secondary-light">
                Mandate
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">Our Mission</h3>
            </div>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-200">
              To accompany meaningful community growth via direct community engagement in sustainable development, environmental protection, participatory research, and strategic cooperation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
