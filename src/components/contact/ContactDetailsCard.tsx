import { CONTACT_INFO } from "@/lib/constants";

export default function ContactDetailsCard() {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-border/80 bg-bg p-6 sm:p-8 shadow-xs">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-text">
            Physical Office &amp; Operations
          </h3>
          <p className="mt-1 text-sm text-text-light">
            Visitors are welcome during business hours by appointment or for community casework.
          </p>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </span>
            <div>
              <p className="font-semibold text-text">Headquarters Address</p>
              <p className="text-text-light">{CONTACT_INFO.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary-light text-secondary">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div>
              <p className="font-semibold text-text">Working Hours</p>
              <p className="text-text-light">Monday – Friday: 8:00 AM – 5:00 PM (WAT)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950/50 text-accent">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
            <div>
              <p className="font-semibold text-text">Zero-Tolerance Safeguarding (PSEA)</p>
              <p className="text-text-light">Confidential reporting channel active 24/7 for protection violations.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-bg-alt/70 p-4 border border-border/70">
        <p className="text-xs font-semibold text-primary">Response Time Commitment</p>
        <p className="mt-1 text-xs text-text-light">
          Field urgent requests are triaged within 12 hours; general queries within 24-48 hours.
        </p>
      </div>
    </div>
  );
}
