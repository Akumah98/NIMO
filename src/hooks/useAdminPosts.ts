"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Post } from "@/types";

export function useAdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPosts() {
    const supabase = createClient();
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  }

  useEffect(() => {
    let isMounted = true;
    const fetchPosts = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (isMounted) {
        setPosts(data || []);
        setLoading(false);
      }
    };
    fetchPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  async function deletePost(id: string) {
    const supabase = createClient();
    await supabase.from("posts").delete().eq("id", id);
    await loadPosts();
  }

  return { posts, loading, reload: loadPosts, deletePost };
}
