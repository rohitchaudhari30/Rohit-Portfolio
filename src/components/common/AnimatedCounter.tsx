import { useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedCounter({ value }: { value: string }) {
  const [display, setDisplay] = useState("0");
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  function startCount() {
    if (target === null) {
      setDisplay(value);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(String(Math.round(eased * target)));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  return (
    <motion.span onViewportEnter={startCount} viewport={{ once: true, margin: "-40px" }}>
      {display}
      {suffix}
    </motion.span>
  );
}
