import type { Metadata } from "next";
import AboutOverviewSection from "@/components/about/AboutOverviewSection";
import AboutHero from "@/components/about/AboutHero";
import StaffCapacities from "@/components/about/StaffCapacities";
import AboutValuesSection from "@/components/about/AboutValuesSection";
import AboutApproachSection from "@/components/about/AboutApproachSection";
import AboutFootprintSection from "@/components/about/AboutFootprintSection";
import AboutComplianceSection from "@/components/about/AboutComplianceSection";
import aboutData from "@/data/aboutData.json";
import { AboutValue } from "@/types/about";

export const metadata: Metadata = {
  title: "About Us | NIMO - Mission, Approach & Impact",
  description: "Learn about NIMO Association, our grassroots humanitarian mission, vision, operational footprint, and values in Cameroon.",
};

export const revalidate = 60;

export default function AboutPage() {
  const values = aboutData.values as AboutValue[];

  return (
    <main className="min-h-dvh bg-bg">
      <AboutHero />

      <section className="px-4 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-16 lg:px-8 lg:pt-24 lg:pb-20">
        <div className="mx-auto max-w-5xl">
          <AboutOverviewSection />
          <AboutValuesSection values={values} />
        </div>
      </section>

      <AboutApproachSection steps={aboutData.approachSteps} />

      <section className="px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="mx-auto max-w-5xl">
          <StaffCapacities />
          <AboutFootprintSection
            headquarters={aboutData.footprint.headquarters}
            divisions={aboutData.footprint.divisions}
            email={aboutData.footprint.email}
            phone={aboutData.footprint.phone}
            image={aboutData.footprint.image}
          />
          <AboutComplianceSection compliance={aboutData.compliance} />
        </div>
      </section>
    </main>
  );
}
