import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowLeft, ArrowRight, CheckCircle2, Building2 } from "lucide-react";
import { projects } from "@/data/projects";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import LinkButton from "@/components/ui/LinkButton";
import Icon from "@/components/common/Icon";
import CaseStudySection from "@/components/projects/CaseStudySection";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectToc from "@/components/projects/ProjectToc";

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-signal" strokeWidth={1.8} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/404" replace />;

  const considerationGroups = [
    { key: "security", label: "Security", icon: "ShieldCheck", items: project.securityConsiderations },
    { key: "performance", label: "Performance", icon: "Zap", items: project.performanceConsiderations },
    { key: "scalability", label: "Scalability", icon: "TrendingUp", items: project.scalabilityConsiderations },
  ].filter((g) => g.items && g.items.length > 0);

  const sections = [
    {
      id: "overview",
      icon: "FileText",
      title: "Overview",
      isEmpty: !project.fullDescription,
      content: <p>{project.fullDescription}</p>,
    },
    {
      id: "problem",
      icon: "AlertCircle",
      title: "Problem Statement",
      isEmpty: !project.problem,
      content: <p>{project.problem}</p>,
    },
    {
      id: "motivation",
      icon: "Lightbulb",
      title: "Why I Built This",
      isEmpty: !project.motivation,
      content: (
        <>
          <p>{project.motivation}</p>
          {project.objectives && project.objectives.length > 0 && <CheckList items={project.objectives} />}
          {project.targetUsers && <p className="text-paper-400">Built for: {project.targetUsers}</p>}
        </>
      ),
    },
    {
      id: "solution",
      icon: "Sparkles",
      title: "Solution",
      isEmpty: !project.solution,
      content: <p>{project.solution}</p>,
    },
    {
      id: "features",
      icon: "LayoutGrid",
      title: "Key Features",
      isEmpty: !project.keyFeatures || project.keyFeatures.length === 0,
      content: (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {project.keyFeatures?.map((f) => (
            <div key={f.title} className="surface p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-signal/10 text-signal">
                <Icon name={f.icon} size={15} strokeWidth={1.8} />
              </span>
              <h3 className="mt-3 font-display text-sm font-semibold text-paper-100">{f.title}</h3>
              <p className="mt-1 text-sm text-paper-400">{f.description}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "architecture",
      icon: "Network",
      title: "Architecture",
      isEmpty: !project.architecture,
      content: (
        <>
          <p>{project.architecture}</p>
          {project.architectureDiagram && (
            <img
              src={project.architectureDiagram}
              alt={`${project.title} architecture diagram`}
              className="mt-4 rounded-md border border-ink-border"
            />
          )}
        </>
      ),
    },
    {
      id: "stack",
      icon: "Layers",
      title: "Technology Stack",
      isEmpty: !project.techGroups || project.techGroups.length === 0,
      content: (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {project.techGroups?.map((g) => (
            <div key={g.group}>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-signal">{g.group}</p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((techItem) => (
                  <span
                    key={techItem}
                    className="rounded-md bg-ink-700/60 px-3 py-1.5 text-[13px] text-paper-200"
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "workflow",
      icon: "Workflow",
      title: "Project Workflow",
      isEmpty: !project.workflow || project.workflow.length === 0,
      content: (
        <ol className="space-y-5 border-l border-ink-border pl-6">
          {project.workflow?.map((step, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[29px] flex h-5 w-5 items-center justify-center rounded-full bg-signal font-mono text-[10px] font-semibold text-ink-950">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: "challenges",
      icon: "Puzzle",
      title: "Challenges & Solutions",
      isEmpty: !project.challenges || project.challenges.length === 0,
      content: (
        <div className="space-y-5">
          {project.challenges?.map((c, i) => (
            <div key={i} className="surface p-5">
              <p className="font-display text-sm font-semibold text-paper-100">{c.challenge}</p>
              <dl className="mt-3 space-y-2 text-sm">
                <div>
                  <dt className="font-mono text-xs text-paper-500">Why it was difficult</dt>
                  <dd className="text-paper-300">{c.whyDifficult}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-paper-500">Solution</dt>
                  <dd className="text-paper-300">{c.solution}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-paper-500">Result</dt>
                  <dd className="text-paper-300">{c.result}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "decisions",
      icon: "GitCommitHorizontal",
      title: "Technical Decisions",
      isEmpty: !project.technicalDecisions || project.technicalDecisions.length === 0,
      content: (
        <div className="space-y-3">
          {project.technicalDecisions?.map((d, i) => (
            <div key={i} className="surface p-4">
              <span className="font-medium text-paper-100">{d.decision}.</span> {d.reasoning}
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "considerations",
      icon: "ShieldCheck",
      title: "Security, Performance & Scalability",
      isEmpty: considerationGroups.length === 0,
      content: (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {considerationGroups.map((g) => (
            <div key={g.key}>
              <div className="mb-2 flex items-center gap-2">
                <Icon name={g.icon} size={14} className="text-signal" strokeWidth={1.8} />
                <p className="font-mono text-[11px] uppercase tracking-wide text-paper-400">{g.label}</p>
              </div>
              <CheckList items={g.items ?? []} />
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "gallery",
      icon: "Image",
      title: "Project Gallery",
      isEmpty: !project.galleryImages || project.galleryImages.length === 0,
      content: <ProjectGallery images={project.galleryImages} />,
    },
    {
      id: "results",
      icon: "Trophy",
      title: "Results",
      isEmpty: !project.results || project.results.length === 0,
      content: <CheckList items={project.results ?? []} />,
    },
    {
      id: "lessons",
      icon: "BookOpen",
      title: "Lessons Learned",
      isEmpty: !project.lessonsLearned || project.lessonsLearned.length === 0,
      content: <CheckList items={project.lessonsLearned ?? []} />,
    },
    {
      id: "future",
      icon: "Rocket",
      title: "Future Improvements",
      isEmpty: !project.futureImprovements || project.futureImprovements.length === 0,
      content: <CheckList items={project.futureImprovements ?? []} />,
    },
  ];

  const tocEntries = sections.filter((s) => !s.isEmpty).map((s) => ({ id: s.id, title: s.title }));

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Project hero */}
      <section className="border-b border-ink-border py-16">
        <Container>
          <Link
            to="/#projects"
            className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-paper-400 hover:text-signal"
          >
            <ArrowLeft size={14} /> Back to Projects
          </Link>

          <div className="mb-3 flex items-center gap-3">
            <span className="eyebrow">{project.category}</span>
            <span className="h-px w-8 bg-ink-border" />
            <span className="font-mono text-xs text-paper-500">{project.status}</span>
          </div>

          <h1 className="text-display-lg font-semibold">{project.title}</h1>
          {project.company && (
            <p className="mt-2 flex items-center gap-1.5 font-mono text-xs text-paper-500">
              <Building2 size={13} /> Built at {project.company}
            </p>
          )}
          <p className="mt-3 max-w-2xl text-lg text-paper-400">{project.subtitle}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.githubUrl && (
              <LinkButton href={project.githubUrl} variant="secondary">
                <Github size={16} /> GitHub
              </LinkButton>
            )}
            {project.liveDemoUrl && (
              <LinkButton href={project.liveDemoUrl} variant="primary">
                <ExternalLink size={16} /> Live Demo
              </LinkButton>
            )}
          </div>

          {project.coverImage && (
            <div className="mt-10 overflow-hidden rounded-xl border border-ink-border shadow-card">
              <img src={project.coverImage} alt={`${project.title} cover`} className="w-full object-cover" />
            </div>
          )}
        </Container>
      </section>

      <Container className="py-4">
        <div className="flex gap-12">
          <ProjectToc entries={tocEntries} />
          <div className="max-w-2xl flex-1">
            {sections.map((s) => (
              <CaseStudySection key={s.id} id={s.id} icon={s.icon} title={s.title} isEmpty={s.isEmpty}>
                {s.content}
              </CaseStudySection>
            ))}
          </div>
        </div>
      </Container>

      <section className="border-t border-ink-border py-14">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <LinkButton href="/#projects" variant="ghost">
            <ArrowLeft size={16} /> Back to Projects
          </LinkButton>
          <div className="flex flex-wrap gap-3">
            {project.githubUrl && (
              <LinkButton href={project.githubUrl} variant="secondary">
                <Github size={16} /> View GitHub
              </LinkButton>
            )}
            <LinkButton href="/#contact" variant="primary">
              Contact Me <ArrowRight size={16} />
            </LinkButton>
          </div>
        </Container>
      </section>
    </motion.article>
  );
}
