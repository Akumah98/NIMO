"use client";

import Button from "@/components/ui/Button";
import { useReportForm } from "@/hooks/useReportForm";

export default function ReportForm() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    category,
    setCategory,
    publishedDate,
    setPublishedDate,
    setFile,
    saving,
    error,
    handleSubmit,
  } = useReportForm();

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="min-h-11 rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-hidden"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Brief summary of this document..."
          className="rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-hidden"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="min-h-11 rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-hidden"
          >
            <option value="research">Research</option>
            <option value="annual-report">Annual Report</option>
            <option value="policy">Policy Brief</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">Publication Date</label>
          <input
            type="date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            className="min-h-11 rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-hidden"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">PDF File</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm file:mr-4 file:rounded file:border-0 file:bg-primary-light file:px-3 file:py-1 file:text-sm file:font-medium file:text-primary"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Uploading..." : "Upload Report"}
        </Button>
        <Button variant="outline" href="/admin/reports">
          Cancel
        </Button>
      </div>
    </form>
  );
}
