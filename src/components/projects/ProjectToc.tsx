import { useActiveSection } from "@/hooks/useActiveSection";

export interface TocEntry {
  id: string;
  title: string;
}

export default function ProjectToc({ entries }: { entries: TocEntry[] }) {
  const activeId = useActiveSection(entries.map((e) => e.id));

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Case study sections" className="sticky top-24 hidden max-h-[calc(100vh-8rem)] w-52 flex-shrink-0 overflow-y-auto lg:block">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-500">On this page</p>
      <ul className="space-y-0.5 border-l border-ink-border">
        {entries.map((entry) => {
          const isActive = activeId === entry.id;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={`-ml-px block border-l-2 py-1.5 pl-3.5 text-[13px] transition-colors duration-150 ${
                  isActive
                    ? "border-signal text-signal"
                    : "border-transparent text-paper-500 hover:border-ink-border hover:text-paper-300"
                }`}
              >
                {entry.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
