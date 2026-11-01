"use client";

interface TeamMemberDetailsFieldsProps {
  bio: string;
  onBioChange: (v: string) => void;
  credentialsInput: string;
  onCredentialsChange: (v: string) => void;
}

export function TeamMemberDetailsFields({
  bio,
  onBioChange,
  credentialsInput,
  onCredentialsChange,
}: TeamMemberDetailsFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">Biography / Overview</label>
        <textarea
          rows={3}
          value={bio}
          onChange={(e) => onBioChange(e.target.value)}
          placeholder="Detailed field experience, community leadership background, or programmatic focus..."
          className="rounded-lg border border-border bg-bg p-3 text-sm text-text focus:border-primary focus:outline-hidden"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-text">Credentials & Specializations</label>
          <span className="text-xs text-text-light">Separated by commas</span>
        </div>
        <input
          value={credentialsInput}
          onChange={(e) => onCredentialsChange(e.target.value)}
          placeholder="e.g. Humanitarian Leadership, PSEA Focal Point, Case Management"
          className="min-h-11 rounded-lg border border-border bg-bg px-4 py-2 text-sm text-text focus:border-primary focus:outline-hidden"
        />
      </div>
    </div>
  );
}
