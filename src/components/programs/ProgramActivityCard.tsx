import Image from "next/image";
import { ProgramActivity } from "@/types/programs";

interface Props {
  activity: ProgramActivity;
  index: number;
}

export default function ProgramActivityCard({ activity, index }: Props) {
  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-bg shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      {activity.image && (
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
          <div className="absolute bottom-3.5 left-4 flex items-center gap-2">
            <span className="rounded-full bg-slate-950/80 px-3 py-1 font-mono text-xs font-bold text-white shadow-xs backdrop-blur-md">
              #{String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-text group-hover:text-primary transition-colors">
            {activity.title}
          </h4>
          {activity.description && (
            <p className="mt-2 text-sm leading-relaxed text-text-light line-clamp-2">
              {activity.description}
            </p>
          )}
        </div>

        <ul className="mt-5 space-y-2.5 border-t border-border/60 pt-4">
          {activity.items.map((item, itemIdx) => (
            <li key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
