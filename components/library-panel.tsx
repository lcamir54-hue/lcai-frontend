"use client";

import { Bookmark } from "lucide-react";
import { copy, libraryItems, toFaDigits } from "@/lib/copy";

interface LibraryPanelProps {
  onUsePrompt: (prompt: string) => void;
}

export function LibraryPanel({ onUsePrompt }: LibraryPanelProps) {
  return (
    <div className="custom-scroll mx-auto w-full max-w-composer flex-1 overflow-y-auto px-6 py-8 max-md:px-4">
      <p className="text-[12px] text-[var(--text-muted)]">{copy.library}</p>
      <h2 className="mt-2 font-serif text-[34px] leading-[1.45] text-[var(--text-primary)] max-md:text-[28px]">
        {copy.libraryHeading}
      </h2>
      <p className="mt-3 max-w-[540px] text-[15px] leading-8 text-[var(--text-secondary)]">
        {copy.libraryBody}
      </p>
      <ul className="mt-6 divide-y divide-[var(--border-light)] overflow-hidden rounded-[16px] border border-[var(--border-light)] bg-[var(--surface-white)]">
        {libraryItems.map((item, index) => (
          <li key={item}>
            <button
              type="button"
              onClick={() => onUsePrompt(copy.libraryPrompt(item))}
              className="flex w-full items-center gap-3 px-4 py-3 text-start transition-colors duration-ui hover:bg-[var(--surface-secondary)]"
            >
              <Bookmark
                className="h-3.5 w-3.5 text-[var(--text-muted)]"
                strokeWidth={1.7}
              />
              <span className="min-w-0 flex-1 truncate text-[14px] text-[var(--text-primary)]">
                {item}
              </span>
              <span className="text-[11px] text-[var(--text-muted)]">
                {toFaDigits(String(index + 1).padStart(2, "0"))}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
