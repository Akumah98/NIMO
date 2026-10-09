"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SITE_NAME } from "@/lib/constants";
import { AdminNavLinks } from "./AdminNavLinks";

export default function AdminSidebar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const navContent = (
    <>
      <div className="flex items-center justify-between border-b border-border p-4">
        <Link href="/admin" className="text-lg font-bold text-primary">
          {SITE_NAME} <span className="text-sm font-normal text-text-light">Admin</span>
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          className="flex h-11 w-11 items-center justify-center rounded-md p-1.5 text-text-light hover:text-primary md:hidden"
          aria-label="Close admin menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <AdminNavLinks onItemClick={() => setMobileOpen(false)} />

      <div className="border-t border-border p-3">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="mb-1 flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-light hover:bg-bg hover:text-text"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className="flex h-14 items-center justify-between border-b border-border bg-bg-alt px-4 md:hidden">
        <Link href="/admin" className="text-base font-bold text-primary">
          {SITE_NAME} <span className="text-xs font-normal text-text-light">Admin</span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-border p-2 text-text-light hover:text-primary"
          aria-label="Open admin menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 flex w-72 flex-col bg-bg-alt shadow-2xl">
            {navContent}
          </aside>
        </div>
      )}

      <aside className="hidden h-full w-64 flex-col border-r border-border bg-bg-alt md:flex">
        {navContent}
      </aside>
    </>
  );
}
