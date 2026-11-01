"use client";

import { useId } from "react";
import type { TeamDepartment } from "@/types/team";
import {
  STANDARD_DEPARTMENTS,
  OTHER_DEPARTMENT_LABEL,
  OTHER_DEPARTMENT_SLUG,
} from "./teamDepartmentConstants";

interface TeamDepartmentSelectProps {
  department: string;
  departmentSlug: TeamDepartment;
  onDepartmentChange: (dept: string, slug: TeamDepartment) => void;
}

export function TeamDepartmentSelect({
  department,
  departmentSlug,
  onDepartmentChange,
}: TeamDepartmentSelectProps) {
  const selectId = useId();
  const positionInputId = useId();

  const isPredefined = STANDARD_DEPARTMENTS.some(
    (opt) => opt.label === department && departmentSlug === opt.slug
  );
  const isOther = departmentSlug === OTHER_DEPARTMENT_SLUG || (!isPredefined && Boolean(department));
  const currentSelectValue = isOther ? OTHER_DEPARTMENT_LABEL : department;

  const handleSelectChange = (val: string) => {
    if (val === OTHER_DEPARTMENT_LABEL) {
      onDepartmentChange("", OTHER_DEPARTMENT_SLUG);
      return;
    }
    const match = STANDARD_DEPARTMENTS.find((opt) => opt.label === val);
    if (match) {
      onDepartmentChange(match.label, match.slug);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={selectId} className="text-sm font-medium text-text">
          Department *
        </label>
        <select
          id={selectId}
          value={currentSelectValue}
          onChange={(e) => handleSelectChange(e.target.value)}
          className="min-h-11 rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text focus:border-primary focus:outline-hidden"
        >
          {STANDARD_DEPARTMENTS.map((opt) => (
            <option key={opt.slug} value={opt.label}>
              {opt.label}
            </option>
          ))}
          <option value={OTHER_DEPARTMENT_LABEL}>{OTHER_DEPARTMENT_LABEL}</option>
        </select>
      </div>

      {isOther && (
        <div className="flex flex-col gap-1.5 animate-fadeIn">
          <label htmlFor={positionInputId} className="text-sm font-medium text-text">
            New Position *
          </label>
          <input
            id={positionInputId}
            type="text"
            required
            value={department === OTHER_DEPARTMENT_LABEL ? "" : department}
            onChange={(e) => onDepartmentChange(e.target.value, OTHER_DEPARTMENT_SLUG)}
            placeholder="e.g. Community Mobilization Coordinator"
            className="min-h-11 rounded-lg border border-border bg-bg px-4 py-2 text-sm text-text focus:border-primary focus:outline-hidden"
          />
          <p className="text-xs text-text-light">
            Specify the custom position or department name for this member.
          </p>
        </div>
      )}
    </>
  );
}

