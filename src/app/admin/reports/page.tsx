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
      render: (r: Report) => <Badge>{r.category || "—"}</Badge>,
    },
    {
      key: "published_date",
      label: "Published",
      render: (r: Report) => (r.published_date ? formatDate(r.published_date) : "—"),
    },
    {
      key: "file_url",
      label: "File",
      render: (r: Report) => (
        <a
          href={r.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline"
        >
          View PDF
        </a>
      ),
    },
  ];

  if (loading) return <p className="text-text-light">Loading...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Reports & Documents</h1>
          <p className="text-sm text-text-light">{reports.length} total reports</p>
        </div>
        <Button href="/admin/reports/new">+ Upload Report</Button>
      </div>

      <DataTable columns={columns} data={reports} onDelete={handleDelete} />
    </div>
  );
}
