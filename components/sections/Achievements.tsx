import { achievements } from "@/content/achievements";
import { sectionEyebrow, getSection } from "@/content/sections";
import { ui } from "@/content/ui";

export function Achievements() {
  const eyebrow = sectionEyebrow("achievements");
  const section = getSection("achievements");

  return (
    <section
      id="achievements"
      className="max-w-[1240px] mx-auto px-4 sm:px-10 py-20 sm:py-28 border-t border-rule scroll-mt-[var(--header-h,72px)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <div className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.1em] text-system font-medium mb-3">
            {eyebrow}
          </div>
          <h2 className="font-semibold text-[28px] sm:text-[38px] lg:text-[42px] leading-[1.08] tracking-[-0.03em] text-ink">
            {section?.heading}
          </h2>
        </div>

        <div className="lg:col-span-8">
          <div>
            {achievements.map((item, index) => {
              const isLast = index === achievements.length - 1;
              return (
                <div
                  key={index}
                  className={`border-t border-rule py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:gap-6 ${
                    isLast ? "border-b" : ""
                  }`}
                >
                  <div className="w-full sm:w-[90px] shrink-0 font-mono text-[13px] text-muted tabular-nums mb-1 sm:mb-0">
                    {item.year}
                  </div>
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
                      <h3 className="font-semibold text-[16px] sm:text-[17px] text-ink leading-snug">
                        {item.title}
                      </h3>
                      <span className="text-[13px] text-muted font-normal">
                        · {item.issuer}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 mt-2 sm:mt-0">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted px-2 py-0.5 rounded border border-rule">
                      {item.kind}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[13px] text-system hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-system rounded"
                      >
                        {ui.viewLabel}
                      </a>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
