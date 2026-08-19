export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  feedback?: "up" | "down";
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  titleLocked?: boolean;
}

export type ComposerMode = "default" | "brainstorm" | "web-search" | "code";

export type AssistantStatus = "thinking" | "using-tools" | "generating";

export interface ToolCall {
  id: string;
  name: string;
  status: "running" | "done";
  detail?: string;
}

export type ChatStreamEvent =
  | { type: "status"; status: AssistantStatus }
  | { type: "tool_start"; id: string; name: string; detail?: string }
  | { type: "tool_end"; id: string; detail?: string }
  | { type: "text_delta"; delta: string }
  | { type: "done" };

export interface AssistantStreamState {
  conversationId: string;
  messageId: string;
  status: AssistantStatus;
  toolCalls: ToolCall[];
  content: string;
}

export type AppView = "chat" | "library" | "settings";

export type SidebarNavId = "new-chat" | "library" | "settings";
