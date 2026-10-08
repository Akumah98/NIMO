import { AboutValue } from "@/types/about";

interface Props {
  values: AboutValue[];
}

function ValueIcon({ name }: { name: AboutValue["iconName"] }) {
  if (name === "users") {
    return (
      <svg className="h-5 w-5 shrink-0 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg className="h-5 w-5 shrink-0 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  }
  if (name === "scale") {
    return (
      <svg className="h-5 w-5 shrink-0 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5 shrink-0 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

export default function AboutValuesSection({ values }: Props) {
  return (
    <div className="mt-16">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
          Core Humanitarian Principles
        </h2>
        <p className="mt-2 text-sm text-text-light">
          The non-negotiable ethical standards and community commitments that govern every intervention:
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {values.map((v) => (
          <div
            key={v.id}
            className="flex flex-col justify-between rounded-2xl border border-primary/20 bg-primary-light p-6 shadow-2xs transition-all duration-300 hover:border-primary/40 hover:shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <ValueIcon name={v.iconName} />
              <h3 className="text-base sm:text-lg font-bold text-text">{v.title}</h3>
            </div>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-text/80">
              {v.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
