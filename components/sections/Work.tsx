import Link from "next/link";
import { projects } from "@/content/projects";
import { sectionEyebrow, getSection } from "@/content/sections";
import { ui } from "@/content/ui";

export function Work() {
  const eyebrow = sectionEyebrow("work");
  const section = getSection("work");
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section
      id="work"
      className="max-w-[1240px] mx-auto px-5 sm:px-10 py-24 border-t border-rule scroll-mt-[88px]"
    >
      <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-system mb-[14px]">
        {eyebrow}
      </div>
      <h2 className="font-semibold text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.03em] max-w-[760px] mb-12 text-ink">
        {section?.heading}
      </h2>
      {section?.intro && (
        <p className="text-[18px] text-muted max-w-[640px] mb-12 leading-[1.55]">
          {section.intro}
        </p>
      )}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-5">
        {featuredProjects.map((card) => (
          <Link
            key={card.slug}
            href={`/work/${card.slug}`}
            className="bg-surface border border-rule rounded-[20px] p-8 min-h-[280px] flex flex-col"
          >
            <div
              className={`flex items-center justify-between font-mono text-[12px] uppercase ${
                card.track === "systems" ? "text-system" : "text-muted"
              } mb-4`}
            >
              <span>{card.tag}</span>
              <span>{card.status}</span>
            </div>
            <h3 className="font-semibold text-[28px] tracking-[-0.02em] leading-tight text-ink mb-2">
              {card.title}
            </h3>
            <p className="text-muted leading-[1.55] text-[15px]">
              {card.proves}
            </p>
            <p className="text-ink leading-[1.55] text-[15px] mt-auto pt-6">
              {card.problem}
            </p>
            <div className="font-semibold text-system text-[15px] mt-4 flex items-center gap-1">
              {ui.readCase}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
