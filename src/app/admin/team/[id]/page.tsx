"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTeamMemberById } from "@/lib/services/teamService";
import { TeamMemberForm } from "@/components/admin/team/TeamMemberForm";
import type { TeamMember } from "@/types/team";

export default function EditTeamMemberPage() {
  const params = useParams();
  const id = params?.id as string;
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      const data = await getTeamMemberById(id);
      setMember(data);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <p className="text-sm text-text-light">Loading profile...</p>;
  if (!member) return <p className="text-sm text-red-500">Team member not found.</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Edit Team Member</h1>
        <p className="mt-1 text-sm text-text-light">Updating profile for {member.name}</p>
      </div>

      <TeamMemberForm member={member} />
    </div>
  );
}
