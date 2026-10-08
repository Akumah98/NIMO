import { ProgramApproach } from "@/types/programs";
import ProgramOutcomeItem from "./ProgramOutcomeItem";
import ProgramApproachCard from "./ProgramApproachCard";

interface Props {
  outcomes: string[];
  approaches: ProgramApproach[];
  commitment: string[];
}

export default function ProgramOutcomesCard({ outcomes, approaches, commitment }: Props) {
  return (
    <div className="space-y-8">
      {/* Expected Outcomes */}
      <div className="rounded-3xl border border-border/80 bg-bg-alt/50 p-6 sm:p-8 lg:p-10 shadow-xs">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-text sm:text-2xl">
            Expected Outcomes &amp; Measurable Impact
          </h3>
          <p className="mt-1.5 text-sm text-text-light">
            Targeted community transformation and verifiable milestones delivered through this program:
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {outcomes.map((outcome, idx) => (
            <ProgramOutcomeItem key={idx} outcome={outcome} />
          ))}
        </div>
      </div>

      {/* Program Approach Principles */}
      <div className="rounded-3xl border border-border/80 bg-bg-alt/50 p-6 sm:p-8 lg:p-10 shadow-xs">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-text sm:text-2xl">
            Our Operational Approach
          </h3>
          <p className="mt-1.5 text-sm text-text-light">
            Core humanitarian standards and ethical principles guiding every field intervention:
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {approaches.map((app, idx) => (
            <ProgramApproachCard key={idx} approach={app} />
          ))}
        </div>
      </div>

      {/* Program Commitment */}
      <div className="rounded-3xl border border-primary/20 bg-primary p-6 sm:p-8 lg:p-10 text-white shadow-md">
        <h3 className="text-lg font-bold uppercase tracking-wider text-white/90">
          Our Standing Commitment
        </h3>
        <div className="mt-4 space-y-2 text-sm leading-relaxed text-white/95 sm:text-base">
          {commitment.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
