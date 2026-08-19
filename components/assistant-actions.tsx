"use client";

import type { ReactNode } from "react";
import { Copy, RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

interface AssistantActionsProps {
  copied: boolean;
  feedback?: "up" | "down";
  canRegenerate: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
  onFeedback: (value: "up" | "down") => void;
}

export function AssistantActions({
  copied,
  feedback,
  canRegenerate,
  onCopy,
  onRegenerate,
  onFeedback,
}: AssistantActionsProps) {
  return (
    <div className="mt-2 flex items-center gap-0.5">
      <ActionButton label={copied ? copy.copied : copy.copy} onClick={onCopy}>
        <Copy className="h-3.5 w-3.5" strokeWidth={1.7} />
      </ActionButton>
      <ActionButton
        label={copy.regenerate}
        onClick={onRegenerate}
        disabled={!canRegenerate}
      >
        <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.7} />
      </ActionButton>
      <ActionButton
        label={copy.thumbsUp}
        onClick={() => onFeedback("up")}
        pressed={feedback === "up"}
      >
        <ThumbsUp className="h-3.5 w-3.5" strokeWidth={1.7} />
      </ActionButton>
      <ActionButton
        label={copy.thumbsDown}
        onClick={() => onFeedback("down")}
        pressed={feedback === "down"}
      >
        <ThumbsDown className="h-3.5 w-3.5" strokeWidth={1.7} />
      </ActionButton>
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  children,
  disabled,
  pressed,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "group/tip relative inline-flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors duration-ui",
        "hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-40",
        pressed && "text-[var(--accent)]",
      )}
    >
      {children}
      <span className="tooltip">{label}</span>
    </button>
  );
}
