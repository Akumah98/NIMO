import Image from "next/image";
import { TeamMember } from "@/types/team";

interface Props {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: Props) {
  const subject = encodeURIComponent(`Inquiry for ${member.name} (${member.role}) - NIMO`);
  const body = encodeURIComponent(
    `Hello NIMO Team,\n\nI would like to connect with ${member.name} (${member.role}, ${member.department}) regarding...\n\nBest regards,\n[Your Name]`
  );
  const mailtoUrl = `mailto:${member.email || "contact@nimo.africa"}?subject=${subject}&body=${body}`;

  return (
    <div className="group flex flex-col justify-between rounded-3xl border border-border/80 bg-bg p-6 sm:p-7 shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl">
      <div>
        <div className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-full border-2 border-primary/30 bg-primary-light/40 ring-4 ring-primary/10 shadow-md transition-all duration-300 group-hover:ring-primary/25 group-hover:scale-105">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="128px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-3xl font-black text-primary">
              {member.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="mt-5 text-center">
          <span className="inline-block rounded-full bg-primary-light px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
            {member.department}
          </span>

          <h3 className="mt-2.5 text-lg sm:text-xl font-bold text-text group-hover:text-primary transition-colors">
            {member.name}
          </h3>
          <p className="mt-0.5 text-sm font-semibold text-primary">{member.role}</p>

          <div className="mt-2 flex items-center justify-center text-xs text-text-light">
            <svg className="mr-1.5 h-3.5 w-3.5 shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{member.location}</span>
          </div>

          <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-text-light">
            {member.bio}
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {member.credentials.map((cred, idx) => (
              <span
                key={idx}
                className="rounded-md border border-border/80 bg-bg-alt px-2 py-0.5 text-[11px] font-medium text-text-light"
              >
                {cred}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-border/60 pt-4 text-center">
        <a
          href={mailtoUrl}
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary-light hover:text-primary-dark"
          aria-label={`Send inquiry regarding ${member.name}`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Connect with {member.name.split(" ")[0]}</span>
        </a>
      </div>
    </div>
  );
}
