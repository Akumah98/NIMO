"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import programsData from "@/data/programsData.json";
import { ProgramItem } from "@/types/programs";
import { ProgramsOverviewGrid } from "./ProgramsOverviewGrid";
import ProgramHeaderCard from "./ProgramHeaderCard";
import ProgramObjectivesList from "./ProgramObjectivesList";
import ProgramActivitiesGrid from "./ProgramActivitiesGrid";
import ProgramOutcomesCard from "./ProgramOutcomesCard";

export default function ProgramView() {
  const programs = programsData as ProgramItem[];
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");
  const isValidQuery = Boolean(queryId && programs.some((p) => p.id === queryId));
  const activeId = isValidQuery ? queryId : null;

  const currentProgram = programs.find((p) => p.id === activeId);

  if (!currentProgram) {
    return <ProgramsOverviewGrid programs={programs} />;
  }

  return (
    <div className="space-y-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/programs"
          className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>All Programs Overview</span>
        </Link>
        <ProgramHeaderCard program={currentProgram} />
      </div>

      <ProgramObjectivesList objectives={currentProgram.objectives} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <ProgramActivitiesGrid activities={currentProgram.activities} />
        <ProgramOutcomesCard
          outcomes={currentProgram.outcomes}
          approaches={currentProgram.approaches}
          commitment={currentProgram.commitment}
        />
      </div>
    </div>
  );
}
