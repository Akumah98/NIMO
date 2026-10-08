"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TestimonialCard from "@/components/admin/TestimonialCard";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { useAdminTestimonials } from "@/hooks/useAdminTestimonials";
import type { Testimonial } from "@/types";

export default function AdminTestimonialsPage() {
  const {
    testimonials,
    loading,
    saveTestimonial,
    toggleVisibility,
    deleteTestimonial,
  } = useAdminTestimonials();

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  function startEdit(t: Testimonial) {
    setEditingItem(t);
    setShowForm(true);
  }

  function resetForm() {
    setEditingItem(null);
    setShowForm(false);
  }

  async function handleSave(
    quote: string,
    author: string,
    editingId?: string | null
  ) {
    await saveTestimonial(quote, author, editingId);
    resetForm();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await deleteTestimonial(id);
  }

  if (loading) return <p className="text-text-light">Loading...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Testimonials</h1>
          <p className="text-sm text-text-light">{testimonials.length} testimonials</p>
        </div>
        <Button onClick={() => setShowForm(true)}>+ Add Testimonial</Button>
      </div>

      {showForm && (
        <TestimonialForm
          initialQuote={editingItem?.quote || ""}
          initialAuthor={editingItem?.author_name || "Community Member"}
          editingId={editingItem?.id || null}
          onSave={handleSave}
          onCancel={resetForm}
        />
      )}

      <div className="space-y-3">
        {testimonials.map((t) => (
          <TestimonialCard
            key={t.id}
            testimonial={t}
            onEdit={startEdit}
            onToggleVisibility={toggleVisibility}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
