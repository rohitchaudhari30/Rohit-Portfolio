import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github, ImageOff, Building2 } from "lucide-react";
import type { Project } from "@/types/project";
import Badge from "@/components/ui/Badge";
import { useSpotlight } from "@/hooks/useSpotlight";
import { withBase } from "@/utils/base";

const statusColor: Record<Project["status"], string> = {
  Live: "text-emerald-400",
  "In Progress": "text-signal",
  Completed: "text-paper-400",
  Archived: "text-paper-500",
};

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
      className="spotlight group relative flex flex-col overflow-hidden rounded-xl border border-ink-border bg-ink-800 shadow-card transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-signal-dim hover:shadow-card-hover"
    >
      <Link
        to={`/projects/${project.slug}`}
        className="relative z-[1] flex flex-1 flex-col"
        aria-label={`View case study: ${project.title}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
          {project.coverImage ? (
            <img
              src={withBase(project.coverImage)}
              alt={`${project.title} cover`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-premium group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-paper-500">
              <ImageOff size={22} strokeWidth={1.5} />
              <span className="font-mono text-[11px]">screenshot pending</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="eyebrow">{project.category}</span>
            <span className={`font-mono text-[11px] ${statusColor[project.status]}`}>{project.status}</span>
          </div>

          <h3 className="font-display text-lg font-semibold text-paper-100">{project.title}</h3>
          {project.company && (
            <p className="mt-0.5 flex items-center gap-1 font-mono text-[11px] text-paper-500">
              <Building2 size={11} /> {project.company}
            </p>
          )}
          <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-paper-400">{project.shortDescription}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-1.5 font-mono text-xs text-signal opacity-80 transition-all duration-300 group-hover:gap-2.5 group-hover:opacity-100">
            View case study <ArrowUpRight size={14} />
          </div>
        </div>
      </Link>

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on GitHub`}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-md border border-ink-border bg-ink-950/80 text-paper-300 backdrop-blur transition-colors hover:text-signal"
        >
          <Github size={16} />
        </a>
      )}
    </motion.div>
  );
}
