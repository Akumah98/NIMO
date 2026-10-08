import { ProgramActivity } from "@/types/programs";
import ProgramActivityCard from "./ProgramActivityCard";

interface Props {
  activities: ProgramActivity[];
}

export default function ProgramActivitiesGrid({ activities }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold tracking-tight text-text sm:text-2xl">
          Key Activities &amp; Interventions
        </h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {activities.map((act, idx) => (
          <ProgramActivityCard key={idx} activity={act} index={idx} />
        ))}
      </div>
    </div>
  );
}
