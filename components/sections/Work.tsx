import Link from "next/link";
import { projects } from "@/content/projects";
import { sectionEyebrow, getSection } from "@/content/sections";
import { ui } from "@/content/ui";

export function Work() {
  const eyebrow = sectionEyebrow("work");
  const section = getSection("work");
  const featuredProjects = projects.filter((project) => project.featured);
  const count = featuredProjects.length;

  return (
    <section
      id="work"
      className="max-w-[1240px] mx-auto px-4 sm:px-10 py-20 sm:py-28 border-t border-rule scroll-mt-[var(--header-h,72px)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <div className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.1em] text-system font-medium mb-3">
            {eyebrow}
          </div>
          <h2 className="font-semibold text-[28px] sm:text-[38px] lg:text-[42px] leading-[1.08] tracking-[-0.03em] text-ink mb-4">
            {section?.heading}
          </h2>
          {section?.intro && (
            <p className="text-[15px] sm:text-[16px] text-muted leading-relaxed">
              {section.intro}
            </p>
          )}
        </div>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {featuredProjects.map((card, idx) => {
              const isOddLast = count % 2 === 1 && idx === count - 1;
              return (
                <Link
                  key={card.slug}
                  href={`/work/${card.slug}`}
                  className={`group bg-surface border border-rule hover:border-system focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-system focus-visible:ring-offset-2 focus-visible:ring-offset-ground rounded-[16px] p-6 sm:p-7 flex flex-col justify-between transition-colors duration-150 ${
                    isOddLast ? "sm:col-span-2" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[12px] uppercase mb-4">
                      <span
                        className={
                          card.track === "systems"
                            ? "text-system font-medium"
                            : "text-muted"
                        }
                      >
                        {card.tag}
                      </span>
                      <span className="text-muted">{card.status}</span>
                    </div>
                    <h3 className="font-semibold text-[22px] sm:text-[24px] tracking-[-0.02em] leading-snug text-ink mb-2.5 group-hover:text-system transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-muted leading-relaxed text-[14px] sm:text-[15px] mb-4">
                      {card.proves}
                    </p>
                  </div>
                  <div>
                    <div className="mt-4 pt-4 border-t border-rule/60">
                      <p className="text-[13px] sm:text-[14px] leading-relaxed text-ink/80 italic">
                        {card.problem}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 flex items-center gap-1.5 font-mono text-[13px] font-medium text-system">
                      <span className="group-hover:underline underline-offset-4">
                        {ui.readCase}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
