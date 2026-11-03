import Link from "next/link";
import { projects } from "@/content/projects";
import { getSection } from "@/content/sections";
import { ui } from "@/content/ui";
import { SectionFrame } from "@/components/SectionFrame";

export function Work() {
  const section = getSection("work");
  const featuredProjects = projects.filter((project) => project.featured);
  const n = featuredProjects.length;

  const isTriple = n > 0 && n % 3 === 0;
  const gridClassName = isTriple
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
    : "grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch";

  return (
    <SectionFrame
      id="work"
      label={section?.label ?? "Selected work"}
      heading={section?.heading}
      intro={section?.intro}
    >
      <div className={gridClassName}>
        {featuredProjects.map((card, index) => {
          const isLastOddInTwoCol = !isTriple && n % 2 === 1 && index === n - 1;
          const cardColSpan = isLastOddInTwoCol ? "sm:col-span-2" : "";

          return (
            <Link
              key={card.slug}
              href={`/work/${card.slug}`}
              className={`bg-surface border border-rule rounded-[12px] p-6 sm:p-8 flex flex-col justify-between h-full group hover:border-system focus-visible:outline focus-visible:outline-2 focus-visible:outline-system focus-visible:outline-offset-2 transition-colors duration-150 ${cardColSpan}`}
            >
              <div>
                <div className="flex items-center justify-between text-[13px] mb-3">
                  <span
                    className={`font-medium ${
                      card.track === "systems" ? "text-system" : "text-muted"
                    }`}
                  >
                    {card.tag}
                  </span>
                  <span className="font-mono tabular-nums text-muted text-[12px]">
                    {card.status}
                  </span>
                </div>
                <h3 className="font-semibold text-[22px] sm:text-[24px] tracking-[-0.02em] leading-snug text-ink mb-2">
                  {card.title}
                </h3>
                <p className="text-muted leading-relaxed text-[15px]">
                  {card.proves}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-rule">
                <p className="text-ink leading-relaxed text-[15px] mb-4">
                  {card.problem}
                </p>
                <div className="font-medium text-system text-[14px] flex items-center gap-1 group-hover:underline underline-offset-4">
                  {ui.readCase}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </SectionFrame>
  );
}
