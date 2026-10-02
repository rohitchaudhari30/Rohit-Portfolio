import { motion } from "framer-motion";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ index, label, title, description, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 max-w-2xl ${centered ? "mx-auto text-center" : ""}`}
    >
      <div className={`mb-4 flex items-center gap-2.5 ${centered ? "justify-center" : ""}`}>
        <span className="h-4 w-1 rounded-full bg-signal" aria-hidden />
        <span className="font-mono text-xs text-signal">{index}</span>
        <span className="eyebrow">{label}</span>
      </div>
      <h2 className="text-display-md font-semibold tracking-tight text-paper-100">{title}</h2>
      {description && <p className="mt-3 text-base text-paper-400">{description}</p>}
    </motion.div>
  );
}
