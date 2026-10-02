import { motion } from "framer-motion";
import type { SkillCategory } from "@/types/content";
import Icon from "@/components/common/Icon";
import { useSpotlight } from "@/hooks/useSpotlight";

export default function SkillCategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
      className="spotlight group rounded-xl border border-ink-border bg-ink-800 p-5 shadow-card transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div className="relative z-[1] mb-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-signal/10 text-signal">
          <Icon name={category.items[0]?.icon ?? "Layers"} size={16} strokeWidth={1.8} />
        </span>
        <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-paper-400">
          {category.category}
        </h3>
      </div>

      <ul className="relative z-[1] flex flex-wrap gap-2">
        {category.items.map((skill) => (
          <li
            key={skill.name}
            className="flex items-center gap-1.5 rounded-md bg-ink-700/60 px-3 py-1.5 text-[13px] text-paper-200 transition-colors duration-200 hover:bg-signal/12 hover:text-signal"
            title={skill.context}
          >
            <Icon name={skill.icon} size={13} strokeWidth={1.75} className="opacity-70" />
            {skill.name}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
