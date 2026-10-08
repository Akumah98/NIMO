import Image from "next/image";
import { Partner } from "@/types";

interface Props {
  partner: Partner;
}

export default function PartnerSlideCard({ partner }: Props) {
  return (
    <div className="group flex shrink-0 items-center gap-4.5 rounded-3xl border border-border/70 bg-bg p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg w-[85vw] sm:w-[440px] lg:w-[470px] snap-center">
      <div className="relative h-18 w-26 shrink-0 rounded-2xl bg-white p-2 border border-border/60 flex items-center justify-center shadow-2xs group-hover:border-primary/30 transition-colors">
        <Image
          src={partner.logo}
          alt={partner.name}
          fill
          className="object-contain p-2"
          sizes="110px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <span className="inline-block rounded-full bg-primary-light px-2.5 py-0.5 text-[11px] font-semibold text-primary">
          {partner.category}
        </span>
        <h3 className="mt-1.5 text-sm sm:text-base font-bold text-text group-hover:text-primary transition-colors truncate">
          {partner.name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-text-light line-clamp-2">
          {partner.role}
        </p>
      </div>
    </div>
  );
}
