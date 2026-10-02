import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-md border border-ink-border bg-ink-800 text-paper-300 shadow-subtle transition-colors duration-200 hover:border-signal-dim hover:text-signal"
    >
      <ArrowUp size={18} />
    </button>
  );
}
