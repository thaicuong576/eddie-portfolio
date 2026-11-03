import { approachSteps } from "@/content/approach";
import { sectionEyebrow, getSection } from "@/content/sections";
import { SectionShell } from "@/components/ui/SectionShell";

export function Approach() {
  const eyebrow = sectionEyebrow("approach");
  const section = getSection("approach");

  return (
    <SectionShell
      id="approach"
      eyebrow={eyebrow}
      heading={section?.heading}
      intro={section?.intro}
      first={true}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {approachSteps.map((card) => (
          <div
            key={card.number}
            className="bg-surface border border-rule rounded-[16px] p-6 sm:p-7 flex flex-col justify-between transition-colors hover:border-system/40 motion-reduce:transition-none"
          >
            <div>
              <div className="font-mono text-[12px] sm:text-[13px] text-system font-medium mb-4 tabular-nums select-none">
                {card.number}
              </div>
              <h3 className="font-semibold text-[19px] sm:text-[21px] leading-tight text-ink mb-2.5 tracking-tight">
                {card.title}
              </h3>
              <p className="text-muted leading-[1.6] text-[14px] sm:text-[15px]">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
