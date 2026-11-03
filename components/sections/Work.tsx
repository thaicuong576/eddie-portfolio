import Link from "next/link";
import { projects } from "@/content/projects";
import { sectionEyebrow, getSection } from "@/content/sections";
import { ui } from "@/content/ui";
import { SectionShell } from "@/components/SectionShell";

function getCardSpanClass(index: number, total: number): string {
  if (total === 4) {
    return "lg:col-span-3";
  }
  if (total === 5) {
    return index < 2 ? "lg:col-span-3" : "lg:col-span-2";
  }
  if (total % 3 === 0 || total === 6) {
    return "lg:col-span-2";
  }
  if (total <= 2) {
    return "lg:col-span-3";
  }
  return "lg:col-span-3";
}

export function Work() {
  const eyebrow = sectionEyebrow("work");
  const section = getSection("work");
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <SectionShell
      id="work"
      eyebrow={eyebrow}
      heading={section?.heading}
      intro={section?.intro}
      tone="ground"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 items-stretch">
        {featuredProjects.map((card, index) => {
          const isSystems = card.track === "systems";
          const spanClass = getCardSpanClass(index, featuredProjects.length);

          return (
            <Link
              key={card.slug}
              href={`/work/${card.slug}`}
              className={`group bg-surface border border-rule hover:border-system rounded-[16px] p-6 sm:p-7 flex flex-col justify-between transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system h-full ${spanClass}`}
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[13px] mb-4">
                  <span
                    className={
                      isSystems ? "text-system font-medium" : "text-muted"
                    }
                  >
                    {card.tag}
                  </span>
                  <span className="text-muted tabular-nums">{card.status}</span>
                </div>
                <h3 className="font-semibold text-[20px] tracking-[-0.02em] leading-tight text-ink mb-2.5 group-hover:text-system transition-colors">
                  {card.title}
                </h3>
                <p className="text-muted text-[15px] leading-[1.55]">
                  {card.proves}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-rule/60 flex flex-col gap-3">
                <p className="text-ink text-[15px] leading-[1.55]">
                  {card.problem}
                </p>
                <div className="font-semibold text-system text-[15px] inline-flex items-center gap-1">
                  <span className="group-hover:underline">{ui.readCase}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </SectionShell>
  );
}
