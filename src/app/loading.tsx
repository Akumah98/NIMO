export default function RootLoading() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* Header skeleton */}
        <div className="mb-8 space-y-3">
          <div className="h-4 w-32 rounded bg-border" />
          <div className="h-8 w-64 rounded-md bg-border sm:h-10 sm:w-80" />
          <div className="h-4 w-96 max-w-full rounded bg-border/60" />
        </div>

        {/* Card grid skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-bg-alt p-5 shadow-xs"
            >
              <div className="h-44 w-full rounded-xl bg-border/80" />
              <div className="mt-4 space-y-2.5">
                <div className="h-4 w-24 rounded bg-primary/20" />
                <div className="h-5 w-5/6 rounded bg-border" />
                <div className="h-3.5 w-full rounded bg-border/60" />
                <div className="h-3.5 w-3/4 rounded bg-border/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
