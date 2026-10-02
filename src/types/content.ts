export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  shortBio: string;
  longBio: string[];
  email: string;
  phone?: string;
  location: string;
  availability?: string;
  profileImage: string;
  resumeUrl: string;
  stats: { label: string; value: string }[];
}

export interface SkillItem {
  name: string;
  icon: string; // lucide-react icon name
  context?: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface HighlightItem {
  icon: string;
  title: string;
  description: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  location: string;
  coursework?: string[];
  achievements?: string[];
  description?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer?: string;
  date?: string;
  url?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
