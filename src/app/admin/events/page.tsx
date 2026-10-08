"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { useAdminEvents } from "@/hooks/useAdminEvents";
import type { Event } from "@/types";

export default function AdminEventsPage() {
  const router = useRouter();
  const { events, loading, deleteEvent } = useAdminEvents();

  async function handleDelete(event: Event) {
    if (!confirm(`Delete "${event.title}"?`)) return;
    await deleteEvent(event.id);
  }

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (e: Event) => (
        <span className="font-medium text-text">{e.title}</span>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (e: Event) => <Badge variant="primary">{e.category}</Badge>,
    },
    {
      key: "event_date",
      label: "Date",
      render: (e: Event) => (e.event_date ? formatDate(e.event_date) : "—"),
    },
    {
      key: "published",
      label: "Status",
      render: (e: Event) => (
        <Badge variant={e.published ? "secondary" : "default"}>
          {e.published ? "Published" : "Draft"}
        </Badge>
      ),
    },
  ];

  if (loading) return <p className="text-text-light">Loading...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Events</h1>
          <p className="text-sm text-text-light">{events.length} total events</p>
        </div>
        <Button href="/admin/events/new">+ New Event</Button>
      </div>

      <DataTable
        columns={columns}
        data={events}
        onEdit={(e) => router.push(`/admin/events/${e.id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
