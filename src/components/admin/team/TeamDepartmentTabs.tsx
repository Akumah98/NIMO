"use client";

import type { TeamDepartment } from "@/types/team";
import { ADMIN_DEPARTMENTS } from "./teamDepartmentConstants";

interface TeamDepartmentTabsProps {
  activeDept: TeamDepartment;
  onSelect: (dept: TeamDepartment) => void;
}

export function TeamDepartmentTabs({ activeDept, onSelect }: TeamDepartmentTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {ADMIN_DEPARTMENTS.map((dept) => {
        const isActive = activeDept === dept.id;
        return (
          <button
            key={dept.id}
            type="button"
            onClick={() => onSelect(dept.id)}
            className={`min-h-11 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "border border-border bg-bg text-text-light hover:border-primary hover:text-text"
            }`}
          >
            {dept.label}
          </button>
        );
      })}
    </div>
  );
}
