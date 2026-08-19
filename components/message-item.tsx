"use client";

import { useState } from "react";
import { AssistantActions } from "@/components/assistant-actions";
import { LcaiMark } from "@/components/lcai-mark";
import { Markdown } from "@/components/markdown";
import { StreamStatus } from "@/components/stream-status";
import { ToolCallList } from "@/components/tool-call-list";
import { cn } from "@/lib/utils";
import type { AssistantStreamState, ChatMessage } from "@/types/chat";

interface MessageItemProps {
  message: ChatMessage;
  isLastAssistant: boolean;
  stream?: AssistantStreamState | null;
  onCopy: (content: string) => Promise<void> | void;
  onRegenerate: (messageId: string) => void;
  onFeedback: (messageId: string, value: "up" | "down") => void;
}

export function MessageItem({
  message,
  isLastAssistant,
  stream,
  onCopy,
  onRegenerate,
  onFeedback,
}: MessageItemProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";
  const live = stream?.messageId === message.id ? stream : null;

  async function copy() {
    await onCopy(message.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  if (isUser) {
    return (
      <article className="fade-in flex justify-end">
        <div
          dir="auto"
          className={cn(
            "max-w-[72%] whitespace-pre-wrap rounded-[16px] rounded-ee-md bg-[#EFE8E1] px-4 py-3 text-[14.5px] leading-8 text-[var(--text-primary)]",
            "max-md:max-w-[90%]",
          )}
        >
          {message.content}
        </div>
      </article>
    );
  }

  return (
    <article className="fade-in flex items-start gap-3">
      <LcaiMark size="sm" className="mt-1 bg-[var(--sidebar-background)]" />
      <div className="min-w-0 max-w-[80%] max-md:max-w-[90%]">
        {live && <StreamStatus status={live.status} />}
        {live && <ToolCallList tools={live.toolCalls} />}
        {message.content ? (
          <div className={live ? "mt-3" : undefined}>
            <Markdown content={message.content} />
            {live?.status === "generating" && (
              <span className="stream-caret" aria-hidden="true" />
            )}
          </div>
        ) : null}
        {!live && (
          <AssistantActions
            copied={copied}
            feedback={message.feedback}
            canRegenerate={isLastAssistant}
            onCopy={copy}
            onRegenerate={() => onRegenerate(message.id)}
            onFeedback={(value) => onFeedback(message.id, value)}
          />
        )}
      </div>
    </article>
  );
}
