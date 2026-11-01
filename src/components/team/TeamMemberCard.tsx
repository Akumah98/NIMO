"use client";

import { useState } from "react";
import type { TeamMember } from "@/types/team";
import { TeamMemberCardHeader } from "./TeamMemberCardHeader";
import { TeamMemberCardContent } from "./TeamMemberCardContent";
import { TeamMemberCardFooter } from "./TeamMemberCardFooter";

interface Props {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <article
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={`group flex flex-col justify-between rounded-3xl border bg-bg p-5 sm:p-6 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
        isExpanded
          ? "border-primary/50 shadow-md ring-2 ring-primary/20"
          : "border-border/80 hover:border-primary/40"
      }`}
    >
      <div>
        <TeamMemberCardHeader member={member} />
        <TeamMemberCardContent member={member} isExpanded={isExpanded} />
      </div>

      <TeamMemberCardFooter
        member={member}
        isExpanded={isExpanded}
        onToggle={handleToggle}
      />
    </article>
  );
}
