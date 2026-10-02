import { socialLinks } from "@/data/socialLinks";
import Icon from "./Icon";

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target={link.url.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={link.name}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-ink-border text-paper-400 transition-colors duration-200 hover:border-signal-dim hover:text-signal"
        >
          <Icon name={link.icon} size={18} strokeWidth={1.75} />
        </a>
      ))}
    </div>
  );
}
