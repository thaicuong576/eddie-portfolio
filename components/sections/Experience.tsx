import { experienceItems } from "@/content/experience";
import { getSection } from "@/content/sections";
import { SectionFrame } from "@/components/SectionFrame";

export function Experience() {
  const section = getSection("experience");

  return (
    <SectionFrame
      id="experience"
      label={section?.label ?? "Experience"}
      heading={section?.heading}
    >
      <div className="divide-y divide-rule border-y border-rule">
        {experienceItems.map((item, index) => (
          <div
            key={index}
            className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8"
          >
            <div className="w-44 shrink-0 font-mono tabular-nums text-[14px] text-muted">
              {item.period}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[18px] sm:text-[20px] leading-snug text-ink mb-2">
                {item.role} · {item.company}
              </h3>
              <p className="text-muted leading-relaxed text-[15px] max-w-[65ch]">
                {item.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}
