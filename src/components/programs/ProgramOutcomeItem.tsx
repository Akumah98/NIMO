interface Props {
  outcome: string;
}

export default function ProgramOutcomeItem({ outcome }: Props) {
  const colonIndex = outcome.indexOf(":");
  const headline = colonIndex !== -1 ? outcome.substring(0, colonIndex).trim() : outcome;
  const description = colonIndex !== -1 ? outcome.substring(colonIndex + 1).trim() : "";

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-bg p-5 sm:p-6 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
      <div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary-light text-secondary transition-transform duration-300 group-hover:scale-105">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h4 className="mt-3.5 text-base sm:text-lg font-bold text-text group-hover:text-primary transition-colors">
          {headline}
        </h4>
        {description && (
          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-text-light">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
