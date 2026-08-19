"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string | null;
  onClear: () => void;
}

export function Toast({ message, onClear }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(onClear, 2200);
    return () => window.clearTimeout(timeout);
  }, [message, onClear]);

  if (!message) return null;

  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
    >
      <p className="rounded-full border border-[var(--border-light)] bg-[var(--button-dark)] px-4 py-2 text-[12px] text-[var(--surface-white)] shadow-menu">
        {message}
      </p>
    </div>
  );
}
