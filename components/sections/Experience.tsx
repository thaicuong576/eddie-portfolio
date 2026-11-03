import { experienceItems } from "@/content/experience";
import { sectionEyebrow, getSection } from "@/content/sections";

export function Experience() {
  const eyebrow = sectionEyebrow("experience");
  const section = getSection("experience");

  return (
    <section
      id="experience"
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
            {experienceItems.map((item, index) => {
              const isLast = index === experienceItems.length - 1;
              return (
                <div
                  key={index}
                  className={`border-t border-rule py-6 sm:py-7 flex flex-col sm:flex-row sm:gap-8 ${
                    isLast ? "border-b" : ""
                  }`}
                >
                  <div className="w-full sm:w-[180px] shrink-0 font-mono text-[13px] sm:text-[14px] text-muted tabular-nums mb-2 sm:mb-0">
                    {item.period}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[19px] sm:text-[21px] leading-snug text-ink mb-2">
                      {item.role}{" "}
                      <span className="font-normal text-muted">
                        · {item.company}
                      </span>
                    </h3>
                    <p className="text-muted leading-relaxed text-[14px] sm:text-[15px]">
                      {item.summary}
                    </p>
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
