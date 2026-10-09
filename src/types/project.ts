/**
 * Strict TypeScript types for Project and Case Study structures.
 */

export type ProjectStatus = "production" | "deployed" | "in-development" | "concept";

export type ProjectCategory =
  | "Business System / POS"
  | "Collaborative Web App"
  | "Marketplace Concept"
  | "Web Application";

export interface ProjectMetric {
  label: string;
  value: string;
  note?: string;
}

export interface ProjectTechStack {
  category: "Frontend" | "Backend" | "Database" | "Hardware / Infra" | "Deployment";
  tools: string[];
}

export interface ProjectFeature {
  title: string;
  description: string;
  technicalDetail?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  status: ProjectStatus;
  statusLabel: string;
  clientType: string;
  year: string;
  summary: string;
  problemStatement: string;
  solutionOverview: string;
  verifiedFeatures: ProjectFeature[];
  techStack: ProjectTechStack[];
  verifiedHighlights: string[];
  links?: {
    live?: string;
    github?: string;
    demoNote?: string;
  };
  featured: boolean;
  coverImage?: string;
}
