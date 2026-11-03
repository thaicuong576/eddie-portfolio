import { achievements } from "@/content/achievements";
import { sectionEyebrow, getSection } from "@/content/sections";
import { ui } from "@/content/ui";
import { SectionShell } from "@/components/ui/SectionShell";

export function Achievements() {
  const eyebrow = sectionEyebrow("achievements");
  const section = getSection("achievements");

  return (
    <SectionShell
      id="achievements"
      eyebrow={eyebrow}
      heading={section?.heading}
      intro={section?.intro}
    >
      <div className="border-t border-rule">
        {achievements.map((item, index) => {
          const hasLink = Boolean(item.href);
          const Content = (
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-8 gap-y-2 items-baseline w-full">
              <div className="font-mono text-[13px] sm:text-[14px] text-muted tabular-nums">
                {item.year}
              </div>
              <div className="min-w-0 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <div>
                  <h3 className="font-semibold text-[18px] sm:text-[20px] leading-tight text-ink tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted leading-[1.55] text-[14px] sm:text-[15px]">
                    {item.issuer}
                  </p>
                </div>
                {hasLink && (
                  <span className="font-semibold text-system text-[14px] shrink-0 group-hover:underline">
                    {ui.viewLabel}
                    <span className="sr-only">: {item.title}</span>
                  </span>
                )}
              </div>
            </div>
          );

          return (
            <div
              key={index}
              className="border-b border-rule py-5 sm:py-6"
            >
              {hasLink ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block -mx-3 px-3 py-1 rounded-lg transition-colors hover:bg-surface motion-reduce:transition-none"
                  aria-label={`${ui.viewLabel}: ${item.title}`}
                >
                  {Content}
                </a>
              ) : (
                <div className="px-0 py-1">
                  {Content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
