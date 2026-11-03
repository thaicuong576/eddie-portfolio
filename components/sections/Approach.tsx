import { approachSteps } from "@/content/approach";
import { sectionEyebrow, getSection } from "@/content/sections";

export function Approach() {
  const eyebrow = sectionEyebrow("approach");
  const section = getSection("approach");

  return (
    <section
      id="approach"
      className="max-w-[1240px] mx-auto px-5 sm:px-10 py-24 scroll-mt-[88px]"
    >
      <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-system mb-[14px]">
        {eyebrow}
      </div>
      <h2 className="font-semibold text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.03em] max-w-[760px] mb-12 text-ink">
        {section?.heading}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-4">
        {approachSteps.map((card) => (
          <div
            key={card.number}
            className="bg-surface border border-rule rounded-[16px] p-7 flex flex-col"
          >
            <div className="font-mono text-[13px] text-system mb-3">
              {card.number}
            </div>
            <h3 className="font-semibold text-[22px] leading-tight text-ink mb-2">
              {card.title}
            </h3>
            <p className="text-muted leading-[1.55] text-[15px]">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
