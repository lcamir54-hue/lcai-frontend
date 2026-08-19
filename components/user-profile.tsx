"use client";

import { copy } from "@/lib/copy";

interface UserProfileProps {
  collapsed: boolean;
}

export function UserProfile({ collapsed }: UserProfileProps) {
  return (
    <div className="mt-auto border-t border-white/10 px-3 py-3">
      <div
        className={
          collapsed
            ? "flex justify-center"
            : "flex items-center gap-3 rounded-[12px] px-1 py-1"
        }
      >
        <span
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.12)] text-[13px] font-medium text-[var(--sidebar-text)]"
          aria-hidden="true"
        >
          {copy.userInitials}
        </span>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] text-[var(--sidebar-text)]">
              {copy.userName}
            </p>
            <p className="text-[11px] text-[var(--sidebar-muted)]">
              {copy.workspaceLabel}
            </p>
          </div>
        )}
      </div>
      <span className="sr-only">{copy.userName}</span>
    </div>
  );
}
