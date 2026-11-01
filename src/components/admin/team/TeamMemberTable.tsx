"use client";

import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import type { TeamMember } from "@/types/team";

interface TeamMemberTableProps {
  members: TeamMember[];
  onDelete: (member: TeamMember) => void;
  onToggleVisibility: (member: TeamMember) => void;
}

export function TeamMemberTable({ members, onDelete, onToggleVisibility }: TeamMemberTableProps) {
  if (members.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-bg-alt p-8 text-center text-sm text-text-light">
        No team members found in this category.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-bg-alt">
          <tr>
            <th className="px-4 py-3 font-medium text-text">Member</th>
            <th className="px-4 py-3 font-medium text-text">Department</th>
            <th className="px-4 py-3 font-medium text-text">Location</th>
            <th className="px-4 py-3 font-medium text-text">Order</th>
            <th className="px-4 py-3 font-medium text-text">Status</th>
            <th className="px-4 py-3 text-right font-medium text-text">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-bg">
          {members.map((m) => (
            <tr key={m.id} className="hover:bg-bg-alt">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-bg-alt">
                    {m.image ? (
                      <Image src={m.image} alt={m.name} fill unoptimized className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-bold text-primary">
                        {m.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-text">{m.name}</p>
                    <p className="text-xs text-text-light">{m.role}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3"><Badge variant="primary">{m.department}</Badge></td>
              <td className="px-4 py-3 text-xs text-text-light">{m.location}</td>
              <td className="px-4 py-3 text-xs font-mono text-text-light">{m.display_order ?? 0}</td>
              <td className="px-4 py-3">
                <button type="button" onClick={() => onToggleVisibility(m)} className="inline-flex min-h-11 items-center">
                  <Badge variant={m.visible !== false ? "secondary" : "default"}>
                    {m.visible !== false ? "Active" : "Hidden"}
                  </Badge>
                </button>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-3">
                  <Link href={`/admin/team/${m.id}`} className="inline-flex min-h-11 items-center text-xs font-semibold text-primary hover:underline">
                    Edit
                  </Link>
                  <button type="button" onClick={() => onDelete(m)} className="inline-flex min-h-11 items-center text-xs font-semibold text-red-500 hover:underline">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
