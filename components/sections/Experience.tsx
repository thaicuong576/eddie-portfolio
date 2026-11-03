import { experienceItems } from "@/content/experience";
import { sectionEyebrow, getSection } from "@/content/sections";

export function Experience() {
  const eyebrow = sectionEyebrow("experience");
  const section = getSection("experience");

  return (
    <section
      id="experience"
      className="max-w-[1240px] mx-auto px-5 sm:px-10 py-24 border-t border-rule scroll-mt-[88px]"
    >
      <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-system mb-[14px]">
        {eyebrow}
      </div>
      <h2 className="font-semibold text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.03em] max-w-[760px] mb-12 text-ink">
        {section?.heading}
      </h2>
      <div>
        {experienceItems.map((item, index) => {
          const isLast = index === experienceItems.length - 1;
          return (
            <div
              key={index}
              className={`border-t border-rule py-7 flex flex-wrap gap-x-12 gap-y-4 ${
                isLast ? "border-b" : ""
              }`}
            >
              <div className="w-[200px] shrink-0 font-mono text-[14px] text-muted">
                {item.period}
              </div>
              <div className="flex-[1_1_480px] min-w-0">
                <h3 className="font-semibold text-[22px] leading-tight text-ink mb-2">
                  {`${item.role} · ${item.company}`}
                </h3>
                <p className="text-muted leading-[1.55] text-[15px]">
                  {item.summary}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
