import { motion } from "framer-motion";
import { personal } from "@/data/personal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/common/AnimatedCounter";

export default function About() {
  const realStats = personal.stats.filter((s) => s.value !== "0");

  return (
    <section id="about" className="scroll-mt-16 py-24">
      <Container>
        <SectionHeading index="01" label="about" title="Professional Summary" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5">
            {personal.longBio.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-[15px] leading-relaxed text-paper-300"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {realStats.length > 0 && (
            <div className="grid grid-cols-2 gap-4 self-start">
              {realStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="surface p-5 transition-transform duration-300 ease-premium hover:-translate-y-1"
                >
                  <p className="font-display text-3xl font-semibold text-signal">
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <p className="mt-1 text-xs text-paper-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
