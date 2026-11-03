import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "management-reporting-pack",
    tag: "Finance · Reporting",
    track: "finance",
    status: "[Status]",
    title: "Management reporting pack",
    proves:
      "Proves: P&L structure, consolidation by company and department, Actual vs Budget vs Forecast.",
    problem: "[The business problem, in one sentence]",
    featured: true,
    caseStudy: {
      context: "[The situation and who needed the answer]",
      approach: "[What you built or analysed, step by step]",
      outcome: "[The result, with a number]",
      tools: ["[Tool]"],
      links: [],
    },
  },
  {
    slug: "variance-analysis-case",
    tag: "Finance · Analysis",
    track: "finance",
    status: "[Status]",
    title: "Variance analysis case",
    proves:
      "Proves: finance judgment. Revenue up, profit down: why, and what to change.",
    problem: "[The business problem, in one sentence]",
    featured: true,
    caseStudy: {
      context: "[The situation and who needed the answer]",
      approach: "[What you built or analysed, step by step]",
      outcome: "[The result, with a number]",
      tools: ["[Tool]"],
      links: [],
    },
  },
  {
    slug: "driver-based-forecast-model",
    tag: "Finance · Planning",
    track: "finance",
    status: "[Status]",
    title: "Driver-based forecast model",
    proves:
      "Proves: FP&A capability. Revenue built from drivers, with scenarios and sensitivity.",
    problem: "[The business problem, in one sentence]",
    featured: true,
    caseStudy: {
      context: "[The situation and who needed the answer]",
      approach: "[What you built or analysed, step by step]",
      outcome: "[The result, with a number]",
      tools: ["[Tool]"],
      links: [],
    },
  },
  {
    slug: "finance-data-system",
    tag: "Systems · Data",
    track: "systems",
    status: "[Status]",
    title: "Finance data system",
    proves:
      "Proves: systems capability. Architecture, data model, validation, reconciliation and audit trail.",
    problem:
      "[Before and after: what the workflow cost, and what it costs now]",
    featured: true,
    caseStudy: {
      context: "[The situation and who needed the answer]",
      approach: "[What you built or analysed, step by step]",
      outcome: "[The result, with a number]",
      tools: ["[Tool]"],
      links: [],
    },
  },
];
