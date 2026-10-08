"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { useAdminPosts } from "@/hooks/useAdminPosts";
import type { Post } from "@/types";

export default function AdminPostsPage() {
  const router = useRouter();
  const { posts, loading, deletePost } = useAdminPosts();

  async function handleDelete(post: Post) {
    if (!confirm(`Delete "${post.title}"?`)) return;
    await deletePost(post.id);
  }

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (p: Post) => (
        <span className="font-medium text-text">{p.title}</span>
      ),
    },
    {
      key: "author",
      label: "Author",
    },
    {
      key: "created_at",
      label: "Created",
      render: (p: Post) => formatDate(p.created_at),
    },
    {
      key: "published",
      label: "Status",
      render: (p: Post) => (
        <Badge variant={p.published ? "secondary" : "default"}>
          {p.published ? "Published" : "Draft"}
        </Badge>
      ),
    },
  ];

  if (loading) return <p className="text-text-light">Loading...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Blog Posts</h1>
          <p className="text-sm text-text-light">{posts.length} total posts</p>
        </div>
        <Button href="/admin/posts/new">+ New Post</Button>
      </div>

      <DataTable
        columns={columns}
        data={posts}
        onEdit={(p) => router.push(`/admin/posts/${p.id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
