import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, themes } from "@/context/ThemeContext";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { themeId, toggleTheme } = useTheme();
  const active = themes.find((t) => t.id === themeId) ?? themes[0];
  const isLight = active.kind === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? "Ink & Amber" : "Porcelain"} theme`}
      title={`Switch to ${isLight ? "Ink & Amber" : "Porcelain"} theme`}
      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border border-ink-border bg-ink-800 text-paper-300 transition-colors duration-200 hover:border-signal-dim hover:text-signal ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isLight ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          {isLight ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
