import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import PostCard from "@/components/blog/PostCard";
import Pagination from "@/components/ui/Pagination";
import { POSTS_PER_PAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "News, announcements, and articles from NIMO Association.",
};

export const revalidate = 60;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const offset = (page - 1) * POSTS_PER_PAGE;

  const supabase = await createClient();
  const { data: posts, count } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + POSTS_PER_PAGE - 1);

  const totalPages = Math.ceil((count || 0) / POSTS_PER_PAGE);

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text sm:text-4xl">News &amp; Updates</h1>
          <p className="mt-2 text-text-light">
            News, announcements, and articles from our team.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts && posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="col-span-full text-center text-text-light">
              No posts yet. Check back soon!
            </p>
          )}
        </div>

        <div className="mt-12">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath="/blog"
          />
        </div>
      </div>
    </div>
  );
}
