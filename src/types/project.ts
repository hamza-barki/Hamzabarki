export interface ProjectDecision {
  title: string;
  description: string;
}

export interface CaseStudyProject {
  id: string;
  slug: string;
  numberLabel: string;
  title: string;
  typeLabel: string;
  summary: string;
  facts: {
    role: string;
    type: string;
    status: string;
    tools: string;
  };
  screenshot: {
    src: string;
    alt: string;
    chip: string;
    width: number;
    height: number;
  };
  overview: string;
  problem: string;
  whatIBuilt: string;
  features: string[];
  decisions: ProjectDecision[];
  nextProject: {
    slug: string;
    title: string;
  };
}
