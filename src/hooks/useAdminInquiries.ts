"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Inquiry } from "@/types";

export function useAdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadInquiries() {
    const supabase = createClient();
    const { data } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    setInquiries(data || []);
    setLoading(false);
  }

  useEffect(() => {
    let isMounted = true;
    const fetchInquiries = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (isMounted) {
        setInquiries(data || []);
        setLoading(false);
      }
    };
    fetchInquiries();
    return () => {
      isMounted = false;
    };
  }, []);

  async function toggleRead(inquiry: Inquiry) {
    const supabase = createClient();
    await supabase
      .from("inquiries")
      .update({ read: !inquiry.read })
      .eq("id", inquiry.id);
    await loadInquiries();
  }

  async function deleteInquiry(id: string) {
    const supabase = createClient();
    await supabase.from("inquiries").delete().eq("id", id);
    await loadInquiries();
  }

  const unreadCount = inquiries.filter((i) => !i.read).length;

  return { inquiries, loading, unreadCount, toggleRead, deleteInquiry };
}
