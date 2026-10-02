import { useEffect, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { navigation } from "@/data/navigation";
import { personal } from "@/data/personal";
import Container from "@/components/ui/Container";
import LinkButton from "@/components/ui/LinkButton";
import ThemeToggle from "@/components/common/ThemeToggle";
import MobileMenu from "./MobileMenu";
import { useActiveSection } from "@/hooks/useActiveSection";
import { withBase } from "@/utils/base";

const sectionIds = navigation.map((item) => item.href.replace("#", ""));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeId = useActiveSection(location.pathname === "/" ? sectionIds : []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(e: MouseEvent, href: string) {
    if (location.pathname !== "/") {
      e.preventDefault();
      navigate("/" + href);
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-border bg-ink-950/80 shadow-[0_1px_0_0_rgb(var(--c-ink-border))] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="/" className="font-display text-lg font-semibold tracking-tight text-paper-100">
          {personal.name.split(" ")[0]}
          <span className="text-signal">.</span>
        </a>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {navigation.map((item) => {
            const isActive = activeId === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-3.5 py-2 font-mono text-[13px] tracking-wide transition-colors duration-200 ${
                  isActive ? "text-signal" : "text-paper-400 hover:text-paper-100"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full bg-signal"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <LinkButton href={withBase(personal.resumeUrl)} variant="secondary" className="text-xs">
            Resume
          </LinkButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md border border-ink-border text-paper-300"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </Container>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
