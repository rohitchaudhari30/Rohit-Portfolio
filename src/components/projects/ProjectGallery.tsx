import { useState } from "react";
import { Expand } from "lucide-react";
import type { GalleryImage } from "@/types/project";
import ImageLightbox from "./ImageLightbox";

export default function ProjectGallery({ images }: { images?: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-video overflow-hidden rounded-md border border-ink-border bg-ink-800"
            aria-label={`Expand image: ${img.alt}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[400ms] ease-premium group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-ink-950/0 opacity-0 transition-all duration-200 group-hover:bg-ink-950/40 group-hover:opacity-100">
              <Expand size={18} className="text-paper-100" />
            </span>
          </button>
        ))}
      </div>

      <ImageLightbox images={images} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </div>
  );
}
