export type TeamDepartment =
  | "all"
  | "leadership"
  | "protection"
  | "education"
  | "gbv"
  | "research";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  departmentSlug: TeamDepartment;
  location: string;
  image?: string;
  bio: string;
  credentials: string[];
  email?: string;
  linkedin?: string;
}

export interface TeamCategory {
  id: TeamDepartment;
  label: string;
  count?: number;
}

export interface TeamMetric {
  value: string;
  label: string;
  description: string;
}

export interface TeamValue {
  title: string;
  badge: string;
  description: string;
  icon: string;
}

export interface TeamVoiceQuote {
  quote: string;
  author: string;
  role: string;
  location: string;
  image: string;
}

export interface TeamActionSnapshot {
  image: string;
  title: string;
  caption: string;
}
