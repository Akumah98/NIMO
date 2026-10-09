"use client";

import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";
import MobileProgramsAccordion from "./MobileProgramsAccordion";
import MobileLanguageBar from "./MobileLanguageBar";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-bg/95 backdrop-blur-2xl p-6 shadow-2xl flex flex-col justify-between border-l border-border/60">
        <div>
          <div className="mb-6 flex items-center justify-between border-b border-border/40 pb-4">
            <span className="text-base font-bold uppercase tracking-wider text-primary">
              Navigation
            </span>
            <button
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full p-2 text-text-light hover:bg-bg-alt hover:text-text transition-colors"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              if (item.label === "Programs") {
                return (
                  <MobileProgramsAccordion key={item.href} onClose={onClose} />
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="min-h-[44px] flex items-center rounded-xl px-4 py-2.5 text-base font-semibold text-text transition-all hover:bg-primary-light hover:text-primary active:scale-[0.98]"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-border/40 space-y-3">
          <MobileLanguageBar />
          <Link
            href="/donate"
            onClick={onClose}
            className="min-h-[48px] flex items-center justify-center rounded-full bg-primary px-4 py-3 text-center text-base font-semibold text-white shadow-md transition-all hover:bg-primary-dark active:scale-[0.98]"
          >
            Support Our Work (Donate)
          </Link>
        </div>
      </div>
    </div>
  );
}
