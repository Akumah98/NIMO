export interface Event {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  cover_image: string | null;
  images: string[];
  category: "recent" | "outreach" | "other";
  published: boolean;
  event_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  cover_image: string | null;
  tags: string[];
  published: boolean;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  file_url: string;
  cover_image: string | null;
  category: string | null;
  published: boolean;
  published_date: string | null;
  created_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  category: "general" | "partnership" | "media" | "volunteering";
  read: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author_name: string;
  author_role: string | null;
  visible: boolean;
  display_order: number;
  created_at: string;
}

export interface SiteContent {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Partner {
  name: string;
  category: string;
  role: string;
  logo: string;
  website?: string;
}

export interface ProgramNavItem {
  id: string;
  title: string;
  href: string;
  badge: string;
  description: string;
}

export type { LanguageItem } from "./translation";
export type { MediaItem } from "./media";
