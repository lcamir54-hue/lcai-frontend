"use client";

import { Check, LoaderCircle } from "lucide-react";
import type { ToolCall } from "@/types/chat";

interface ToolCallListProps {
  tools: ToolCall[];
}

export function ToolCallList({ tools }: ToolCallListProps) {
  if (tools.length === 0) return null;

  return (
    <ul className="mt-3 space-y-2">
      {tools.map((tool) => {
        const running = tool.status === "running";
        return (
          <li
            key={tool.id}
            className="rounded-[12px] border border-[var(--border-light)] bg-[var(--surface-white)] px-3 py-2.5"
          >
            <div className="flex items-center gap-2 text-[13px] text-[var(--text-primary)]">
              {running ? (
                <LoaderCircle
                  className="h-3.5 w-3.5 shrink-0 animate-spin text-[var(--text-muted)]"
                  strokeWidth={1.8}
                />
              ) : (
                <Check
                  className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]"
                  strokeWidth={1.8}
                />
              )}
              <span className="min-w-0 truncate">{tool.name}</span>
            </div>
            {tool.detail && (
              <p className="mt-1 pe-1 ps-6 text-[12px] leading-6 text-[var(--text-muted)]">
                {tool.detail}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
