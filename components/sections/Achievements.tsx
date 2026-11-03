import { achievements } from "@/content/achievements";
import { sectionEyebrow, getSection } from "@/content/sections";
import { ui } from "@/content/ui";
import { SectionShell } from "@/components/SectionShell";

export function Achievements() {
  const eyebrow = sectionEyebrow("achievements");
  const section = getSection("achievements");

  return (
    <SectionShell
      id="achievements"
      eyebrow={eyebrow}
      heading={section?.heading}
      tone="surface"
    >
      <div className="divide-y divide-rule border-y border-rule">
        {achievements.map((item, index) => {
          const content = (
            <div className="py-4 sm:py-5 flex items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-4 sm:gap-6 min-w-0 flex-1">
                <span className="w-16 sm:w-20 font-mono text-[13px] sm:text-[14px] text-muted tabular-nums shrink-0">
                  {item.year}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-[16px] text-ink truncate">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-muted truncate">
                    {item.issuer}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="hidden sm:inline font-mono text-[13px] text-muted">
                  {item.kind}
                </span>
                {item.href ? (
                  <span className="font-semibold text-system text-[14px] group-hover:underline inline-flex items-center gap-0.5">
                    {ui.viewLabel}
                  </span>
                ) : null}
              </div>
            </div>
          );

          if (item.href) {
            return (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block hover:bg-ground/50 -mx-3 px-3 sm:-mx-4 sm:px-4 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system"
              >
                {content}
              </a>
            );
          }

          return (
            <div key={index} className="px-1">
              {content}
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
