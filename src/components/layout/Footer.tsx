import Image from "next/image";
import Link from "next/link";
import { CONTACT_INFO, NAV_ITEMS, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import FooterSocials from "./FooterSocials";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800/80 bg-slate-950 text-white">
      <Image
        src="/hero-bg.jpg"
        alt="NIMO Footer Background"
        fill
        className="object-cover object-bottom opacity-15"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/80 to-slate-950/95 backdrop-blur-[1px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Brand & Mission column */}
          <div className="md:col-span-4">
            <h3 className="text-xl font-bold tracking-tight text-primary-light">{SITE_NAME}</h3>
            <p className="mt-1 text-sm font-medium text-white">{SITE_TAGLINE}</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Putting Communities First through Development, Research, and
              Cooperation for Better, Empowered Communities.
            </p>
            <FooterSocials />
          </div>

          {/* Quick Links column */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Navigation</h4>
            <nav className="mt-3 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact details column */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Get in Touch</h4>
            <div className="mt-3 flex flex-col gap-2.5 text-sm text-gray-300">
              <p className="flex items-start gap-2">
                <span className="font-medium text-white">Address:</span>
                <span>{CONTACT_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium text-white">Phone:</span>
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-primary-light transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium text-white">Email:</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-primary-light transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} {SITE_NAME} Association. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
