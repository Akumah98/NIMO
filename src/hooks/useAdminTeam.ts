"use client";

import { useEffect, useState, useTransition } from "react";
import {
  fetchAdminTeamMembers,
  deleteTeamMember,
  saveTeamMember,
} from "@/lib/services/teamService";
import type { TeamDepartment, TeamMember } from "@/types/team";

export function useAdminTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDept, setFilterDept] = useState<TeamDepartment>("all");
  const [, startTransition] = useTransition();

  async function loadMembers() {
    const data = await fetchAdminTeamMembers();
    setMembers(data);
    setLoading(false);
  }

  useEffect(() => {
    let isMounted = true;
    const fetchMembers = async () => {
      const data = await fetchAdminTeamMembers();
      if (isMounted) {
        setMembers(data || []);
        setLoading(false);
      }
    };
    fetchMembers();
    return () => {
      isMounted = false;
    };
  }, []);

  async function removeMember(member: TeamMember) {
    if (!confirm(`Are you sure you want to delete ${member.name}?`)) return;
    const { success, error } = await deleteTeamMember(member.id);
    if (!success) {
      alert(error || "Failed to delete team member");
      return;
    }
    startTransition(() => {
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
    });
  }

  async function toggleVisibility(member: TeamMember) {
    const nextVal = !member.visible;
    const { data, error } = await saveTeamMember({ visible: nextVal }, member.id);
    if (error) {
      alert(error);
      return;
    }
    if (data) {
      setMembers((prev) => prev.map((m) => (m.id === member.id ? { ...m, visible: nextVal } : m)));
    }
  }

  const filteredMembers =
    filterDept === "all"
      ? members
      : members.filter((m) => m.departmentSlug === filterDept);

  return {
    members: filteredMembers,
    totalCount: members.length,
    loading,
    filterDept,
    setFilterDept,
    reload: loadMembers,
    removeMember,
    toggleVisibility,
  };
}
