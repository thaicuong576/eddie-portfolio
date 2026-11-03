import type { Section } from "./types";

export const sections: Section[] = [
  {
    id: "approach",
    label: "Approach",
    heading: "From the numbers to a decision, every time.",
  },
  {
    id: "work",
    label: "Selected work",
    navLabel: "Work",
    heading: "Four pieces of evidence.",
    intro:
      "Built on synthetic or anonymised data. Each one starts from a business problem and ends with an insight or a tool.",
  },
  {
    id: "toolkit",
    label: "Toolkit",
    heading: "Finance first. Systems as leverage.",
  },
  {
    id: "experience",
    label: "Experience",
    heading: "Where the work happened.",
  },
  {
    id: "achievements",
    label: "Achievements",
    heading: "Proof along the way.",
  },
  {
    id: "contact",
    label: "Contact",
  },
];

export function sectionEyebrow(id: string): string {
  const index = sections.findIndex((s) => s.id === id);
  if (index === -1) return "";
  const num = String(index + 1).padStart(2, "0");
  return `${num} · ${sections[index].label}`;
}

export function getSection(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}

export const navSections = sections
  .filter((s) => s.id !== "contact")
  .map((s) => ({
    id: s.id,
    label: s.navLabel ?? s.label,
  }));

export const contactSection: Section =
  sections.find((s) => s.id === "contact") ?? {
    id: "contact",
    label: "Contact",
  };
