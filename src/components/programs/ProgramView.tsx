"use client";

import { useSearchParams } from "next/navigation";
import programsData from "@/data/programsData.json";
import { ProgramItem } from "@/types/programs";
import ProgramHeaderCard from "./ProgramHeaderCard";
import ProgramObjectivesList from "./ProgramObjectivesList";
import ProgramActivitiesGrid from "./ProgramActivitiesGrid";
import ProgramOutcomesCard from "./ProgramOutcomesCard";

export default function ProgramView() {
  const programs = programsData as ProgramItem[];
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");
  const isValidQuery = Boolean(queryId && programs.some((p) => p.id === queryId));
  const activeId = (isValidQuery && queryId) ? queryId : programs[0]?.id || "child-protection";

  const currentProgram = programs.find((p) => p.id === activeId) || programs[0];

  return (
    <div className="space-y-16">
      {/* Active Program View */}
      {currentProgram && (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        </>
      )}
    </div>
  );
}
