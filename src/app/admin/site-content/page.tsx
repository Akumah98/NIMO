"use client";

import Button from "@/components/ui/Button";
import SiteContentField from "@/components/admin/SiteContentField";
import siteContentFields from "@/data/siteContentFields.json";
import { useAdminSiteContent } from "@/hooks/useAdminSiteContent";

interface ContentField {
  key: string;
  label: string;
  type: string;
}

const CONTENT_KEYS = siteContentFields as ContentField[];

export default function AdminSiteContentPage() {
  const { content, loading, saving, saved, updateField, saveContent } =
    useAdminSiteContent();

  if (loading) return <p className="text-text-light">Loading...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Site Content</h1>
          <p className="text-sm text-text-light">
            Edit the text that appears on your public pages.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-secondary">Saved!</span>}
          <Button onClick={() => saveContent(CONTENT_KEYS)} disabled={saving}>
            {saving ? "Saving..." : "Save All"}
          </Button>
        </div>
      </div>

      <div className="max-w-3xl space-y-6">
        {CONTENT_KEYS.map(({ key, label, type }) => (
          <SiteContentField
            key={key}
            fieldKey={key}
            label={label}
            type={type}
            value={content[key] || ""}
            onChange={updateField}
          />
        ))}
      </div>
    </div>
  );
}
