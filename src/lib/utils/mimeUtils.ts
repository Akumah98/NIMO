import { slugify } from "@/lib/utils";

export function resolveMimeType(fileName: string, type?: string): string {
  if (type) return type;
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return "application/pdf";
  if (ext === "doc" || ext === "docx") return "application/msword";
  if (ext === "xls" || ext === "xlsx") return "application/vnd.ms-excel";
  return "image/jpeg";
}

export function buildStoragePath(category: string, fileName: string): string {
  const ext = fileName.split(".").pop() || "";
  const cleanName = slugify(fileName.replace(/\.[^/.]+$/, ""));
  return `${category}/${Date.now()}-${cleanName}.${ext}`;
}

