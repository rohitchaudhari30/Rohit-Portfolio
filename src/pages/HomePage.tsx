import { motion } from "framer-motion";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Highlights from "@/components/sections/Highlights";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import Resume from "@/components/sections/Resume";
import Location from "@/components/sections/Location";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Hero />
      <About />
      <Highlights />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <Certifications />
      <Resume />
      <Location />
      <Contact />
    </motion.div>
  );
}
