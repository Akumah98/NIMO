import type { TeamMember } from "@/types/team";

interface TeamMemberCardContentProps {
  member: TeamMember;
  isExpanded: boolean;
}

export function TeamMemberCardContent({ member, isExpanded }: TeamMemberCardContentProps) {
  const credentials = member.credentials || [];
  const visibleCredentials = isExpanded ? credentials : credentials.slice(0, 2);
  const hiddenCount = credentials.length - 2;

  return (
    <div className="mt-3.5 text-center">
      <p
        className={`text-xs sm:text-sm leading-relaxed text-text-light transition-all ${
          isExpanded ? "line-clamp-none" : "line-clamp-2 min-h-[2.5rem]"
        }`}
      >
        {member.bio}
      </p>

      {credentials.length > 0 && (
        <div
          className={`mt-3 flex flex-wrap items-center justify-center gap-1.5 transition-all ${
            isExpanded ? "" : "h-7 overflow-hidden"
          }`}
        >
          {visibleCredentials.map((cred, idx) => (
            <span
              key={idx}
              className="rounded-md border border-border/80 bg-bg-alt px-2 py-0.5 text-[11px] font-medium text-text-light"
            >
              {cred}
            </span>
          ))}

          {!isExpanded && hiddenCount > 0 && (
            <span className="rounded-md border border-border/80 bg-bg-alt px-1.5 py-0.5 text-[11px] font-semibold text-primary">
              +{hiddenCount} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}

