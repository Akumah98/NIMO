import data from "@/data/data.json";
import { Partner } from "@/types";
import PartnersSlideshow from "./PartnersSlideshow";

export default function PartnersSection() {
  const partners = data.partners as Partner[];

  return (
    <section id="partners" className="border-t border-border/60 bg-bg-alt px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary-light px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Collaboration &amp; Synergy
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Our Strategic Partners &amp; Alliances
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-text-light leading-relaxed">
            Bridging grassroots realities with multilateral institutions, government delegations, and community networks to drive sustainable impact.
          </p>
        </div>

        <PartnersSlideshow partners={partners} />
      </div>
    </section>
  );
}
