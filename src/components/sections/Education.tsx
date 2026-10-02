import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/education";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Education() {
  return (
    <section id="education" className="relative scroll-mt-16 bg-ink-900/40 py-24">
      <span className="fade-rule absolute inset-x-0 top-0" aria-hidden />
      <span className="fade-rule absolute inset-x-0 bottom-0" aria-hidden />
      <Container>
        <SectionHeading index="05" label="education" title="Education" />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {education.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="surface flex gap-4 p-5"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-ink-border text-signal">
                <GraduationCap size={18} />
              </div>
              <div>
                <p className="font-mono text-xs text-paper-500">
                  {entry.startYear} — {entry.endYear}
                </p>
                <h3 className="mt-1 font-display text-base font-semibold text-paper-100">
                  {entry.degree}{entry.fieldOfStudy ? `, ${entry.fieldOfStudy}` : ""}
                </h3>
                <p className="text-sm text-paper-400">{entry.institution} · {entry.location}</p>
                {entry.description && <p className="mt-2 text-sm text-paper-300">{entry.description}</p>}
                {entry.achievements && entry.achievements.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {entry.achievements.map((a) => (
                      <span
                        key={a}
                        className="rounded-sm bg-signal/10 px-2 py-0.5 font-mono text-[11px] text-signal"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                )}
                {entry.coursework && entry.coursework.length > 0 && (
                  <p className="mt-2 text-xs text-paper-500">Coursework: {entry.coursework.join(", ")}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
