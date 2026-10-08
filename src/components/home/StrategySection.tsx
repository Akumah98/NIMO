import data from "@/data/data.json";
import StrategyPillarRow from "./StrategyPillarRow";

export default function StrategySection() {
  const { strategyPillars } = data;

  return (
    <section id="strategy" className="bg-bg px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary-light px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Methodology &amp; Practice
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Our Strategic Approach
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-text-light leading-relaxed">
            How we translate grassroots realities into sustainable, community-owned interventions across Cameroon.
          </p>
        </div>

        {/* Alternating 50/50 Z-Pattern Pillars */}
        <div className="mt-16 space-y-20">
          {strategyPillars.map((pillar, idx) => (
            <StrategyPillarRow key={pillar.step} pillar={pillar} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
