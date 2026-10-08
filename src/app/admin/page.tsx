import { createClient } from "@/lib/supabase/server";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [events, posts, reports, inquiries] = await Promise.all([
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("reports").select("*", { count: "exact", head: true }),
    supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("read", false),
  ]);

  const stats = [
    { label: "Events", count: events.count || 0, href: "/admin/events" },
    { label: "Blog Posts", count: posts.count || 0, href: "/admin/posts" },
    { label: "Reports", count: reports.count || 0, href: "/admin/reports" },
    { label: "Unread Inquiries", count: inquiries.count || 0, href: "/admin/inquiries" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Dashboard</h1>
      <p className="mt-1 text-sm text-text-light">
        Overview of your site content and activity.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="text-center hover:border-primary">
              <p className="text-3xl font-bold text-primary">{stat.count}</p>
              <p className="mt-1 text-sm text-text-light">{stat.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-text">Quick Actions</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Link
            href="/admin/events/new"
            className="rounded-lg border border-border p-4 text-sm font-medium text-text-light transition-colors hover:border-primary hover:text-primary"
          >
            + Create Event
          </Link>
          <Link
            href="/admin/posts/new"
            className="rounded-lg border border-border p-4 text-sm font-medium text-text-light transition-colors hover:border-primary hover:text-primary"
          >
            + Write Blog Post
          </Link>
          <Link
            href="/admin/reports/new"
            className="rounded-lg border border-border p-4 text-sm font-medium text-text-light transition-colors hover:border-primary hover:text-primary"
          >
            + Upload Report
          </Link>
        </div>
      </div>
    </div>
  );
}
