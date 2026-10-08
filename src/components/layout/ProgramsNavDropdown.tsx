"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import programsNavData from "@/data/programsNavigation.json";
import { ProgramNavItem } from "@/types";

interface Props {
  isHomePage: boolean;
}

export default function ProgramsNavDropdown({ isHomePage }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const isProgramsActive = pathname.startsWith("/programs");
  const items = programsNavData as ProgramNavItem[];

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pillClass = isProgramsActive
    ? isHomePage
      ? "bg-white/20 text-white shadow-xs backdrop-blur-md"
      : "bg-primary-light text-primary"
    : isHomePage
    ? "text-gray-200 hover:text-white hover:bg-white/10"
    : "text-text hover:text-primary hover:bg-bg-alt";

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href="/programs"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`min-h-[44px] px-3.5 py-2 text-sm lg:text-base font-semibold rounded-full transition-all duration-200 inline-flex items-center gap-1.5 ${pillClass}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>Programs</span>
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ease-in-out ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>

      <div
        className={`absolute top-full left-0 pt-2 z-50 min-w-[220px] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "visible opacity-100 scale-100 translate-y-0"
            : "invisible opacity-0 scale-95 -translate-y-1 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-bg/95 p-1.5 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-0.5">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center rounded-xl px-3.5 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-primary-light/70 hover:text-primary"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
