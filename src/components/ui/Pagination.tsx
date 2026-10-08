import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-light transition-colors hover:border-primary hover:text-primary"
        >
          Previous
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-primary text-white"
              : "border border-border text-text-light hover:border-primary hover:text-primary"
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-light transition-colors hover:border-primary hover:text-primary"
        >
          Next
        </Link>
      )}
    </div>
  );
}
