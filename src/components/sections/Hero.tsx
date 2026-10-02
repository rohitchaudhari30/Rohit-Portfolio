import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { personal } from "@/data/personal";
import Container from "@/components/ui/Container";
import LinkButton from "@/components/ui/LinkButton";
import SocialLinks from "@/components/common/SocialLinks";
import Magnetic from "@/components/common/Magnetic";
import { withBase } from "@/utils/base";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export default function Hero() {
  const [imageFailed, setImageFailed] = useState(false);
  const showPhoto = Boolean(personal.profileImage) && !imageFailed;

  return (
    <section className="relative overflow-hidden pb-20 pt-14 sm:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-grid-texture" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.14] blur-[110px]"
        style={{ background: "rgb(var(--c-signal))" }}
        aria-hidden
      />

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div variants={container} initial="hidden" animate="show" className="order-2 lg:order-1">
            <motion.h1 variants={item} className="text-display-xl font-semibold">
              {personal.name}
            </motion.h1>
            <motion.p variants={item} className="mt-2 font-mono text-sm tracking-wide text-signal sm:text-base">
              {personal.title}
            </motion.p>

            <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-paper-300">
              {personal.tagline}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <LinkButton href="#projects" variant="primary">
                  View My Work <ArrowRight size={16} />
                </LinkButton>
              </Magnetic>
              <LinkButton href={withBase(personal.resumeUrl)} variant="secondary">
                <Download size={16} /> Download Resume
              </LinkButton>
              <LinkButton href="#contact" variant="ghost">
                Contact Me
              </LinkButton>
            </motion.div>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-6">
              <SocialLinks />
              <div className="flex items-center gap-1.5 font-mono text-xs text-paper-500">
                <MapPin size={14} />
                {personal.location}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 mx-auto flex items-center justify-center lg:order-2"
          >
            {/* Ambient ring glow behind the portrait */}
            <div
              className="pointer-events-none absolute h-[105%] w-[105%] rounded-full opacity-60 blur-2xl"
              style={{ background: "rgb(var(--c-signal) / 0.35)" }}
              aria-hidden
            />

            {/* Gradient ring frame */}
            <div
              className="relative flex h-44 w-44 items-center justify-center rounded-full p-[3px] sm:h-60 sm:w-60 lg:h-80 lg:w-80"
              style={{
                background:
                  "conic-gradient(from 200deg, rgb(var(--c-signal)), rgb(var(--c-ink-border)) 45%, rgb(var(--c-ink-border)) 65%, rgb(var(--c-signal)))",
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-ink-950 bg-ink-800 shadow-card">
                {showPhoto ? (
                  <img
                    src={withBase(personal.profileImage)}
                    alt={personal.name}
                    className="h-full w-full object-cover"
                    loading="eager"
                    onError={() => setImageFailed(true)}
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 35%, rgb(var(--c-signal) / 0.18), rgb(var(--c-ink-900)) 72%)",
                    }}
                  >
                    <span
                      className="font-display text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
                      style={{ color: "rgb(var(--c-signal) / 0.55)" }}
                    >
                      {getInitials(personal.name)}
                    </span>
                  </div>
                )}
                <div
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(180deg, transparent 55%, rgb(var(--c-ink-950) / 0.3))" }}
                  aria-hidden
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
