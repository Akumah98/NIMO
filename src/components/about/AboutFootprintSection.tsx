import { AboutFootprintLocation } from "@/types/about";
import FootprintContactCard from "./FootprintContactCard";
import { FootprintImageCard } from "./FootprintImageCard";

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
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text">
              Where We Operate
            </h2>
            <p className="mt-2 text-sm sm:text-base text-text-light">
              Operational field presence anchored in Buea and deploying across Cameroon&apos;s vulnerable divisional corridors.
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

        <FootprintImageCard image={image} />
      </div>
    </div>
  );
}
