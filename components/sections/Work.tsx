import Link from "next/link";
import { projects } from "@/content/projects";
import { sectionEyebrow, getSection } from "@/content/sections";
import { ui } from "@/content/ui";
import { SectionShell } from "@/components/ui/SectionShell";

function getWorkCardSpanClasses(total: number, index: number): string {
  // Mobile (<640px): 1 column
  // sm (640px - 1023px): 2-column grid
  const isSmLastOdd = total % 2 === 1 && index === total - 1;
  const smSpan = isSmLastOdd ? "sm:col-span-2" : "sm:col-span-1";

  // lg (>=1024px): 6-column grid
  if (total === 1) {
    return `${smSpan} lg:col-span-6`;
  }
  if (total === 2) {
    return `${smSpan} lg:col-span-3`;
  }
  if (total === 3) {
    return `${smSpan} lg:col-span-2`;
  }
  if (total === 4) {
    // 2x2 grid on lg (each spans 3 of 6)
    return `${smSpan} lg:col-span-3`;
  }
  if (total === 5) {
    // 2 cards on first row (span 3), 3 cards on second row (span 2)
    return index < 2 ? `${smSpan} lg:col-span-3` : `${smSpan} lg:col-span-2`;
  }
  if (total === 6) {
    // 2 rows of 3 (each spans 2 of 6)
    return `${smSpan} lg:col-span-2`;
  }
  if (total % 3 === 0) {
    return `${smSpan} lg:col-span-2`;
  }
  if (total % 2 === 0) {
    return `${smSpan} lg:col-span-3`;
  }
  return index < total - 1 ? `${smSpan} lg:col-span-2` : `${smSpan} lg:col-span-6`;
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
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {featuredProjects.map((card, index) => (
          <Link
            key={card.slug}
            href={`/work/${card.slug}`}
            aria-label={`${card.title} — ${ui.readCase}`}
            className={`group bg-surface border border-rule rounded-[16px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:border-system/60 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${getWorkCardSpanClasses(
              featuredProjects.length,
              index
            )}`}
          >
            <div>
              <div className="flex items-center justify-between gap-3 font-mono text-[12px] uppercase mb-5 select-none">
                <span
                  className={`px-2.5 py-0.5 rounded border ${
                    card.track === "systems"
                      ? "border-system/30 bg-system/5 text-system font-medium"
                      : "border-rule/80 text-muted"
                  }`}
                >
                  {card.tag}
                </span>
                <span className="text-muted tabular-nums">{card.status}</span>
              </div>

              <h3 className="font-semibold text-[22px] sm:text-[25px] tracking-[-0.025em] leading-snug text-ink mb-3 group-hover:text-system transition-colors">
                {card.title}
              </h3>

              <p className="text-muted leading-[1.6] text-[15px] mb-6">
                {card.proves}
              </p>
            </div>

            <div className="border-t border-rule/70 pt-5 mt-auto">
              <p className="text-ink/85 text-[14px] leading-relaxed mb-4">
                {card.problem}
              </p>
              <div className="font-semibold text-system text-[14px] flex items-center gap-1.5 group-hover:underline">
                <span>{ui.readCase}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}
