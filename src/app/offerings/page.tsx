import type { Metadata } from "next";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Offerings",
  description: "NIMO's vision, mission, and objectives for community development.",
};

const OBJECTIVES = [
  "Build capacity of community actors toward development initiatives",
  "Promote environmental protection and biodiversity conservation",
  "Promote research in communities aligned with Sustainable Development Goals",
  "Support development and humanitarian drives in communities in need",
];

export default function OfferingsPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Our Offerings
        </h1>
        <p className="mt-4 text-lg text-text-light">
          What drives our work in communities across Cameroon.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Card>
            <h2 className="text-xl font-semibold text-primary">Vision</h2>
            <p className="mt-3 text-text-light">
              To create communities where men, women, boys and girls of all
              diversities experience development, improved wellbeing and improved
              quality of life.
            </p>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-primary">Mission</h2>
            <p className="mt-3 text-text-light">
              To accompany meaningful community growth via the engagement of men,
              women, boys, and girls at the grassroots at promoting development,
              environmental protection, research and cooperation.
            </p>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-text">Our Objectives</h2>
          <div className="mt-6 grid gap-4">
            {OBJECTIVES.map((objective, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-lg border border-border p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">
                  {idx + 1}
                </span>
                <p className="text-text-light">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
