import { approachSteps } from "@/content/approach";
import { getSection } from "@/content/sections";
import { SectionFrame } from "@/components/SectionFrame";

export function Approach() {
  const section = getSection("approach");

  return (
    <SectionFrame
      id="approach"
      label={section?.label ?? "Approach"}
      heading={section?.heading}
      first={true}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {approachSteps.map((card) => (
          <div
            key={card.number}
            className="border-t border-rule pt-5 flex flex-col"
          >
            <div className="font-mono tabular-nums text-[14px] text-system font-medium mb-2">
              {card.number}
            </div>
            <h3 className="font-semibold text-[19px] sm:text-[20px] leading-snug text-ink mb-2">
              {card.title}
            </h3>
            <p className="text-muted text-[15px] leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}
