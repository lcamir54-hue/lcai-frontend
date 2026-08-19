"use client";

import { copy } from "@/lib/copy";

interface SettingsPanelProps {
  onResetConversations: () => void;
}

export function SettingsPanel({ onResetConversations }: SettingsPanelProps) {
  return (
    <div className="custom-scroll mx-auto w-full max-w-composer flex-1 overflow-y-auto px-6 py-8 max-md:px-4">
      <p className="text-[12px] text-[var(--text-muted)]">{copy.settings}</p>
      <h2 className="mt-2 font-serif text-[34px] leading-[1.45] text-[var(--text-primary)] max-md:text-[28px]">
        {copy.settingsHeading}
      </h2>
      <p className="mt-3 max-w-[520px] text-[15px] leading-8 text-[var(--text-secondary)]">
        {copy.settingsBody}
      </p>

      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between rounded-[16px] border border-[var(--border-light)] bg-[var(--surface-white)] px-4 py-4">
          <div>
            <p className="text-[14px] text-[var(--text-primary)]">{copy.profile}</p>
            <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
              {copy.userName}
            </p>
          </div>
          <span className="text-[12px] text-[var(--text-muted)]">{copy.local}</span>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-[16px] border border-[var(--border-light)] bg-[var(--surface-white)] px-4 py-4">
          <div>
            <p className="text-[14px] text-[var(--text-primary)]">
              {copy.conversations}
            </p>
            <p className="mt-1 text-[13px] leading-7 text-[var(--text-secondary)]">
              {copy.conversationsHelp}
            </p>
          </div>
          <button
            type="button"
            onClick={onResetConversations}
            className="h-9 shrink-0 rounded-full border border-[var(--border-medium)] px-3 text-[13px] text-[var(--text-primary)] transition-colors duration-ui hover:bg-[var(--surface-secondary)]"
          >
            {copy.reset}
          </button>
        </div>
      </div>
    </div>
  );
}
