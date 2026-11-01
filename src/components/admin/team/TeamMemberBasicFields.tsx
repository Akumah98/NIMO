"use client";

import type { TeamDepartment } from "@/types/team";
import { TeamDepartmentSelect } from "./TeamDepartmentSelect";

interface TeamMemberBasicFieldsProps {
  name: string;
  onNameChange: (v: string) => void;
  role: string;
  onRoleChange: (v: string) => void;
  department: string;
  departmentSlug: TeamDepartment;
  onDepartmentChange: (dept: string, slug: TeamDepartment) => void;
  location: string;
  onLocationChange: (v: string) => void;
}

export function TeamMemberBasicFields({
  name,
  onNameChange,
  role,
  onRoleChange,
  department,
  departmentSlug,
  onDepartmentChange,
  location,
  onLocationChange,
}: TeamMemberBasicFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">Full Name *</label>
        <input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          required
          placeholder="e.g. Dr. Sarah Mbella"
          className="min-h-11 rounded-lg border border-border bg-bg px-4 py-2 text-sm text-text focus:border-primary focus:outline-hidden"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">Role / Title *</label>
        <input
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          required
          placeholder="e.g. Executive Director & Founder"
          className="min-h-11 rounded-lg border border-border bg-bg px-4 py-2 text-sm text-text focus:border-primary focus:outline-hidden"
        />
      </div>

      <TeamDepartmentSelect
        department={department}
        departmentSlug={departmentSlug}
        onDepartmentChange={onDepartmentChange}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">Location *</label>
        <input
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          required
          placeholder="e.g. Mile 18 Junction, Buea"
          className="min-h-11 rounded-lg border border-border bg-bg px-4 py-2 text-sm text-text focus:border-primary focus:outline-hidden"
        />
      </div>
    </div>
  );
}
