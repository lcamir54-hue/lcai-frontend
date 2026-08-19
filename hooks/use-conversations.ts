"use client";

import { useCallback, useMemo, useState } from "react";
import { streamMessage } from "@/lib/chat-service";
import { SEED_CONVERSATIONS } from "@/lib/seed";
import { copy } from "@/lib/copy";
import { createId, deriveTitle, nowIso } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type {
  AssistantStreamState,
  ChatMessage,
  ComposerMode,
  Conversation,
  ToolCall,
} from "@/types/chat";

const STORAGE_KEY = "lcai.conversations.v2";

interface StoredChatState {
  conversations: Conversation[];
  activeId: string;
}

const INITIAL_STATE: StoredChatState = {
  conversations: SEED_CONVERSATIONS,
  activeId: SEED_CONVERSATIONS[0].id,
};

function sortConversations(conversations: Conversation[]): Conversation[] {
  return [...conversations].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function useConversations() {
  const [stored, setStored, ready] = useLocalStorage<StoredChatState>(
    STORAGE_KEY,
    INITIAL_STATE,
  );
  const [isReplying, setIsReplying] = useState(false);
  const [stream, setStream] = useState<AssistantStreamState | null>(null);
  const [composerMode, setComposerMode] = useState<ComposerMode>("default");

  const conversations = useMemo(
    () => sortConversations(stored.conversations),
    [stored.conversations],
  );

  const activeConversation = useMemo(
    () =>
      conversations.find((conversation) => conversation.id === stored.activeId) ??
      conversations[0] ??
      null,
    [conversations, stored.activeId],
  );

  const updateStore = useCallback(
    (updater: (current: StoredChatState) => StoredChatState) => {
      setStored((current) => updater(current));
    },
    [setStored],
  );

  const selectConversation = useCallback(
    (id: string) => {
      updateStore((current) => ({ ...current, activeId: id }));
    },
    [updateStore],
  );

  const createConversation = useCallback(() => {
    let createdId = "";
    updateStore((current) => {
      const empty = current.conversations.find(
        (conversation) => conversation.messages.length === 0,
      );
      if (empty) {
        createdId = empty.id;
        return { ...current, activeId: empty.id };
      }

      const now = nowIso();
      const conversation: Conversation = {
        id: createId(),
        title: copy.newChat,
        messages: [],
        createdAt: now,
        updatedAt: now,
      };
      createdId = conversation.id;
      return {
        conversations: [conversation, ...current.conversations],
        activeId: conversation.id,
      };
    });
    return createdId;
  }, [updateStore]);

  const renameConversation = useCallback(
    (id: string, title: string) => {
      const nextTitle = title.replace(/\s+/g, " ").trim();
      if (!nextTitle) return;
      updateStore((current) => ({
        ...current,
        conversations: current.conversations.map((conversation) =>
          conversation.id === id
            ? {
                ...conversation,
                title: nextTitle,
                titleLocked: true,
                updatedAt: nowIso(),
              }
            : conversation,
        ),
      }));
    },
    [updateStore],
  );

  const deleteConversation = useCallback(
    (id: string) => {
      updateStore((current) => {
        const remaining = current.conversations.filter(
          (conversation) => conversation.id !== id,
        );
        if (remaining.length === 0) {
          const now = nowIso();
          const fallback: Conversation = {
            id: createId(),
            title: copy.newChat,
            messages: [],
            createdAt: now,
            updatedAt: now,
          };
          return { conversations: [fallback], activeId: fallback.id };
        }
        const nextActive =
          current.activeId === id ? remaining[0].id : current.activeId;
        return { conversations: remaining, activeId: nextActive };
      });
    },
    [updateStore],
  );

  const setMessageFeedback = useCallback(
    (messageId: string, feedback: ChatMessage["feedback"]) => {
      if (!activeConversation) return;
      const conversationId = activeConversation.id;
      updateStore((current) => ({
        ...current,
        conversations: current.conversations.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                messages: conversation.messages.map((message) =>
                  message.id === messageId
                    ? {
                        ...message,
                        feedback:
                          message.feedback === feedback ? undefined : feedback,
                      }
                    : message,
                ),
              }
            : conversation,
        ),
      }));
    },
    [activeConversation, updateStore],
  );

  const runStream = useCallback(
    async (
      conversationId: string,
      messageId: string,
      history: ChatMessage[],
      replaceExisting: boolean,
    ) => {
      setIsReplying(true);
      setStream({
        conversationId,
        messageId,
        status: "thinking",
        toolCalls: [],
        content: "",
      });

      let content = "";
      let toolCalls: ToolCall[] = [];

      try {
        for await (const event of streamMessage(history, {
          mode: composerMode,
          regenerate: replaceExisting,
        })) {
          if (event.type === "status") {
            setStream((current) =>
              current && current.messageId === messageId
                ? { ...current, status: event.status }
                : current,
            );
          }

          if (event.type === "tool_start") {
            const nextTool: ToolCall = {
              id: event.id,
              name: event.name,
              status: "running",
              detail: event.detail,
            };
            toolCalls = [
              ...toolCalls.filter((item) => item.id !== event.id),
              nextTool,
            ];
            setStream((current) =>
              current && current.messageId === messageId
                ? { ...current, toolCalls }
                : current,
            );
          }

          if (event.type === "tool_end") {
            toolCalls = toolCalls.map((item) =>
              item.id === event.id
                ? { ...item, status: "done" as const, detail: event.detail }
                : item,
            );
            setStream((current) =>
              current && current.messageId === messageId
                ? { ...current, toolCalls }
                : current,
            );
          }

          if (event.type === "text_delta") {
            content += event.delta;
            setStream((current) =>
              current && current.messageId === messageId
                ? { ...current, content }
                : current,
            );
          }
        }

        const assistantMessage: ChatMessage = {
          id: messageId,
          role: "assistant",
          content,
          createdAt: nowIso(),
        };

        updateStore((current) => ({
          ...current,
          conversations: current.conversations.map((conversation) => {
            if (conversation.id !== conversationId) return conversation;
            if (replaceExisting) {
              return {
                ...conversation,
                messages: conversation.messages.map((message) =>
                  message.id === messageId
                    ? {
                        ...assistantMessage,
                        feedback: undefined,
                      }
                    : message,
                ),
                updatedAt: nowIso(),
              };
            }
            return {
              ...conversation,
              messages: [...conversation.messages, assistantMessage],
              updatedAt: nowIso(),
            };
          }),
        }));
      } finally {
        setStream(null);
        setIsReplying(false);
      }
    },
    [composerMode, updateStore],
  );

  const sendUserMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isReplying) return;

      let conversationId = stored.activeId;
      const previousMessages = activeConversation?.messages ?? [];
      const userMessage: ChatMessage = {
        id: createId(),
        role: "user",
        content: trimmed,
        createdAt: nowIso(),
      };

      updateStore((current) => {
        const target = current.conversations.find(
          (conversation) => conversation.id === current.activeId,
        );
        if (!target) {
          const now = nowIso();
          const conversation: Conversation = {
            id: createId(),
            title: deriveTitle(trimmed),
            messages: [userMessage],
            createdAt: now,
            updatedAt: now,
          };
          conversationId = conversation.id;
          return {
            conversations: [conversation, ...current.conversations],
            activeId: conversation.id,
          };
        }

        conversationId = target.id;

        const shouldDeriveTitle =
          !target.titleLocked &&
          (target.messages.length === 0 || target.title === copy.newChat);

        return {
          ...current,
          conversations: current.conversations.map((conversation) =>
            conversation.id === target.id
              ? {
                  ...conversation,
                  title: shouldDeriveTitle
                    ? deriveTitle(trimmed)
                    : conversation.title,
                  messages: [...conversation.messages, userMessage],
                  updatedAt: nowIso(),
                }
              : conversation,
          ),
        };
      });

      await runStream(
        conversationId,
        createId(),
        [...previousMessages, userMessage],
        false,
      );
    },
    [
      activeConversation,
      isReplying,
      runStream,
      stored.activeId,
      updateStore,
    ],
  );

  const regenerateAssistant = useCallback(
    async (messageId?: string) => {
      if (!activeConversation || isReplying) return;
      const assistantMessages = activeConversation.messages.filter(
        (message) => message.role === "assistant",
      );
      const target =
        activeConversation.messages.find((message) => message.id === messageId) ??
        assistantMessages.at(-1);
      if (!target || target.role !== "assistant") return;

      const index = activeConversation.messages.findIndex(
        (message) => message.id === target.id,
      );
      const history = activeConversation.messages.slice(0, index);

      await runStream(activeConversation.id, target.id, history, true);
    },
    [activeConversation, isReplying, runStream],
  );

  const resetConversations = useCallback(() => {
    setStored(INITIAL_STATE);
  }, [setStored]);

  return {
    ready,
    conversations,
    activeConversation,
    activeId: stored.activeId,
    isReplying,
    stream,
    composerMode,
    setComposerMode,
    selectConversation,
    createConversation,
    renameConversation,
    deleteConversation,
    sendUserMessage,
    regenerateAssistant,
    setMessageFeedback,
    resetConversations,
  };
}

export type ConversationsApi = ReturnType<typeof useConversations>;
