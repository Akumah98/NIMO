import Image from "next/image";
import { AboutFootprintLocation } from "@/types/about";
import FootprintContactCard from "./FootprintContactCard";

interface Props {
  headquarters: string;
  divisions: AboutFootprintLocation[];
  email?: string;
  phone?: string;
  image?: string;
}

export default function AboutFootprintSection({
  headquarters,
  divisions,
  email = "contact@nimo.africa",
  phone = "+237 651 868 764",
  image = "/posts/humanitarian Day 1.jpeg",
}: Props) {
  return (
    <div className="mt-16">
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Left Column: Heading, Subtitle & 2 Elevated Cards */}
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text">
              Where We Operate
            </h2>
            <p className="mt-2 text-sm sm:text-base text-text-light">
              Grassroots presence anchored in Buea and deploying across Cameroon&apos;s vulnerable divisional corridors.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <FootprintContactCard
                type="email"
                title="Drop us a line"
                description={`Central coordination desk at ${headquarters}. Reach our team for institutional partnerships or field missions.`}
                actionText={email}
                actionHref={`mailto:${email}`}
              />

              <FootprintContactCard
                type="phone"
                title="Call our desk"
                description="Direct humanitarian line for community protection, emergency casework, and field verification."
                actionText={phone}
                actionHref={`tel:${phone.replace(/\s+/g, "")}`}
              />
            </div>
          </div>

          {/* Operational Corridor Badges */}
          <div className="mt-8 border-t border-border/80 pt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-text-light">
              Active Divisional Corridors:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {divisions.map((d) => (
                <span
                  key={d.division}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-light/40 px-3 py-1 text-xs font-semibold text-text"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  <span className="font-bold text-primary">{d.division}</span>
                  <span className="text-text-light">({d.hub})</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Large Photography Card with Glassmorphic Badge */}
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
            <p className="mt-1 text-sm font-bold text-white sm:text-base">
              Mile 18 Junction, Buea
            </p>
            <p className="mt-0.5 text-xs text-gray-300">
              Coordinating field teams across 35+ communities in South West &amp; North West Cameroon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
