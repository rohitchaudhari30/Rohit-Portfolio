import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Icon from "@/components/common/Icon";

interface CaseStudySectionProps {
  id: string;
  icon: string;
  title: string;
  children: ReactNode;
  isEmpty?: boolean;
}

export default function CaseStudySection({ id, icon, title, children, isEmpty }: CaseStudySectionProps) {
  if (isEmpty) return null;
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
      className="scroll-mt-24 py-9 [&:first-child_.fade-rule]:hidden first:pt-0"
    >
      <span className="fade-rule mb-9 block" aria-hidden />
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-signal/10 text-signal">
          <Icon name={icon} size={16} strokeWidth={1.8} />
        </span>
        <h2 className="font-display text-xl font-semibold text-paper-100">{title}</h2>
      </div>
      <div className="space-y-3 pl-[42px] text-[15px] leading-relaxed text-paper-300">{children}</div>
    </motion.section>
  );
}
