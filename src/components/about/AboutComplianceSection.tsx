import { AboutComplianceItem } from "@/types/about";

interface Props {
  compliance: AboutComplianceItem[];
}

export default function AboutComplianceSection({ compliance }: Props) {
  return (
    <div className="mt-16 rounded-3xl border border-border/80 bg-bg p-6 sm:p-10 shadow-xs">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
          Accountability &amp; Safeguarding Standards
        </h2>
        <p className="mt-2 text-sm text-text-light">
          Built on rigorous compliance frameworks ensuring donor trust, legal fidelity, and beneficiary protection:
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {compliance.map((c) => (
          <div
            key={c.id}
            className="flex flex-col rounded-2xl border border-secondary/25 bg-secondary-light/30 p-5"
          >
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-sm font-bold text-text">{c.standard}</h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-text-light">{c.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
