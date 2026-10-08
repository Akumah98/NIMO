"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import ProgramsNavDropdown from "./ProgramsNavDropdown";

interface HeaderNavProps {
  isHomePage: boolean;
}

export default function HeaderNav({ isHomePage }: HeaderNavProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 lg:gap-2 md:flex">
      {NAV_ITEMS.map((item) => {
        if (item.label === "Programs") {
          return <ProgramsNavDropdown key={item.href} isHomePage={isHomePage} />;
        }
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`min-h-[44px] px-3.5 py-2 text-sm lg:text-base font-semibold rounded-full transition-all duration-200 inline-flex items-center ${
              isActive
                ? isHomePage
                  ? "bg-white/20 text-white shadow-xs backdrop-blur-md"
                  : "bg-primary-light text-primary"
                : isHomePage
                ? "text-gray-200 hover:text-white hover:bg-white/10"
                : "text-text hover:text-primary hover:bg-bg-alt"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
