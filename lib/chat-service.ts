import type { ChatMessage, ChatStreamEvent, ComposerMode } from "@/types/chat";
import { streamMockReply } from "@/lib/mock-assistant";

export interface SendMessageOptions {
  mode?: ComposerMode;
  regenerate?: boolean;
}

/**
 * Streaming chat service boundary.
 * Replace the body of `streamMessage` with a real LLM stream later.
 * Do not add API keys to the frontend.
 */
export async function* streamMessage(
  messages: ChatMessage[],
  options: SendMessageOptions = {},
): AsyncGenerator<ChatStreamEvent> {
  const lastUser = [...messages].reverse().find((message) => message.role === "user");
  const content = lastUser?.content ?? "";
  const mode = options.mode ?? "default";

  yield* streamMockReply(content, mode, options.regenerate ?? false);
}
