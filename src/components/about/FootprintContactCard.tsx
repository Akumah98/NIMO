import Link from "next/link";

interface Props {
  type: "email" | "phone";
  title: string;
  description: string;
  actionText: string;
  actionHref: string;
}

export default function FootprintContactCard({
  type,
  title,
  description,
  actionText,
  actionHref,
}: Props) {
  return (
    <div className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-border/80 bg-bg p-6 sm:p-7 shadow-md sm:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div>
        {type === "email" ? (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-accent border border-amber-200/80 dark:border-amber-800/40">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary border border-primary/20">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
        )}

        <h3 className="mt-5 text-lg sm:text-xl font-bold tracking-tight text-text">
          {title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-text-light">
          {description}
        </p>
      </div>

      <Link
        href={actionHref}
        className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-primary hover:shadow-xs active:scale-98 dark:bg-slate-800"
      >
        {actionText}
      </Link>
    </div>
  );
}
