"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SITE_NAME } from "@/lib/constants";
import MobileNav from "./MobileNav";
import HeaderNav from "./HeaderNav";
import HeaderActions from "./HeaderActions";
import CollapsibleSearch from "./CollapsibleSearch";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHeroOverlay = pathname === "/" || pathname === "/team" || pathname === "/about";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerPositionClass = isHeroOverlay
    ? "fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    : "sticky top-0 z-50 transition-all duration-300";

  const headerBgClass = isHeroOverlay
    ? scrolled
      ? "bg-slate-950/85 backdrop-blur-xl shadow-lg border-b border-white/10"
      : "bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-transparent"
    : "border-b border-border/60 bg-bg/85 backdrop-blur-xl";

  const mobileIconClass = isHeroOverlay
    ? "text-gray-100 hover:text-white"
    : "text-text hover:text-primary";

  return (
    <header className={`${headerPositionClass} ${headerBgClass}`}>
      <div className="mx-auto flex h-20 sm:h-22 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 py-1 shrink-0">
          <Image
            src="/logo.png"
            alt={SITE_NAME}
            width={240}
            height={80}
            className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
            priority
          />
        </Link>

        <HeaderNav isHomePage={isHeroOverlay} />
        <HeaderActions />

        <div className="flex items-center gap-2 md:hidden">
          <CollapsibleSearch />
          <button
            onClick={() => setMobileOpen(true)}
            className={`min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl p-2.5 transition-colors ${mobileIconClass}`}
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
