import { approachSteps } from "@/content/approach";
import { sectionEyebrow, getSection } from "@/content/sections";

export function Approach() {
  const eyebrow = sectionEyebrow("approach");
  const section = getSection("approach");

  return (
    <section
      id="approach"
      className="max-w-[1240px] mx-auto px-4 sm:px-10 py-20 sm:py-28 scroll-mt-[var(--header-h,72px)]"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {approachSteps.map((card) => (
              <div
                key={card.number}
                className="bg-surface border border-rule rounded-[16px] p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="border-t-2 border-system pt-3 font-mono text-[13px] text-system font-medium mb-4">
                    {card.number}
                  </div>
                  <h3 className="font-semibold text-[20px] sm:text-[22px] leading-tight text-ink mb-2.5">
                    {card.title}
                  </h3>
                </div>
                <p className="text-muted leading-relaxed text-[14px] sm:text-[15px]">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
