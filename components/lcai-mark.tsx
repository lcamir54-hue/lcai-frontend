import { cn } from "@/lib/utils";

interface LcaiMarkProps {
  size?: "sm" | "md";
  className?: string;
}

export function LcaiMark({ size = "md", className }: LcaiMarkProps) {
  const dimension = size === "sm" ? "h-7 w-7 rounded-[8px]" : "h-8 w-8 rounded-[9px]";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center bg-[var(--sidebar-background)] text-[var(--sidebar-text)]",
        dimension,
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"}>
        <circle
          cx="12"
          cy="12"
          r="7.25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        <path
          d="M12 6.4v2.2M12 15.4v2.2M6.4 12h2.2M15.4 12h2.2"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="16.6" cy="7.4" r="1.05" fill="currentColor" opacity="0.9" />
      </svg>
    </span>
  );
}
