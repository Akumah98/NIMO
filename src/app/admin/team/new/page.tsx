import { TeamMemberForm } from "@/components/admin/team/TeamMemberForm";

export default function NewTeamMemberPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Add Team Member</h1>
        <p className="mt-1 text-sm text-text-light">
          Create a new staff, specialist, or leadership profile for the public directory.
        </p>
      </div>

      <TeamMemberForm />
    </div>
  );
}
