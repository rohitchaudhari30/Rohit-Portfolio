import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  as?: "button";
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-all duration-200 ease-premium focus-visible:outline-signal disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-signal text-ink-950 shadow-glow hover:bg-signal-bright hover:shadow-glow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  secondary:
    "bg-ink-800 text-paper-100 border border-ink-border hover:border-signal-dim hover:bg-ink-700 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  ghost: "bg-transparent text-paper-300 hover:text-paper-100 hover:bg-ink-800",
};

export default function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
