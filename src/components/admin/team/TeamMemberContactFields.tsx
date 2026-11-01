"use client";

interface TeamMemberContactFieldsProps {
  email: string;
  onEmailChange: (v: string) => void;
  linkedin: string;
  onLinkedinChange: (v: string) => void;
  displayOrder: number;
  onDisplayOrderChange: (v: number) => void;
  visible: boolean;
  onVisibleChange: (v: boolean) => void;
}

export function TeamMemberContactFields({
  email,
  onEmailChange,
  linkedin,
  onLinkedinChange,
  displayOrder,
  onDisplayOrderChange,
  visible,
  onVisibleChange,
}: TeamMemberContactFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="contact@nimo.africa"
            className="min-h-11 rounded-lg border border-border bg-bg px-4 py-2 text-sm text-text focus:border-primary focus:outline-hidden"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">LinkedIn Profile URL</label>
          <input
            type="url"
            value={linkedin}
            onChange={(e) => onLinkedinChange(e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="min-h-11 rounded-lg border border-border bg-bg px-4 py-2 text-sm text-text focus:border-primary focus:outline-hidden"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-bg-alt p-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-text">Display Order:</label>
          <input
            type="number"
            min={0}
            value={displayOrder}
            onChange={(e) => onDisplayOrderChange(Number(e.target.value))}
            className="h-10 w-20 rounded-md border border-border bg-bg px-2.5 text-center text-sm font-mono text-text focus:border-primary focus:outline-hidden"
          />
          <span className="text-xs text-text-light">(Lower values appear first)</span>
        </div>

        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 text-sm font-medium text-text">
          <input
            type="checkbox"
            checked={visible}
            onChange={(e) => onVisibleChange(e.target.checked)}
            className="h-4 w-4 rounded-sm border-border text-primary focus:ring-primary"
          />
          Visible on Public Website
        </label>
      </div>
    </div>
  );
}
