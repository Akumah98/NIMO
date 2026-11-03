"use client";

import DataTable from "@/components/admin/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { useAdminReports } from "@/hooks/useAdminReports";
import type { Report } from "@/types";

export default function AdminReportsPage() {
  const { reports, loading, deleteReport } = useAdminReports();

  async function handleDelete(report: Report) {
    if (!confirm(`Delete "${report.title}"?`)) return;
    await deleteReport(report.id);
  }

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (r: Report) => (
        <span className="font-medium text-text">{r.title}</span>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (r: Report) => <Badge>{r.category || "General"}</Badge>,
    },
    {
      key: "published_date",
      label: "Published",
      render: (r: Report) => (r.published_date ? formatDate(r.published_date) : "—"),
    },
    {
      key: "file_url",
      label: "Document File",
      render: (r: Report) => (
        <a
          href={r.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary-light px-2.5 py-1 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
        >
          <span>📄 View PDF</span>
        </a>
      ),
    },
  ];

  if (loading) return <p className="text-text-light">Loading reports...</p>;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Resources & Reports</h1>
          <p className="text-sm text-text-light">{reports.length} total publications & files</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Button variant="outline" href="/admin/media">
            📁 Media & Files Library
          </Button>
          <Button href="/admin/reports/new">+ Upload New Report</Button>
        </div>
      </div>

      <DataTable columns={columns} data={reports} onDelete={handleDelete} />
    </div>
  );
}
