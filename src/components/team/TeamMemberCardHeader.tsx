import Image from "next/image";
import type { TeamMember } from "@/types/team";

interface TeamMemberCardHeaderProps {
  member: TeamMember;
}

export function TeamMemberCardHeader({ member }: TeamMemberCardHeaderProps) {
  return (
    <div className="text-center">
      <div className="relative mx-auto h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border-2 border-primary/30 bg-primary-light/40 ring-4 ring-primary/10 shadow-md transition-all duration-300 group-hover:ring-primary/25 group-hover:scale-105">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl font-black text-primary">
            {member.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="mt-4">
        <span className="inline-block max-w-[220px] truncate rounded-full bg-primary-light px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
          {member.department}
        </span>

        <h3 className="mt-2 text-lg sm:text-xl font-bold text-text group-hover:text-primary transition-colors line-clamp-1">
          {member.name}
        </h3>
        <p className="mt-0.5 text-xs sm:text-sm font-semibold text-primary line-clamp-1">
          {member.role}
        </p>

        <div className="mt-1.5 flex items-center justify-center text-xs text-text-light">
          <svg className="mr-1.5 h-3.5 w-3.5 shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{member.location}</span>
        </div>
      </div>
    </div>
  );
}

