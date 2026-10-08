import Link from "next/link";
import { StaffCapacity } from "@/types/about";
import CapacityIcon from "./CapacityIcon";

interface Props {
  capacity: StaffCapacity;
  startTrigger?: boolean;
  delayIndex?: number;
}

const DELAY_CLASSES = [
  "delay-0",
  "delay-75",
  "delay-100",
  "delay-150",
  "delay-200",
  "delay-300",
  "delay-500",
  "delay-700",
];

export default function StaffCapacityItem({
  capacity,
  startTrigger = true,
  delayIndex = 0,
}: Props) {
  const delayClass = DELAY_CLASSES[Math.min(delayIndex, DELAY_CLASSES.length - 1)];

  return (
    <Link
      href="/team"
      className={`group flex items-center gap-3.5 sm:gap-4 p-2 sm:p-2.5 rounded-2xl transition-all duration-500 ${delayClass} hover:bg-bg-alt/70 ${
        startTrigger ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-primary-light/70 text-primary border border-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-105 shadow-2xs">
        <CapacityIcon icon={capacity.icon} />
      </div>
      <span className="text-sm sm:text-base font-semibold text-text group-hover:text-primary transition-colors leading-snug">
        {capacity.title}
      </span>
    </Link>
  );
}
