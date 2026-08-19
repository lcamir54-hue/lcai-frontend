"use client";

import { copy } from "@/lib/copy";
import type { AssistantStatus } from "@/types/chat";

interface StreamStatusProps {
  status: AssistantStatus;
}

const LABELS: Record<AssistantStatus, string> = {
  thinking: copy.thinking,
  "using-tools": copy.usingTools,
  generating: copy.generating,
};

export function StreamStatus({ status }: StreamStatusProps) {
  return (
    <p
      className="flex items-center gap-2 text-[13px] text-[var(--text-secondary)]"
      role="status"
      aria-live="polite"
    >
      <span className="stream-pulse" aria-hidden="true" />
      <span>{LABELS[status]}</span>
    </p>
  );
}
