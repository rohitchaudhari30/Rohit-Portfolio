import type { ReactNode, AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost";

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
  to?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-all duration-200 ease-premium focus-visible:outline-signal";

const variants: Record<Variant, string> = {
  primary:
    "bg-signal text-ink-950 shadow-glow hover:bg-signal-bright hover:shadow-glow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  secondary:
    "bg-ink-800 text-paper-100 border border-ink-border hover:border-signal-dim hover:bg-ink-700 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  ghost: "bg-transparent text-paper-300 hover:text-paper-100 hover:bg-ink-800",
};

export default function LinkButton({ variant = "primary", className = "", children, href, to, onClick, ...props }: LinkButtonProps) {
  const targetUrl = to || href || "";
  const isExternal =
    targetUrl.startsWith("http://") ||
    targetUrl.startsWith("https://") ||
    targetUrl.startsWith("mailto:") ||
    targetUrl.startsWith("tel:") ||
    targetUrl.endsWith(".pdf");

  if (!isExternal && targetUrl) {
    return (
      <Link
        to={targetUrl}
        onClick={onClick as any}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={targetUrl}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}
