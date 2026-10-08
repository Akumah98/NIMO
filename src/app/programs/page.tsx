import type { Metadata } from "next";
import { Suspense } from "react";
import ProgramsHero from "@/components/programs/ProgramsHero";
import ProgramView from "@/components/programs/ProgramView";

export const metadata: Metadata = {
  title: "Programs & Key Interventions",
  description:
    "Explore NIMO CARE's core programs in Child Protection, Safe & Inclusive Education, and Gender-Based Violence Prevention.",
};

export const revalidate = 60;

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-bg">
      <ProgramsHero />
      <div className="pt-4 pb-16">
        <Suspense fallback={null}>
          <ProgramView />
        </Suspense>
      </div>
    </div>
  );
}
