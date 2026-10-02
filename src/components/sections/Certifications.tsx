import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/data/certifications";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="scroll-mt-16 py-24">
      <Container>
        <SectionHeading index="06" label="certifications" title="Certifications" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => {
            const content = (
              <>
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-signal/10 text-signal">
                  <Award size={18} strokeWidth={1.8} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-semibold text-paper-100">{cert.name}</p>
                  <p className="mt-0.5 text-xs text-paper-500">
                    {cert.issuer ?? "Certificate"}
                    {cert.date ? ` · ${cert.date}` : ""}
                  </p>
                </div>
                {cert.url && <ExternalLink size={14} className="flex-shrink-0 text-paper-500" />}
              </>
            );

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              >
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="surface flex items-center gap-4 p-4 transition-colors duration-200 hover:border-signal-dim"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="surface flex items-center gap-4 p-4">{content}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
