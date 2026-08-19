"use client";

import { BarChart3, FileText, Lightbulb, ListTodo } from "lucide-react";
import { copy, emptySuggestions } from "@/lib/copy";

interface EmptyChatProps {
  onUseSuggestion: (text: string) => void;
}

const ICONS = [ListTodo, BarChart3, FileText, Lightbulb];

export function EmptyChat({ onUseSuggestion }: EmptyChatProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <h2 className="max-w-[640px] font-serif text-[38px] leading-[1.45] text-[var(--text-primary)] max-lg:text-[32px] max-md:text-[28px]">
        {copy.emptyHeading}
      </h2>
      <p className="mt-4 max-w-[520px] text-[15px] leading-8 text-[var(--text-secondary)]">
        {copy.emptyDescription}
      </p>
      <div className="mt-8 flex max-w-[720px] flex-wrap items-center justify-center gap-2.5">
        {emptySuggestions.map((suggestion, index) => {
          const Icon = ICONS[index];
          return (
            <button
              key={suggestion.label}
              type="button"
              onClick={() => onUseSuggestion(suggestion.prompt)}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-light)] bg-[var(--surface-white)] px-4 py-2.5 text-[13px] text-[var(--text-primary)] transition-colors duration-ui hover:bg-[var(--surface-hover)]"
            >
              <Icon
                className="h-3.5 w-3.5 text-[var(--text-secondary)]"
                strokeWidth={1.7}
              />
              {suggestion.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
