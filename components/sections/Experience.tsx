import { experienceItems } from "@/content/experience";
import { sectionEyebrow, getSection } from "@/content/sections";
import { SectionShell } from "@/components/ui/SectionShell";

export function Experience() {
  const eyebrow = sectionEyebrow("experience");
  const section = getSection("experience");

  return (
    <SectionShell
      id="experience"
      eyebrow={eyebrow}
      heading={section?.heading}
      intro={section?.intro}
    >
      <div className="border-t border-rule">
        {experienceItems.map((item, index) => (
          <div
            key={index}
            className="border-b border-rule py-7 sm:py-9 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-8 gap-y-3 items-baseline"
          >
            <div className="font-mono text-[13px] sm:text-[14px] text-muted tabular-nums">
              {item.period}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-[20px] sm:text-[22px] leading-tight text-ink tracking-tight mb-2.5">
                {`${item.role} · ${item.company}`}
              </h3>
              <p className="text-muted leading-[1.6] text-[15px] sm:text-[16px] max-w-[800px]">
                {item.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
