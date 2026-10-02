import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { experience } from "@/data/experience";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 py-24">
      <Container>
        <SectionHeading index="04" label="experience" title="Work Experience" />

        <div className="relative space-y-10 border-l border-ink-border pl-8 sm:pl-10">
          {experience.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="relative"
            >
              <span className="absolute -left-[41px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-ink-950 bg-signal sm:-left-[49px]" />

              <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-display text-lg font-semibold text-paper-100">{entry.role}</h3>
                <span className="font-mono text-xs text-paper-500">
                  {entry.startDate} — {entry.endDate}
                </span>
              </div>

              <div className="mb-3 flex flex-wrap items-center gap-x-2 text-sm text-paper-400">
                {entry.companyUrl ? (
                  <a href={entry.companyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-signal hover:text-signal-bright">
                    {entry.company} <ExternalLink size={12} />
                  </a>
                ) : (
                  <span>{entry.company}</span>
                )}
                <span aria-hidden>·</span>
                <span>{entry.employmentType}</span>
                <span aria-hidden>·</span>
                <span>{entry.location}</span>
              </div>

              {entry.responsibilities.length > 0 && (
                <ul className="mb-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-paper-300">
                  {entry.responsibilities.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              )}

              {entry.achievements.length > 0 && (
                <ul className="mb-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-paper-300">
                  {entry.achievements.map((a, idx) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ul>
              )}

              {entry.technologies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {entry.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
