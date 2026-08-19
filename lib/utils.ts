import { copy } from "@/lib/copy";

export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `lcai-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function deriveTitle(message: string): string {
  const cleaned = message.replace(/\s+/g, " ").trim();
  if (!cleaned) return copy.newChat;
  const sentence = cleaned.split(/[.?!؟]/)[0]?.trim() || cleaned;
  if (sentence.length <= 42) return sentence;
  return `${sentence.slice(0, 42).trimEnd()}…`;
}
