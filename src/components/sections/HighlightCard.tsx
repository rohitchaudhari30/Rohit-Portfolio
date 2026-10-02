import { motion } from "framer-motion";
import type { HighlightItem } from "@/types/content";
import Icon from "@/components/common/Icon";
import { useSpotlight } from "@/hooks/useSpotlight";

export default function HighlightCard({ item, index }: { item: HighlightItem; index: number }) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
      className="spotlight group relative overflow-hidden rounded-xl border border-ink-border bg-ink-800 p-6 shadow-card transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-signal-dim hover:shadow-card-hover"
    >
      <div className="relative z-[1] flex h-11 w-11 items-center justify-center rounded-md bg-signal/10 text-signal">
        <Icon name={item.icon} size={20} strokeWidth={1.7} />
      </div>
      <h3 className="relative z-[1] mt-4 font-display text-base font-semibold text-paper-100">{item.title}</h3>
      <p className="relative z-[1] mt-1.5 text-sm leading-relaxed text-paper-400">{item.description}</p>
    </motion.div>
  );
}
