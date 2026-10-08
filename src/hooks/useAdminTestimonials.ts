"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Testimonial } from "@/types";

export function useAdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTestimonials() {
    const supabase = createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });
    setTestimonials(data || []);
    setLoading(false);
  }

  useEffect(() => {
    let isMounted = true;
    const fetchTestimonials = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .order("display_order", { ascending: true });
      if (isMounted) {
        setTestimonials(data || []);
        setLoading(false);
      }
    };
    fetchTestimonials();
    return () => {
      isMounted = false;
    };
  }, []);

  async function saveTestimonial(
    quote: string,
    authorName: string,
    editingId?: string | null
  ) {
    const supabase = createClient();
    if (editingId) {
      await supabase
        .from("testimonials")
        .update({ quote, author_name: authorName })
        .eq("id", editingId);
    } else {
      await supabase.from("testimonials").insert({
        quote,
        author_name: authorName,
        display_order: testimonials.length,
        visible: true,
      });
    }
    await loadTestimonials();
  }

  async function toggleVisibility(t: Testimonial) {
    const supabase = createClient();
    await supabase
      .from("testimonials")
      .update({ visible: !t.visible })
      .eq("id", t.id);
    await loadTestimonials();
  }

  async function deleteTestimonial(id: string) {
    const supabase = createClient();
    await supabase.from("testimonials").delete().eq("id", id);
    await loadTestimonials();
  }

  return {
    testimonials,
    loading,
    saveTestimonial,
    toggleVisibility,
    deleteTestimonial,
  };
}
