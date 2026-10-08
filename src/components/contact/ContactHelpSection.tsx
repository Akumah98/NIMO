import Image from "next/image";
import FootprintContactCard from "@/components/about/FootprintContactCard";
import { CONTACT_INFO } from "@/lib/constants";

export default function ContactHelpSection() {
  return (
    <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
      {/* Left Column: Heading, Subtitle & 2 Elevated Cards */}
      <div className="flex flex-col justify-between lg:col-span-7">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text">
            Need help?
          </h1>
          <p className="mt-2 text-base sm:text-lg text-text-light">
            Our team is here to help with any inquiries, partnerships, or field support.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FootprintContactCard
              type="email"
              title="Drop us a line"
              description="Write to us if you have any questions or difficulties working with our services."
              actionText={CONTACT_INFO.email}
              actionHref={`mailto:${CONTACT_INFO.email}`}
            />

            <FootprintContactCard
              type="phone"
              title="Call us"
              description="We're here to help with all your needs and questions about NIMO initiatives."
              actionText={CONTACT_INFO.phone}
              actionHref={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
            />
          </div>
        </div>
      </div>

      {/* Right Column: Photography Card with Glassmorphic Badge */}
      <div className="relative min-h-[340px] sm:min-h-[420px] lg:col-span-5 w-full overflow-hidden rounded-3xl border border-border/70 shadow-lg">
        <Image
          src="/posts/humanitarian Day 1.jpeg"
          alt="NIMO Headquarters Office"
          fill
          className="object-cover object-center transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 40vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-white backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
            </span>
            <p className="text-xs font-bold uppercase tracking-wider text-secondary-light">
              NIMO Central Office
            </p>
          </div>
          <p className="mt-1 text-sm font-bold text-white sm:text-base">
            Mile 18 Junction, Buea, Cameroon
          </p>
          <p className="mt-0.5 text-xs text-gray-300">
            Open Monday – Friday: 8:00 AM – 5:00 PM (West Africa Time)
          </p>
        </div>
      </div>
    </div>
  );
}
