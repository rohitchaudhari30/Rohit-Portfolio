export type ProjectCategory =
  | "Data Engineering"
  | "AI / ML"
  | "Backend"
  | "Full Stack"
  | "Other";

export type ProjectStatus = "Live" | "In Progress" | "Completed" | "Archived";

export interface ChallengeEntry {
  challenge: string;
  whyDifficult: string;
  solution: string;
  result: string;
}

export interface FeatureEntry {
  icon: string; // lucide-react icon name
  title: string;
  description: string;
}

export interface TechGroup {
  group: "Frontend" | "Backend" | "Database" | "AI / ML" | "Cloud" | "DevOps" | "Tools";
  items: string[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  category?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription?: string;
  category: ProjectCategory;
  featured: boolean;
  status: ProjectStatus;
  company?: string; // which employer this was built under, if any
  coverImage?: string;
  galleryImages?: GalleryImage[];
  technologies: string[];
  techGroups?: TechGroup[];

  problem?: string;
  motivation?: string;
  objectives?: string[];
  targetUsers?: string;
  solution?: string;
  keyFeatures?: FeatureEntry[];
  architecture?: string;
  architectureDiagram?: string;
  workflow?: string[];
  challenges?: ChallengeEntry[];
  technicalDecisions?: { decision: string; reasoning: string }[];
  securityConsiderations?: string[];
  performanceConsiderations?: string[];
  scalabilityConsiderations?: string[];
  results?: string[];
  lessonsLearned?: string[];
  futureImprovements?: string[];

  githubUrl?: string;
  liveDemoUrl?: string;
  startDate?: string;
  completionDate?: string;
}
