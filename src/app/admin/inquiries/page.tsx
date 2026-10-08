"use client";

import InquiryCard from "@/components/admin/InquiryCard";
import { useAdminInquiries } from "@/hooks/useAdminInquiries";
import type { Inquiry } from "@/types";

export default function AdminInquiriesPage() {
  const { inquiries, loading, unreadCount, toggleRead, deleteInquiry } =
    useAdminInquiries();

  async function handleDelete(id: string) {
    if (!confirm("Delete this inquiry?")) return;
    await deleteInquiry(id);
  }

  if (loading) return <p className="text-text-light">Loading...</p>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Inquiries</h1>
        <p className="text-sm text-text-light">
          {unreadCount} unread of {inquiries.length} total
        </p>
      </div>

      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <p className="text-center text-text-light">No inquiries yet.</p>
        ) : (
          inquiries.map((inquiry: Inquiry) => (
            <InquiryCard
              key={inquiry.id}
              inquiry={inquiry}
              onToggleRead={toggleRead}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
