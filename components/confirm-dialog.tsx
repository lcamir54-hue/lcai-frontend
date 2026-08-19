"use client";

import { useEffect } from "react";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
          confirmLabel = copy.delete,
  cancelLabel = copy.cancel,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(45,40,38,0.28)] p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-description"
        className="w-full max-w-[380px] rounded-[18px] border border-[var(--border-light)] bg-[var(--surface-white)] p-5 shadow-menu"
        onClick={(event) => event.stopPropagation()}
      >
        <h2
          id="confirm-title"
          className="font-serif text-[22px] leading-tight text-[var(--text-primary)]"
        >
          {title}
        </h2>
        <p
          id="confirm-description"
          className="mt-2 text-[14px] leading-6 text-[var(--text-secondary)]"
        >
          {description}
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-full px-4 text-[13px] text-[var(--text-secondary)] transition-colors duration-ui hover:bg-[var(--surface-secondary)]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            autoFocus
            onClick={onConfirm}
            className={cn(
              "h-10 rounded-full px-4 text-[13px] text-white transition-colors duration-ui",
              "bg-[var(--button-dark)] hover:bg-[#2f3131]",
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
