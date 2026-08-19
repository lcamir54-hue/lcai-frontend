"use client";

import { useMemo, useState } from "react";
import { ChatComposer } from "@/components/chat-composer";
import { ChatHeader } from "@/components/chat-header";
import { EmptyChat } from "@/components/empty-chat";
import { LibraryPanel } from "@/components/library-panel";
import { MessageList } from "@/components/message-list";
import { SettingsPanel } from "@/components/settings-panel";
import { copy } from "@/lib/copy";
import type { ConversationsApi } from "@/hooks/use-conversations";
import type { AppView } from "@/types/chat";

interface ChatWorkspaceProps {
  view: AppView;
  chat: ConversationsApi;
  showMenuButton: boolean;
  onMenuClick: () => void;
  onCopy: (content: string) => Promise<void> | void;
  onUsePrompt: () => void;
  onResetConversations: () => void;
}

const VIEW_TITLES: Record<AppView, string> = {
  chat: "",
  library: copy.library,
  settings: copy.settings,
};

export function ChatWorkspace({
  view,
  chat,
  showMenuButton,
  onMenuClick,
  onCopy,
  onUsePrompt,
  onResetConversations,
}: ChatWorkspaceProps) {
  const [input, setInput] = useState("");

  const conversation = chat.activeConversation;
  const messages = conversation?.messages ?? [];
  const isEmptyChat = view === "chat" && messages.length === 0 && !chat.isReplying;

  const headerTitle = useMemo(() => {
    if (view !== "chat") return VIEW_TITLES[view];
    return conversation?.title || copy.newChat;
  }, [conversation?.title, view]);

  function fillComposer(text: string) {
    setInput(text);
    window.setTimeout(() => {
      document.getElementById("lcai-composer")?.focus();
    }, 0);
  }

  async function submit() {
    const content = input;
    setInput("");
    await chat.sendUserMessage(content);
  }

  return (
    <section className="workspace" aria-label={copy.workspace}>
      <ChatHeader
        title={headerTitle}
        showMenuButton={showMenuButton}
        onMenuClick={onMenuClick}
      />

      {view === "library" && (
        <LibraryPanel
          onUsePrompt={(prompt) => {
            fillComposer(prompt);
            onUsePrompt();
          }}
        />
      )}
      {view === "settings" && (
        <SettingsPanel onResetConversations={onResetConversations} />
      )}

      {view === "chat" && (
        <>
          {isEmptyChat ? (
            <EmptyChat onUseSuggestion={fillComposer} />
          ) : (
            <MessageList
              messages={messages}
              stream={
                chat.stream && chat.stream.conversationId === conversation?.id
                  ? chat.stream
                  : null
              }
              onCopy={onCopy}
              onRegenerate={(messageId) => chat.regenerateAssistant(messageId)}
              onFeedback={(messageId, value) =>
                chat.setMessageFeedback(messageId, value)
              }
            />
          )}
          <ChatComposer
            value={input}
            disabled={chat.isReplying}
            mode={chat.composerMode}
            onChange={setInput}
            onModeChange={chat.setComposerMode}
            onSubmit={submit}
          />
        </>
      )}
    </section>
  );
}
