import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { Inquiry } from "@/types";

interface InquiryCardProps {
  inquiry: Inquiry;
  onToggleRead: (inquiry: Inquiry) => void;
  onDelete: (id: string) => void;
}

export default function InquiryCard({
  inquiry,
  onToggleRead,
  onDelete,
}: InquiryCardProps) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        inquiry.read ? "border-border bg-bg" : "border-primary/30 bg-primary-light/30"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-text">{inquiry.name}</span>
            <Badge variant={inquiry.read ? "default" : "primary"}>
              {inquiry.read ? "Read" : "New"}
            </Badge>
            <Badge>{inquiry.category}</Badge>
          </div>
          <a
            href={`mailto:${inquiry.email}`}
            className="mt-0.5 text-sm text-primary hover:underline"
          >
            {inquiry.email}
          </a>
          <p className="mt-2 text-sm text-text-light whitespace-pre-wrap">
            {inquiry.message}
          </p>
          <p className="mt-2 text-xs text-text-light">
            {formatDate(inquiry.created_at)}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => onToggleRead(inquiry)}
            className="text-xs font-medium text-primary hover:underline"
          >
            {inquiry.read ? "Mark Unread" : "Mark Read"}
          </button>
          <button
            onClick={() => onDelete(inquiry.id)}
            className="text-xs font-medium text-text-light hover:text-primary hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
