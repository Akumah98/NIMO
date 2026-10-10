import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";

export default function FooterNav() {
  const midpoint = Math.ceil(NAV_ITEMS.length / 2);
  const leftCol = NAV_ITEMS.slice(0, midpoint);
  const rightCol = NAV_ITEMS.slice(midpoint);

  return (
    <div className="md:col-span-4">
      <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
        Navigation
      </h4>
      <nav className="mt-3 grid grid-cols-2 gap-x-4 sm:gap-x-6">
        <div className="flex flex-col gap-1 sm:gap-1.5">
          {leftCol.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-[44px] items-center text-sm text-gray-400 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-1 sm:gap-1.5">
          {rightCol.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-[44px] items-center text-sm text-gray-400 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
