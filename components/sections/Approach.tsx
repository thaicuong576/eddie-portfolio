import { approachSteps } from "@/content/approach";
import { sectionEyebrow, getSection } from "@/content/sections";
import { SectionShell } from "@/components/SectionShell";

export function Approach() {
  const eyebrow = sectionEyebrow("approach");
  const section = getSection("approach");

  return (
    <SectionShell
      id="approach"
      eyebrow={eyebrow}
      heading={section?.heading}
      tone="surface"
    >
      <div className="divide-y divide-rule border-y border-rule">
        {approachSteps.map((step) => (
          <div
            key={step.number}
            className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8 group"
          >
            <span className="font-mono text-[20px] sm:text-[24px] text-system font-medium tabular-nums shrink-0 sm:w-14">
              {step.number}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-[20px] text-ink mb-1.5 leading-snug">
                {step.title}
              </h3>
              <p className="text-ink text-[16px] leading-[1.55]">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
