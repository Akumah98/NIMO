import type { TeamMember } from "@/types/team";

export function mapDbToMember(row: Record<string, unknown>): TeamMember {
  return {
    id: String(row.id),
    name: String(row.name || ""),
    role: String(row.role || ""),
    department: String(row.department || ""),
    departmentSlug: (row.department_slug || row.departmentSlug || "leadership") as TeamMember["departmentSlug"],
    location: String(row.location || "Buea, Cameroon"),
    image: row.image ? String(row.image) : undefined,
    bio: String(row.bio || ""),
    credentials: Array.isArray(row.credentials) ? (row.credentials as string[]) : [],
    email: row.email ? String(row.email) : undefined,
    linkedin: row.linkedin ? String(row.linkedin) : undefined,
    display_order: Number(row.display_order ?? 0),
    visible: Boolean(row.visible ?? true),
    created_at: row.created_at ? String(row.created_at) : undefined,
    updated_at: row.updated_at ? String(row.updated_at) : undefined,
  };
}

export function mapMemberToDb(m: Partial<TeamMember>): Record<string, unknown> {
  const out: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (m.name !== undefined) out.name = m.name;
  if (m.role !== undefined) out.role = m.role;
  if (m.department !== undefined) out.department = m.department;
  if (m.departmentSlug !== undefined) out.department_slug = m.departmentSlug;
  if (m.location !== undefined) out.location = m.location;
  if (m.image !== undefined) out.image = m.image;
  if (m.bio !== undefined) out.bio = m.bio;
  if (m.credentials !== undefined) out.credentials = m.credentials;
  if (m.email !== undefined) out.email = m.email;
  if (m.linkedin !== undefined) out.linkedin = m.linkedin;
  if (m.display_order !== undefined) out.display_order = m.display_order;
  if (m.visible !== undefined) out.visible = m.visible;
  return out;
}
