import type { ReactNode } from "react";

export default function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border border-ink-border bg-ink-700 px-2.5 py-1 font-mono text-[11px] tracking-wide text-paper-400 ${className}`}
    >
      {children}
    </span>
  );
}
