"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import PostForm from "@/components/admin/PostForm";
import type { Post } from "@/types";

export default function EditPostPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", params.id)
        .single();
      setPost(data);
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) return <p className="text-text-light">Loading...</p>;
  if (!post) return <p className="text-red-500">Post not found.</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-text">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
