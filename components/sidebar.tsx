"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { LcaiMark } from "@/components/lcai-mark";
import { RecentChats } from "@/components/recent-chats";
import { SidebarNav } from "@/components/sidebar-nav";
import { UserProfile } from "@/components/user-profile";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";
import type { AppView, Conversation, SidebarNavId } from "@/types/chat";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  activeView: AppView;
  conversations: Conversation[];
  activeId: string;
  onToggleCollapsed: () => void;
  onNavigate: (id: SidebarNavId) => void;
  onSelectConversation: (id: string) => void;
  onRenameConversation: (id: string, title: string) => void;
  onRequestDelete: (id: string) => void;
}

export function Sidebar({
  collapsed,
  mobileOpen,
  activeView,
  conversations,
  activeId,
  onToggleCollapsed,
  onNavigate,
  onSelectConversation,
  onRenameConversation,
  onRequestDelete,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "sidebar",
        collapsed && "is-collapsed",
        mobileOpen && "is-mobile-open",
      )}
      aria-label={copy.sidebar}
    >
      <div
        className={cn(
          "flex h-[74px] shrink-0 items-center px-4",
          collapsed ? "justify-center" : "justify-between gap-3",
        )}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <LcaiMark className="bg-white/10" />
          {!collapsed && (
            <span className="brand-mark truncate font-serif text-[19px] leading-none text-[var(--sidebar-text)]">
              {copy.brand}
            </span>
          )}
        </div>
        {!collapsed && (
          <button
            type="button"
            onClick={onToggleCollapsed}
            aria-label={copy.collapseSidebar}
            className="hidden h-8 w-8 items-center justify-center rounded-lg text-[var(--sidebar-muted)] transition-colors duration-ui hover:bg-white/10 hover:text-[var(--sidebar-text)] md:inline-flex"
          >
            <PanelLeftClose className="rtl-mirror h-4 w-4" strokeWidth={1.7} />
          </button>
        )}
      </div>

      {collapsed && (
        <div className="mb-3 hidden justify-center md:flex">
          <button
            type="button"
            onClick={onToggleCollapsed}
            aria-label={copy.expandSidebar}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[var(--sidebar-muted)] transition-colors duration-ui hover:bg-white/10 hover:text-[var(--sidebar-text)]"
          >
            <PanelLeftOpen className="rtl-mirror h-4 w-4" strokeWidth={1.7} />
          </button>
        </div>
      )}

      <SidebarNav
        collapsed={collapsed}
        activeView={activeView}
        onNavigate={onNavigate}
      />

      <RecentChats
        conversations={conversations}
        activeId={activeId}
        collapsed={collapsed}
        onSelect={onSelectConversation}
        onRename={onRenameConversation}
        onRequestDelete={onRequestDelete}
      />

      <UserProfile collapsed={collapsed} />
    </aside>
  );
}
