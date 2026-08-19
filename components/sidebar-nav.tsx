"use client";

import { BookOpen, MessageSquarePlus, Settings } from "lucide-react";
import { copy, navItems } from "@/lib/copy";
import { cn } from "@/lib/utils";
import type { AppView, SidebarNavId } from "@/types/chat";

interface SidebarNavProps {
  collapsed: boolean;
  activeView: AppView;
  onNavigate: (id: SidebarNavId) => void;
}

const ICONS = {
  "new-chat": MessageSquarePlus,
  library: BookOpen,
  settings: Settings,
} as const;

export function SidebarNav({
  collapsed,
  activeView,
  onNavigate,
}: SidebarNavProps) {
  return (
    <nav aria-label={copy.primaryNav} className="px-3">
      <ul className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = ICONS[item.id];
          const isNewChat = item.id === "new-chat";
          const isActive =
            !isNewChat &&
            (item.id === "library" || item.id === "settings") &&
            activeView === item.id;

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "group flex h-10 w-full items-center gap-3 rounded-[10px] px-3 text-start text-[13px] transition-colors duration-ui",
                  isNewChat
                    ? "bg-[rgba(255,255,255,0.1)] text-[var(--sidebar-text)] hover:bg-[rgba(255,255,255,0.14)]"
                    : isActive
                      ? "bg-[var(--sidebar-active)] text-[var(--sidebar-text)]"
                      : "text-[var(--sidebar-text)] hover:bg-[var(--sidebar-hover)]",
                  collapsed && "justify-center px-0",
                )}
              >
                <Icon
                  className="h-4 w-4 shrink-0 opacity-90"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                {!collapsed && (
                  <>
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    {"badge" in item && item.badge ? (
                      <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-white px-1 text-[10px] font-medium leading-none text-[var(--button-dark)]">
                        {item.badge}
                      </span>
                    ) : null}
                  </>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
