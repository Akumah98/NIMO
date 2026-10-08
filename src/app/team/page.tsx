import type { Metadata } from "next";
import teamData from "@/data/teamData.json";
import { TeamCategory, TeamDepartment, TeamMember } from "@/types/team";
import TeamHero from "@/components/team/TeamHero";
import TeamValuesBar from "@/components/team/TeamValuesBar";
import TeamDirectory from "@/components/team/TeamDirectory";
import TeamVoicesSection from "@/components/team/TeamVoicesSection";
import TeamActionGallery from "@/components/team/TeamActionGallery";

export const metadata: Metadata = {
  title: "Our Team | NIMO - People Behind the Mission",
  description:
    "Meet the dedicated team, researchers, protection specialists, and community leaders driving NIMO's mission across the South West Region of Cameroon.",
};

export const revalidate = 60;

export default function TeamPage() {
  const categories = teamData.categories.map((c) => ({
    ...c,
    id: c.id as TeamDepartment,
  })) as TeamCategory[];

  const members = teamData.members.map((m) => ({
    ...m,
    departmentSlug: m.departmentSlug as TeamDepartment,
  })) as TeamMember[];

  return (
    <main className="min-h-dvh bg-bg">
      <TeamHero
        title={teamData.hero.title}
        subtitle={teamData.hero.subtitle}
      />

      <TeamValuesBar principles={teamData.principles} />

      <TeamDirectory categories={categories} members={members} />

      <TeamVoicesSection voices={teamData.fieldVoices} />

      <TeamActionGallery snapshots={teamData.actionSnapshots} />
    </main>
  );
}
