import { navigation } from "@/data/navigation";
import { personal } from "@/data/personal";
import Container from "@/components/ui/Container";
import SocialLinks from "@/components/common/SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-border py-10">
      <Container className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-display text-base font-semibold text-paper-100">
            {personal.name}
            <span className="text-signal">.</span>
          </p>
          <p className="mt-1 text-sm text-paper-500">{personal.title}</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Footer">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-paper-400 hover:text-signal">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-3 md:items-end">
          <SocialLinks />
          <p className="font-mono text-xs text-paper-500">© {year} {personal.name}</p>
        </div>
      </Container>
    </footer>
  );
}
