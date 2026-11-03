import { experienceItems } from "@/content/experience";
import { sectionEyebrow, getSection } from "@/content/sections";
import { SectionShell } from "@/components/SectionShell";

export function Experience() {
  const eyebrow = sectionEyebrow("experience");
  const section = getSection("experience");

  return (
    <SectionShell
      id="experience"
      eyebrow={eyebrow}
      heading={section?.heading}
      tone="ground"
    >
      <div className="divide-y divide-rule border-y border-rule">
        {experienceItems.map((item, index) => {
          const isLatest = index === 0;

          return (
            <div
              key={index}
              className={`py-6 sm:py-8 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8 ${
                isLatest
                  ? "bg-surface/50 -mx-3 px-3 sm:-mx-4 sm:px-4 rounded-xl"
                  : ""
              }`}
            >
              <div className="sm:w-44 shrink-0 font-mono text-[13px] sm:text-[14px] text-muted tabular-nums">
                {item.period}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-[20px] leading-tight text-ink mb-2">
                  <span>{item.role}</span>
                  <span className="text-muted font-normal"> · </span>
                  <span className={isLatest ? "text-system" : "text-ink"}>
                    {item.company}
                  </span>
                </h3>
                <p className="text-ink text-[16px] leading-[1.55]">
                  {item.summary}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
