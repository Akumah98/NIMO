"use client";

import { useCountUp } from "@/hooks/useCountUp";

interface Props {
  value: string;
  label: string;
  description: string;
  startTrigger: boolean;
  delayIndex?: number;
}

const DELAY_CLASSES = [
  "delay-0",
  "delay-100",
  "delay-200",
  "delay-300",
  "delay-500",
];

export default function ImpactCounterItem({
  value,
  label,
  description,
  startTrigger,
  delayIndex = 0,
}: Props) {
  const rawNumber = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9,\s]/g, "");

  const count = useCountUp({
    end: rawNumber,
    duration: 1800,
    startTrigger,
  });

  const formattedValue = count > 0 ? `${count.toLocaleString()}${suffix}` : value;
  const delayClass = DELAY_CLASSES[Math.min(delayIndex, DELAY_CLASSES.length - 1)];

  return (
    <div
      className={`flex flex-col justify-between text-center transition-all duration-700 ${delayClass} ${
        startTrigger ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div>
        <p className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-mono">
          {formattedValue}
        </p>
        <h3 className="mt-3 text-sm sm:text-base font-bold text-gray-200">
          {label}
        </h3>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-gray-400">
        {description}
      </p>
    </div>
  );
}
