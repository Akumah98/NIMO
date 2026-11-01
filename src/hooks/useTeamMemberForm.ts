"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveTeamMember } from "@/lib/services/teamService";
import type { TeamDepartment, TeamMember } from "@/types/team";

export function useTeamMemberForm(initial?: TeamMember | null) {
  const router = useRouter();
  const isEditing = !!initial;

  const [name, setName] = useState(initial?.name || "");
  const [role, setRole] = useState(initial?.role || "");
  const [department, setDepartment] = useState(initial?.department || "Executive Leadership");
  const [departmentSlug, setDepartmentSlug] = useState<TeamDepartment>(
    initial?.departmentSlug || "leadership"
  );
  const [location, setLocation] = useState(initial?.location || "Buea, Cameroon");
  const [image, setImage] = useState(initial?.image || "");
  const [bio, setBio] = useState(initial?.bio || "");
  const [credentialsInput, setCredentialsInput] = useState(
    initial?.credentials ? initial.credentials.join(", ") : ""
  );
  const [email, setEmail] = useState(initial?.email || "");
  const [linkedin, setLinkedin] = useState(initial?.linkedin || "");
  const [displayOrder, setDisplayOrder] = useState<number>(initial?.display_order ?? 0);
  const [visible, setVisible] = useState(initial?.visible ?? true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (departmentSlug === "other") {
      const trimmed = department.trim();
      if (!trimmed || trimmed.toLowerCase() === "other") {
        setError("Please enter a new position name for the department.");
        setSaving(false);
        return;
      }
    }

    const credentials = credentialsInput
      .split(/,|\n/)
      .map((c) => c.trim())
      .filter(Boolean);

    const payload: Partial<TeamMember> = {
      name,
      role,
      department,
      departmentSlug,
      location,
      image: image || undefined,
      bio,
      credentials,
      email: email || undefined,
      linkedin: linkedin || undefined,
      display_order: displayOrder,
      visible,
    };

    const res = await saveTeamMember(payload, initial?.id);
    if (res.error) {
      setError(res.error);
      setSaving(false);
      return;
    }

    router.push("/admin/team");
    router.refresh();
  }

  return {
    isEditing,
    name, setName,
    role, setRole,
    department, setDepartment,
    departmentSlug, setDepartmentSlug,
    location, setLocation,
    image, setImage,
    bio, setBio,
    credentialsInput, setCredentialsInput,
    email, setEmail,
    linkedin, setLinkedin,
    displayOrder, setDisplayOrder,
    visible, setVisible,
    saving,
    error,
    handleSubmit,
  };
}
