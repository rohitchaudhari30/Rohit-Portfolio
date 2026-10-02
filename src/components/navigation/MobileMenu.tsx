import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { navigation } from "@/data/navigation";
import SocialLinks from "@/components/common/SocialLinks";
import ThemeToggle from "@/components/common/ThemeToggle";
import LinkButton from "@/components/ui/LinkButton";
import { personal } from "@/data/personal";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          // Solid background on purpose — no alpha/backdrop-blur, since a
          // translucent overlay let underlying page content bleed through
          // on some mobile browsers. Portaled to <body> to guarantee this
          // always covers the full viewport regardless of any ancestor's
          // stacking context.
          className="fixed inset-0 z-[999] overflow-y-auto bg-ink-950 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex justify-end p-5">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-md border border-ink-border text-paper-300 hover:text-signal"
            >
              <X size={20} />
            </button>
          </div>
          <motion.nav
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            className="flex flex-col gap-1 px-8 pt-6"
          >
            {navigation.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={onClose}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="border-b border-ink-border py-4 font-display text-2xl text-paper-100 hover:text-signal"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.nav>
          <div className="mt-8 flex flex-col gap-4 px-8 pb-10">
            <LinkButton href={personal.resumeUrl} variant="secondary" onClick={onClose}>
              Resume
            </LinkButton>
            <div className="flex items-center justify-between">
              <SocialLinks />
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
