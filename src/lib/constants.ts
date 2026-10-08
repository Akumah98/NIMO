import { NavItem } from "@/types";

export const SITE_NAME = "NIMO";
export const SITE_TAGLINE = "Care With Wisdom";
export const SITE_DESCRIPTION =
  "Development, Research and Cooperation for Better Communities";
export const SITE_URL = "https://nimo.africa";

export const CONTACT_INFO = {
  address: "Mile 18 Junction, Buea, Southwest Region, Cameroon",
  phone: "+237 650 010 984",
  email: "contact@nimo.africa",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Team", href: "/team" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Resources & Reports", href: "/reports" },
];

export const EVENTS_PER_PAGE = 6;
export const POSTS_PER_PAGE = 6;
