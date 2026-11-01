"use client";

import ImageUploader from "@/components/admin/ImageUploader";
import { FormActionButtons } from "@/components/admin/FormActionButtons";
import { TeamMemberBasicFields } from "./TeamMemberBasicFields";
import { TeamMemberDetailsFields } from "./TeamMemberDetailsFields";
import { TeamMemberContactFields } from "./TeamMemberContactFields";
import { useTeamMemberForm } from "@/hooks/useTeamMemberForm";
import type { TeamMember } from "@/types/team";

interface TeamMemberFormProps {
  member?: TeamMember | null;
}

export function TeamMemberForm({ member }: TeamMemberFormProps) {
  const {
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
  } = useTeamMemberForm(member);

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <TeamMemberBasicFields
        name={name}
        onNameChange={setName}
        role={role}
        onRoleChange={setRole}
        department={department}
        departmentSlug={departmentSlug}
        onDepartmentChange={(dept, slug) => {
          setDepartment(dept);
          setDepartmentSlug(slug);
        }}
        location={location}
        onLocationChange={setLocation}
      />

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-text">Profile Photograph</label>
        <ImageUploader bucket="media" currentImage={image} onUpload={setImage} />
      </div>

      <TeamMemberDetailsFields
        bio={bio}
        onBioChange={setBio}
        credentialsInput={credentialsInput}
        onCredentialsChange={setCredentialsInput}
      />

      <TeamMemberContactFields
        email={email}
        onEmailChange={setEmail}
        linkedin={linkedin}
        onLinkedinChange={setLinkedin}
        displayOrder={displayOrder}
        onDisplayOrderChange={setDisplayOrder}
        visible={visible}
        onVisibleChange={setVisible}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <FormActionButtons
        saving={saving}
        isEditing={isEditing}
        cancelHref="/admin/team"
        createLabel="Add Member"
        updateLabel="Save Changes"
      />
    </form>
  );
}
