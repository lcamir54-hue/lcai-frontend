"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  ArrowUp,
  Code2,
  Globe,
  Lightbulb,
  Plus,
} from "lucide-react";
import { composerTemplates, copy } from "@/lib/copy";
import { cn } from "@/lib/utils";
import type { ComposerMode } from "@/types/chat";

interface ChatComposerProps {
  value: string;
  disabled?: boolean;
  mode: ComposerMode;
  onChange: (value: string) => void;
  onModeChange: (mode: ComposerMode) => void;
  onSubmit: () => void;
}

const TOOLS: Array<{
  id: ComposerMode;
  label: string;
  icon: typeof Lightbulb;
}> = [
  { id: "brainstorm", label: copy.brainstorm, icon: Lightbulb },
  { id: "web-search", label: copy.webSearch, icon: Globe },
  { id: "code", label: copy.code, icon: Code2 },
];

export function ChatComposer({
  value,
  disabled,
  mode,
  onChange,
  onModeChange,
  onSubmit,
}: ChatComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const plusRef = useRef<HTMLDivElement | null>(null);
  const [plusOpen, setPlusOpen] = useState(false);
  const canSend = value.trim().length > 0 && !disabled;

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [value]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!plusRef.current?.contains(event.target as Node)) {
        setPlusOpen(false);
      }
    }
    function onEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") setPlusOpen(false);
    }
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onEscape);
    };
  }, []);

  function handleSubmit(event?: FormEvent) {
    event?.preventDefault();
    if (!canSend) return;
    onSubmit();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 pb-5 pt-2 max-md:px-3 max-md:pb-3">
      <div className="composer-surface mx-auto w-full max-w-composer min-h-[94px] px-4 pb-3 pt-3">
        <label htmlFor="lcai-composer" className="sr-only">
          {copy.composerLabel}
        </label>
        <textarea
          id="lcai-composer"
          ref={textareaRef}
          rows={2}
          value={value}
          disabled={disabled}
          placeholder={copy.composerPlaceholder}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          className="max-h-[180px] min-h-[44px] w-full resize-none border-0 bg-transparent text-start text-[14.5px] leading-8 text-[var(--text-primary)] shadow-none outline-none ring-0 placeholder:text-[var(--text-muted)] focus:border-0 focus:shadow-none focus:outline-none focus:ring-0 focus-visible:border-0 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0"
        />
        <div className="mt-2 flex items-end justify-between gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-1.5">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              const selected = mode === tool.id;
              return (
                <button
                  key={tool.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onModeChange(selected ? "default" : tool.id)}
                  className={cn(
                    "inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[12px] transition-colors duration-ui",
                    selected
                      ? "bg-[var(--accent-soft)] text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]",
                  )}
                >
                  <Icon
                    className={cn("h-3.5 w-3.5", selected && "text-[var(--accent)]")}
                    strokeWidth={1.8}
                  />
                  <span className="max-md:hidden">{tool.label}</span>
                </button>
              );
            })}
            <div ref={plusRef} className="relative">
              <button
                type="button"
                aria-label={copy.addTemplate}
                aria-expanded={plusOpen}
                onClick={() => setPlusOpen((open) => !open)}
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors duration-ui",
                  plusOpen
                    ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "hover:bg-[var(--surface-hover)]",
                )}
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
              </button>
              {plusOpen && (
                <div
                  role="menu"
                  className="absolute bottom-[calc(100%+8px)] start-0 z-20 min-w-[180px] rounded-[12px] border border-[var(--border-light)] bg-[var(--surface-white)] py-1 shadow-menu"
                >
                  {composerTemplates.map((template) => (
                    <button
                      key={template.label}
                      type="button"
                      role="menuitem"
                      className="flex h-9 w-full items-center px-3 text-start text-[13px] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
                      onClick={() => {
                        onChange(
                          value.trim()
                            ? `${value.trim()}\n\n${template.text}`
                            : template.text,
                        );
                        setPlusOpen(false);
                        textareaRef.current?.focus();
                      }}
                    >
                      {template.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={!canSend}
            aria-label={copy.sendMessage}
            className={cn(
              "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-ui",
              canSend
                ? "bg-[var(--button-dark)] text-white hover:bg-[#2f3131]"
                : "cursor-not-allowed bg-[#d8d2cc] text-white",
            )}
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </form>
  );
}
