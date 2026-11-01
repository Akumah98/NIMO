import type { TeamMember } from "@/types/team";

interface TeamMemberCardFooterProps {
  member: TeamMember;
  isExpanded: boolean;
  onToggle: () => void;
}

export function TeamMemberCardFooter({
  member,
  isExpanded,
  onToggle,
}: TeamMemberCardFooterProps) {
  const subject = encodeURIComponent(`Inquiry for ${member.name} (${member.role}) - NIMO`);
  const body = encodeURIComponent(
    `Hello NIMO Team,\n\nI would like to connect with ${member.name} (${member.role}, ${member.department}) regarding...\n\nBest regards,\n[Your Name]`
  );
  const mailtoUrl = `mailto:${member.email || "contact@nimo.africa"}?subject=${subject}&body=${body}`;

  return (
    <div className="mt-5 border-t border-border/60 pt-3 flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-expanded={isExpanded}
        className="inline-flex min-h-11 items-center justify-center gap-1 text-xs font-semibold text-text-light hover:text-primary transition-colors cursor-pointer"
      >
        <span>{isExpanded ? "Show Less" : "Read Full Profile"}</span>
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <a
        href={mailtoUrl}
        onClick={(e) => e.stopPropagation()}
        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-semibold text-primary hover:bg-primary-light hover:text-primary-dark transition-colors"
        aria-label={`Send inquiry regarding ${member.name}`}
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span>Connect with {member.name.split(" ")[0]}</span>
      </a>
    </div>
  );
}

