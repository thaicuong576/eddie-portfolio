export interface Profile {
  name: string;
  heroEyebrow: string;
  heroParagraph: string;
  heroHints: string[];
  contactHeadline: string;
  email: string;
  linkedin: string;
  cv: string;
  copyright: string;
  linkedinLabel: string;
  cvLabel: string;
}

export interface ApproachStep {
  number: string;
  title: string;
  description: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface CaseStudy {
  context: string;
  approach: string;
  outcome: string;
  tools: string[];
  links: ProjectLink[];
}

export interface Project {
  slug: string;
  tag: string;
  track: "finance" | "systems";
  status: string;
  title: string;
  proves: string;
  problem: string;
  featured: boolean;
  caseStudy: CaseStudy;
}

export interface Achievement {
  title: string;
  issuer: string;
  year: string;
  kind: "certification" | "award" | "other";
  href?: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  summary: string;
}

export interface ToolkitGroup {
  name: string;
  tone: "finance" | "systems";
  skills: string[];
}

export interface Section {
  id: string;
  label: string;
  navLabel?: string;
  heading?: string;
  intro?: string;
}
