import { TeamValue } from "@/types/team";

interface Props {
  principles: TeamValue[];
}

function getValueIcon(icon: string) {
  if (icon === "shield") {
    return (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    );
  }
  if (icon === "heart") {
    return (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    );
  }
  if (icon === "users") {
    return (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    );
  }
  return (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  );
}

export default function TeamValuesBar({ principles }: Props) {
  return (
    <section className="py-14 sm:py-20 bg-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl lg:text-4xl">
            How Our Team Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text-light">
            Every staff member, facilitator, and volunteer operates under shared humanitarian principles:
          </p>
        </div>

        <div className="mt-12 pb-6 lg:pb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-items-center items-start">
          {principles.map((val, idx) => {
            const isOffset = idx % 2 === 1;
            return (
              <div
                key={idx}
                className={`group relative flex aspect-square w-64 sm:w-68 lg:w-64 xl:w-72 flex-col items-center justify-center rounded-full border border-primary/20 bg-primary-light p-6 text-center shadow-xs transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-lg ${
                  isOffset ? "sm:mt-8 lg:mt-14" : "sm:mt-0"
                }`}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-text shadow-xs transition-transform duration-300 group-hover:scale-110">
                  <svg className="h-6 w-6 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {getValueIcon(val.icon)}
                  </svg>
                </div>

                <span className="mt-3 text-[11px] font-bold uppercase tracking-wider text-text-light">
                  {val.badge}
                </span>

                <h3 className="mt-1 text-sm sm:text-base font-bold text-text max-w-[200px]">
                  {val.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-text-light max-w-[190px]">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
