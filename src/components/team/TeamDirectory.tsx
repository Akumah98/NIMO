"use client";

import { useState, useMemo } from "react";
import { TeamCategory, TeamDepartment, TeamMember } from "@/types/team";
import TeamCategoryTabs from "./TeamCategoryTabs";
import TeamMemberCard from "./TeamMemberCard";

interface Props {
  categories: TeamCategory[];
  members: TeamMember[];
}

export default function TeamDirectory({ categories, members }: Props) {
  const [activeCategory, setActiveCategory] = useState<TeamDepartment>("all");

  const categoriesWithCounts = useMemo(() => {
    return categories.map((cat) => {
      const count =
        cat.id === "all"
          ? members.length
          : members.filter((m) => m.departmentSlug === cat.id).length;
      return { ...cat, count };
    });
  }, [categories, members]);

  const filteredMembers = useMemo(() => {
    if (activeCategory === "all") return members;
    return members.filter((m) => m.departmentSlug === activeCategory);
  }, [activeCategory, members]);

  return (
    <section className="py-14 sm:py-18 bg-bg-alt/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-text sm:text-3xl">
            Meet Our Leadership &amp; Specialists
          </h2>
          <p className="mt-2 text-sm text-text-light">
            Filter by functional department to explore our multidisciplinary team:
          </p>
        </div>

        <div className="mt-8">
          <TeamCategoryTabs
            categories={categoriesWithCounts}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
