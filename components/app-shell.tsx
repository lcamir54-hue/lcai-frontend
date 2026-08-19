"use client";

import { useCallback, useEffect, useState } from "react";
import { ChatWorkspace } from "@/components/chat-workspace";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Sidebar } from "@/components/sidebar";
import { Toast } from "@/components/toast";
import { useConversations } from "@/hooks/use-conversations";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { copy } from "@/lib/copy";
import type { AppView, SidebarNavId } from "@/types/chat";

export function AppShell() {
  const chat = useConversations();
  const [collapsed, setCollapsed] = useLocalStorage("lcai.sidebarCollapsed", false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [view, setView] = useState<AppView>("chat");
  const [toast, setToast] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [pendingReset, setPendingReset] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMobile();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMobile]);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 768) closeMobile();
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [closeMobile]);

  function handleNavigate(id: SidebarNavId) {
    if (id === "new-chat") {
      chat.createConversation();
      setView("chat");
    } else {
      setView(id);
    }
    closeMobile();
  }

  function handleSelectConversation(id: string) {
    chat.selectConversation(id);
    setView("chat");
    closeMobile();
  }

  function handleUsePrompt() {
    chat.createConversation();
    setView("chat");
  }

  async function copyText(content: string) {
    try {
      await navigator.clipboard.writeText(content);
      setToast(copy.copiedClipboard);
    } catch {
      setToast(copy.copyFailed);
    }
  }

  const pendingDelete = chat.conversations.find(
    (conversation) => conversation.id === pendingDeleteId,
  );

  if (!chat.ready) {
    return (
      <div className="app-page">
        <div className="app-shell" aria-busy="true" aria-label={copy.loading}>
          <div className="sidebar" />
          <div className="workspace" />
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <div className="app-shell">
        {mobileOpen && (
          <button
            type="button"
            aria-label={copy.closeSidebar}
            className="sidebar-overlay"
            onClick={closeMobile}
          />
        )}
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          activeView={view}
          conversations={chat.conversations}
          activeId={chat.activeId}
          onToggleCollapsed={() => setCollapsed((value) => !value)}
          onNavigate={handleNavigate}
          onSelectConversation={handleSelectConversation}
          onRenameConversation={chat.renameConversation}
          onRequestDelete={setPendingDeleteId}
        />
        <ChatWorkspace
          view={view}
          chat={chat}
          showMenuButton
          onMenuClick={() => setMobileOpen(true)}
          onCopy={copyText}
          onUsePrompt={handleUsePrompt}
          onResetConversations={() => setPendingReset(true)}
        />
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title={copy.deleteTitle}
        description={
          pendingDelete ? copy.deleteDescription(pendingDelete.title) : ""
        }
        confirmLabel={copy.delete}
        onClose={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId) chat.deleteConversation(pendingDeleteId);
          setPendingDeleteId(null);
          setView("chat");
        }}
      />

      <ConfirmDialog
        open={pendingReset}
        title={copy.resetTitle}
        description={copy.resetDescription}
        confirmLabel={copy.reset}
        onClose={() => setPendingReset(false)}
        onConfirm={() => {
          chat.resetConversations();
          setPendingReset(false);
          setView("chat");
          setToast(copy.conversationsRestored);
        }}
      />

      <Toast message={toast} onClear={() => setToast(null)} />
    </div>
  );
}
