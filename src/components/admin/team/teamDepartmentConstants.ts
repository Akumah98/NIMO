import type { TeamDepartment } from "@/types/team";

export interface DepartmentOption {
  label: string;
  slug: TeamDepartment;
}

export const STANDARD_DEPARTMENTS: DepartmentOption[] = [
  { label: "Executive Leadership", slug: "leadership" },
  { label: "Child Protection & Wellbeing", slug: "protection" },
  { label: "Education & Development", slug: "education" },
  { label: "Gender & Protection", slug: "gbv" },
  { label: "Research & Monitoring", slug: "research" },
];

export const OTHER_DEPARTMENT_LABEL = "Other";
export const OTHER_DEPARTMENT_SLUG: TeamDepartment = "other";

export const ADMIN_DEPARTMENTS: { id: TeamDepartment; label: string }[] = [
  { id: "all", label: "All" },
  { id: "leadership", label: "Leadership" },
  { id: "protection", label: "Child Protection" },
  { id: "education", label: "Education" },
  { id: "gbv", label: "GBV & Care" },
  { id: "research", label: "Research & M&E" },
  { id: "other", label: "Other" },
];

