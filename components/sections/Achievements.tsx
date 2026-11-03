import { achievements } from "@/content/achievements";
import { sectionEyebrow, getSection } from "@/content/sections";
import { ui } from "@/content/ui";

export function Achievements() {
  const eyebrow = sectionEyebrow("achievements");
  const section = getSection("achievements");

  return (
    <section
      id="achievements"
      className="max-w-[1240px] mx-auto px-5 sm:px-10 py-24 border-t border-rule scroll-mt-[88px]"
    >
      <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-system mb-[14px]">
        {eyebrow}
      </div>
      <h2 className="font-semibold text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.03em] max-w-[760px] mb-12 text-ink">
        {section?.heading}
      </h2>
      <div>
        {achievements.map((item, index) => {
          const isLast = index === achievements.length - 1;
          return (
            <div
              key={index}
              className={`border-t border-rule py-7 flex flex-wrap gap-x-12 gap-y-4 ${
                isLast ? "border-b" : ""
              }`}
            >
              <div className="w-[200px] shrink-0 font-mono text-[14px] text-muted">
                {item.year}
              </div>
              <div className="flex-[1_1_480px] min-w-0 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <div>
                  <h3 className="font-semibold text-[22px] leading-tight text-ink mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted leading-[1.55] text-[15px]">
                    {item.issuer}
                  </p>
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-system text-[15px] shrink-0"
                  >
                    {ui.viewLabel}
                  </a>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
