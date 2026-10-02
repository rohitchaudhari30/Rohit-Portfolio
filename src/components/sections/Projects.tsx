import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import type { ProjectCategory } from "@/types/project";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/projects/ProjectCard";

const categories: ("All" | ProjectCategory)[] = [
  "All",
  "Data Engineering",
  "AI / ML",
  "Backend",
  "Full Stack",
  "Other",
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<"All" | ProjectCategory>("All");
  const [showAll, setShowAll] = useState(false);

  const availableCategories = useMemo(() => {
    const used = new Set(projects.map((p) => p.category));
    return categories.filter((c) => c === "All" || used.has(c));
  }, []);

  const filtered = useMemo(() => {
    const base = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);
    if (activeFilter !== "All" || showAll) return base;
    const featuredOnly = base.filter((p) => p.featured);
    return featuredOnly.length > 0 ? featuredOnly : base;
  }, [activeFilter, showAll]);

  return (
    <section id="projects" className="scroll-mt-16 py-24">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="02"
            label="projects"
            title="Featured Projects"
            description="Selected work across data engineering, backend systems, and applied AI."
          />
        </div>

        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
              className={`rounded-sm border px-3.5 py-1.5 font-mono text-xs tracking-wide transition-colors duration-200 ${
                activeFilter === cat
                  ? "border-signal-dim bg-signal/10 text-signal"
                  : "border-ink-border text-paper-400 hover:text-paper-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-paper-500">No projects in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}

        {!showAll && activeFilter === "All" && filtered.length < projects.length && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="font-mono text-xs tracking-wide text-signal hover:text-signal-bright"
            >
              View all projects ({projects.length}) →
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
