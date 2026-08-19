"use client";

import { Menu } from "lucide-react";
import { copy } from "@/lib/copy";

interface ChatHeaderProps {
  title: string;
  showMenuButton: boolean;
  onMenuClick: () => void;
}

export function ChatHeader({
  title,
  showMenuButton,
  onMenuClick,
}: ChatHeaderProps) {
  return (
    <header className="flex h-[74px] shrink-0 items-center gap-3 border-b border-[var(--border-light)] px-6 max-md:px-4">
      {showMenuButton && (
        <button
          type="button"
          onClick={onMenuClick}
          aria-label={copy.openSidebar}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors duration-ui hover:bg-[var(--surface-secondary)] md:hidden"
        >
          <Menu className="h-4 w-4" strokeWidth={1.7} />
        </button>
      )}
      <h1 className="min-w-0 truncate font-serif text-[20px] leading-snug text-[var(--text-primary)] max-lg:text-[18px] max-md:text-[17px]">
        {title}
      </h1>
    </header>
  );
}
