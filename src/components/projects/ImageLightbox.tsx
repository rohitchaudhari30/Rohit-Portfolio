import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/types/project";
import { withBase } from "@/utils/base";

interface LightboxProps {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

export default function ImageLightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null;
  const current = index !== null ? images[index] : null;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!isOpen || index === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % images.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, index, images.length, onClose, onNavigate]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && current && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            onClick={onClose}
            aria-label="Close image viewer"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-md border border-ink-border text-paper-300 hover:text-signal"
          >
            <X size={20} />
          </button>

          {images.length > 1 && (
            <button
              onClick={() => onNavigate((index - 1 + images.length) % images.length)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-ink-border text-paper-300 hover:text-signal sm:left-6"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          <motion.figure
            key={current.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-h-[85vh] max-w-4xl"
          >
            <img src={withBase(current.src)} alt={current.alt} className="max-h-[80vh] w-full rounded-md object-contain" />
            {current.caption && (
              <figcaption className="mt-3 text-center text-sm text-paper-400">{current.caption}</figcaption>
            )}
          </motion.figure>

          {images.length > 1 && (
            <button
              onClick={() => onNavigate((index + 1) % images.length)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-ink-border text-paper-300 hover:text-signal sm:right-6"
            >
              <ChevronRight size={22} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
