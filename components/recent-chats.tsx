"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/types/chat";

interface RecentChatsProps {
  conversations: Conversation[];
  activeId: string;
  collapsed: boolean;
  onSelect: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onRequestDelete: (id: string) => void;
}

export function RecentChats({
  conversations,
  activeId,
  collapsed,
  onSelect,
  onRename,
  onRequestDelete,
}: RecentChatsProps) {
  const [menuId, setMenuId] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState<{
    top: number;
    left: number;
    rtl?: boolean;
  } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const menuRef = useRef<HTMLDivElement | null>(null);
  const labelId = useId();

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement | null;
      if (menuRef.current?.contains(event.target as Node)) return;
      if (target?.closest('[aria-haspopup="menu"]')) return;
      setMenuId(null);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuId(null);
        setEditingId(null);
      }
    }
    function onReposition() {
      setMenuId(null);
    }
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, []);

  if (collapsed) return null;

  function commitRename(id: string) {
    onRename(id, draft);
    setEditingId(null);
  }

  const openConversation = conversations.find((item) => item.id === menuId);

  return (
    <section className="mt-6 flex min-h-0 flex-1 flex-col px-3" aria-labelledby={labelId}>
      <h2
        id={labelId}
        className="px-3 text-[11px] font-medium text-[var(--sidebar-muted)]"
      >
        {copy.recentChats}
      </h2>
      <ul className="custom-scroll sidebar-scroll mt-2 flex-1 space-y-0.5 overflow-y-auto pb-3">
        {conversations.map((conversation) => {
          const isActive = conversation.id === activeId;
          const isEditing = editingId === conversation.id;
          const isMenuOpen = menuId === conversation.id;

          return (
            <li key={conversation.id} className="group relative">
              {isEditing ? (
                <input
                  autoFocus
                  value={draft}
                  aria-label={copy.renameConversation}
                  onChange={(event) => setDraft(event.target.value)}
                  onBlur={() => commitRename(conversation.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      commitRename(conversation.id);
                    }
                    if (event.key === "Escape") {
                      event.preventDefault();
                      setEditingId(null);
                    }
                  }}
                  className="h-10 w-full rounded-[10px] border border-white/20 bg-white/10 px-3 text-[13px] text-[var(--sidebar-text)] outline-none"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => onSelect(conversation.id)}
                  className={cn(
                    "flex h-10 w-full items-center rounded-[10px] px-3 text-start text-[13px] transition-colors duration-ui",
                    isActive
                      ? "bg-[var(--sidebar-active)] text-[var(--sidebar-text)]"
                      : "text-[var(--sidebar-muted)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-text)]",
                  )}
                >
                  <span className="min-w-0 flex-1 truncate pe-7">
                    {conversation.title}
                  </span>
                </button>
              )}

              {!isEditing && (
                <div
                  className={cn(
                    "absolute inset-y-0 end-1 flex items-center",
                    isMenuOpen
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 max-md:opacity-100",
                  )}
                >
                  <button
                    type="button"
                    aria-label={copy.conversationActions(conversation.title)}
                    aria-haspopup="menu"
                    aria-expanded={isMenuOpen}
                    onClick={(event) => {
                      event.stopPropagation();
                      if (isMenuOpen) {
                        setMenuId(null);
                        return;
                      }
                      const rect = event.currentTarget.getBoundingClientRect();
                      const isRtl = document.documentElement.dir === "rtl";
                      setMenuPos({
                        top: rect.bottom + 4,
                        left: isRtl ? rect.left : rect.right,
                        rtl: isRtl,
                      });
                      setMenuId(conversation.id);
                    }}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[var(--sidebar-text)] transition-colors duration-ui hover:bg-white/10"
                  >
                    <MoreHorizontal className="h-4 w-4" strokeWidth={1.7} />
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {openConversation && menuPos && (
        <div
          ref={menuRef}
          role="menu"
          className="fixed z-50 min-w-[148px] rounded-[12px] border border-[var(--border-light)] bg-[var(--surface-white)] py-1 shadow-menu"
          style={{
            top: menuPos.top,
            left: menuPos.left,
            transform: menuPos.rtl ? undefined : "translateX(-100%)",
          }}
        >
          <button
            type="button"
            role="menuitem"
            className="flex h-9 w-full items-center px-3 text-start text-[13px] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
            onClick={() => {
              setDraft(openConversation.title);
              setEditingId(openConversation.id);
              setMenuId(null);
            }}
          >
            {copy.rename}
          </button>
          <button
            type="button"
            role="menuitem"
            className="flex h-9 w-full items-center px-3 text-start text-[13px] text-[#b5524a] hover:bg-[var(--accent-soft)]"
            onClick={() => {
              setMenuId(null);
              onRequestDelete(openConversation.id);
            }}
          >
            {copy.delete}
          </button>
        </div>
      )}
    </section>
  );
}
