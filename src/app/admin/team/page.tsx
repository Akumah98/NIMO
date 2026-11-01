"use client";

import Button from "@/components/ui/Button";
import { TeamDepartmentTabs } from "@/components/admin/team/TeamDepartmentTabs";
import { TeamMemberTable } from "@/components/admin/team/TeamMemberTable";
import { useAdminTeam } from "@/hooks/useAdminTeam";

export default function AdminTeamPage() {
  const {
    members,
    totalCount,
    loading,
    filterDept,
    setFilterDept,
    removeMember,
    toggleVisibility,
  } = useAdminTeam();

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-text-light">
        Loading team members...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Team Members</h1>
          <p className="mt-1 text-sm text-text-light">
            Manage field coordinators, specialists, and executive leadership ({totalCount} total)
          </p>
        </div>
        <Button href="/admin/team/new">+ Add Team Member</Button>
      </div>

      <TeamDepartmentTabs
        activeDept={filterDept}
        onSelect={setFilterDept}
      />

      <TeamMemberTable
        members={members}
        onDelete={removeMember}
        onToggleVisibility={toggleVisibility}
      />
    </div>
  );
}
