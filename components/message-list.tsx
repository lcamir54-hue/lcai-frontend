"use client";

import { useEffect, useMemo, useRef } from "react";
import { MessageItem } from "@/components/message-item";
import type { AssistantStreamState, ChatMessage } from "@/types/chat";

interface MessageListProps {
  messages: ChatMessage[];
  stream: AssistantStreamState | null;
  onCopy: (content: string) => Promise<void> | void;
  onRegenerate: (messageId: string) => void;
  onFeedback: (messageId: string, value: "up" | "down") => void;
}

export function MessageList({
  messages,
  stream,
  onCopy,
  onRegenerate,
  onFeedback,
}: MessageListProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  const visibleMessages = useMemo(() => {
    if (!stream) return messages;
    const exists = messages.some((message) => message.id === stream.messageId);
    if (exists) {
      return messages.map((message) =>
        message.id === stream.messageId
          ? { ...message, content: stream.content }
          : message,
      );
    }
    return [
      ...messages,
      {
        id: stream.messageId,
        role: "assistant" as const,
        content: stream.content,
        createdAt: new Date().toISOString(),
      },
    ];
  }, [messages, stream]);

  const lastAssistantId = [...visibleMessages]
    .reverse()
    .find((message) => message.role === "assistant")?.id;

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [visibleMessages, stream?.status, stream?.content, stream?.toolCalls]);

  return (
    <div className="custom-scroll mx-auto flex w-full max-w-composer flex-1 flex-col gap-6 overflow-y-auto px-6 py-6 max-md:px-4">
      {visibleMessages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          isLastAssistant={message.id === lastAssistantId && !stream}
          stream={stream?.messageId === message.id ? stream : null}
          onCopy={onCopy}
          onRegenerate={onRegenerate}
          onFeedback={onFeedback}
        />
      ))}
      <div ref={endRef} />
    </div>
  );
}
